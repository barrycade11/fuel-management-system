import SeparateBarChart from "~/Pages/Dashboard/Components/Charts/SeparateBarChart";
import SimpleTable from "~/Components/Tables/SimpleTable"
import { useState } from "react";
import { Fuels, Locations } from "~/Constants/Labels";

const FuelsDashboard = (props) => {
    const [fuelSales, setFuelSales] = useState({
        title: "",
        labels: Locations,
        datasets: [
            {
                label: Fuels[0].name,
                backgroundColor: Fuels[0].color,
                data: ["10000", "23000", "35000", "50000"],
            },
            {
                label: Fuels[1].name,
                backgroundColor: Fuels[1].color,
                data: ["39000", "22000", "15000", "50000"],
            },
            {
                label: Fuels[2].name,
                backgroundColor: Fuels[2].color,
                data: ["23463", "8673", "15000", "50000"],
            },
            {
                label: Fuels[3].name,
                backgroundColor: Fuels[3].color,
                data: ["34564", "67823", "123345", "50000"],
            },
            {
                label: Fuels[4].name,
                backgroundColor: Fuels[4].color,
                data: ["123134", "34531", "34563", "50000"],
            },
        ]
    })

    return (
        <>
            <SimpleTable mainHeader={"Fuels"} data={fuelSales}/>
            <div className='h-96 w-auto'>
                <SeparateBarChart data={fuelSales} />
            </div>
        </>
    );
};

export default FuelsDashboard;