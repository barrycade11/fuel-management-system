import { useState, useEffect } from "react"
import LineChart from "~/Pages/Dashboard/Components/Charts/LineChart";
import ColoredCard from "~/Pages/Dashboard/Components/ColoredCard"
import moment from "moment";
import useGetKPI from "~/Hooks/Dashboard/useGetKPI";

const KPIDashboard = ({ startDate, endDate }) => {
    const [data, setData] = useState([])
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [thisYEar, setThisYear] = useState({
        label: 'This year',
        data: [],
        borderColor: 'black',
        backgroundColor: 'black',
        tension: 0.4
    })
    const [lastYear, setLastYear] = useState({
        label: 'Last year',
        data: [],
        borderColor: 'gray',
        backgroundColor: 'gray',
        borderDash: [10,5],
        tension: 0.4
    })

    useEffect(()=> {
        const getData = async () => {
            let apiData = await useGetKPI(startDate, endDate)

            setData(apiData?.kpi)
            setThisYear({...thisYEar,
                data: apiData?.thisYear
            })
            setLastYear({...lastYear,
                data: apiData?.lastYear
            })
        }
        getData()
    }, [startDate, endDate])

    return (
        <div className="px-5">
            <label className="text-2xl font-semibold">KPI: {moment(startDate).format('MMMM DD, YYYY')} - {moment(endDate).format('MMMM DD, YYYY')}</label>

            <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4 mt-8">
                {data.map((item, index) => {
                    return (
                        <div key={index}>
                            <ColoredCard
                                color={item.color}
                                title={item.title}
                                total={item.total}
                                percentage={item.percentage}
                                target={item.target}
                                prior={item.prior}
                            />
                        </div>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-9 gap-4 mt-10">
                <div className="lg:col-span-6 bg-gray-100 rounded-2xl w-full">
                    <LineChart 
                        chartData={{
                            labels,
                            datasets: [
                                thisYEar,
                                lastYear
                            ],
                        }} 
                        label={"KPI"}
                    />
                </div>
                <div className="lg:col-span-3 flex justify-end">
                    <div className="bg-gray-100 rounded-2xl p-6 w-72">
                        <label className="font-bold">Banding</label>
                        <div className="grid gap-2 px-4 my-4">
                            <div className="bg-blue-500 text-white rounded-md py-2 grid justify-center">
                                <label className="uppercase underline text-base font-semibold text-center">Over Achieved</label>
                                <label className="uppercase text-xs text-center">Above 110% vs TNR</label>
                            </div>
                            <div className="bg-teal-600 text-white rounded-md py-2 grid justify-center">
                                <label className="uppercase underline text-base font-semibold text-center">On target</label>
                                <label className="uppercase text-xs text-center">100% - 110% over vs TNR</label>
                            </div>
                            <div className="bg-yellow-500 text-white rounded-md py-2 grid justify-center">
                                <label className="uppercase underline text-base font-semibold text-center">Slightly Below target</label>
                                <label className="uppercase text-xs text-center">Above 110% vs TNR</label>
                            </div>
                            <div className="bg-red-500 text-white rounded-md py-2 grid justify-center">
                                <label className="uppercase underline text-base font-semibold text-center">Below Target</label>
                                <label className="uppercase text-xs text-center">Above 110% vs TNR</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KPIDashboard