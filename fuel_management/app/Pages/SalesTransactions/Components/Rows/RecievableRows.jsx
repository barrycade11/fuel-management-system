import SimpleInput from "~/Components/SimpleInput"
import { useEffect, useState } from "react"
import { Button } from "@heroui/react";

export const RecievableRows = ({index, content, setContent}) => {
    const [employeeName, setEmployeeName] = useState('')
    const [description, setDescription] = useState('')
    const [chargeAmount, setChargeAmount] = useState(null)

    useEffect(() => {
        const updateFuelData = () => {
            setContent(prev => 
                prev.map((item)=> {
                    if (item.Id==index) {
                        return {
                            ...item,
                            employeeName: employeeName, 
                            description: description,
                            chargeAmount: Number(chargeAmount)
                        }
                    }
                    return item
                })
            )
        }
        updateFuelData()
    }, [employeeName, description, chargeAmount])
    
    return (
        <>
            <td className="px-6 py-1">
                {index + 1}
            </td>
            <td key={index} className="px-6 py-1">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"text"}
                    textAlign={"center"}
                    initialValue={employeeName}
                    setInitialValue={setEmployeeName}
                />
            </td>
            <td key={index} className="px-6 py-1">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"text"}
                    textAlign={"center"}
                    initialValue={description}
                    setInitialValue={setDescription}
                />
            </td>
            <td key={index} className="px-6 py-1">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={chargeAmount}
                    setInitialValue={setChargeAmount}
                />
            </td>
            <td >
                <Button
                    className="rounded-md font-semibold text-base"
                    color="primary"
                    variant="flat"
                    size="sm"
                >
                    Edit
                </Button>
            </td>
        </>
    )
}