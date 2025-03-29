import React, { useState } from "react";
import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button 
} from "@heroui/react";

const HeroUIModal = ({ isOpen, onOpenChange, title, children, footer, size = "md" }) => {
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size} scrollBehavior={scrollBehavior}
        style={{ maxHeight: "80vh", minHeight: "80vh" }} 
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {footer || (
                <>
                  {/* <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button> */}
                  {/* <Button color="primary" onPress={onClose}>
                    Action
                  </Button> */}
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default HeroUIModal;
