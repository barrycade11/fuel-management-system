import { useState } from "react"
import ColoredCard2 from "../Components/ColoredCard2"
import LineChart from "~/Pages/Dashboard/Components/Charts/LineChart";

const PMTDRDashboard = () => {
    const [data, setData] = useState([
            {
                color: 'yellow',
                title: 'Total Fuel',
                total: 51316.95,
                percentage: 96,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'green',
                title: 'V-Power',
                total: 51316.95,
                percentage: 104,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'blue',
                title: 'EV Charging',
                total: 39,
                percentage: 186,
                target: 21,
                prior: 30
            },
            {
                color: 'green',
                title: 'NBS',
                total: 21,
                percentage: 100,
                target: 21,
                prior: 30
            },
            {
                color: 'blue',
                title: 'Shell Go+',
                total: 34,
                percentage: 139,
                target: 25,
                prior: 34
            },
            {
                color: 'green',
                title: 'Lubes',
                total: 145.8,
                percentage: 106,
                target: 138,
                prior: 120
            },
            {
                color: 'red',
                title: 'NFR Select',
                total: 334534.32,
                percentage: 86,
                target: 23755423,
                prior: 1230434
            },
            {
                color: 'red',
                title: 'Shell Go+',
                total: 34,
                percentage: 139,
                target: 25,
                prior: 34
            },
            {
                color: 'green',
                title: 'V-Power',
                total: 51316.95,
                percentage: 104,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'blue',
                title: 'EV Charging',
                total: 39,
                percentage: 186,
                target: 21,
                prior: 30
            },
            {
                color: 'red',
                title: 'NBS',
                total: 21,
                percentage: 100,
                target: 21,
                prior: 30
            },
    ])
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const chartData = {
        labels,
        datasets: [
            {
                label: 'This year',
                data: [
                    23,
                    45,
                    59,
                    100,
                    100,
                    87,
                    65
                ],
                borderColor: 'black',
                backgroundColor: 'black',
                tension: 0.4
            },
            {
                label: 'Last year',
                data: [
                    43,
                    67,
                    48,
                    78,
                    62,
                    34,
                    96
                ],
                borderColor: 'gray',
                backgroundColor: 'gray',
                borderDash: [10,5],
                tension: 0.4
            },
        ],
    };

    return (
        <div>
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

            <div className="grid grid-cols-9 gap-4 mt-10">
                <div className="col-span-6 bg-gray-100 rounded-2xl">
                    <LineChart chartData={chartData} label={"KPI"} />
                </div>
            </div>
        </div>
    )
}

export default PMTDRDashboard