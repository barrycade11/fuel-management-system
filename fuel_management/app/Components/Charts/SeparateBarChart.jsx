import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

function SeparateBarChart(chartData) {
    return <Bar data={chartData.data}
        options={{
            plugins: {
                title: {
                    display: true,
                    text: '',
                    font: {
                        size: 24
                    }
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    stacked: false,
                },
                y: {
                    stacked: false
                }
            }
        }} />
}

export default SeparateBarChart