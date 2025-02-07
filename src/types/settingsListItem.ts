import { RootStackParamList } from "./navigation";

export interface SettingsItemProps {
  title: string;
  icon?: string;
  subtext?: string;
  link: keyof RootStackParamList | null;
}
