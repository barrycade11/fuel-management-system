import CurrencyFormatter from "~/Components/Lib/CurrencyFormatter";
import { Button } from "@heroui/react";

export const CheckRows = ({ currentData, content, setContent, setPurpose, setOpenAdd, setEditData }) => {

    return (
        <>
            <td className="px-6 py-1">
                {currentData?.id + 1}
            </td>
            <td className="px-6 py-1">
                {currentData?.paymentForm}
            </td>
            <td className="px-6 py-1">
                {CurrencyFormatter(currentData?.amount)}
            </td>
            <td className="px-6 py-1">
                <Button
                    className="rounded-md font-semibold text-base"
                    color="primary"
                    variant="flat"
                    size="sm"
                    onPress={() => {
                        setEditData(currentData)
                        setPurpose('edit')
                        setOpenAdd(true)
                    }}
                >
                    Edit
                </Button>
            </td>
        </>
    )
}