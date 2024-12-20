"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import UserModal from "@/components/UserModal";
import { API_URL } from "@/config/api";
import { PencilIcon } from "@heroicons/react/24/outline";


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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Flag para saber se é atualização
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: string) => {
    setLoading(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar os dados do usuário.");
      }

      const data: User = await response.json();
      setSelectedUser(data); // Preenche o estado com os dados do usuário
      setIsUpdate(true); // Define a flag para atualização
      setIsModalOpen(true); // Abre o modal
    } catch (error) {
      console.error(error.message || "Erro ao buscar usuário.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (user: { name: string; email: string; password: string }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) throw new Error("Token não encontrado");

    const response = await fetch(`${API_URL}/users/create-new-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar o usuário.");
    }

    await fetchUsers(currentPage); // Recarrega a lista de usuários
  };

  const handleUpdateUser = async (user: { name: string; email: string }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) throw new Error("Token não encontrado");

    const response = await fetch(`${API_URL}/users/${selectedUser?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o usuário.");
    }

    await fetchUsers(currentPage); // Recarrega a lista de usuários
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Nome" },
    { key: "email", header: "E-mail" },
    {
      key: "created_at",
      header: "Data de Criação",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "action",
      header: "Action",
      render: (_: any, row: User) => (
        <button
          onClick={() => fetchUserById(row.id)}
          className="rounded-md bg-gray-200 p-2 hover:bg-gray-300"
        >
          <PencilIcon className="h-5 w-5 text-gray-600" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          onClick={() => {
            setSelectedUser(null); // Limpa o usuário selecionado
            setIsUpdate(false); // Define para modo de criação
            setIsModalOpen(true); // Abre o modal
          }}
        >
          Add
        </button>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={isUpdate ? handleUpdateUser : handleAddUser}
        initialData={selectedUser}
        isUpdate={isUpdate} // Passa a flag para o modal
      />
    </div>
  );
}
