// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, ActivityIndicator, Button } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// interface Language {
//   code: string;
//   name: string;
// }

// interface TranslatorProps {
//   apiKey?: string;
//   defaultSourceLanguage?: string;
//   defaultTargetLanguage?: string;
//   showTitle?: boolean;
// }

// const Translator: React.FC<TranslatorProps> = ({
//   apiKey = 'c3659572-54ed-492b-a888-dde4277fdcc8:fx', 
//   defaultSourceLanguage = 'en',
//   defaultTargetLanguage = 'uk',
//   showTitle = true,
// }) => {
//   const [text, setText] = useState<string>('');
//   const [translatedText, setTranslatedText] = useState<string>('');
//   const [sourceLanguage, setSourceLanguage] = useState<string>(defaultSourceLanguage);
//   const [targetLanguage, setTargetLanguage] = useState<string>(defaultTargetLanguage);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const languages: Language[] = [
//     { code: 'bg', name: 'Bulgarian' },
//     { code: 'cs', name: 'Czech' },
//     { code: 'da', name: 'Danish' },
//     { code: 'de', name: 'German' },
//     { code: 'el', name: 'Greek' },
//     { code: 'en', name: 'English' },
//     { code: 'es', name: 'Spanish' },
//     { code: 'et', name: 'Estonian' },
//     { code: 'fi', name: 'Finnish' },
//     { code: 'fr', name: 'French' },
//     { code: 'hu', name: 'Hungarian' },
//     { code: 'it', name: 'Italian' },
//     { code: 'ja', name: 'Japanese' },
//     { code: 'lt', name: 'Lithuanian' },
//     { code: 'lv', name: 'Latvian' },
//     { code: 'nl', name: 'Dutch' },
//     { code: 'pl', name: 'Polish' },
//     { code: 'pt', name: 'Portuguese' },
//     { code: 'ro', name: 'Romanian' },
//     { code: 'ru', name: 'Russian' },
//     { code: 'sk', name: 'Slovak' },
//     { code: 'sl', name: 'Slovenian' },
//     { code: 'sv', name: 'Swedish' },
//     { code: 'uk', name: 'Ukrainian' },
//     { code: 'zh', name: 'Chinese' },
//   ];

//   const translateText = async (): Promise<void> => {
//     if (!text.trim()) return;

//     setIsLoading(true);
//     try {
//       const res = await fetch('https://api-free.deepl.com/v2/translate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `DeepL-Auth-Key ${apiKey}`,
//         },
//         body: new URLSearchParams({
//           text,
//           source_lang: sourceLanguage.toUpperCase(),
//           target_lang: targetLanguage.toUpperCase(),
//         }).toString(),
//       });

      

//       const data = await res.json();
//       const translated = data.translations?.[0]?.text || 'No translation found';
//       setTranslatedText(translated);
//     } catch (error) {
//       console.error('Translation error:', error);
//       setTranslatedText('Translation failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const swapLanguages = (): void => {
//     setSourceLanguage(targetLanguage);
//     setTargetLanguage(sourceLanguage);
//     setText(translatedText);
//     setTranslatedText(text);
//   };

//   return (
//     <View style={styles.container}>
//       {showTitle && <Text style={styles.title}>DeepL Translator</Text>}

//       <TextInput
//         style={styles.input}
//         placeholder="Enter text to translate"
//         value={text}
//         onChangeText={setText}
//         multiline
//       />

//       <View style={styles.languageControls}>
//         <View style={styles.pickerContainer}>
//           <Text>From:</Text>
//           <Picker
//             selectedValue={sourceLanguage}
//             onValueChange={setSourceLanguage}
//             style={styles.picker}
//           >
//             {languages.map((lang) => (
//               <Picker.Item key={`source-${lang.code}`} label={lang.name} value={lang.code} />
//             ))}
//           </Picker>
//         </View>

//         <Button title="⇄" onPress={swapLanguages} />

//         <View style={styles.pickerContainer}>
//           <Text>To:</Text>
//           <Picker
//             selectedValue={targetLanguage}
//             onValueChange={setTargetLanguage}
//             style={styles.picker}
//           >
//             {languages.map((lang) => (
//               <Picker.Item key={`target-${lang.code}`} label={lang.name} value={lang.code} />
//             ))}
//           </Picker>
//         </View>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Button title="Translate" onPress={translateText} disabled={!text.trim()} />
//       )}

//       {translatedText ? (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Translation:</Text>
//           <Text style={styles.resultText}>{translatedText}</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// };

// export default Translator;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   languageControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   pickerContainer: {
//     flex: 1,
//   },
//   picker: {
//     height: 50,
//   },
//   resultContainer: {
//     marginTop: 20,
//   },
//   resultTitle: {
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   resultText: {
//     fontSize: 16,
//   },
// });
