
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import useGetDailySalesInput from "~/Hooks/Sales/useGetDailySalesInput";
import CustomTable from "../Components/CustomTable";
import { InputMode, Locations, SampleEmployeeName, Shifts } from "~/Constants/Labels";

export const DailySalesTable = ({
    openAdd,
    setOpenAdd,
    effectivityDate,
    selectedMode,
    selectedStation,
    selectedShiftManager,
    selectedShift,
    setEditId
}) => {
    const [dailySales, setDailySales] = useState([])
    const columns = [
        { key: "input_mode", label: "Input Mode", hidden: false },
        { key: "station_id", label: "Station Code", hidden: false },
        { key: "shift_id", label: "Shift No.", hidden: false },
        { key: "employee_id", label: "Created By", hidden: false }
    ]

    useEffect(() => {
        const getData = async () => {
            const res = await useGetDailySalesInput(effectivityDate, selectedStation)
            if (res?.success === true) {
                const cleanData = res.message.map((item)=> {
                    return item = {
                        ID: item.ID,
                        input_mode: InputMode.filter((mode)=> mode.id===item.input_mode)[0]?.description,
                        shift_id: Shifts.filter((shift)=> shift.id===item.shift_id)[0]?.description,
                        employee_id: SampleEmployeeName.filter((emp)=> emp.id===item.employee_id)[0]?.description,
                        station_id: Locations.filter((loc)=> loc.id===item.station_id)[0]?.description
                    }
                })
                setDailySales(cleanData)
            }
        }
        getData()
    }, [effectivityDate, selectedStation])

    const handleAdd = () => {
        setOpenAdd(true)
    }

    const handleEdit = (id) => {
        // setEditId(id)
        // setOpenAdd(true)
    }

    const customRender = {
        code: (value, row) => (
            <span className="px-3 py-1 text-white rounded-lg" style={{ backgroundColor: row.color }}>
                {value}
            </span>
        ),
        actions: (item) => (
            <Button
                onClick={() => handleEdit(item.ID)}
                className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300"
            >
                View
            </Button>
        ),
    };

    return (
        <CustomTable
            title=""
            data={dailySales}
            columns={columns}
            onEdit={handleEdit}
            onAdd={handleAdd}
            customRender={customRender}
        />
    )
}