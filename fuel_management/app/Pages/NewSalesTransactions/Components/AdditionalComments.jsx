import { Textarea } from "@heroui/react";

const AdditionalComments = ({comment, setComment}) => {
    const handleInput = (input) => {
        setComment(input)
    }

    return (
        <div className="h-auto min-h-[200px] w-full ">
            <Textarea
                label="Notes"
                labelPlacement="outside"
                placeholder="Comments/Remarks etc."
                value={comment}
                variant="flat"
                onValueChange={handleInput}
                minRows={7}
                classNames={{
                    inputWrapper: "bg-gray-300",
                }}
            />
        </div>
    )
}

export default AdditionalComments