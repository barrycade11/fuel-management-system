import { Button } from "@heroui/react"

const RandomButtons = () => {
    const PlusIcon = ({fill = "currentColor", size, height, width, ...props}) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        );
    };
    return(
        <div>
            <div className="grid gap-3 mt-24">
                <Button color="primary" className="w-min rounded-md font-semibold text-base" startContent={<PlusIcon />}>
                    Department Sales
                </Button>
                <Button color="primary" className="w-min rounded-md font-semibold text-base" startContent={<PlusIcon />}>
                    Mode Of Payment
                </Button>
                <Button color="primary" className="w-min rounded-md font-semibold text-base" startContent={<PlusIcon />}>
                    Supplements
                </Button>

                <Button color="success" className="w-min rounded-md font-semibold text-base text-white" isDisabled={true}>
                    Variance Check
                </Button>
            </div>

            <div className="flex gap-4 mt-24">
                <Button color="default" className="w-min rounded-md font-semibold text-base text-white" isDisabled={true}>
                    Back
                </Button>
                <Button color="danger" className="w-min rounded-md font-semibold text-base text-white" isDisabled={true}>
                    Delete
                </Button>
                <Button color="primary" className="w-min rounded-md font-semibold text-base text-white" isDisabled={true}>
                    Save
                </Button>
                <Button className="w-min rounded-md font-semibold text-base text-blue-600 bg-blue-200">
                    View History
                </Button>
            </div>
        </div>
    )
}

export default RandomButtons