import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ onClick, label }) => (
    <Button onClick={onClick} color="primary">
      <ArrowLeft /> <span className="text-[18px]">{label}</span>
    </Button>
  );

export default BackButton;
