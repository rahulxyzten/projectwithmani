"use client";
import React, { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";

interface Admin {
  _id: string;
  email: string;
}

interface AdminTableProps {
  admins: Admin[];
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
}

const AdminTable: React.FC<AdminTableProps> = ({ admins, setAdmins }) => {
  const [email, setEmail] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);

  const handleAddAdmin = async (e: FormEvent) => {
    e.preventDefault();
    setAddingAdmin(true);
    try {
      const response = await fetch("/api/admin/new", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      if (response.ok) {
        toast("Admin added successfully");
        const newAdmin = await response.json();
        setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
        setEmail("");
      } else {
        toast("Failed to add admin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    const hasConfirmed = confirm("Are you sure you want to delete this admin");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/admin/${id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast("😔 Admin deleted successfully");
          const filteredPosts = admins.filter((p) => p._id !== id);
          setAdmins(filteredPosts);
        } else {
          toast("Failed to delete admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="mb-7 lg:ml-12 text-2xl xs:text-4xl font-bold text-white-800">
        Admins🫅🏻
      </h1>
      <div className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5 max-w-3xl mx-auto flex flex-col items-center justify-center mb-16 overflow-hidden">
        <Table
          className="whitespace-pre overflow-auto"
          removeWrapper
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>OPTION</TableColumn>
          </TableHeader>
          <TableBody>
            {admins.map((admin, index) => (
              <TableRow key={index}>
                <TableCell className="text-white">{admin._id}</TableCell>
                <TableCell className="text-white">{admin.email}</TableCell>
                <TableCell className="text-white">
                  <div
                    onClick={() => handleDeleteAdmin(admin._id)}
                    className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
                  >
                    <svg
                      className="w-4 stroke-red-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    <button className="font-semibold text-sm text-red-700">
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 w-full">
          <form
            onSubmit={handleAddAdmin}
            className="flex flex-col justify-center sm:flex-row items-center"
          >
            <Input
              type="email"
              className="mb-2 sm:mb-0 max-w-sm mr-3"
              variant="underlined"
              label="Email :"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-2 rounded active:scale-95 flex items-center justify-center gap-2"
            >
              {addingAdmin ? "Uploading..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminTable;
