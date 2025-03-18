import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

function StackedBarChart(chartData) {
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
            borderRadius: 10,
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: true,
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }} />
}

export default StackedBarChart