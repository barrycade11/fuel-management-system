import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

const NextButton = ({ onClick, label }) => (
    <Button onClick={onClick} color="primary">
      <ArrowRight /> <span className="text-[18px]">{label}</span>
    </Button>
  );

export default NextButton;
