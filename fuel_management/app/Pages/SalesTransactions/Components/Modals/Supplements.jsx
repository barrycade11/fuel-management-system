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
import { Accordion, AccordionItem } from "@heroui/react";
import SupplementTable from "../SupplementTable";
import { PlusIcon } from 'lucide-react'
import { useState } from "react"
import LubricantSalesAccordion from "../AccordionItem/LubricantSalesAccordion";
import { InHouseAccordion } from "../AccordionItem/InHouseAccordion";
import { DiscountAccordion } from "../AccordionItem/DiscountAccordion";
import { RedemptionAccordion } from "../AccordionItem/RedemptionAccordion";
import { RecievableAccordion } from "../AccordionItem/RecievableAccordion";
import { SettlementAccordion } from "../AccordionItem/SettlementAccordion";
import { CheckAccordion } from "../AccordionItem/CheckAccordion";

const Supplements = ({ openModal, setOpenModal, title }) => {
    const itemTabs = [
        {
            title: "Forecourt Lubricant Sales",
            tableHeaders: [
                "Lubricants", 
                "Quantity",
                "Gross Amount",
                "Manager Discount",
                "Sold by"
            ],
            content: [
                {
                    Lubricants: '', 
                    Quantity: 0,
                    GrossAmount: 0,
                    ManagerDiscount: 0,
                    SoldBy: ''
                }
            ]
        },
        {
            title: "P.O. Inhouse Account",
            tableHeaders: [
                "Invoice No.", 
                "Account Name",
                "Product",
                "Quantity",
                "PO Amount",
            ]
        },
        {
            title: "Discounts Charged to Shell",
            tableHeaders: [
                "Discount Name",
                "Quantity",
                "Amount"
            ]
        },
        {
            title: "Redemption",
            tableHeaders: [
                "Mode of Payment",
                "Quantity",
                "Amount"
            ]
        },
        {
            title: "Employees Recievable and Cash Deposit",
            tableHeaders: [
                "Employee Name",
                "Charge Amount",
                "Charge Description"
            ]
        },
        {
            title: "Cash and Card Settlement",
            tableHeaders: [
                "Mode of Payment",
                "Amount"
            ]
        },
        {
            title: "Check Payments",
            tableHeaders: [
                "Check for Payment",
                "Check Amomunt"
            ]
        }
    ]

    return (
        <Modal isOpen={openModal} size={"5xl"} scrollBehavior={"inside"} onClose={() => setOpenModal(!openModal)} radius="none">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-gray-500">{title}</ModalHeader>
                <ModalBody className="p-10">
                    <Accordion
                        isCompact
                        variant="splitted"
                        motionProps={{
                            variants: {
                                enter: {
                                    y: 0,
                                    opacity: 1,
                                    height: "auto",
                                    overflowY: "unset",
                                    transition: {
                                        height: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 70,
                                            duration: 2,
                                        },
                                        opacity: {
                                            easings: "ease",
                                            duration: 1,
                                        },
                                    },
                                },
                                exit: {
                                    y: -10,
                                    opacity: 0,
                                    height: 0,
                                    overflowY: "hidden",
                                    transition: {
                                        height: {
                                            easings: "ease",
                                            duration: 0.25,
                                        },
                                        opacity: {
                                            easings: "ease",
                                            duration: 0.3,
                                        },
                                    },
                                },
                            },
                        }}
                        itemClasses={{
                            title: "text-gray-500 font-semibold"
                        }}
                    >
                        <AccordionItem
                            className="w-full bg-gray-100 shadow-none overflow-hidden"
                            key={"Forecourt Lubricant Sales"}
                            aria-label={"Forecourt Lubricant Sales"}
                            title={"Forecourt Lubricant Sales"}
                        >
                            <LubricantSalesAccordion />  
                        </AccordionItem>
                        <AccordionItem
                            className="w-full bg-gray-100 shadow-none overflow-hidden"
                            key={"P.O. Inhouse Account"}
                            aria-label={"P.O. Inhouse Account"}
                            title={"P.O. Inhouse Account"}
                        >
                            <InHouseAccordion />      
                        </AccordionItem>
                        <AccordionItem
                            className="w-full bg-gray-100 shadow-none overflow-hidden"
                            key={"Discounts Charged to Shell"}
                            aria-label={"Discounts Charged to Shell"}
                            title={"Discounts Charged to Shell"}
                        >
                            <DiscountAccordion />      
                        </AccordionItem>
                        <AccordionItem
                            className="w-full bg-gray-100 shadow-none overflow-hidden"
                            key={"Redemption"}
                            aria-label={"Redemption"}
                            title={"Redemption"}
                        >
                            <RedemptionAccordion />      
                        </AccordionItem>
                        <AccordionItem
                            className="w-full bg-gray-100 shadow-none overflow-hidden"
                            key={"Employees Recievable and Cash Deposit"}
                            aria-label={"Employees Recievable and Cash Deposit"}
                            title={"Employees Recievable and Cash Deposit"}
                        >
                            <RecievableAccordion />      
                        </AccordionItem>
                        <AccordionItem
                            className="w-full bg-gray-100 shadow-none overflow-hidden"
                            key={"Cash and Card Settlement"}
                            aria-label={"Cash and Card Settlement"}
                            title={"Cash and Card Settlement"}
                        >
                            <SettlementAccordion />      
                        </AccordionItem>
                        <AccordionItem
                            className="w-full bg-gray-100 shadow-none overflow-hidden"
                            key={"Check for Payment"}
                            aria-label={"Check for Payment"}
                            title={"Check for Payment"}
                        >
                            <CheckAccordion />      
                        </AccordionItem>
                    </Accordion>
                </ModalBody>
                <ModalFooter className="flex justify-end">
                    <Button color="primary" className="font-semibold text-base rounded-md" onPress={() => setOpenModal(!openModal)}>
                        Back to Main Table
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default Supplements