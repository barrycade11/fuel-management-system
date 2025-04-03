import React, { useState, useCallback } from "react";
import UserWithDP from "~/Components/UserWithDP";
import { ChevronUp, ChevronDown, MoreVertical } from "lucide-react";



/**
 * Accept this data format
 *{
      "id": 6,
      "username": "jmdelacruz",
      "firstname": "Jose Paulo",
      "lastname": "Dela Cruz",
      "roleid": 1,
      "rolename": "SUPER ADMIN",
      "stations": [
          {
              "stationid": 1,
              "stationname": "test"
          }
      ]
  }
 *
 */

const TableHeader = ({
  children,
  onClick,
  isActive = false,
  sortStage = 0,
}) => {
  return (
    <th
      onClick={onClick}
      className={`${isActive ? "text-primary" : "text-default-600"
        } cursor-pointer text-sm font-normal p-3`}
    >
      <div className="flex items-center justify-center gap-1">
        <span>{children}</span>
        {sortStage === 1 && <ChevronDown size={16} />}
        {sortStage === 2 && <ChevronUp size={16} />}
      </div>
    </th>
  );
};

// Status badge component for better visual representation
const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    blocked: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium `}
    >
      {status ? "Active" : 'Inactive'}
    </span>
  );
};

// Action button component
const ActionButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
    >
      {label}
    </button>
  );
};

// Main SettingsTable component
const SettingsTable = ({
  data = [],
  onViewUser = () => { },
  onSort = () => { },
  initialSort = { field: "", direction: 0 },
}) => {
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    field: initialSort.field || "",
    direction: initialSort.direction || 0, // 0 - no sort, 1 - Sort Ascending, 2 - Sort Descending
  });

  // Handle header click for sorting
  const handleHeaderClick = useCallback(
    (field) => {
      const newDirection =
        sortConfig.field === field
          ? sortConfig.direction >= 2
            ? 0
            : sortConfig.direction + 1
          : 1;

      const newSortConfig = {
        field: newDirection === 0 ? "" : field,
        direction: newDirection,
      };

      setSortConfig(newSortConfig);
      onSort(newSortConfig);
    },
    [sortConfig, onSort]
  );

  // Sort data based on current sort configuration
  const sortedData = useCallback(() => {
    if (sortConfig.direction === 0 || !sortConfig.field) return data;

    return [...data].sort((a, b) => {
      // Handle null or undefined values
      if (a[sortConfig.field] == null) return sortConfig.direction === 1 ? -1 : 1;
      if (b[sortConfig.field] == null) return sortConfig.direction === 1 ? 1 : -1;

      // Compare based on field type
      if (typeof a[sortConfig.field] === "string") {
        const comparison = a[sortConfig.field].localeCompare(b[sortConfig.field]);
        return sortConfig.direction === 1 ? comparison : -comparison;
      } else {
        const comparison = a[sortConfig.field] - b[sortConfig.field];
        return sortConfig.direction === 1 ? comparison : -comparison;
      }
    });
  }, [data, sortConfig]);

  return (
    <div className="p-4 w-full">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-300">
            <TableHeader
              isActive={sortConfig.field === "name"}
              sortStage={sortConfig.field === "name" ? sortConfig.direction : 0}
              onClick={() => handleHeaderClick("name")}
            >
              Users
            </TableHeader>
            <TableHeader
              isActive={sortConfig.field === "station"}
              sortStage={sortConfig.field === "station" ? sortConfig.direction : 0}
              onClick={() => handleHeaderClick("station")}
            >
              Stations
            </TableHeader>
            <TableHeader
              isActive={sortConfig.field === "role"}
              sortStage={sortConfig.field === "role" ? sortConfig.direction : 0}
              onClick={() => handleHeaderClick("role")}
            >
              User Role
            </TableHeader>
            <TableHeader
              isActive={sortConfig.field === "status"}
              sortStage={sortConfig.field === "status" ? sortConfig.direction : 0}
              onClick={() => handleHeaderClick("status")}
            >
              Status
            </TableHeader>
            <th className="text-sm font-normal p-3 text-default-600 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData().length > 0 ? (
            sortedData().map((user, index) => (
              <tr
                key={user.id || index}
                className="h-14 border-b border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-center">
                  <UserWithDP
                    name={`${user.firstname} ${user.lastname}`}
                    avatar={user.avatar}
                    email={user.email}
                  />
                </td>
                <td className="p-3 text-center">{user.stations[0].stationname}</td>
                <td className="p-3 text-center">{user.rolename}</td>
                <td className="p-3 text-center">
                  <StatusBadge status={user.status} />
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton
                      label="View"
                      onClick={() => onViewUser(user)}
                    />
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-8 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsTable;
