export type CustomSelectProps<T> = {
  options: { value: T; label: string }[];
  value?: { value: T; label: string };
  onChange: (option: { value: T; label: string }) => void;
  title: string;
  width: number;
};
