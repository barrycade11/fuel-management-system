import { useEffect, useState } from "react"
import SimpleInput from "~/Components/SimpleInput"

const ModeOfPaymentRows = ({ modeData, mode, setMode }) => {
    const [quantity, setQuantity] = useState(null)
    const [value, setValue] = useState(null)
    
    useEffect(() => {
        const updateData = () => {
            setMode(prev =>
                prev.map((data) => {
                    if (data.name == modeData.name) {
                        return {
                            ...data,
                            quantity: Number(quantity),
                            value: Number(value)
                        }
                    }
                    return data
                })
            )
        }
        updateData()
    }, [quantity, value])

    return (
        <>
            <td className="px-8 text-center">
                {modeData?.name}
            </td>
            <td className="px-8 items-center">
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
            <td className="px-8 items-center">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={value}
                    setInitialValue={setValue}
                />
            </td>
        </>
    )
}

export default ModeOfPaymentRows