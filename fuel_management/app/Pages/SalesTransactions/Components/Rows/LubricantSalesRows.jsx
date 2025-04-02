import SimpleInput from "~/Components/SimpleInput"
import { useEffect, useState } from "react"
import { Button } from "@heroui/react";

export const LubricantSalesRows = ({index, content, setContent}) => {
    const [lubricant, setLubricant] = useState('')
    const [quantity, setQuantity] = useState(null)
    const [gross, setGross] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [soldBy, setSoldBy] = useState('')

    useEffect(() => {
        const updateFuelData = () => {
            setContent(prev => 
                prev.map((item)=> {
                    if (item.Id==index) {
                        return {
                            ...item,
                            Lubricants: lubricant, 
                            Quantity: Number(quantity),
                            Gross: Number(gross),
                            Discount: Number(discount),
                            SoldBy: soldBy
                        }
                    }
                    return item
                })
            )
        }
        updateFuelData()
    }, [lubricant, quantity, gross, discount, soldBy])
    
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
                    initialValue={lubricant}
                    setInitialValue={setLubricant}
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
                    initialValue={quantity}
                    setInitialValue={setQuantity}
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
                    initialValue={gross}
                    setInitialValue={setGross}
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
                    initialValue={discount}
                    setInitialValue={setDiscount}
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
                    initialValue={soldBy}
                    setInitialValue={setSoldBy}
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