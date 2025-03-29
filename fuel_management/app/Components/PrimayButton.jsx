import {Button, CircularProgress } from "@heroui/react";

const PrimaryButton = ({
  title = "",
  onClick = null,
  isLoading = false,
  fullWidth= true
}) => {

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      className="rounded-md"
      fullWidth={fullWidth}
      color='primary'>
      { isLoading ? <CircularProgress size='sm' aria-label="Loading..."/> : title } 
    </Button>

  )
}

export default PrimaryButton;
