import { Button } from "@heroui/react"
import Plus from "~/Assets/Svg/Plus"

const RandomButtons = ({openModeOfPayments, setOpenModeOfPayments, openDepSales, setOpenDepSales}) => {

    return(
        <div>
            <div className="grid gap-3 mt-24">
                <Button onPress={()=>setOpenDepSales(!openDepSales)} color="primary" className="w-min rounded-md font-semibold text-base" startContent={<Plus color={"white"}/>}>
                    Department Sales
                </Button>
                <Button onPress={()=>setOpenModeOfPayments(!openModeOfPayments)} color="primary" className="w-min rounded-md font-semibold text-base" startContent={<Plus color={"white"}/>}>
                    Mode Of Payment
                </Button>
                <Button color="primary" className="w-min rounded-md font-semibold text-base" startContent={<Plus color={"white"}/>}>
                    Supplements
                </Button>

                <Button color="success" className="w-min rounded-md font-semibold text-base text-white" isDisabled={true}>
                    Variance Check
                </Button>
            </div>

            <div className="md:flex grid grid-cols-3 gap-4 mt-24">
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