import {Button} from "@heroui/react";

const PrimaryButton = ({
  title = "",
  onClick = null
}) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-md"
      fullWidth 
      color='primary'>
      {title}
    </Button>

  )
}

export default PrimaryButton;
