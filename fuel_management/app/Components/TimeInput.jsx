import React from "react";
import { TimeInput as HeroTimeInput } from "@heroui/date-input";
import { Time } from "@internationalized/date";

const TimeInput = ({ value, onChange, ...props }) => {
  const parseTimeString = (timeString) => {
    if (!timeString) return null;
    
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return new Time(hours, minutes, seconds || 0);
  };
  
  const handleTimeChange = (timeValue) => {
    if (!timeValue) {
      onChange && onChange(null);
      return;
    }
    
    const hours = timeValue.hour.toString().padStart(2, '0');
    const minutes = timeValue.minute.toString().padStart(2, '0');
    const seconds = timeValue.second ? timeValue.second.toString().padStart(2, '0') : '00';
    
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    onChange && onChange(formattedTime, timeValue);
  };

  const timeValue = typeof value === 'string' ? parseTimeString(value) : value;

  return (
    <HeroTimeInput
      {...props}
      value={timeValue}
      onChange={handleTimeChange}
    />
  );
};

export default TimeInput;