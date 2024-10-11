import { newSession } from "@/app/useSession";
import { encrypt } from "@/app/encypt";
import axios from "axios";
import { cookies } from "next/headers";
import React, { useState } from "react";
import { useCookies } from "@/app/useCookies";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Login: React.FC<ModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/user";

    if (isRegistering) {
      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const encryptedSession = async () => {
          await encrypt(response.data, "session");
        };

        if (response.status !== 201) {
          throw new Error("Registrasi failed");
        } else {
          encryptedSession();
        }

        window.alert("Registrasi berhasil! Silakan login");
        setFormData({
          username: "",
          password: "",
        });
      } catch (error) {
        console.error("Error:", error);
        window.alert("Registrasi gagal!");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/login",
          formData
        );
        if (response.status !== 201) {
          throw new Error("Login failed");
        }
        const users = response.data;
        const user = users.find(
          (u: { username: string; password: string }) =>
            u.username === formData.username && u.password === formData.password
        );
        if (user) {
          window.alert("Login berhasil!");
          window.location.href = "/chat";
          setFormData({
            username: "",
            password: "",
          });
        } else {
          window.alert("Username dan password tidak cocok");
        }
      } catch (error) {
        console.error("Error:", error);
        window.alert("Login gagal!");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] p-8 md:p-16 pb-12 md:pb-20 rounded-2xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-blue-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegistering ? "Daftar" : "Login"}
        </h2>
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
            {isRegistering ? "Daftar" : "Login"}
          </button>
          <p className="text-sm font-thin text-center mt-2">
            {isRegistering ? "Sudah memiliki akun?" : "Belum memiliki akun?"}{" "}
            <a
              href="#"
              onClick={() => setIsRegistering((prev) => !prev)}
              className="text-blue-500 hover:underline hover:underline-offset-2 hover:text-blue-700"
            >
              {isRegistering ? "Login sekarang" : "Daftar sekarang"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
