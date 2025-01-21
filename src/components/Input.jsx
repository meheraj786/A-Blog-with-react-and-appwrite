import React, { useId } from 'react';
import { Input as MTInput } from "@material-tailwind/react";

const Input = React.forwardRef(function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>}
      <MTInput
        type={type}
        size="lg"
        variant="outlined"
        fullWidth
        inputRef={ref}
        {...props}
        id={id}
        className={className}
      />
    </div>
  );
});

export default Input;
