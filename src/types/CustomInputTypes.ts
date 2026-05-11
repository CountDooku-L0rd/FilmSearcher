export interface CustomInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string | null;
}
