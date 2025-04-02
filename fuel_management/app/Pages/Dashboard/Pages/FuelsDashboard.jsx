import SeparateBarChart from "~/Pages/Dashboard/Components/Charts/SeparateBarChart";
import SimpleTable from "~/Components/Tables/SimpleTable"
import { useState, useEffect } from "react";
import { Fuels, Locations } from "~/Constants/Labels";
import useGetFuels from "~/Hooks/Dashboard/useGetFuels";

const FuelsDashboard = ({startDate, endDate}) => {
    // const [isLoading, setIsLoading] = useState(false)
    const [fuelSales, setFuelSales] = useState({
        title: "",
        labels: Locations,
        datasets: []
    })
    
    useEffect(()=> {
        const getData = async () => {
            setFuelSales({...fuelSales, 
                datasets: await useGetFuels(startDate, endDate)
            })
        }
        getData()
    }, [startDate, endDate])

    return (
        <div className="px-5">
            <SimpleTable mainHeader={"Fuels"} data={fuelSales}/>
            <div className='h-96 w-auto'>
                <SeparateBarChart data={fuelSales} />
            </div>
        </div>
    );
};

export default FuelsDashboard;