import SimpleTable2 from "~/Components/Tables/SimpleTable2";
import { Fuels, Locations } from "~/Constants/Labels";
import { useState } from "react";
import DropdownTable from "~/Components/Tables/DropdownTable";

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

    const [tankData2, setTankData2] = useState([
        {
            location: Locations[0],
            tanks: [
                {
                    id: 1,
                    fuel: Fuels[0],
                    capacity: 23423,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 2,
                    fuel: Fuels[1],
                    capacity: 345,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 3,
                    fuel: Fuels[2],
                    capacity: 567,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 4,
                    fuel: Fuels[3],
                    capacity: 23423,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                }
            ]
        },
        {
            location: Locations[1],
            tanks: [
                {
                    id: 1,
                    fuel: Fuels[0],
                    capacity: 567431,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 2,
                    fuel: Fuels[1],
                    capacity: 345,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 3,
                    fuel: Fuels[2],
                    capacity: 23423,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 4,
                    fuel: Fuels[3],
                    capacity: 23423,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                }
            ]
        },
        {
            location: Locations[2],
            tanks: [
                {
                    id: 1,
                    fuel: Fuels[0],
                    capacity: 347,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 2,
                    fuel: Fuels[1],
                    capacity: 45682,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 3,
                    fuel: Fuels[2],
                    capacity: 55653,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 4,
                    fuel: Fuels[3],
                    capacity: 23423,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                }
            ]
        },
        {
            location: Locations[1],
            tanks: [
                {
                    id: 1,
                    fuel: Fuels[0],
                    capacity: 567431,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 2,
                    fuel: Fuels[1],
                    capacity: 345,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 3,
                    fuel: Fuels[2],
                    capacity: 23423,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                },
                {
                    id: 4,
                    fuel: Fuels[3],
                    capacity: 23423,
                    dip: 4238,
                    sales: 274322,
                    delivery: 3454345
                }
            ]
        }
    ])

    return (
        <div className="grid gap-10 px-5">
            <SimpleTable2 
                mainHeader={"Tank Name"}
                tankData={tankData}
            />

            <DropdownTable  
                mainHeader={"Tank Name"} 
                tankData2={tankData2}
            />
        </div>
    );
}

export default TanksDashboard;