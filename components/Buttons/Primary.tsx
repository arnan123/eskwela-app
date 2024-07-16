import React from "react";
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";
import clsx from "clsx";

interface ButtonProps extends MUIButtonProps {
  tailwindClasses?: string;
}

const Button: React.FC<ButtonProps> = ({
  tailwindClasses,
  children,
  ...muiProps
}) => {
  return (
    <MUIButton className={`${tailwindClasses} `} {...muiProps}>
      {children}
    </MUIButton>
  );
};

export default Button;
