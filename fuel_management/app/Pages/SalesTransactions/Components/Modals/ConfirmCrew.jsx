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

const ConfirmCrew = ({ openModal, setOpenModal, title }) => {
    const tableHeader = ["Employee Name", "Department", "Employee Designation"]
    const tableRows = [1, 2, 3]

    return (
        <Modal isOpen={openModal} size={"5xl"} scrollBehavior={"inside"} onClose={() => setOpenModal(!openModal)} radius="none">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-gray-500">{title}</ModalHeader>
                <ModalBody className="px-10 pb-10">
                    <div className="w-full flex justify-end">
                        <Button
                            startContent={
                                <div className="h-6 w-6 flex items-center">
                                    <PlusIcon />
                                </div>
                            }
                            color="primary"
                            className="font-semibold rounded-md px-6"
                        >
                            Add New
                        </Button>
                    </div>
                    <table className="border-[1px] h-full w-full">
                        <thead>
                            <tr className="border-b-[1px]">
                                {tableHeader.map((label, index) => {
                                    return <td className="py-4 text-gray-600 text-center font-semibold" key={index}>{label}</td>
                                })}
                                <td className="py-4 text-gray-600 text-center font-semibold">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((item, index) => {
                                return (
                                    <tr key={index} className="border-b-[1px]">
                                        <td className="px-8 items-center">
                                            <SimpleInput
                                                version={1}
                                                label={''}
                                                placeholder={"type here"}
                                                type={"text"}
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
                                                type={"text"}
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
                                                type={"text"}
                                                textAlign={"center"}
                                            // initialValue={}
                                            // setInitialValue={}
                                            />
                                        </td>
                                        <td >
                                            <Button
                                                className="rounded-md font-semibold text-base"
                                                color="danger"
                                                variant="flat"
                                                size="sm"
                                            >
                                                Remove
                                            </Button>
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

export default ConfirmCrew