import { Button } from "@heroui/react"
import { useState } from "react"
import SimpleInput from "~/Components/SimpleInput"

const SupplementTable = ({ tableHeaders, tableRows }) => {
    const [rows, setRows] = useState([1,2,3,4,5])
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-1">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr className="border-b-1">
                        <th scope="col" className="px-6 py-3">
                            No.
                        </th>
                        {tableHeaders.map((item, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {item}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3">
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index)=> {
                        return (
                            <tr key={index} className="border-b-1">
                                <td className="px-6 py-1">
                                    {index+1}
                                </td>
                                {tableHeaders.map((itemA, index)=> {
                                    return (
                                        <td key={index} className="px-6 py-1">
                                            <SimpleInput 
                                                version={1}
                                                label={''}
                                                placeholder={"type here"}
                                                icon={'₱'}
                                                type={"text"}
                                                textAlign={"center"}
                                                // initialValue={}
                                                // setInitialValue={}
                                            />
                                        </td>
                                    )
                                })}
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SupplementTable