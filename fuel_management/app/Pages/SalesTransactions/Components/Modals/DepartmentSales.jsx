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
import { useState } from "react";

const DepartmentSales = ({ openModal, setOpenModal, title }) => {
    const [scrollBehavior, setScrollBehavior] = useState("inside");
    const table1Header = ["POS Station", "Quantity"]
    const table1Rows = [1, 2, 3]
    const table2Header = ["POS Station", "Value"]
    const table2Rows = ["Transaction Count", "Final Count (Less Lubes)", "Select Sales", "Final Sales (Less Lubes)", "Select Discount", "Sales Tax Exempt"]
    const table3Header = ["Category", "Transaction Count", "Sales", "Discount"]
    const table3Rows = ["FC Lubes", "NBS", "SHOC", "Recharge"]

    return (
        <Modal isOpen={openModal} scrollBehavior={scrollBehavior} size={"5xl"} onClose={() => setOpenModal(!openModal)} radius="none">
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
                                {table1Rows.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b-[1px]">
                                            <td className="px-8 text-center">
                                                {item}
                                            </td>
                                            <td className="px-8 items-center">
                                                <SimpleInput
                                                    version={1}
                                                    label={''}
                                                    placeholder={"type here"}
                                                    icon={'₱'}
                                                    type={"number"}
                                                    textAlign={"center"}
                                                // initialValue={}
                                                // setInitialValue={}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <th className="px-8 text-center">
                                        Total
                                    </th>
                                    <td className="px-8 items-center font-bold">
                                        <SimpleInput
                                            version={1}
                                            label={''}
                                            placeholder={"type here"}
                                            icon={'₱'}
                                            type={"number"}
                                            textAlign={"center"}
                                        // initialValue={}
                                        // setInitialValue={}
                                        />
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
                                {table2Rows.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b-[1px]">
                                            <td className="pl-16 text-left">
                                                {item}
                                            </td>
                                            <td className="px-8 items-center">
                                                <SimpleInput
                                                    version={1}
                                                    label={''}
                                                    placeholder={"type here"}
                                                    icon={'₱'}
                                                    type={"number"}
                                                    textAlign={"center"}
                                                // initialValue={}
                                                // setInitialValue={}
                                                />
                                            </td>
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
                                {table3Rows.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b-[1px]">
                                            <td className="px-16 text-center">
                                                {item}
                                            </td>
                                            <td className="px-8 items-center">
                                                <SimpleInput
                                                    version={1}
                                                    label={''}
                                                    placeholder={"type here"}
                                                    icon={'₱'}
                                                    type={"number"}
                                                    textAlign={"center"}
                                                // initialValue={}
                                                // setInitialValue={}
                                                />
                                            </td>
                                            <td className="px-8 items-center">
                                                <SimpleInput
                                                    version={1}
                                                    label={''}
                                                    placeholder={"type here"}
                                                    icon={'₱'}
                                                    type={"number"}
                                                    textAlign={"center"}
                                                // initialValue={}
                                                // setInitialValue={}
                                                />
                                            </td>
                                            <td className="px-8 items-center">
                                                <SimpleInput
                                                    version={1}
                                                    label={''}
                                                    placeholder={"type here"}
                                                    icon={'₱'}
                                                    type={"number"}
                                                    textAlign={"center"}
                                                // initialValue={}
                                                // setInitialValue={}
                                                />
                                            </td>
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
                        <Button color="primary" className="font-semibold text-base rounded-md" onPress={() => setOpenModal(!openModal)}>
                            Save
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DepartmentSales