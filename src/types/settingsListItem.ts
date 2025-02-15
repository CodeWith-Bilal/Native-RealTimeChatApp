import { RootStackParamList } from "./navigation";

export interface SettingsItemProps {
  title: string;
  icon?: any;
  subtext?: string;
  link: keyof RootStackParamList | null;
}

