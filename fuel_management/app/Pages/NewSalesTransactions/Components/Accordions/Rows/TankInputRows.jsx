import { Fuels } from "~/Constants/Labels"
import SimpleInput from "~/Components/SimpleInput"
import ColorBGText from "~/Components/ColoredBGText"
import { useEffect, useState } from "react"

export const TankInputRows = ({ tankData, tankTotal, setTankTotal }) => {
    const [price, setPrice] = useState('')
    const [dip, setDip] = useState('')
    const [volume, setVolume] = useState('')

    useEffect(() => {
        const compute = () => {
            if (tankData!==undefined) {
                setPrice(tankData?.price)
                setDip(tankData?.dip)
                setVolume(tankData?.volume)
            } 
        }
        compute()
    }, [tankData])

    useEffect(() => {
        const updateTankData = () => {
            setTankTotal(prev =>
                prev.map((tank) => {
                    if (tank.tank == tankData.tank) {
                        return {
                            ...tank,
                            price: Number(price),
                            dip: Number(dip),
                            volume: Number(volume)
                        }
                    }
                    return tank
                })
            )
        }
        updateTankData()
    }, [price, volume, dip])

    return (
        <>
            <td className="text-center tankDatas-center px-6">{tankData?.tank}</td>
            <td className="text-center grid justify-center tankDatas-center px-6 py-1">
                <ColorBGText
                    text={tankData?.fuelName.toUpperCase()}
                    color={tankData?.color}
                />
            </td>
            <td className="text-center tankDatas-center px-6">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={price}
                    setInitialValue={setPrice}
                />
            </td>
            <td className="text-center tankDatas-center px-6">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={dip}
                    setInitialValue={setDip}
                />
            </td>
            <td className="text-center tankDatas-center px-6">
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
        </>
    )
}