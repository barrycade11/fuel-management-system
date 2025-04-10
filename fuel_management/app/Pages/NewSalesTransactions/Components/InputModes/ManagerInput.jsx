
import RandomButtons from "../RandomButtons";
import { useState } from "react";
import FuelSalesInput from "../FuelSalesInput";
import TanksInput from "../TanksInput";
import TaxTotals from "../TaxTotals";
import ConfirmCrew from "../Modals/ConfirmCrew";
import Variance from "../Modals/Variance";

const ManagerInput = ({
    fuelData,
    setFuelData,
    openModeOfPayments,
    setOpenModeOfPayments,
    openDepSales,
    setOpenDepSales,
    openSupplements,
    setOpenSupplements,
    openCrew,
    setOpenCrew,
    openVariance,
    setOpenVariance,
    inputFilter
}) => {
    const [tankTotal, setTankTotal] = useState([
        {
            tank: 1,
            fuelName: "vpr",
            price: 0,
            dip: 0,
            volume: 0
        },
        {
            tank: 2,
            fuelName: "vpg",
            price: 0,
            dip: 0,
            volume: 0
        },
        {
            tank: 3,
            fuelName: "vpd",
            price: 0,
            dip: 0,
            volume: 0
        },
        {
            tank: 4,
            fuelName: "fsg",
            price: 0,
            dip: 0,
            volume: 0
        },
        {
            tank: 5,
            fuelName: "vpr",
            price: 0,
            dip: 0,
            volume: 0
        },
        {
            tank: 6,
            fuelName: "vpg",
            price: 0,
            dip: 0,
            volume: 0
        },
        {
            tank: 7,
            fuelName: "vpd",
            price: 0,
            dip: 0,
            volume: 0
        }
    ])
    const [departmentSales, setDepartmentSales] = useState({
        nonFuel: [
            {
                posNo: 1,
                quantity: 0
            },
            {
                posNo: 2,
                quantity: 0
            },
            {
                posNo: 3,
                quantity: 0
            },
        ],
        select: [
            {
                name: "Transaction Count",
                value: 0
            },
            {
                name: "Final Count (Less Lubes)",
                value: 0
            },
            {
                name: "Select Sales",
                value: 0
            },
            {
                name: "Final Sales (Less Lubes)",
                value: 0
            },
            {
                name: "Select Discount",
                value: 0
            },
            {
                name: "Sales Tax Exempt",
                value: 0
            }
        ],
        departmentSalesTotal: [
            {
                category: "FC Lubes",
                transactionCount: 0,
                Sales: 0,
                Discount: 0
            },
            {
                category: "NBS",
                transactionCount: 0,
                Sales: 0,
                Discount: 0
            },
            {
                category: "SHOC",
                transactionCount: 0,
                Sales: 0,
                Discount: 0
            },
            {
                category: "Recharge",
                transactionCount: 0,
                Sales: 0,
                Discount: 0
            },
        ]
    })
    // console.log(departmentSales.nonFuel)
    const [mode, setMode] = useState([
        {
            name: "BDO Debit Amount",
            quantity: 0,
            value: 0
        },
        {
            name: "Cash",
            quantity: 0,
            value: 0
        },
        {
            name: "Safedrops",
            quantity: 0,
            value: 0
        },
        {
            name: "Inhouse",
            quantity: 0,
            value: 0
        },
    ])

    return (
        <>
            <ConfirmCrew
                title={"Crew"}
                openModal={openCrew}
                setOpenModal={setOpenCrew}
            />
            <Variance
                title={"Variance Table"}
                openModal={openVariance}
                setOpenModal={setOpenVariance}
            />

            <div className="lg:col-span-3 grid gap-8">
                <FuelSalesInput
                    fuelSales={fuelData}
                    setFuelSales={setFuelData}
                />

                <TanksInput
                    tankTotal={tankTotal}
                    setTankTotal={setTankTotal}
                />
            </div>
        </>
    )
}

export default ManagerInput