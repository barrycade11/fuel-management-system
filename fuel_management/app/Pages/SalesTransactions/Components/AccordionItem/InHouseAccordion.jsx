import { PlusIcon } from 'lucide-react'
import { useState } from "react"
import { Button } from "@heroui/react";
import { InHouseRows } from '../Rows/InHouseRows';

export const InHouseAccordion = () => {
    const [inHouse, setInhouse] = useState({
        title: "P.O. Inhouse Account",
        tableHeaders: [
            "Invoice No.",
            "Account Name",
            "Product",
            "Quantity",
            "PO Amount",
        ]
    })
    const [content, setContent] = useState([])

    return (
        <div className="bg-white rounded-lg p-4">
            <div className="w-full flex justify-end py-4">
                <Button
                    onPress={() => {
                        setContent(prev => prev.concat({
                            Id: content.length,
                            invoiceNo: '',
                            accountName: '',
                            product: '',
                            quantity: 0,
                            poAmount: 0
                        })
                        )
                    }}
                    startContent={
                        <div className="h-6 w-6 flex items-center">
                            <PlusIcon />
                        </div>
                    }
                    color="primary"
                    className="font-semibold rounded-md px-6"
                >
                    Add New
                </Button>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-1">
                    <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                        <tr className="border-b-1">
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            {inHouse.tableHeaders.map((item, index) => (
                                <th key={item} scope="col" className="px-6 py-3">
                                    {item}
                                </th>
                            ))}
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {content?.map((item, index) => {
                            return (
                                <tr key={index} className="border-b-1">
                                    <InHouseRows
                                        index={index}
                                        content={content}
                                        setContent={setContent}
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