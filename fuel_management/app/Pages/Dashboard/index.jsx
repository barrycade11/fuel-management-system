import { useState } from "react";
import Navbar from "~/Components/Navbar"
import Tabs from "./Components/Tabs"
import DashboardFilter from "./Components/Filter"
import FuelsDashboard from "./Pages/FuelsDashboard";
import { DashboardTabs } from "~/Constants/Labels";
import OtherProductsDashboard from "./Pages/OtherProductsDashboard";
import TanksDashboard from "./Pages/TanksDashboard";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(DashboardTabs[0]);

    return (
        <>
            <Navbar
                title="Dashboard"
            />

            <div className="p-5 bg-white min-h-[100vh]">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} DashboardTabs={DashboardTabs}/>
                <DashboardFilter />
                
                {activeTab=="Fuels" && (
                    <FuelsDashboard />
                )}
                {activeTab=="Other Products" && (
                    <OtherProductsDashboard />
                )}
                {activeTab=="Tanks" && (
                    <TanksDashboard />
                )}
            </div>
        </>
    )

}

export default Dashboard 
