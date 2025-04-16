import DepartmentSales from "../Accordions/DepartmentSales"
import SalesAccordion from "../Accordions/SalesAccordion"

const CashierInput = ({
    selectedMode,
    employee,
    cashData,
    setCashData,
    poData,
    setPoData,
    redemptionData,
    setRedemptionData,
    cardData,
    setCardData,
    lubricantSalesData,
    setLubricantSalesData,
    fuelData,
    setFuelData,
    discountData,
    setDiscountData,
    recievableData,
    setRecievableData,
    checkData,
    setCheckData,
    inventoryData,
    setInventoryData
}) => {
    return (
        <>
            <div>
                <label className="font-semibold px-2">Sales</label>
                <SalesAccordion 
                    selectedMode={selectedMode}
                    employee={employee}
                    cashData={cashData}
                    setCashData={setCashData}
                    poData={poData}
                    setPoData={setPoData}
                    redemptionData={redemptionData}
                    setRedemptionData={setRedemptionData}
                    cardData={cardData}
                    setCardData={setCardData}
                />
            </div>
            <div>
                <label className="font-semibold px-2">Net Department Sales</label>
                <DepartmentSales 
                    selectedMode={selectedMode}
                    lubricantSalesData={lubricantSalesData}
                    setLubricantSalesData={setLubricantSalesData}
                    fuelData={fuelData}
                    setFuelData={setFuelData}
                    discountData={discountData}
                    setDiscountData={setDiscountData}
                    recievableData={recievableData}
                    setRecievableData={setRecievableData}
                    checkData={checkData}
                    setCheckData={setCheckData}
                    inventoryData={inventoryData}
                    setInventoryData={setInventoryData}
                    employee={employee}
                />
            </div>
        </>
    )
}

export default CashierInput