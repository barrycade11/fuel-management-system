import { Accordion, AccordionItem } from "@heroui/react";
import { Locations } from "~/Constants/Labels";

const DropdownTable = (props) => {
    const allTanks = ["Capacity", "Dip", "Sales", "Delivery"]

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-1">
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
                                <td colSpan={5} className="w-auto">
                                    <Accordion
                                        isCompact
                                        variant="splitted"
                                        motionProps={{
                                            variants: {
                                                enter: {
                                                    y: 0,
                                                    opacity: 1,
                                                    height: "auto",
                                                    overflowY: "unset",
                                                    transition: {
                                                        height: {
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 70,
                                                            duration: 1,
                                                        },
                                                        opacity: {
                                                            easings: "ease",
                                                            duration: 2,
                                                        },
                                                    },
                                                },
                                                exit: {
                                                    y: -10,
                                                    opacity: 0,
                                                    height: 0,
                                                    overflowY: "hidden",
                                                    transition: {
                                                        height: {
                                                            easings: "ease",
                                                            duration: 0.25,
                                                        },
                                                        opacity: {
                                                            easings: "ease",
                                                            duration: 0.3,
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                        itemClasses={{
                                            title: "text-gray-500 font-semibold"
                                        }}
                                    >
                                        <AccordionItem
                                            className="w-full bg-gray-100 shadow-none overflow-hidden  px-0" 
                                            key={eachTank} 
                                            aria-label={eachTank} 
                                            title={""}
                                        >
                                            <div className="grid grid-cols-5 gap-4">
                                                <div className="col-span-1 text-center px-4">{eachTank}</div>
                                                {props.tankData2[index1]?.tanks.map((tank, index) => {
                                                    return (
                                                        <div key={index} className="col-span-1 text-center px-4">{tank.capacity}</div>
                                                    )
                                                })}
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DropdownTable;