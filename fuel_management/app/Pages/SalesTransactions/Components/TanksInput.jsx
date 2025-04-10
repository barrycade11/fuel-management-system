import { useState } from "react"
import ColorBGText from "~/Components/ColoredBGText"
import { Fuels } from "~/Constants/Labels"
import SimpleInput from "~/Components/SimpleInput"

const TanksInput = () => {
    const tableHeader = ["Tank Name", "Fuel", "Price", "Dip", "Volume"]
    const [tankData, setTankData] = useState([
        {
            id: 1,
            fuel: Fuels[0],
            price: 72.5,
            dip: 1238,
            volume: 9234.23
        },
        {
            id: 2,
            fuel: Fuels[1],
            price: 72.5,
            dip: 1238,
            volume: 9234.23
        },
        {
            id: 3,
            fuel: Fuels[2],
            price: 72.5,
            dip: 1238,
            volume: 9234.23
        },
        {
            id: 4,
            fuel: Fuels[3],
            price: 72.5,
            dip: 1238,
            volume: 9234.23
        },
        {
            id: 5,
            fuel: Fuels[0],
            price: 72.5,
            dip: 1238,
            volume: 9234.23
        },
        {
            id: 6,
            fuel: Fuels[1],
            price: 72.5,
            dip: 1238,
            volume: 9234.23
        },
        {
            id: 7,
            fuel: Fuels[2],
            price: 72.5,
            dip: 1238,
            volume: 9234.23
        }
    ])

    return (
        <div className="h-min w-full border-[1px]">
            <div className="bg-blue-100 p-3 text-gray-500 font-semibold">
                Tank Totals
            </div>

            <div className="py-6 px-3">
                <table className="border-[1px] h-full w-full">
                    <thead>
                        <tr className="border-b-[1px]">
                            {tableHeader.map((label, index) => {
                                return <td className="p-4 text-gray-600 text-center font-semibold whitespace-nowrap" key={index}>{label}</td>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tankData.map((item, index)=> {
                            return (
                                <tr key={index} className="h-full w-full border-[1px]">
                                    <td className="text-center items-center px-6">{item?.id}</td>
                                    <td className="text-center grid justify-center items-center px-6 py-1">
                                        <ColorBGText text={item?.fuel.name} color={item?.fuel.color}/>
                                    </td>
                                    <td className="text-center items-center px-6">
                                        <SimpleInput
                                            version={1}
                                            label={''}
                                            placeholder={"type here"}
                                            icon={'₱'}
                                            type={"number"}
                                            textAlign={"center"}
                                            initialValue={item?.price}
                                        // setInitialValue={}
                                        />
                                    </td>
                                    <td className="text-center items-center px-6">
                                        <SimpleInput
                                            version={1}
                                            label={''}
                                            placeholder={"type here"}
                                            icon={'₱'}
                                            type={"number"}
                                            textAlign={"center"}
                                            initialValue={item?.dip}
                                        // setInitialValue={}
                                        />
                                    </td>
                                    <td className="text-center items-center px-6">
                                        <SimpleInput
                                            version={1}
                                            label={''}
                                            placeholder={"type here"}
                                            icon={'₱'}
                                            type={"number"}
                                            textAlign={"center"}
                                            initialValue={item?.volume}
                                        // setInitialValue={}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TanksInput