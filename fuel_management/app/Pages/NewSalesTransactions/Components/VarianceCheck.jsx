import SimpleInput from "~/Components/SimpleInput"
import CurrencyFormatter from '~/Components/Lib/CurrencyFormatter';

const VarianceCheck = ({
    salesGrandTotal,
    netDepartmentTotal,
    variance
}) => {
    return (
        <div className="h-min w-full border-[1px] rounded-sm">
            <div className="bg-blue-100 p-3 text-gray-500 font-semibold rounded-sm">
                Variance Check
            </div>

            <div className="grid gap-1 lg:px-20 px-8 py-6">
                <div className="grid gap-1 w-full">
                    <label className="font-semibold text-gray-500">Sales Grand Total</label>
                    <label className='bg-gray-100 rounded-md mt-1 font-semibold text-right p-2'>
                        {CurrencyFormatter(salesGrandTotal)}
                    </label>
                </div>
                <div className="grid gap-1 w-full">
                    <label className="font-semibold text-gray-500">Net Department Sales</label>
                    <label className='bg-gray-100 rounded-md mt-1 font-semibold text-right p-2'>
                        {CurrencyFormatter(netDepartmentTotal)}
                    </label>
                </div>
                <div className=" gap-1 w-full hidden">
                    <label className="font-semibold text-gray-500">Variance</label>
                    <label className='bg-gray-100 rounded-md mt-1 font-semibold text-right p-2'>
                        {CurrencyFormatter(variance)}
                    </label>
                </div>
            </div>
        </div>
    )
}


export default VarianceCheck