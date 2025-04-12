import CurrencyFormatter from "~/Components/Lib/CurrencyFormatter"
import SimpleInput from "~/Components/SimpleInput"

const TaxTotals = ({
    vatableSales,
    vatAmount,
    vatExemptSales,
    vatZeroRatedSales,
    managerTotal,
    setVatableSales,
    setVatAmount,
    setVatExemptSales,
    setVatZeroRatedSales
}) => {
    return (
        <div className="h-min w-full border-[1px] rounded-sm">
            <div className="bg-blue-100 p-3 text-gray-500 font-semibold rounded-sm">
                Tax Totals
            </div>

            <div className="grid gap-1 lg:px-20 px-8 py-6">
                <div className="grid gap-1 w-full">
                    <SimpleInput
                        version={3}
                        label={"Vatable Sales"}
                        placeholder={""}
                        icon={''}
                        type={"number"}
                        textAlign={"right"}
                        initialValue={vatableSales}
                        setInitialValue={setVatableSales}
                    />
                </div>
                <div className="grid gap-1 w-full">
                    <SimpleInput
                        version={3}
                        label={"VAT Amount"}
                        placeholder={""}
                        icon={''}
                        type={"number"}
                        textAlign={"right"}
                        initialValue={vatAmount}
                        setInitialValue={setVatAmount}
                    />
                </div>
                <div className="grid gap-1 w-full">
                    <SimpleInput
                        version={3}
                        label={"VAT Exempt Sales"}
                        placeholder={""}
                        icon={''}
                        type={"number"}
                        textAlign={"right"}
                        initialValue={vatExemptSales}
                        setInitialValue={setVatExemptSales}
                    />
                </div>
                <div className="grid gap-1 w-full">
                    <SimpleInput
                        version={3}
                        label={"VAT Zero Rated Sales"}
                        placeholder={""}
                        icon={''}
                        type={"number"}
                        textAlign={"right"}
                        initialValue={vatZeroRatedSales}
                        setInitialValue={setVatZeroRatedSales}
                    />
                </div>
                <div className="grid gap-1">
                    <div className='grid'>
                        <label className="font-semibold text-gray-500">Total</label>
                        <label className='bg-gray-100 rounded-md mt-1 font-semibold text-right p-2'>
                            {CurrencyFormatter(managerTotal)}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaxTotals