import SimpleInput from "~/Components/SimpleInput"

const TaxTotals = () => {
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
                        initialValue={1438749.31}
                    // setInitialValue={}
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
                        initialValue={423408.99}
                    // setInitialValue={}
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
                        initialValue={12390.00}
                    // setInitialValue={}
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
                        initialValue={82346.00}
                    // setInitialValue={}
                    />
                </div>
                <div className="grid gap-1">
                    <SimpleInput
                        version={3}
                        label={"Total"}
                        placeholder={""}
                        icon={''}
                        type={"number"}
                        textAlign={"right"}
                        initialValue={3938748.92}
                    // setInitialValue={}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaxTotals