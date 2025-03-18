import { useState } from "react";
import Navbar from "~/Components/Navbar"
import Tabs from "./Components/Tabs"
import DashboardFilter from "./Components/Filter"
import FuelsDashboard from "./Pages/FuelsDashboard";
import { DashboardTabs } from "~/Constants/Labels";
import OtherProductsDashboard from "./Pages/OtherProductsDashboard";
import TanksDashboard from "./Pages/TanksDashboard";
import KPIDashboard from "./Pages/KPIDashboard";
import PMTDRDashboard from "./Pages/PMDTR";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(DashboardTabs[0]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    return (
        <>
            <Navbar
                title="Dashboard"
            />

            <div className="p-5 bg-white min-h-[100vh]">
                <Tabs 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    DashboardTabs={DashboardTabs}
                />

                <DashboardFilter 
                    activeTab={activeTab}
                    startDate={startDate} 
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
                
                {activeTab=="Fuels" && (
                    <FuelsDashboard />
                )}
                {activeTab=="Other Products" && (
                    <OtherProductsDashboard />
                )}
                {activeTab=="Tanks" && (
                    <TanksDashboard />
                )}
                {activeTab=="KPI" && (
                    <KPIDashboard 
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}
                {activeTab=="PMTDR" && (
                    <PMTDRDashboard 
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}
            </div>
        </>
    )

}

export default Dashboard 
