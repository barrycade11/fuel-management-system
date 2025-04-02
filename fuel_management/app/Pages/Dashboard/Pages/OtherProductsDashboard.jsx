import SimpleTable from "~/Components/Tables/SimpleTable"
import { useState, useEffect } from "react";
import { Products, Locations } from "~/Constants/Labels";
import StackedBarChart from "~/Pages/Dashboard/Components/Charts/StackedBarChart";
import useGetOtherProducts from "~/Hooks/Dashboard/useGetOtherProducts";

const OtherProductsDashboard = ({startDate, endDate}) => {  
    const [Productsales, setProductsales] = useState({
        title: "",
        labels: Locations,
        datasets: []
    })

    useEffect(()=> {
        const getData = async () => {
            setProductsales({...Productsales, 
                datasets: await useGetOtherProducts(startDate, endDate)
            })
        }
        getData()
    }, [startDate, endDate])

    return (
        <div className="px-5">
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