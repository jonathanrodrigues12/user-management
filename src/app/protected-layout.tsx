"use client";
import { ReactNode } from "react";
import {  HomeIcon, UserIcon } from "@heroicons/react/24/outline";



export default function ProtectedLayout({ children }: { children: ReactNode }) {

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menu Lateral Esquerdo */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Ecme</h1>
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
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
