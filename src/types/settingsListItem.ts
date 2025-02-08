import { RootStackParamList } from "./navigation";

export interface SettingsItemProps {
  title: string;
  icon?: any; // Adjust the type based on your icon type
  subtext?: string;
  link: keyof RootStackParamList | null;
}

