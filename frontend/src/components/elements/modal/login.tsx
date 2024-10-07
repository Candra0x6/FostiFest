import React, { useState } from "react";

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
    const apiEndpoint = isRegistering ? "api/register" : "api/login";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`${isRegistering ? "Registration" : "Login"} failed`);
      }

      const data = await response.json();
      console.log(`${isRegistering ? "Registration" : "Login"} successful:`, data);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!open) return null;

  const formFields = [
    { name: "username", type: "text", placeholder: "Masukkan username Anda" },
    { name: "password", type: "password", placeholder: "Masukkan password Anda" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] text-primary bg-black bg-opacity-50">
      <div className="bg-white w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] p-8 md:p-16 pb-12 md:pb-20 rounded-2xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-blue-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">{isRegistering ? "Daftar" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {formFields.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm mb-2 capitalize">{item.name}</label>
              <input
                type={item.type}
                placeholder={item.placeholder}
                name={item.name}
                value={formData[item.name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-sm py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full p-2 border hover:border-blue-500 bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-medium text-white hover:bg-transparent hover:text-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-transparent hover:bg-clip-text focus:outline-none focus:ring active:text-opacity-75 rounded transition-all duration-300"
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
