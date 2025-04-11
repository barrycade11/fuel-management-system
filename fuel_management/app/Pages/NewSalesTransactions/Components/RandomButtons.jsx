import { Button } from "@heroui/react"
import Plus from "~/Assets/Svg/Plus"

const RandomButtons = ({
        fuelSales,
        tankTotal,
        departmentSales,
        openModeOfPayments, 
        setOpenModeOfPayments, 
        openDepSales, 
        setOpenDepSales, 
        openSupplements, 
        setOpenSupplements,
        openCrew, 
        setOpenCrew,
        openVariance,
        setOpenVariance
    }) => {

    const submitHandler = async () => {
        console.log({
            fuelSales: fuelSales,
            tankTotal: tankTotal,
            departmentSales: departmentSales
        })
    }

    return(
        <div>
            <div className="grid gap-3 mt-12">
                <Button onPress={()=>setOpenCrew(!openCrew)} color="primary" className="w-min rounded-md font-semibold text-base" startContent={<Plus color={"white"}/>}>
                    Confirm Crew
                </Button>
                <Button onPress={()=>setOpenDepSales(!openDepSales)} color="primary" className="w-min rounded-md font-semibold text-base" startContent={<Plus color={"white"}/>}>
                    Department Sales
                </Button>
                <Button onPress={()=>setOpenModeOfPayments(!openModeOfPayments)} color="primary" className="w-min rounded-md font-semibold text-base" startContent={<Plus color={"white"}/>}>
                    Mode Of Payment
                </Button>
                <Button onPress={()=>setOpenSupplements(!openSupplements)} color="primary" className="w-min rounded-md font-semibold text-base" startContent={<Plus color={"white"}/>}>
                    Supplements
                </Button>

                <Button onPress={()=>setOpenVariance(!openVariance)} className="w-min rounded-md font-semibold text-base bg-emerald-400 text-white">
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
                <Button onPress={submitHandler} color="primary" className="w-min rounded-md font-semibold text-base text-white">
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