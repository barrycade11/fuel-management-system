import { useState } from "react"
import { TankInputRows } from "./Accordions/Rows/TankInputRows"

const TanksInput = ({tankTotal, setTankTotal}) => {
    const tableHeader = ["Tank Name", "Fuel", "Dip 6am", "Sales Volume (in liters)"]

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
                        {tankTotal.map((item, index)=> {
                            return (
                                <tr key={index} className="h-full w-full border-[1px]">
                                    <TankInputRows
                                        tankData={item}
                                        tankTotal={tankTotal}
                                        setTankTotal={setTankTotal}
                                    />
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