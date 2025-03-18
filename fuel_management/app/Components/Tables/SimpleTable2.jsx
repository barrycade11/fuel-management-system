import ColorBGText from "../ColoredBGText";
import { Locations } from "~/Constants/Labels";
import { useState, useEffect } from "react";

const SimpleTable2 = (props) => {
    const [num, setNum] = useState([])

    useEffect(() => {
        const recount = () => {
            let limit = Object.keys(props.tankData).length
            let temp = []
            for (let i = 0; i < limit; i++) {
                temp.push(i + 1)
            }
            setNum(temp)
        }
        recount()
    }, [props.tankData])

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-1">
                <thead className="text-xs text-gray-900 dark:text-gray-400">
                    <tr className="border-b-1">
                        <th scope="col" className="px-6 py-3 text-blue-400 whitespace-nowrap">
                            {props.mainHeader}
                        </th>
                        {props.tankData.map((item, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                <label className="whitespace-nowrap">Tank {index + 1}</label>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {num.map((eachRow, index) => {
                        return (
                            <tr key={index} className="bg-white dark:bg-gray-800 border-b-1">
                                <td className="px-6 py-2">{eachRow - 1}</td>
                                {props?.tankData?.map((item, index) => {
                                    return (
                                        <>
                                            <th key={index} scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {Object.keys(item)[eachRow-1]=="fuel" ?
                                                    <ColorBGText text={Object.values(item)[eachRow-1]?.name} color={Object.values(item)[eachRow-1]?.color} />
                                                :
                                                    Object.values(item)[eachRow-1]
                                                }
                                            </th>
                                        </>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SimpleTable2;