"use client";

import { ReactNode } from "react";
import { HomeIcon, UserIcon, PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // Limpar localStorage
    localStorage.clear();

    // Limpar cookies (não é possível diretamente pelo JavaScript para cookies httpOnly, mas para cookies acessíveis via JS):
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirecionar para a página de login
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menu Lateral Esquerdo */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="p-4 text-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={170}
              height={170}
              className="h-10 w-auto"
            />
          </div>
          <nav className="mt-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  <HomeIcon className="w-5 h-5 mr-3" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/user"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  <UserIcon className="w-5 h-5 mr-3" />
                  User Management
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Botão Logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-md"
          >
            <PowerIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
