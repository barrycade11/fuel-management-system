import { useEffect, useRef } from "react";
import { Check, AlertCircle } from "lucide-react";
import { Button } from "@heroui/react";

const Notification = ({ message, type, onClose, onConfirm, onCancel }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (type !== "delete") { 
        timerRef.current = setTimeout(onClose, 3000);
    }

    return () => clearTimeout(timerRef.current); 
  }, [type, onClose]); 


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
              onClick={() => {
                if (onConfirm) {
                  onConfirm();
                } else {
                  console.error("onConfirm is undefined!");
                }
              }} 
              className="bg-red-800 px-3 py-1 rounded text-white"
            >
              Delete
            </Button>

            <Button 
              onClick={() => {
                if (onCancel) {
                  onCancel();
                } else {
                  console.error("onCancel is undefined!");
                }
              }} 
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
