import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import SimpleInput from "~/Components/SimpleInput"
import { useState, useEffect } from "react";
import { NonFuelRows } from "../Rows/NonFuelRows";
import { SelectRows } from "../Rows/SelectRows";
import { DepartmentSalesRows } from "../Rows/DepartmentSalesRows";

const DepartmentSales = ({ openModal, setOpenModal, title, departmentSales, setDepartmentSales }) => {
    const table1Header = ["POS Station", "Quantity"]
    const table2Header = ["POS Station", "Value"]
    const table3Header = ["Category", "Transaction Count", "Sales", "Discount"]
    const [nonfuel, setNonFuel] = useState(departmentSales?.nonFuel)
    const [nonfuelTotal, setNonFuelTotal] = useState(0);
    const [select, setSelect] = useState(departmentSales?.select)
    const [departmentSalesTotal, setDepartmentSalesTotal] = useState(departmentSales?.departmentSalesTotal)
    // console.log(nonfuel)

    useEffect(() => {
        const compute = () => {
            let sum = nonfuel?.reduce((total, data) => {
                return total = total + data.quantity
            }, 0)
            setNonFuelTotal(sum)
        }
        compute()
    }, [nonfuel])

    async function submitHandler() {
        setDepartmentSales({
            nonFuel: nonfuel,
            select: select,
            departmentSalesTotal: departmentSalesTotal
        })

        setOpenModal(!openModal)
    }

    return (
        <Modal isOpen={openModal} scrollBehavior={"inside"} size={"5xl"} onClose={() => setOpenModal(!openModal)} radius="none">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-gray-500 text-2xl">{title}</ModalHeader>
                <ModalBody className="px-10 pb-4 grid grid-cols-5">
                    <div className="col-span-2">
                        <label className="font-semibold text-gray-500 text-lg">Non Fuel Transactions</label>
                        <table className="border-[1px] h-min w-full m-4">
                            <thead>
                                <tr className="border-b-[1px]">
                                    {table1Header.map((label, index) => {
                                        return <td className="py-4 text-gray-600 text-center font-semibold" key={index}>{label}</td>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {nonfuel?.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b-[1px]">
                                            <NonFuelRows
                                                nonFuelData={item}
                                                nonfuel={nonfuel}
                                                setNonFuel={setNonFuel}
                                            />
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <th className="px-8 text-center">
                                        Total
                                    </th>
                                    <td className="px-8 text-center font-bold">
                                        <span>{nonfuelTotal}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-span-3">
                        <label className="font-semibold text-gray-500 text-lg">Select Transactions</label>
                        <table className="border-[1px] h-min w-full m-4">
                            <thead>
                                <tr className="border-b-[1px]">
                                    {table2Header.map((label, index) => {
                                        return <td className="py-4 text-gray-600 text-center font-semibold" key={index}>{label}</td>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {select?.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b-[1px]">
                                            <SelectRows
                                                selectData={item}
                                                select={select}
                                                setSelect={setSelect}
                                            />
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-span-5">
                        <table className="border-[1px] h-min w-full m-4">
                            <thead>
                                <tr className="border-b-[1px]">
                                    {table3Header.map((label, index) => {
                                        return <td className="py-4 text-gray-600 text-center font-semibold" key={index}>{label}</td>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {departmentSalesTotal?.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b-[1px]">
                                            <DepartmentSalesRows
                                                departmentSalesData={item}
                                                departmentSales={departmentSalesTotal}
                                                setDepartmentSales={setDepartmentSalesTotal}
                                            />
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-between bg-gray-200">
                    <Button color="danger" className="font-semibold text-base" variant="light" onPress={() => setOpenModal(!openModal)}>
                        Clear all...
                    </Button>
                    <div className="flex items-center gap-4">
                        <Button color="primary" className="font-semibold text-base" variant="light" onPress={() => setOpenModal(!openModal)}>
                            Close
                        </Button>
                        <Button onPress={() => submitHandler()} color="primary" className="font-semibold text-base rounded-md">
                            Save
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DepartmentSales