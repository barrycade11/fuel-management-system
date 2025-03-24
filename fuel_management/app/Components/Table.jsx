import { useState, useRef, useEffect } from "react";
import { SearchIcon, SettingsIcon } from "lucide-react";

const Table = ({ title, data, columns, onAdd, onEdit, customRender }) => {
    const [search, setSearch] = useState("");
    const [visibleColumns, setVisibleColumns] = useState(
        columns.reduce((acc, col) => ({ ...acc, [col.key]: !col.hidden }), {})
    );    

    const [showFilter, setShowFilter] = useState(false);
    const filterRef = useRef(null);
    const settingsButtonRef = useRef(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const toggleColumn = (colKey) => {
        setVisibleColumns((prev) => ({ ...prev, [colKey]: !prev[colKey] }));
    };

    const handleSort = (key) => {
        setSortConfig((prev) => {
            const direction = prev.key === key && prev.direction === "asc" ? "desc" : "asc";
            return { key, direction };
        });
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const filteredData = sortedData.filter((item) =>
        Object.keys(item).some(
            (key) =>
            typeof item[key] === "string" &&
            item[key].toLowerCase().includes(search.toLowerCase())
        )
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterRef.current && !filterRef.current.contains(event.target) &&
                settingsButtonRef.current && !settingsButtonRef.current.contains(event.target) // Ignore settings button
            ) {
                setShowFilter(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex items-center space-x-2">
                <div className="relative flex bg-gray-100 rounded-lg px-3 py-2 w-72 border">
                <input
                    type="text"
                    placeholder="Search Table"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-grow bg-transparent focus:outline-none"
                />
                <div className="p-1 rounded-lg">
                    <SearchIcon size={18} />
                </div>
                <button
                    ref={settingsButtonRef} 
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="p-1 rounded-lg hover:bg-gray-200 relative"
                >
                    <SettingsIcon size={18} />
                </button>
                    {showFilter && (
                        <div ref={filterRef} className="absolute right-0 mt-10 w-48 bg-white shadow-lg rounded-lg p-2 z-10">
                            <p className="text-sm font-semibold mb-2">Columns to Display</p>
                            {Object.keys(visibleColumns).map((col) => (
                                <label key={col} className="flex items-center space-x-2 mb-1">
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns[col]}
                                        onChange={() => toggleColumn(col)}
                                    />
                                    <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    onClick={onAdd}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                + Add new
                </button>
            </div>
            </div>

            {/* Table Section */}
            <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
                <tr className="bg-gray-100">
                {columns.map((col) =>
                    visibleColumns[col.key] ? (
                    <th key={col.key} className="p-2 border cursor-pointer" onClick={() => handleSort(col.key)}>
                        {col.label} {sortConfig.key === col.key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                    </th>
                    ) : null
                )}
                <th className="p-2 border">Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((item) => (
                    <tr key={item.id} className="text-center border">
                        {columns.map((col) =>
                        visibleColumns[col.key] ? (
                            <td key={col.key} className="p-2 border">
                                {col.render 
                                ? col.render(item) // Use col.render if available
                                : customRender && customRender[col.key]
                                ? customRender[col.key](item[col.key], item) // Use customRender if provided
                                : item[col.key]} 
                            </td>
                        ) : null
                        )}
                        <td className="p-2 border">
                        <button
                            onClick={() => onEdit(item)}
                            className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
                        >
                            Edit
                        </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default Table;
