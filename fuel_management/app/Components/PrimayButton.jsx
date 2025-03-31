import {Button, CircularProgress } from "@heroui/react";

const PrimaryButton = ({
  title = "",
  onClick = null,
  isLoading = false,
  fullWidth= true,
  color = 'primary'
}) => {

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      className="rounded-md"
      fullWidth={fullWidth}
      color={color}>
      { isLoading ? <CircularProgress size='sm' aria-label="Loading..."/> : title } 
    </Button>

  )
}

export default PrimaryButton;
