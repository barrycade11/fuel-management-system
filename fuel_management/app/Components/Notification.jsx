import { useEffect, useState, useRef } from "react";
import { Check, AlertCircle } from "lucide-react";
import { Button, Spinner } from "@heroui/react";

const Notification = ({ message, type, onClose, onConfirm, onCancel }) => {
  const timerRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (type !== "delete") { 
        timerRef.current = setTimeout(onClose, 3000);
    }

    return () => clearTimeout(timerRef.current); 
  }, [type, onClose]); 

  const handleDelete = async () => {
    if (onConfirm) {
      setIsDeleting(true);
      try {
        await onConfirm();
      } finally {
        setIsDeleting(false);
      }
    } else {
      console.error("onConfirm is undefined!");
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg text-white shadow-lg 
      ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-red-500"}`}>
      <div className="flex justify-between items-center">
          {type === 'success' ? (
          <Check size={20} className="text-white" />
        ) : (
          <AlertCircle size={20} className="text-white" />
        )}
        &nbsp;<span>{message} &nbsp;</span>

        {type === "delete" ? (
          <div className="flex space-x-2">
            <Button 
              onClick={handleDelete} 
              disabled={isDeleting}
              isLoading={isDeleting}
              spinner={<Spinner size="sm" variant="wave" color="default" />}
              spinnerPlacement="end"
              color="danger"
              className="bg-red-800 px-3 py-1 rounded text-white"
            >
              {isDeleting ? "Deleting" : "Delete"}
            </Button>
            <Button 
              onClick={onCancel}
              disabled={isDeleting}
              color="default"
              className="bg-red-700 px-3 py-1 rounded text-white"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <button onClick={onClose} className="ml-4">✕</button>
        )}
      </div>
    </div>
  );
};


export default Notification;
