"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { API_URL } from "@/config/api";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface ApiResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page: number) => {
    setLoading(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`${API_URL}/users?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: ApiResponse = await response.json();

      setUsers(data.data);
      setTotalPages(Math.ceil(data.total / data.limit)); // Calcula o total de páginas
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
   
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Usuários</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
