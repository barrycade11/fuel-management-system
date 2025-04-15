import { Accordion, AccordionItem } from "@heroui/react";
import { useState } from "react";
import { CashAccordion } from "./AccordionItem/CashAccordion";
import { InHouseAccordion } from "./AccordionItem/InHouseAccordion";
import { RedemptionAccordion } from "./AccordionItem/RedemptionAccordion";
import { CardAccordion } from "./AccordionItem/CardAccordion";
import CurrencyFormatter from "~/Components/Lib/CurrencyFormatter";

const SalesAccordion = ({
    selectedMode,
    employee,
    cashData,
    setCashData,
    poData,
    setPoData,
    redemptionData,
    setRedemptionData,
    cardData,
    setCardData
}) => {

    return (
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
                title: "text-gray-500 font-semibold",
                startContent: "absolute right-10 text-gray-500"
            }}
        >
            <AccordionItem
                className="w-full bg-gray-100 shadow-none overflow-hidden relative"
                key={"Cash"}
                aria-label={"Cash"}
                title={"Cash"}
                startContent={
                    <label className="font-semibold">{CurrencyFormatter(cashData?.total)}</label>
                }
            >
                <CashAccordion
                    employee={employee}
                    cashData={cashData}
                    setCashData={setCashData}
                />
            </AccordionItem>
            {selectedMode == 1 && (
                <AccordionItem
                    className="w-full bg-gray-100 shadow-none overflow-hidden relative"
                    key={"P.O. Inhouse Account"}
                    aria-label={"P.O. Inhouse Account"}
                    title={"P.O. Inhouse Account"}
                    startContent={
                        <label className="font-semibold">{CurrencyFormatter(poData?.total)}</label>
                    }
                >
                    <InHouseAccordion
                        poData={poData}
                        setPoData={setPoData}
                    />
                </AccordionItem>
            )}
            <AccordionItem
                className="w-full bg-gray-100 shadow-none overflow-hidden relative"
                key={"Redemption"}
                aria-label={"Redemption"}
                title={"Redemption"}
                startContent={
                    <label className="font-semibold">{CurrencyFormatter(redemptionData?.total)}</label>
                }
            >
                <RedemptionAccordion
                    redemptionData={redemptionData}
                    setRedemptionData={setRedemptionData}
                />
            </AccordionItem>
            <AccordionItem
                className="w-full bg-gray-100 shadow-none overflow-hidden relative"
                key={"Card"}
                aria-label={"Card"}
                title={"Card Settlement"}
                startContent={
                    <label className="font-semibold">{CurrencyFormatter(cardData?.total)}</label>
                }
            >
                <CardAccordion
                    cardData={cardData}
                    setCardData={setCardData}
                />
            </AccordionItem>
        </Accordion>
    )
}

export default SalesAccordion