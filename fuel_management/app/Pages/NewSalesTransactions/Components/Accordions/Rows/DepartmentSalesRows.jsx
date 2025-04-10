import { useEffect, useState } from "react"
import SimpleInput from "~/Components/SimpleInput"

export const DepartmentSalesRows = ({ departmentSalesData, departmentSales, setDepartmentSales }) => {
    const [transactionCount, setTransactionCount] = useState(null)
    const [sales, setSales] = useState(null)
    const [discount, setDiscount] = useState(null)

    useEffect(() => {
        const updateData = () => {
            setDepartmentSales(prev =>
                prev.map((data) => {
                    if (data.category == departmentSalesData.category) {
                        return {
                            ...data,
                            transactionCount: Number(transactionCount),
                            Sales: Number(sales),
                            Discount: Number(discount)
                        }
                    }
                    return data
                })
            )
        }
        updateData()
    }, [transactionCount, sales, discount])

    return (
        <>
            <td className="px-8 text-center">
                {departmentSalesData?.category}
            </td>
            <td className="px-8 items-center">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={transactionCount}
                    setInitialValue={setTransactionCount}
                />
            </td>
            <td className="px-8 items-center">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={sales}
                    setInitialValue={setSales}
                />
            </td>
            <td className="px-8 items-center">
                <SimpleInput
                    version={1}
                    label={''}
                    placeholder={"type here"}
                    icon={'₱'}
                    type={"number"}
                    textAlign={"center"}
                    initialValue={discount}
                    setInitialValue={setDiscount}
                />
            </td>
        </>
    )
}