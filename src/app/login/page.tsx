"use client";
import UserModal from "@/components/UserModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { API_URL } from "@/config/api";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddUser = async (user: { name: string; email: string; password: string }) => {
    try {
      const response = await fetch(`${API_URL}/users/create-new-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Error creating user.");
      }

      toast.success("User registered successfully!");
      setIsModalOpen(false); // Fecha o modal após o cadastro
    } catch (error: any) {
      toast.error(error.message || "Failed to register user.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid Credencials");
      }

      const data = await response.json();
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + 60 * 60 * 1000);
       document.cookie = `token=${data.access_token}; path=/; expires=${expiryDate.toUTCString()}`;
      dispatch(login(data.access_token));
      
      toast.success("Login realizado com sucesso!");

      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Erro inesperado!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Entrar na Conta
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
              
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Não tem uma conta?{" "}
          <button
            onClick={() => setIsModalOpen(true)} // Abre o modal de cadastro
            className="text-blue-600 hover:underline"
          >
            Cadastre-se
          </button>
        </p>
      </div>
       {/* Modal de Cadastro */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser} 
      />
    </div>
  );
}
