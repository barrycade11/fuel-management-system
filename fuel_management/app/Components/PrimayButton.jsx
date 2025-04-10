import { Button, CircularProgress } from "@heroui/react";

const PrimaryButton = ({
    title = "",
    onClick = null,
    type = null,
    isLoading = false,
    fullWidth = true,
    color = 'primary',
    variant = 'solid'
}) => {

    return (
        <Button
            type={type}
            disabled={isLoading}
            onPress={onClick}
            className="rounded-md"
            fullWidth={fullWidth}
            variant="solid"
            color={color}>
            {isLoading ? <CircularProgress size='sm' aria-label="Loading..." /> : title}
        </Button>
    )
}

export default PrimaryButton;
