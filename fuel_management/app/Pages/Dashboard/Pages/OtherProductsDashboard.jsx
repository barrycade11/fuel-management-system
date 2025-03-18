import SimpleTable from "~/Components/Tables/SimpleTable"
import { useState } from "react";
import { Products, Locations } from "~/Constants/Labels";
import StackedBarChart from "~/Components/Charts/StackedBarChart";

const OtherProductsDashboard = (props) => {  
    const [Productsales, setProductsales] = useState({
        title: "",
        labels: Locations,
        datasets: [
            {
                label: Products[0].name,
                backgroundColor: Products[0].color,
                data: ["10000", "23000", "35000", "11000"],
            },
            {
                label: Products[1].name,
                backgroundColor: Products[1].color,
                data: ["39000", "22000", "15000", "50000"],
            },
            {
                label: Products[2].name,
                backgroundColor: Products[2].color,
                data: ["23463", "8673", "15000", "50000"],
            },
            {
                label: Products[3].name,
                backgroundColor: Products[3].color,
                data: ["34564", "67823", "123345", "50000"],
            }
        ]
    })

    return (
        <div>
            <label className="text-2xl font-bold">Product Sales</label>
            <div className="my-6">
                <SimpleTable mainHeader={"Product Category"} data={Productsales}/>
            </div>

            <div className='h-96 w-auto'>
                <StackedBarChart data={Productsales} />
            </div>
        </div>
    );
};

export default OtherProductsDashboard;