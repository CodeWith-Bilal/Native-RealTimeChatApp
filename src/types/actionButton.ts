export interface ActionButtonProps {
  onClick: () => void;
  loader?: boolean;
  children: string;
  onLoadText: string;
  color?: string;
  error?: string;
}
