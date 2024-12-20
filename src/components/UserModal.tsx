"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: { name: string; email: string; password?: string }) => Promise<void>;
  initialData?: { id?: string; name: string; email: string }; 
  isUpdate: boolean;
}

export default function UserModal({ isOpen, onClose, onSubmit, initialData, isUpdate }: UserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setEmail(initialData?.email || "");
      setPassword("");
      setConfirmPassword("");
    }
  }, [isOpen, initialData]);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!isUpdate) {
      // Validações apenas para criação
      if (!validatePassword(password)) {
        toast.error("The password must contain letters, numbers, special characters and at least 8 characters.");
        return;
      }

      if (!passwordsMatch) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    try {
      const payload = isUpdate
        ? { name, email } 
        : { name, email, password }; 

      await onSubmit(payload);

      toast.success(isUpdate ? "User updated successfully!" : "User created successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "An error occurred while saving the user.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{isUpdate ? "Update User" : "Add User"}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter the name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter the email"
              required
            />
          </div>
          {!isUpdate && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm ${
                    password && confirmPassword && passwordsMatch
                      ? "border-green-500"
                      : password && confirmPassword && !passwordsMatch
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter the password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm ${
                    password && confirmPassword && passwordsMatch
                      ? "border-green-500"
                      : password && confirmPassword && !passwordsMatch
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Confirm the password"
                  required
                />
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
