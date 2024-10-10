"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { FaFileMedicalAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0, opacity: 1, scale: 1 },
    closed: { x: "-100%", opacity: 0, scale: 0.9 },
  };

  return (
    <div className="h-screen flex items-center relative">
      {/* Hover area */}
      <div
        className="w-4 h-full absolute left-0 top-0 z-10"
        onMouseEnter={() => setIsOpen(true)}
      />

      {/* Sidebar */}
      <motion.div
        className="w-80 bg-primary/[0.05] h-[98%] absolute left-0 shadow-lg shadow-black/10 rounded-r-2xl "
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            AIDoc Histori
          </h2>
          <ul className="space-y-2">
            <li className="p-2 hover:bg-primary hover:text-white hover:-translate-y-1 hover:translate-x-1 rounded-lg cursor-pointer flex transition-all duration-300 ease-in-out ">
              <FaFileMedicalAlt className="inline-block w-6 h-6 mr-2" />
              <span className="inline-block">Medical Record</span>
            </li>
            <li className="p-2 hover:bg-primary hover:text-white hover:-translate-y-1 hover:translate-x-1 rounded-lg cursor-pointer flex transition-all duration-300 ease-in-out ">
              <FaFileMedicalAlt className="inline-block w-6 h-6 mr-2" />
              <span className="inline-block">Medical Record</span>
            </li>
            <li className="p-2 hover:bg-primary hover:text-white hover:-translate-y-1 hover:translate-x-1 rounded-lg cursor-pointer flex transition-all duration-300 ease-in-out ">
              <FaFileMedicalAlt className="inline-block w-6 h-6 mr-2" />
              <span className="inline-block">Medical Record</span>
            </li>
            <li className="p-2 hover:bg-primary hover:text-white hover:-translate-y-1 hover:translate-x-1 rounded-lg cursor-pointer flex transition-all duration-300 ease-in-out ">
              <FaFileMedicalAlt className="inline-block w-6 h-6 mr-2" />
              <span className="inline-block">Medical Record</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
