import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";

const CustomIconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <IconButton
      {...props}
      sx={{
        transition: "box-shadow 0.3s ease, background-color 0.3s ease",
        "&:hover": {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.45)",
          backgroundColor: "rgb(118 108 225 / 30%)",
        },
        "&:active": {
          boxShadow: "none",
        },
        "&:focus": {
          outline: "none",
        },
        ...props.sx,
      }}
    >
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
