import { useEffect, useState } from "react"
import SimpleInput from "~/Components/SimpleInput"

export const NonFuelRows = ({ nonFuelData, nonfuel, setNonFuel }) => {
    const [quantity, setQuantity] = useState(null)

    useEffect(() => {
        const updateData = () => {
            setNonFuel(prev =>
                prev.map((data) => {
                    if (data.posNo == nonFuelData.posNo) {
                        return {
                            ...data,
                            quantity: Number(quantity)
                        }
                    }
                    return data
                })
            )
        }
        updateData()
    }, [quantity])

    return (
        <>
            <td className="px-8 text-center">
                {nonFuelData?.posNo}
            </td>
            <td className="px-8 items-center">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={nonFuelData?.quantity}
                    setInitialValue={setQuantity}
                />
            </td>
        </>
    )
}