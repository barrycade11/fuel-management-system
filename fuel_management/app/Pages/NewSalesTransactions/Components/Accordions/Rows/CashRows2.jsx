import { Button } from "@heroui/react";
import CurrencyFormatter from "~/Components/Lib/CurrencyFormatter";
import moment from "moment";
import { SampleEmployeeName } from "~/Constants/Labels";

export const CashRows2 = ({ currentData, content, setContent, setPurpose, setOpenAdd, setEditData }) => {
    return (
        <>
            <td className="px-6 py-1">
                {currentData?.id + 1}
            </td>
            <td className="px-6 py-1">
                {CurrencyFormatter(currentData?.total)}
            </td>
            <td className="px-6 py-1">
                {moment(currentData?.time).format('h:mm A')}
            </td>
            <td className="px-6 py-1">
                {SampleEmployeeName.filter((item)=>item.id==currentData?.recievedBy)[0]?.description}
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