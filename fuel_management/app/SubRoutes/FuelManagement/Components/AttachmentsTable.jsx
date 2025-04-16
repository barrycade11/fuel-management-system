import React from "react";

const AttachmentsTable = ({ files, onDelete, onPreview }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-4 font-medium text-sm text-gray-600">
              File Name
            </th>
            <th className="text-left py-2 px-4 font-medium text-sm text-gray-600">
              Uploaded By
            </th>
            <th className="text-left py-2 px-4 font-medium text-sm text-gray-600">
              Date Uploaded
            </th>
            <th className="text-left py-2 px-4 font-medium text-sm text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file, index) => (
            <tr key={index} className="bg-blue-50">
              <td className="py-4 px-4">{file.name}</td>
              <td className="py-4 px-4">{file.uploadedBy || "N/A"}</td>
              <td className="py-4 px-4">{file.date || "N/A"}</td>
              <td className="py-4 px-4">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onPreview(file)}
                    className="text-blue-600 font-medium"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttachmentsTable;