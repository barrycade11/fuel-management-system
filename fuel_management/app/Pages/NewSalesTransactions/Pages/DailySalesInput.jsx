import { useState, useEffect } from "react"
import ActionButtons from "../Components/ActionButtons"
import AdditionalComments from "../Components/AdditionalComments"
import CashierInput from "../Components/InputModes/CashierInput"
import ManagerInput from "../Components/InputModes/ManagerInput"
import TaxTotals from "../Components/TaxTotals"
import VarianceCheck from "../Components/VarianceCheck"
import { useUploadDailySalesInputForecourt } from "~/Hooks/Sales/useUploadDailySalesForecourt"
import { useUploadDailySalesInputSelect } from "~/Hooks/Sales/useUploadDailySalesSelect"

const DailySalesInput = ({ 
    selectedMode,
    effectivityDate,
    selectedStation,
    selectedShiftManager,
    selectedShift
}) => {
    const [cashData, setCashData] = useState({
        content: [],
        lastCash: 0,
        float: 0,
        total: 0
    })
    const [poData, setPoData] = useState({
        content: [],
        total: 0
    })
    const [redemptionData, setRedemptionData] = useState({
        content: [],
        total: 0
    })
    const [cardData, setCardData] = useState({
        content: [],
        total: 0
    })
    const [lubricantSalesData, setLubricantSalesData] = useState({
        content: [],
        total: 0
    })
    const [fuelData, setFuelData] = useState({
        content: [
            {
                fuelId: 1,
                fuelName: "vpr",
                transCt: 0,
                volume: 0,
                amount: 0
            },
            {
                fuelId: 2,
                fuelName: "vpg",
                transCt: 0,
                volume: 0,
                amount: 0
            },
            {
                fuelId: 3,
                fuelName: "vpd",
                transCt: 0,
                volume: 0,
                amount: 0
            },
            {
                fuelId: 21,
                fuelName: "fsg",
                transCt: 0,
                volume: 0,
                amount: 0
            },
            {
                fuelId: 1,
                fuelName: "fsd",
                transCt: 0,
                volume: 0,
                amount: 0
            }
        ],
        discount: 0,
        taxExemption: 0,
        total: 0
    })
    const [discountData, setDiscountData] = useState({
        content: [],
        total: 0
    })
    const [recievableData, setRecievableData] = useState({
        content: [],
        total: 0
    })
    const [checkData, setCheckData] = useState({
        content: [],
        total: 0
    })
    const [inventoryData, setInventoryData] = useState({
        content: [],
        total: 0
    })

    const [salesGrandTotal, setSalesGrandTotal] = useState(0)
    const [netDepartmentTotal, setNetDepartmentTotal] = useState(0)
    const [variance, setVariance] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {
        const compute = () => {
            let sum = cashData?.content?.reduce((total, data) => {
                return total = total + data.total
            }, 0)
            let finalAmount = sum + cashData?.lastCash - cashData?.float
            setCashData({ ...cashData, total: finalAmount })
        }
        compute()
    }, [cashData?.content, cashData?.float, cashData?.lastCash])

    useEffect(() => {
        const compute = () => {
            let sum = poData?.content?.reduce((total, data) => {
                let result = data?.quantity * data?.poAmount
                return total = total + result
            }, 0)
            setPoData({ ...poData, total: sum })
        }
        compute()
    }, [poData?.content])

    useEffect(() => {
        const compute = () => {
            let sum = redemptionData?.content?.reduce((total, data) => {
                let result = data?.quantity * data?.amount
                return total = total + result
            }, 0)
            setRedemptionData({ ...redemptionData, total: sum })
        }
        compute()
    }, [redemptionData?.content])

    useEffect(() => {
        const compute = () => {
            let sum = cardData?.content?.reduce((total, data) => {
                return total = total + data?.amount
            }, 0)
            setCardData({ ...cardData, total: sum })
        }
        compute()
    }, [cardData?.content])

    useEffect(() => {
        const compute = () => {
            let sum = inventoryData?.content?.reduce((total, data) => {
                let result = data?.quantity * data?.amount
                return total = total + result
            }, 0)
            setInventoryData({ ...inventoryData, total: sum })
        }
        compute()
    }, [inventoryData?.content])

    useEffect(() => {
        const compute = () => {
            let sum = lubricantSalesData?.content?.reduce((total, data) => {
                let result = data?.quantity * data?.amount
                return total = total + result
            }, 0)
            setLubricantSalesData({ ...lubricantSalesData, total: sum })
        }
        compute()
    }, [lubricantSalesData?.content])

    useEffect(() => {
        const compute = () => {
            let sum = fuelData?.content?.reduce((total, data) => {
                return total = total + data?.amount
            }, 0)
            setFuelData({ ...fuelData, total: sum })
        }
        compute()
    }, [fuelData?.content])

    useEffect(() => {
        const compute = () => {
            let sum = discountData?.content?.reduce((total, data) => {
                let result = data?.quantity * data?.amount
                return total = total + result
            }, 0)
            setDiscountData({ ...discountData, total: sum })
        }
        compute()
    }, [discountData?.content])

    useEffect(() => {
        const compute = () => {
            let sum = recievableData?.content?.reduce((total, data) => {
                return total = total + data?.amount
            }, 0)
            setRecievableData({ ...recievableData, total: sum })
        }
        compute()
    }, [recievableData?.content])

    useEffect(() => {
        const compute = () => {
            let sum = checkData?.content?.reduce((total, data) => {
                return total = total + data?.amount
            }, 0)
            setCheckData({ ...checkData, total: sum })
        }
        compute()
    }, [checkData?.content])

    //sales grand total computation
    useEffect(() => {
        const compute = () => {
            let sum = cashData?.total + poData?.total + redemptionData?.total + cardData?.total
            setSalesGrandTotal(sum)
        }
        compute()
    }, [cashData?.total, poData?.total, redemptionData?.total, cardData?.total])

    //net department sales total computation
    useEffect(() => {
        const compute = () => {
            let sum = lubricantSalesData?.total + fuelData?.total + inventoryData?.total
            setNetDepartmentTotal(sum)
        }
        compute()
    }, [lubricantSalesData?.total, fuelData?.total, inventoryData?.total])

    //variance computation
    useEffect(() => {
        const compute = () => {
            let diff = salesGrandTotal - netDepartmentTotal
            setVariance(diff)
        }
        compute()
    }, [salesGrandTotal, netDepartmentTotal])

    const submitHandler = async () => {
        try {
            const data = new FormData()
            data.append("cashData", JSON.stringify(cashData))
            selectedMode==1 && data.append("poData", JSON.stringify(poData))
            data.append("redemptionData", JSON.stringify(redemptionData))
            data.append("cardData", JSON.stringify(cardData))

            selectedMode==1 && data.append("lubricantSalesData", JSON.stringify(lubricantSalesData))
            selectedMode==1 && data.append("fuelData", JSON.stringify(fuelData))
            data.append("discountData", JSON.stringify(discountData))
            selectedMode==1 && data.append("recievableData", JSON.stringify(recievableData))
            selectedMode==1 && data.append("checkData", JSON.stringify(checkData))
            selectedMode==2 && data.append("inventoryData", JSON.stringify(inventoryData))

            data.append("salesGrandTotal", salesGrandTotal)
            data.append("netDepartmentTotal", netDepartmentTotal)
            data.append("variance", variance)
            data.append("comment", comment)
            const filterData = {
                selectedMode,
                effectivityDate,
                selectedStation,
                selectedShiftManager,
                selectedShift
            }
            data.append("filterData", JSON.stringify(filterData))
            
            if (selectedMode==1) {
                const res = await useUploadDailySalesInputForecourt(data)
                console.log(res.data)
            } else if (selectedMode==2) {
                const res = await useUploadDailySalesInputSelect(data)
                console.log(res.data)
            }
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    return (
        <div className="grid lg:grid-cols-9 gap-8">
            <div className="lg:col-span-6 grid gap-10">
                {selectedMode != 3 ?
                    <CashierInput
                        selectedMode={selectedMode}
                        cashData={cashData}
                        setCashData={setCashData}
                        poData={poData}
                        setPoData={setPoData}
                        redemptionData={redemptionData}
                        setRedemptionData={setRedemptionData}
                        cardData={cardData}
                        setCardData={setCardData}

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
                    />
                    :
                    <ManagerInput
                        fuelData={fuelData}
                        setFuelData={setFuelData}
                    />
                }
            </div>
            <div className={`lg:col-span-3 flex lg:flex-col gap-4 ${selectedMode != 3 ? 'lg:mt-6' : ''}`}>
                {selectedMode != 3 ?
                    <VarianceCheck
                        salesGrandTotal={salesGrandTotal}
                        netDepartmentTotal={netDepartmentTotal}
                        variance={variance}
                    />
                    :
                    <TaxTotals />
                }
                <div className="flex flex-col justify-between">
                    <AdditionalComments
                        comment={comment}
                        setComment={setComment}
                    />
                    <ActionButtons
                        selectedMode={selectedMode}
                        submitHandler={submitHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default DailySalesInput