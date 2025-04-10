import SimpleInput from "~/Components/SimpleInput"
import ColorBGText from "~/Components/ColoredBGText"
import { Fuels } from "~/Constants/Labels"
import { useEffect, useState } from "react"

export const FuelInputRows = ({fuelData, fuelSales, setFuelSales}) => {
    const [transCt, setTransCt] = useState(null)
    const [volume, setVolume] = useState(null)
    const [amount, setAmount] = useState(null)

    useEffect(()=> {
        const updateFuelData = () => {
            setFuelSales(prev => 
                prev.map((fuel)=> {
                    if (fuel.fuelName==fuelData.fuelName) {
                        return {
                            ...fuel,
                            transCt: Number(transCt),
                            volume: Number(volume),
                            amount: Number(amount)
                        }
                    }
                    return fuel
                })
            )
        }       
        updateFuelData()
    }, [transCt, volume, amount])

    return (
        <>
            <td className="px-8 fuelDatas-center">
                <ColorBGText 
                    text={fuelData.fuelName.toUpperCase()} 
                    color={Fuels.find((fuel) => fuelData.fuelName.toUpperCase() == fuel.name).color} 
                />
            </td>
            <td className="px-8 fuelDatas-center">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={transCt}
                    setInitialValue={setTransCt}
                />
            </td>
            <td className="px-8 fuelDatas-center">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={volume}
                    setInitialValue={setVolume}
                />
            </td>
            <td className="px-8 fuelDatas-center">
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
        </>
    )
}