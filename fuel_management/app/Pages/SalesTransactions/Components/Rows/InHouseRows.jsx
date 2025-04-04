import SimpleInput from "~/Components/SimpleInput"
import { useEffect, useState } from "react"
import { Button } from "@heroui/react";

export const InHouseRows = ({index, content, setContent}) => {
    const [invoiceNo, setInvoiceNo] = useState(null)
    const [accountName, setAccountName] = useState('')
    const [product, setProduct] = useState('')
    const [quantity, setQuantity] = useState(null)
    const [poAmount, setPoAmount] = useState(null)

    useEffect(() => {
        const updateFuelData = () => {
            setContent(prev => 
                prev.map((item)=> {
                    if (item.Id==index) {
                        return {
                            ...item,
                            accountName: accountName, 
                            quantity: Number(quantity),
                            invoiceNo: Number(invoiceNo),
                            poAmount: Number(poAmount),
                            product: product
                        }
                    }
                    return item
                })
            )
        }
        updateFuelData()
    }, [invoiceNo, quantity, accountName, product, poAmount])
    
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
                    type={"number"}
                    textAlign={"center"}
                    initialValue={invoiceNo}
                    setInitialValue={setInvoiceNo}
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
                    initialValue={accountName}
                    setInitialValue={setAccountName}
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
                    initialValue={product}
                    setInitialValue={setProduct}
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
                    initialValue={poAmount}
                    setInitialValue={setPoAmount}
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