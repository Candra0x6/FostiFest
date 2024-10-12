"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/services/auth";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await register(formData);
    toast({
      title: result.message,
      duration: 1000,
    });

    if (result.success) {
      setFormData({
        username: "",
        password: "",
      });
      router.push("/login");
    }
  };
  return (
    <div className="h-screen flex items-center justify-center w-full p-2">
      <div className="bg-white p-8 md:p-16 pb-12 md:pb-20 rounded-2xl shadow-lg relative max-w-screen-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Daftar Akun</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2 capitalize">Username</label>
            <input
              type="text"
              placeholder="Masukkan username Anda"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-sm py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 capitalize">Password</label>
            <input
              type="password"
              placeholder="Masukkan password Anda"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-sm py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 border border-blue-600 bg-blue-600 text-sm font-medium text-white hover:text-blue-600 hover:bg-white focus:outline-none focus:ring active:text-opacity-75 rounded transition-all duration-300"
          >
            Daftar
          </button>
          <p className="text-sm font-thin text-center mt-2">
            Sudah Punya Akun?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:underline hover:underline-offset-2 hover:text-blue-700"
            >
              Login Akun
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
