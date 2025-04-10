import { useState } from "react";
import Navbar from "~/Components/Navbar"
import DashboardFilter from "./Components/DashboardFilter"
import FuelsDashboard from "./Pages/FuelsDashboard";
import { DashboardTabs } from "~/Constants/Labels";
import OtherProductsDashboard from "./Pages/OtherProductsDashboard";
import TanksDashboard from "./Pages/TanksDashboard";
import KPIDashboard from "./Pages/KPIDashboard";
import PMTDRDashboard from "./Pages/PMDTR";
import Tabs from "~/Components/Tabs";
import moment from "moment";
import { parseDate } from "@internationalized/date";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(DashboardTabs[0]);
    const [startDate, setStartDate] = useState(parseDate('1900-01-01'));
    const [endDate, setEndDate] = useState(parseDate(moment(Date.now()).format('YYYY-MM-DD')));
  
    return (
        <>
            <Navbar
                title="Dashboard"
            />

            <div className="bg-white min-h-[100vh]">
                <Tabs
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    tabs={DashboardTabs}
                />

                <DashboardFilter 
                    activeTab={activeTab}
                    startDate={startDate} 
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
                
                {activeTab=="Fuels" && (
                    <FuelsDashboard 
                        startDate={startDate}
                        endDate={endDate}
                    />
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
