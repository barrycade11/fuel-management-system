import { useState, useEffect } from "react"
import ColoredCard2 from "../Components/ColoredCard2"
import LineChart from "~/Pages/Dashboard/Components/Charts/LineChart";
import useGetPMTDR from "~/Hooks/Dashboard/useGetPMTDR";

const PMTDRDashboard = ({ startDate, endDate }) => {
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
        borderDash: [10, 5],
        tension: 0.4
    })

    useEffect(() => {
        const getData = async () => {
            let apiData = await useGetPMTDR(startDate, endDate)

            setData(apiData?.pmtdr)
            setThisYear({
                ...thisYEar,
                data: apiData?.thisYear
            })
            setLastYear({
                ...lastYear,
                data: apiData?.lastYear
            })
        }
        getData()
    }, [startDate, endDate])

    return (
        <div className="px-5">
            <label className="text-2xl font-semibold">PMTDR</label>

            <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4 mt-8">
                {data.map((item, index) => {
                    return (
                        <div key={index}>
                            <ColoredCard2
                                color={item.color}
                                title={item.title}
                                percentage={item.percentage}
                                target={item.target}
                                prior={item.prior}
                            />
                        </div>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-9 gap-4 mt-10">
                <div className="lg:col-span-6 bg-gray-100 rounded-2xl min-h-[45vh]">
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
            </div>
        </div>
    )
}

export default PMTDRDashboard