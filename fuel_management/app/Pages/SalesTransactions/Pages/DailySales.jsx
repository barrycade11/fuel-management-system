import FuelSalesInput from "../Components/FuelSalesInput";
import TaxTotals from "../Components/TaxTotals";
import TanksInput from "../Components/TanksInput";
import RandomButtons from "../Components/RandomButtons";
import { useState } from "react";
import ModeOfPayments from "../Components/Modals/ModeOfPayments";
import DepartmentSales from "../Components/Modals/DepartmentSales";
import Supplements from "../Components/Modals/Supplements";
import ConfirmCrew from "../Components/Modals/ConfirmCrew";
import Variance from "../Components/Modals/Variance";

const DailySales = ({
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
    const [fuelSales, setFuelSales] = useState([
        {
            fuelName: "vpr",
            tansCt: 0,
            volume: 0,
            amount: 0
        },
        {
            fuelName: "vpg",
            tansCt: 0,
            volume: 0,
            amount: 0
        },
        {
            fuelName: "vpd",
            tansCt: 0,
            volume: 0,
            amount: 0
        },
        {
            fuelName: "fsg",
            tansCt: 0,
            volume: 0,
            amount: 0
        },
        {
            fuelName: "fsd",
            tansCt: 0,
            volume: 0,
            amount: 0
        }
    ])
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
            <DepartmentSales
                title={"Department Sales"}
                openModal={openDepSales}
                setOpenModal={setOpenDepSales}
                departmentSales={departmentSales}
                setDepartmentSales={setDepartmentSales}
            />
            <ModeOfPayments
                title={"Finalization Totals"}
                openModal={openModeOfPayments}
                setOpenModal={setOpenModeOfPayments}
            />
            <Supplements
                title={""}
                openModal={openSupplements}
                setOpenModal={setOpenSupplements}
            />
            <Variance
                title={"Variance Table"}
                openModal={openVariance}
                setOpenModal={setOpenVariance}
            />

            <div className="grid lg:grid-cols-5 gap-14">
                <div className="lg:col-span-3 grid gap-8">
                    <FuelSalesInput
                        fuelSales={fuelSales}
                        setFuelSales={setFuelSales}
                    />

                    <TanksInput
                        tankTotal={tankTotal}
                        setTankTotal={setTankTotal}
                    />
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-8">
                    <div className="col-span-1">
                        <TaxTotals />
                    </div>
                    <div className="col-span-1">
                        <RandomButtons
                            fuelSales={fuelSales}
                            tankTotal={tankTotal}
                            departmentSales={departmentSales}
                            openModeOfPayments={openModeOfPayments}
                            setOpenModeOfPayments={setOpenModeOfPayments}
                            openDepSales={openDepSales}
                            setOpenDepSales={setOpenDepSales}
                            openSupplements={openSupplements}
                            setOpenSupplements={setOpenSupplements}
                            openCrew={openCrew}
                            setOpenCrew={setOpenCrew}
                            openVariance={openVariance}
                            setOpenVariance={setOpenVariance}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DailySales