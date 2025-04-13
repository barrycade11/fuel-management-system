import React, { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import { 
  useGetGlobalRecords, 
  useGetGlobalRecordById, 
  useAddGlobalRecord, 
  useUpdateGlobalRecord, 
  useDeleteGlobalRecord 
} from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";
import {
  Card,
  Select,
  SelectItem, 
  Input,
  Button,
  Accordion, 
  AccordionItem,
  Spinner,
  NumberInput
} from "@heroui/react";
import MonthDropdown from "~/Components/MonthDropdown";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";
import { useGetStationRecords } from "~/Hooks/Setup/Station/useStationRecordsApi";
import { fetchTargetsWeekly, useAddTargetWeekliesbyTargetId, useDeleteTargetWeekliesByTargetId } from "~/Hooks/Setup/GlobalRecords/Target/useTargetsWeekly";
import { fetchTargetsMonthly, useAddTargetMonthliesbyTargetId, useDeleteTargetMonthliesByTargetId } from "~/Hooks/Setup/GlobalRecords/Target/useTargetsMonthly";
import { fetchStationShifts } from "~/Hooks/Setup/Station/StationShift/useStationShifts";
import { startOfMonth, endOfMonth, addDays, getDay, isSameMonth } from "date-fns";

const Target = () => {
  // Fetch Targets 
  const { 
    data: targets, 
    isLoading: isLoadingTargets, 
    error: errorTargets 
  } = useGetGlobalRecords('Targets');

  // Fetch Stations 
  const { 
    data: stations, 
    isLoading: isLoadingStations, 
    error: errorStations 
  } = useGetStationRecords('Stations');

  // Add Target 
  const { 
    mutateAsync: addTarget, 
    isLoading: isAdding, 
    isSuccess: isAddSuccess, 
    error: addError 
  } = useAddGlobalRecord('Target');

  // Update Target 
  const { 
    mutateAsync: updateTarget, 
    isLoading: isUpdating, 
    isSuccess: isUpdateSuccess, 
    error: updateError 
  } = useUpdateGlobalRecord('Target');

  // Delete Target 
  const { 
    mutateAsync: deleteTarget, 
    isLoading: isDeleting, 
    isSuccess: isDeleteSuccess, 
    error: deleteError 
  } = useDeleteGlobalRecord('Target');

  // Add Target Weeklies 
  const { 
    mutateAsync: addTargetWeeklies, 
    isLoading: isAddingTargetWeeklies, 
    isSuccess: isAddTargetWeekliesSuccess, 
    error: addErrorTargetWeeklies 
  } = useAddTargetWeekliesbyTargetId('Target');

  // Delete Target Weeklies 
  const { 
    mutateAsync: deleteTargetWeeklies, 
    isLoading: isDeletinTargetWeeklies, 
    isSuccess: isDeleteTargetWeekliesSuccess, 
    error: deleteErrorTargetWeeklies 
  } = useDeleteTargetWeekliesByTargetId('Target');

  // Add Target Monthlies 
  const { 
    mutateAsync: addTargetMonthlies, 
    isLoading: isAddingTargetMonthlies, 
    isSuccess: isAddTargetMonthliesSuccess, 
    error: addErrorTargetMonthlies 
  } = useAddTargetMonthliesbyTargetId('Target');

  // Delete Target Monthlies 
  const { 
    mutateAsync: deleteTargetMonthlies, 
    isLoading: isDeletinTargetMonthlies, 
    isSuccess: isDeleteTargetMonthliesSuccess, 
    error: deleteErrorTargetMonthlies 
  } = useDeleteTargetMonthliesByTargetId('Target');

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newTarget, setNewTarget] = useState({  
    name: "", 
    year: "",
    stationId: "",
    targetFieldId: "", 
    targetStatusId: "",
    weightPercentage: ""
  });
  const [newTargetWeeklies, setNewTargetWeeklies] = useState([]);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [newTargetMonthlies, setNewTargetMonthlies] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [dailyTargets, setDailyTargets] = useState({
    Monday: { fullDayPercent: "", targetValue: "", shifts: {} },
    Tuesday: { fullDayPercent: "", targetValue: "", shifts: {} },
    Wednesday: { fullDayPercent: "", targetValue: "", shifts: {} },
    Thursday: { fullDayPercent: "", targetValue: "", shifts: {} },
    Friday: { fullDayPercent: "", targetValue: "", shifts: {} },
    Saturday: { fullDayPercent: "", targetValue: "", shifts: {} },
    Sunday: { fullDayPercent: "", targetValue: "", shifts: {} },
  });

  const [percentErrors, setPercentErrors] = useState({});

  const [selectedMonth, setSelectedMonth] = useState('01');
  const monthlyTarget = newTarget?.[`month${selectedMonth}`];
  const numberOfWeeks = getFullWeeksInMonth(newTarget.year, selectedMonth);
  const weeklyTarget = numberOfWeeks > 0 ? monthlyTarget / numberOfWeeks : 0;
  // const weekTarget = monthTarget / numberOfWeeksInSelectedMonth;
  // const dailyAmount = weekTarget * (value / 100);

  // useEffect(() => {
  //   if (newTarget.stationId) {
  //     fetchStationShifts(newTarget.stationId)
  //       .then(setShifts)
  //       .catch((error) => console.error("Failed to fetch shifts:", error));
  //   } else {
  //     setShifts([]);
  //   }
  // }, [newTarget.stationId]);
  const handleStationChange = async (e) => {
    const stationId = parseInt(e.target.value, 10);
    setNewTarget((prev) => ({ ...prev, stationId }));
  
    try {
      const shifts = await fetchStationShifts(stationId);
      setShifts(shifts);
    } catch (error) {
      console.error("Failed to fetch shifts", error);
    }
  };

  // console.log(shifts)

  const handleAdd = () => {
    setNewTarget({ 
      name: "", 
      year: "",
      stationId: "",
      targetFieldId: "", 
      targetStatusId: "",
      weightPercentage: null,
      month01: null, 
      month02: "", 
      month03: "", 
      month04: "", 
      month05: "", 
      month06: "", 
      month07: null, 
      month08: "", 
      month09: "", 
      month10: "", 
      month11: "", 
      month12: ""
    });
    setIsEditing(true);
  };

  const handleEdit = async (target) => {
    setIsEditing(true);

    console.log(target);
    try {
      // // Fetch Weeklies 
      // const rawWeeklies = await fetchTargetsWeekly(target.id);
      // const weeklies = rawWeeklies.map(w => ({
      //   ...w
      // }));

      // Fetch Monthlies 
      const rawMonthlies = await fetchTargetsMonthly(target.id);
      const monthlies = rawMonthlies?.[0] || {};

      console.log("monthlies: ", monthlies)

      // Fetch Dropdowns 
      const [ targetFieldData, targetStatusData ]= await Promise.all([
        fetchDropdownTypeList(24, target.targetfieldid),
        fetchDropdownTypeList(23, target.targetstatusid)
      ]);

      setNewTarget(prev => ({
        ...prev,
        ...target,
        name: target.name,
        year: target.year,
        stationId: target.stationid,
        targetFieldId: target.targetfieldid,
        targetStatusId: target.targetstatusid,
        weightPercentage: target.weightpercentage,
        month01: monthlies.month01,
        month02: monthlies.month02,
        month03: monthlies.month03,
        month04: monthlies.month04,
        month05: monthlies.month05,
        month06: monthlies.month06,
        month07: monthlies.month07,
        month08: monthlies.month08,
        month09: monthlies.month09,
        month10: monthlies.month10,
        month11: monthlies.month11,
        month12: monthlies.month12,
      }));

      console.log("target data handle edit:", target)

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleSave = async () => {
    console.log(newTarget)
    if (!newTarget.name || !newTarget.year || !newTarget.stationId || 
      !newTarget.targetFieldId || !newTarget.targetStatusId || !newTarget.weightPercentage ||
      !newTarget.month01 || !newTarget.month02 || !newTarget.month03 || 
      !newTarget.month04 || !newTarget.month05 || !newTarget.month06 || 
      !newTarget.month07 || !newTarget.month08 || !newTarget.month09 || 
      !newTarget.month10 || !newTarget.month11 || !newTarget.month12 
    ) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    if (isSaving) return;
    setIsSaving(true);

    const payload = {
      name: newTarget.name,
      year: newTarget.year,
      stationId: newTarget.stationId,
      targetFieldId: newTarget.targetFieldId, 
      targetStatusId: newTarget.targetStatusId,
      weightPercentage: newTarget.weightPercentage,
      month01: newTarget.month01,
      month02: newTarget.month02,
      month03: newTarget.month03,
      month04: newTarget.month04,
      month05: newTarget.month05,
      month06: newTarget.month06,
      month07: newTarget.month07,
      month08: newTarget.month08,
      month09: newTarget.month09,
      month10: newTarget.month10,
      month11: newTarget.month11,
      month12: newTarget.month12,
    }

    console.log("payload: ", payload)

    const targetWeeklies = Object.entries(dailyTargets).map(([dayOfWeek, data]) => ({
      dayOfWeek,
      fullDayPerc: data.fullDayPercent || 0,
      targetValue: data.targetValue || 0
    }));

    try {
      let targetId;

      if (newTarget.id) {
        // Existing Target 
        targetId = newTarget?.id; 

        // Update Target 
        const response = await updateTarget({ id: targetId, payload });

        targetId = response[0]?.id;

        console.log("Response: ", response);
        console.log("Target id: ", targetId);

        // // Delete and Add new Target Weeklies 
        // await deleteTargetWeeklies(targetId);

        // if (targetWeeklies.length > 0) {
        //   await Promise.all(
        //     targetWeeklies.map(weekly => addTargetWeekly({ id: targetId, payload: weekly }))
        //   );
        // }

        // Delete and Add new Target Monthlies 
        await deleteTargetMonthlies(targetId);
        await addTargetMonthlies({ id: targetId, payload })

      } else {
        // New Target 
        const response = await addTarget(payload);
        targetId = response[0]?.id; 
        
        console.log("Response: ", response);
        console.log("Target id: ", targetId);
        // // Add Weeklies
        // if (targetWeeklies.length > 0) {
        //   await Promise.all(
        //     targetWeeklies.map(weekly => addTargetWeekly({ id: targetId, payload: weekly }))
        //   );
        // }

        // Delete and Add new Target Monthlies 
        await deleteTargetMonthlies(targetId);
        await addTargetMonthlies({ id: targetId, payload })

        // Delete and Add new Target Weeklies 
        await deleteTargetWeeklies(targetId);
        if (targetWeeklies.length > 0) {
          await Promise.all(
            targetWeeklies.map(weekly =>
              addTargetWeeklies({ id: targetId, payload: weekly })
            )
          );
        }
      }

      setIsEditing(false);
      setNotification({ message: "Save successful", type: "success" });
        
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    } finally {
      setIsSaving(false); 
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            // Delete all records if Target is deleted
            // await deleteTargetWeeklies(id);
            await deleteTargetMonthlies(id);
            await deleteTarget(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
        } catch (error) {
            setNotification({ message: "Failed to delete record.", type: "error" });
            console.error("Error deleting record:", error);
        }
    };

    const handleCancel = () => {
        setNotification(null);
    };

    setNotification(prev => ({
      ...prev, 
      message: "Are you sure you want to delete this record?",
      type: "delete",
      onConfirm: handleConfirm, 
      onCancel: handleCancel,  
    }));
  };

  const years = [
    {key: "2024", label: "2024"},
    {key: "2025", label: "2025"},
    {key: "2026", label: "2026"},
    {key: "2027", label: "2027"},
    {key: "2028", label: "2028"},
    {key: "2029", label: "2029"},
    {key: "2030", label: "2030"}
  ];

  const columns = [
    { key: "id", label: "No.", hidden: true },
    { key: "name", label: "Target Name", hidden: false },
    { key: "targetfield", label: "Target Field", hidden: false },
    { key: "station", label: "Station", hidden: false },
    { key: "year", label: "Year", hidden: false },
    { key: "targetstatus", label: "Status", hidden: true },
    { key: "weightpercentage", label: "Weight Percentage", hidden: true },
  ];

  const customRender = {
    actions: (item) => (
      <Button
        onClick={() => handleEdit(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </Button>
    ),
  };

  const totalPercent = Object.values(dailyTargets).reduce((sum, day) => {
    return sum + (parseFloat(day?.fullDayPercent || 0));
  }, 0);

  function getFullWeeksInMonth(year, month) {
    // month is 2-digit string, so convert to number (0-based for JS Date)
    const monthIndex = parseInt(month, 10) - 1;
    const firstDay = startOfMonth(new Date(year, monthIndex));
    const lastDay = endOfMonth(new Date(year, monthIndex));
  
    let current = firstDay;
    let fullWeekCount = 0;
  
    while (current <= lastDay) {
      const startOfWeek = current;
      const endOfWeek = addDays(current, 6); // 7-day window
  
      // Ensure the entire week is within the same month
      if (isSameMonth(startOfWeek, firstDay) && isSameMonth(endOfWeek, firstDay)) {
        fullWeekCount++;
      }
  
      current = addDays(current, 7);
    }
  
    return fullWeekCount;
  }

  const getTotalShiftPercent = (shifts) => {
    return Object.values(shifts || {}).reduce((total, shift) => {
      return total + (shift?.percent || 0);
    }, 0);
  };
  

  const getQuarterMonths = (month) => {
    switch (month) {
      case "01":
      case "02":
      case "03":
        return ["month01", "month02", "month03"]; // First Quarter (Jan-Mar)
      case "04":
      case "05":
      case "06":
        return ["month04", "month05", "month06"]; // Second Quarter (Apr-Jun)
      case "07":
      case "08":
      case "09":
        return ["month07", "month08", "month09"]; // Third Quarter (Jul-Sep)
      case "10":
      case "11":
      case "12":
        return ["month10", "month11", "month12"]; // Fourth Quarter (Oct-Dec)
      default:
        return [];
    }
  };
  
  const selectedQuarterMonths = getQuarterMonths(selectedMonth);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {notification && 
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)}
          onConfirm={notification.onConfirm} 
          onCancel={notification.onCancel}  
        />}
      {isLoadingTargets ? (
        // <p>Loading...</p>
        <TableSkeleton columns={5} rows={5}/>
      ) : isEditing ? (
        <>
        <div className="grid grid-cols-10 gap-3 mb-4">
          <div className="col-span-4 gap-3">
            <Input 
              className="w-full mb-2" 
              label="Target Name" 
              placeholder="Enter target name" 
              value={newTarget.name}
              onChange={(e) => setNewTarget({ ...newTarget, name: e.target.value })}
              isRequired
            />
          </div>
          <div className="col-span-2 gap-3">
          <Select
            className="w-full"
            label="Year"
            placeholder="Select a Year"
            items={years}
            selectedKeys={[String(newTarget.year)]}
            onSelectionChange={(selected) => {
              const selectedValue = Array.from(selected)[0];
              setNewTarget({ ...newTarget, year: selectedValue });
            }}
          >
            {(year) => <SelectItem key={year.value}>{year.label}</SelectItem>}
          </Select>
          </div>
          <div className="col-span-2 gap-3">
            <Dropdown 
              label="Station"
              customOptions={stations.body.map(sta => ({
                id: sta.id,
                name: sta.name
              }))}
              value={newTarget.stationId} 
              onChange={handleStationChange}
              // onChange={(e) => setNewTarget({ 
              //   ...newTarget, 
              //   stationId: parseInt(e.target.value, 10)
              // })} 
            />
          </div>
          <div className="col-span-2 gap-3">
            <Dropdown 
              label="Status"
              typeId={23} 
              value={newTarget.targetStatusId} 
              onChange={(e) => setNewTarget({ ...newTarget, targetStatusId: e.target.value })} 
            />
          </div>
        </div>

        <div className="grid grid-cols-10 gap-3 mb-4">
          <div className="col-span-2 gap-3">
            <Dropdown 
              label="Target Field"
              typeId={24} 
              value={newTarget.targetFieldId} 
              onChange={(e) => setNewTarget({ ...newTarget, targetFieldId: e.target.value })} 
            />
          </div>
          <div className="col-span-2 gap-3">
            <NumberInput 
              label="Weight Percentage"
              placeholder="0%"
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              }}
              value={newTarget.weightPercentage === undefined ? null : newTarget.weightPercentage}
              onValueChange={(value) => setNewTarget({ ...newTarget, weightPercentage: value })} 
            />
          </div>
          <div className="col-span-3 gap-3">
            <h2 className="m-3 text-lg font-semibold ">Weekly Breakdown</h2>
          </div>
          <div className="col-span-2 gap-3">
          </div>
          <div className="col-span-1 gap-3">
          </div>
        </div>

        <div className="grid grid-cols-10 gap-3 mb-4">
          <div className="col-span-4 gap-3 mb-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Target Setting</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="January"
                  placeholder="0.00"
                  value={newTarget.month01 === undefined ? null : newTarget.month01}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month01: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="July"
                  placeholder="0.00"
                  value={newTarget.month07 === undefined ? null : newTarget.month07}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month07: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="February"
                  placeholder="0.00"
                  value={newTarget.month02 === undefined ? null : newTarget.month02}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month02: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="August"
                  placeholder="0.00"
                  value={newTarget.month08 === undefined ? null : newTarget.month08}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month08: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="March"
                  placeholder="0.00"
                  value={newTarget.month03 === undefined ? null : newTarget.month03}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month03: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="September"
                  placeholder="0.00"
                  value={newTarget.month09 === undefined ? null : newTarget.month09}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month09: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="April"
                  placeholder="0.00"
                  value={newTarget.month04 === undefined ? null : newTarget.month04}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month04: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="October"
                  placeholder="0.00"
                  value={newTarget.month10 === undefined ? null : newTarget.month10}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month10: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="May"
                  placeholder="0.00"
                  value={newTarget.month05 === undefined ? null : newTarget.month05}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month05: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="November"
                  placeholder="0.00"
                  value={newTarget.month11 === undefined ? null : newTarget.month11}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month11: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="June"
                  placeholder="0.00"
                  value={newTarget.month06 === undefined ? null : newTarget.month06}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month06: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
              <div className="col-span-1 gap-3">
                <NumberInput
                  label="December"
                  placeholder="0.00"
                  value={newTarget.month12 === undefined ? null : newTarget.month12}
                  onValueChange={(value) => setNewTarget({ ...newTarget, month12: value })}
                  isRequired
                  formatOptions={{
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                  }}
                />
              </div>
            </div>
          </Card>
          </div>

          <div className="grid col-span-4 gap-3 mb-4">
          <MonthDropdown selectedMonthId={selectedMonth} onChange={setSelectedMonth} />

          <Accordion variant="splitted">
            {daysOfWeek.map((day) => (
              <AccordionItem 
                key={day} 
                aria-label={day} 
                title={
                  <div className="w-full flex justify-between items-center">
                    <span>{day}</span>
                    <span className="text-small text-default-500">
                      {dailyTargets[day]?.fullDayPercent * 100 || "0"}%
                    </span>
                  </div>
                }
              >
                <div className="grid grid-cols-2 gap-3">
                  {/* Full Day Inputs */}
                  <div className="col-span-1 gap-3">
                    <NumberInput 
                      label="Full day % of week"
                      placeholder="0%"
                      formatOptions={{
                        style: "percent",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                      }}
                      value={dailyTargets[day]?.fullDayPercent === undefined ? null : dailyTargets[day]?.fullDayPercent}
                      onValueChange={(value) =>
                        setDailyTargets(prev => ({
                          ...prev,
                          [day]: {
                            ...prev[day],
                            fullDayPercent: value
                          }
                        }))
                      }
                    />
                  </div>
                  <div className="col-span-1 gap-3">
                  <NumberInput
                    label="Target Value"
                    placeholder="Enter Amount"
                    value={(() => {
                      const percent = dailyTargets[day]?.fullDayPercent || 0;
                      const monthlyAmount = newTarget?.[`month${selectedMonth}`] || 0;
                      const numberOfWeeks = getFullWeeksInMonth(newTarget?.year, selectedMonth);
                      const weeklyTarget = monthlyAmount / numberOfWeeks;
                      return weeklyTarget * percent;
                    })()}
                    isDisabled
                    formatOptions={{
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: true,
                    }}
                  />
                  </div>

                  {/* Render per shift */}
                  {[...shifts]
                  .sort((a, b) => {
                    const getShiftNumber = (name) => parseInt(name);
                    return getShiftNumber(a.shift) - getShiftNumber(b.shift);
                  }).map((shift) => (
                  <React.Fragment key={`${day}-${shift.shiftid}`}>
                  {/* Shift Percent Input */}
                  <div className="col-span-1 gap-3">
                    <NumberInput 
                      label={`${shift.shift}`}
                      placeholder="Enter %"
                      formatOptions={{
                        style: "percent",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                      }}
                      value={dailyTargets[day]?.shifts?.[shift.shiftid]?.percent ?? null}
                      onValueChange={(value) =>
                        setDailyTargets((prev) => ({
                          ...prev,
                          [day]: {
                            ...prev[day],
                            shifts: {
                              ...prev[day]?.shifts,
                              [shift.shiftid]: {
                                ...prev[day]?.shifts?.[shift.shiftid],
                                percent: value,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </div>
                
                  {/* Shift Amount Input */}
                  <div className="col-span-1 gap-3">
                    <NumberInput
                      placeholder="Enter Amount"
                      isDisabled
                      formatOptions={{
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true,
                      }}
                      value={(() => {
                        const fullDayPercent = dailyTargets[day]?.fullDayPercent || 0;
                        const shiftPercent = dailyTargets[day]?.shifts?.[shift.shiftid]?.percent || 0;
                        const monthlyAmount = newTarget?.[`month${selectedMonth}`] || 0;
                        const numberOfWeeks = getFullWeeksInMonth(newTarget?.year, selectedMonth);
                        const weeklyTarget = monthlyAmount / numberOfWeeks;
                        const dayTargetValue = weeklyTarget * fullDayPercent;
                        return dayTargetValue * shiftPercent;
                      })()}
                      onValueChange={(value) =>
                        setDailyTargets((prev) => ({
                          ...prev,
                          [day]: {
                            ...prev[day],
                            shifts: {
                              ...prev[day]?.shifts,
                              [shift.shiftid]: {
                                ...prev[day]?.shifts?.[shift.shiftid],
                                amount: value,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </div>
                </React.Fragment>                
                ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>

          <h4 className="m-3 text-sm font-semibold">Auto-Calculated Targets</h4>
            <div className="grid grid-cols-2 text-sm p-2 border-t">
              <span classNa="">Period</span>
              <span>Target Value</span>
            </div>
            <div className="grid grid-cols-2 text-sm p-2 border-t">
              <span>Annual</span>
              <span>
                {newTarget &&
                  [
                    newTarget.month01, newTarget.month02, newTarget.month03,
                    newTarget.month04, newTarget.month05, newTarget.month06,
                    newTarget.month07, newTarget.month08, newTarget.month09,
                    newTarget.month10, newTarget.month11, newTarget.month12,
                  ]
                  .reduce((total, val) => total + (parseFloat(val) || 0), 0)
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="grid grid-cols-2 text-sm p-2 border-t">
              <span>Quarterly</span>
              <span>
                {selectedQuarterMonths
                  .reduce((sum, key) => sum + (parseFloat(newTarget?.[key]) || 0), 0)
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              {/* <span>First Quarter</span>
              <span>
                {['month01', 'month02', 'month03']
                  .reduce((sum, key) => sum + (parseFloat(newTarget?.[key]) || 0), 0)
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>

              <span>Second Quarter</span>
              <span>
                {['month04', 'month05', 'month06']
                  .reduce((sum, key) => sum + (parseFloat(newTarget?.[key]) || 0), 0)
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>

              <span>Third Quarter</span>
              <span>
                {['month07', 'month08', 'month09']
                  .reduce((sum, key) => sum + (parseFloat(newTarget?.[key]) || 0), 0)
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>

              <span>Fourth Quarter</span>
              <span>
                {['month10', 'month11', 'month12']
                  .reduce((sum, key) => sum + (parseFloat(newTarget?.[key]) || 0), 0)
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span> */}
            </div>
            <div className="grid grid-cols-2 text-sm p-2 border-t">
              <span>Weekly</span>
              <span>{weeklyTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4">
          <div></div>
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)} color="default" className="w-min rounded-md font-semibold text-base text-white">
                Back
            </Button>
            {newTarget.id ? (
              <Button onClick={() => handleDelete(newTarget.id)} color="danger" className="w-min rounded-md font-semibold text-base text-white">
                Delete
              </Button>
            ) : (
              <div></div> 
            )}
            <Button 
              onClick={handleSave} 
              disabled={isSaving} 
              isLoading={isSaving}
              spinner={<Spinner size="sm" variant="wave" color="default" />}
              spinnerPlacement="end"
              color="primary"
              className="w-min rounded-md font-semibold text-base text-white"
            >
              {isSaving ? "Saving" : "Save"}
            </Button>
            <Button className="w-min rounded-md font-semibold text-base text-blue-600 bg-blue-200">
                View History
            </Button>
          </div>
        </div>
        </>
          
      ) : (
        <Table 
          title="Targets" 
          data={targets} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Target;
