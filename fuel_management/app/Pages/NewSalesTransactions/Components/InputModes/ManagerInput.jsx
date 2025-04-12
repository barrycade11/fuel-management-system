
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
    tankTotal,
    setTankTotal
}) => {


    return (
        <>
            {/* <ConfirmCrew
                title={"Crew"}
                openModal={openCrew}
                setOpenModal={setOpenCrew}
            />
            <Variance
                title={"Variance Table"}
                openModal={openVariance}
                setOpenModal={setOpenVariance}
            /> */}

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