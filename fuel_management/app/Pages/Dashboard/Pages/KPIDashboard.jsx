import { useState } from "react"
import LineChart from "~/Pages/Dashboard/Components/Charts/LineChart";
import ColoredCard from "~/Pages/Dashboard/Components/ColoredCard"

const KPIDashboard = ({ startDate, endDate }) => {
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
            <label className="text-2xl font-semibold">KPI: {startDate} - {endDate}</label>

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

            <div className="grid grid-cols-9 gap-4 mt-10">
                <div className="col-span-6 bg-gray-100 rounded-2xl">
                    <LineChart chartData={chartData} label={"KPI"}/>
                </div>
                <div className="col-span-3 flex justify-end">
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