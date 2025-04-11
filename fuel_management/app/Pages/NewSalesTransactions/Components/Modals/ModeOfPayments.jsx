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
import ModeOfPaymentRows from "../Rows/ModeOfPaymentRows";

const ModeOfPayments = ({ openModal, setOpenModal, title }) => {
    const tableHeader = ["Mode of Payments", "Quantity", "Value"]
    const [mode, setMode] = useState([
        {
            name: "BDO Debit Amount",
            quantity: 0,
            value: 0
        },
        {
            name: "Cash",
            quantity: 0,
            value: 0
        },
        {
            name: "Safedrops",
            quantity: 0,
            value: 0
        },
        {
            name: "Inhouse",
            quantity: 0,
            value: 0
        },
    ])
    
    return (
        <Modal isOpen={openModal} size={"3xl"} onClose={() => setOpenModal(!openModal)} radius="none">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-gray-500">{title}</ModalHeader>
                <ModalBody className="px-10 pb-16">
                    <table className="border-[1px] h-full w-full">
                        <thead>
                            <tr className="border-b-[1px]">
                                {tableHeader.map((label, index) => {
                                    return <td className="py-4 text-gray-600 text-center font-semibold" key={index}>{label}</td>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {mode.map((item, index) => {
                                return (
                                    <tr key={index} className="border-b-[1px]">
                                        <ModeOfPaymentRows 
                                            modeData={item}
                                            mode={mode}
                                            setMode={setMode}
                                        />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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

export default ModeOfPayments