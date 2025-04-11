import ColorBGText from "../ColoredBGText";
import { Locations } from "~/Constants/Labels";

const SimpleTable = ( props ) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-min text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-1">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr className="border-b-1">
                        <th scope="col" className="px-6 py-3">
                            {props.mainHeader}
                        </th>
                        {props.fuelSales?.labels.map((location, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {location}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props?.data?.datasets.map((item, index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800 border-b-1">
                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <ColorBGText text={item.label} color={item.backgroundColor} />
                            </th>
                            {item.data.map((data, index) => (
                                <td key={index} className="px-6 py-2">
                                    {data}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {props?.mainHeader=="Fuels" && (
                        <tr>
                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Total
                            </th>
                            <td className="px-6 py-2">
                                98234.12
                            </td>
                            <td className="px-6 py-2">
                                5672
                            </td>
                            <td className="px-6 py-2">
                                35675
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SimpleTable;