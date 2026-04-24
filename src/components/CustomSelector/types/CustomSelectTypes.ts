import React from "react";

export interface  CustomSelectTypes<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>  {
  options: { value: T; label: string }[];
  value: { value: T; label: string };
  onChange: (option: { value: T; label: string }) => void;
  title: string;
};
