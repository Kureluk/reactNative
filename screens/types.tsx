import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    About: undefined;
    Forms: { initialEmail: string };
    ParticipantA: { participant: string };
    ParticipantB: { participant: string };
    DamageReport: { participant?: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type FormsScreenProps = NativeStackScreenProps<RootStackParamList, 'Forms'>;
export type AboutScreenProps = NativeStackScreenProps<RootStackParamList, 'About'>;
export type ParticipantAScreenProps = NativeStackScreenProps<RootStackParamList, 'ParticipantA'>;
export type ParticipantBScreenProps = NativeStackScreenProps<RootStackParamList, 'ParticipantB'>;
export type DamageReportScreenProps = NativeStackScreenProps<RootStackParamList, 'DamageReport'>;
