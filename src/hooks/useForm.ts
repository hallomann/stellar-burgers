import { useState } from 'react';

type TFormValues = {
  [key: string]: string;
};

export function useForm(initialValues: TFormValues = {}) {
  const [values, setValues] = useState<TFormValues>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  return { values, handleChange, setValues };
}
