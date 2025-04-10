import FuelSalesInput from '../../FuelSalesInput';

export const FuelSalesAccordion = ({
    fuelData,
    setFuelData
}) => {
    return (
        <div className="bg-white rounded-lg p-4">
            <FuelSalesInput 
                fuelSales={fuelData}
                setFuelSales={setFuelData}
            />
        </div>
    )
}