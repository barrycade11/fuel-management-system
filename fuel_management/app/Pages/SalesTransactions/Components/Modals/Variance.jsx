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
import { PlusIcon } from 'lucide-react'

const Variance = ({ openModal, setOpenModal, title }) => {
    const tableHeader = ["Category", "Vatable Sales", "Vat", "Vat Exempt", "Zero Rated", "Total"]
    const tableRows = ["Fuels", "Select", "Forecourt Lubes", "SHOC", "NBS", "Recharge", "MOP Totals"]

    return (
        <Modal isOpen={openModal} size={"5xl"} scrollBehavior={"inside"} onClose={() => setOpenModal(!openModal)} radius="none">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-gray-500">{title}</ModalHeader>
                <ModalBody className="px-10 pb-10">
                    <table className="border-[1px] h-full w-full">
                        <thead>
                            <tr className="border-b-[1px]">
                                {tableHeader.map((label, index) => {
                                    return <td className="py-4 text-gray-600 text-center font-semibold" key={index}>{label}</td>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((item, index) => {
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
                </ModalBody>
                <ModalFooter className="flex justify-end bg-gray-100">
                    <Button color="primary" variant="light" className="font-semibold text-base rounded-md" onPress={() => setOpenModal(!openModal)}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default Variance