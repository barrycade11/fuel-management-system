import SimpleTable2 from "~/Components/Tables/SimpleTable2";
import { Fuels } from "~/Constants/Labels";
import { useState } from "react";

const TanksDashboard = () => {
    const [tankData, setTankData] = useState([
        {
            fuel: Fuels[0],
            capacity: 23423,
            dip: 239,
            delivery: '',
            sales: 23423,
            daysInv: 9.0
        },
        {
            fuel: Fuels[1],
            capacity: 565,
            dip: 4,
            delivery: '',
            sales: 8454,
            daysInv: 1.0
        },
        {
            fuel: Fuels[2],
            capacity: 23423,
            dip: 239,
            delivery: '',
            sales: 23423,
            daysInv: 9.0
        },
        {
            fuel: Fuels[3],
            capacity: 23423,
            dip: 239,
            delivery: '',
            sales: 23423,
            daysInv: 9.0
        },
        {
            fuel: Fuels[4],
            capacity: 23423,
            dip: 239,
            delivery: '',
            sales: 23423,
            daysInv: 9.0
        },
        {
            fuel: Fuels[0],
            capacity: 23423,
            dip: 239,
            delivery: '',
            sales: 23423,
            daysInv: 9.0
        }
    ])

    return (
        <div>
            <SimpleTable2 
                mainHeader={"Tank Name"}
                tankData={tankData}
            />
        </div>
    );
}

export default TanksDashboard;