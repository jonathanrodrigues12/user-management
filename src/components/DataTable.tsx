"use client";

import React, { ReactNode } from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: unknown, row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}


export default function DataTable<T>({
  data,
  columns,
  totalPages,
  currentPage,
  onPageChange,
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border rounded-lg bg-white shadow-md">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  className="px-4 py-2 text-left font-medium text-gray-700"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.key.toString()}
                    className="px-4 py-2 text-gray-600"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between">
        <button
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
