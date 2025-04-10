import Table from "~/Components/Table"
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";

export const DailySalesTable = () => {
    const [dailySales, setDailySales] = useState([])

    const columns = [
        { key: "stationCode", label: "Station Code", hidden: false },
        { key: "shiftNo", label: "Shift No.", hidden: false },
        { key: "shiftManager", label: "Shift Manager", hidden: false }
    ]

    const handleAdd = () => {
        setDailySales(prev => prev.concat({
            stationCode: '3453f',
            shiftNo: 'sdfsdf',
            shiftManager: 'sftgwer'
        }))
    }

    const handleEdit = () => {
        
    }

    const customRender = {
        code: (value, row) => (
            <span className="px-3 py-1 text-white rounded-lg" style={{ backgroundColor: row.color }}>
                {value}
            </span>
        ),
        actions: (item) => (
            <Button
                onClick={() => handleEdit(item)}
                className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300"
            >
                View
            </Button>
        ),
    };

    let haha = [
        {
            stationCode: '3453f',
            shiftNo: 'sdfsdf',
            shiftManager: 'lester'
        },
        {
            stationCode: 'sdfsdf23',
            shiftNo: 'sdf',
            shiftManager: 'emil'
        }
    ]

    return (
        <Table
            title=""
            data={haha}
            columns={columns}
            onEdit={handleEdit}
            onAdd={handleAdd}
            customRender={customRender}
        />
    )
}