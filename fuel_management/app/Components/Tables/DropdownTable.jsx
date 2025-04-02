import { Locations } from "~/Constants/Labels";

const DropdownTable = (props) => {
    const allTanks = ["Capacity", "Dip", "Sales", "Delivery"]

    return (
        <div className="relative overflow-x-auto">
            <table className="w-min text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-1">
                <thead className="text-xs text-gray-900 dark:text-gray-400">
                    <tr className="border-b-1">
                        <th scope="col" className="px-6 py-3">
                            {props.mainHeader}
                        </th>
                        {Locations.map((location, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {location}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {allTanks?.map((eachTank, index1) => {
                        return (
                            <tr key={index1} className="bg-white dark:bg-gray-800 border-b-1">
                                <td className="px-6 py-2">{eachTank}</td>
                                {props.tankData2[index1]?.tanks.map((tank, index) => {
                                    return (
                                        <td key={index} className="px-6 py-2">{tank.capacity}</td>
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

export default DropdownTable;