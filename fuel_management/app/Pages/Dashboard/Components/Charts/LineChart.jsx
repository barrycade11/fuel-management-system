import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

const LineChart = ({ chartData, label }) => {
    return <Line data={chartData}
        options={{
            plugins: {
                title: {
                    display: true,
                    text: label,
                    font: {
                        size: 20
                    }
                },
            },
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }} />
}

export default LineChart