import SimpleInput from "~/Components/SimpleInput"
import { useEffect, useState } from "react"
import { Button } from "@heroui/react";

export const RedemptionRows = ({index, content, setContent}) => {
    const [paymentMode, setPaymentMode] = useState('')
    const [quantity, setQuantity] = useState(null)
    const [amount, setAmount] = useState(null)

    useEffect(() => {
        const updateFuelData = () => {
            setContent(prev => 
                prev.map((item)=> {
                    if (item.Id==index) {
                        return {
                            ...item,
                            paymentMode: paymentMode, 
                            quantity: Number(quantity),
                            amount: Number(amount)
                        }
                    }
                    return item
                })
            )
        }
        updateFuelData()
    }, [quantity, paymentMode, amount])
    
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
                    initialValue={paymentMode}
                    setInitialValue={setPaymentMode}
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
                    initialValue={amount}
                    setInitialValue={setAmount}
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