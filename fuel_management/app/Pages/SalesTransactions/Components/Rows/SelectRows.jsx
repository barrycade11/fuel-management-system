import { useEffect, useState } from "react"
import SimpleInput from "~/Components/SimpleInput"

export const SelectRows = ({ selectData, select, setSelect }) => {
    const [value, setValue] = useState(null)

    useEffect(() => {
        const updateData = () => {
            setSelect(prev =>
                prev.map((data) => {
                    if (data.name == selectData.name) {
                        return {
                            ...data,
                            value: Number(value)
                        }
                    }
                    return data
                })
            )
        }
        updateData()
    }, [value])

    return (
        <>
            <td className="px-8 text-center">
                {selectData?.name}
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