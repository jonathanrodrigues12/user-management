"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import UserModal from "@/components/UserModal";
import { API_TOKEN, API_URL } from "@/config/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

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
  const [isUpdate, setIsUpdate] = useState(false); 
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchUsers = async (page: number) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
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

const handleAddUser = async (user: { name: string; email: string; password?: string }) => {
  try {
    const payload = { ...user }; 

    const response = await fetch(`${API_URL}/users/create-new-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error creating user.");
    }

    toast.success("User created successfully!");
    setIsModalOpen(false);
    fetchUsers(currentPage);
  } catch (error: any) {
    toast.error(error.message || "Error creating user.");
  }
};

  const fetchUserById = async (id: string) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching user data.");
      }

      const data: User = await response.json();
      setSelectedUser(data); 
      setIsUpdate(true);
      setIsModalOpen(true); 
    } catch (error) {
      throw new Error("Error fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`${API_URL}/users/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir o usuário.");
      }

      toast.success("User deleted successfully!");
      setIsDeleteModalOpen(false);
      fetchUsers(currentPage);
    } catch (error) {
      toast.error(error.message || "Failed to delete user.");
    }
  };

  const handleUpdateUser = async (user: { name: string; email: string }) => {
  try {
    const response = await fetch(`${API_URL}/users/${selectedUser?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error updating user.");
    }

    toast.success("User updated successfully!");
    setIsModalOpen(false);
    fetchUsers(currentPage);
  } catch (error: any) {
    toast.error(error.message || "Error updating user.");
  }
};

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
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
        <div className="flex space-x-2">
          <button
            onClick={() => fetchUserById(row.id)}
            className="rounded-md bg-gray-200 p-2 hover:bg-gray-300"
          >
            <PencilIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => handleOpenDeleteModal(row)}
            className="rounded-md bg-gray-200 p-2 hover:bg-red-300"
          >
            <TrashIcon className="h-5 w-5 text-red-600" />
          </button>
        </div>
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
          columns={columns || []}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={isUpdate ? handleUpdateUser : handleAddUser} 
          initialData={selectedUser || undefined}
          isUpdate={isUpdate}
        />
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Do you really want to delete this user?</h2>
            <div className="flex justify-end space-x-2">
              <button
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
