import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProgressBar from './ProgressBar';

type Theme = {
  backgroundColor: string;
  textColor: string;
  inputBorderColor: string;
  inputBackgroundColor: string;
  accentColor: string;
};

type Themes = {
  light: Theme;
  dark: Theme;
};

const themes: Themes = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    inputBorderColor: '#cccccc',
    inputBackgroundColor: '#f5f5f5',
    accentColor: '#007AFF',
  },
  dark: {
    backgroundColor: '#121212',
    textColor: '#ffffff',
    inputBorderColor: '#333333',
    inputBackgroundColor: '#1e1e1e',
    accentColor: '#0A84FF',
  },
};

type ThemeAction = { type: 'TOGGLE' };

const themeReducer = (state: 'light' | 'dark', action: ThemeAction): 'light' | 'dark' => {
  switch (action.type) {
    case 'TOGGLE':
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
};

type Currency = 'USD' | 'EUR' | 'UAH';

interface FlagProps {
  source: ImageSourcePropType;
  currency: Currency;
  selected?: boolean;
  onPress?: () => void;
  theme: Theme;
}

const FlagItem: React.FC<FlagProps> = ({ source, currency, selected, onPress, theme }) => (
  <TouchableOpacity 
    style={[
      styles.currencyItem, 
      selected && { backgroundColor: theme.accentColor + '20' }
    ]}
    onPress={onPress}
  >
    <View style={styles.flagContainer}>
      <Image source={source} style={styles.flag} />
      <Text style={[
        styles.currencyText,
        { 
          color: selected ? theme.accentColor : theme.textColor,
          fontWeight: selected ? 'bold' : 'normal'
        }
      ]}>
        {currency}
      </Text>
    </View>
    <Text style={[styles.selectButton, { color: theme.accentColor }]}>
      {selected ? '✓' : '>'}
    </Text>
  </TouchableOpacity>
);

const Converter: React.FC = () => {
  const [theme, dispatch] = useReducer(themeReducer, 'dark');
  const currentTheme = themes[theme];

  const [amount, setAmount] = useState<string>('');
  const [rates, setRates] = useState<{USD: number, EUR: number} | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('UAH');
  const [conversionProgress, setConversionProgress] = useState(0);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      setConversionProgress(0);

      const interval = setInterval(() => {
        setConversionProgress(prev => Math.min(prev + 10, 90));
      }, 300);
  
      try {
        const res = await fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5');
        const data = await res.json();
        
        const usdRate = parseFloat(data.find((i: any) => i.ccy === 'USD')?.sale || '0');
        const eurRate = parseFloat(data.find((i: any) => i.ccy === 'EUR')?.sale || '0');
        
        if (usdRate && eurRate) {
          setRates({
            USD: usdRate,
            EUR: eurRate
          });
          setConversionProgress(100);
        } else {
          setError('Rates not found');
        }
      } catch (error) {
        setError('Failed to fetch data.');
      } finally {
        clearInterval(interval);
        setLoading(false);
      }
    };
  
    fetchRates();
  }, []);

  const convert = (): string => {
    const value = parseFloat(amount);
    if (isNaN(value) || !rates) return '0.00';

    if (fromCurrency === toCurrency) return value.toFixed(2);

    let result = value;

    if (fromCurrency === 'USD') {
      result = value * rates.USD;
    } else if (fromCurrency === 'EUR') {
      result = value * rates.EUR;
    }

    if (toCurrency === 'USD') {
      result = result / rates.USD;
    } else if (toCurrency === 'EUR') {
      result = result / rates.EUR;
    }
    
    return result.toFixed(2);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.themeSwitch}>
        <Text style={{ color: currentTheme.textColor }}>Dark Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={() => dispatch({ type: 'TOGGLE' })}
        />
      </View>

      <Text style={[styles.title, { color: currentTheme.textColor }]}>Converter</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter amount"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
          style={[
            styles.input,
            {
              backgroundColor: currentTheme.inputBackgroundColor,
              borderColor: currentTheme.inputBorderColor,
              color: currentTheme.textColor,
              flex: 1,
            },
          ]}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Picker
          selectedValue={fromCurrency}
          onValueChange={setFromCurrency}
          style={[
            styles.picker,
            { color: currentTheme.textColor }
          ]}
          dropdownIconColor={currentTheme.textColor}
        >
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
          <Picker.Item label="UAH" value="UAH" />
        </Picker>
      </View>

      <Text style={[styles.subtitle, { color: currentTheme.textColor }]}>Convert to:</Text>
      
      <View style={styles.currencyList}>
        <FlagItem
          source={require('../assets/images/USA_flag.png')}
          currency="USD"
          selected={toCurrency === 'USD'}
          onPress={() => setToCurrency('USD')}
          theme={currentTheme}
        />
        
        <FlagItem
          source={require('../assets/images/Europ_flag.png')}
          currency="EUR"
          selected={toCurrency === 'EUR'}
          onPress={() => setToCurrency('EUR')}
          theme={currentTheme}
        />

        <FlagItem
          source={require('../assets/images/Uk_flag.png')}
          currency="UAH"
          selected={toCurrency === 'UAH'}
          onPress={() => setToCurrency('UAH')}
          theme={currentTheme}
        />
      </View>
      {loading ? (
        <ProgressBar 
            progress={conversionProgress}
            duration={500} 
            minDuration={4000}
            theme={{
            backgroundColor: currentTheme.backgroundColor,
            textColor: currentTheme.textColor,
            inputBackgroundColor: currentTheme.inputBackgroundColor,
            accentColor: currentTheme.accentColor
            }}
        />
        ) : error ? (
        <Text style={[styles.result, { color: 'red' }]}>{error}</Text>
        ) : amount && rates ? (
        <Text style={[styles.result, { color: currentTheme.textColor }]}>
            {`${amount} ${fromCurrency} = ${convert()} ${toCurrency}`}
        </Text>
        ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 1000,
    marginTop: 20,
  },
  themeSwitch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  currencyList: {
    marginBottom: 20,
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    marginBottom: 8,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 12,
    borderRadius: 3,
  },
  currencyText: {
    fontSize: 18,
  },
  selectButton: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
  },
});

export default Converter;