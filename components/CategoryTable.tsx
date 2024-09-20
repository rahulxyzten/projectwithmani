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

interface Category {
  _id: string;
  categoryName: string;
}

interface CategoryTableProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  setCategories,
}) => {
  const [item, setItem] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();
    setAddingCategory(true);
    try {
      const response = await fetch("/api/category/new", {
        method: "POST",
        body: JSON.stringify({
          categoryName: item.trim().toLowerCase(),
        }),
      });

      if (response.ok) {
        toast("Category added successfully");
        const newCategory = await response.json();
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setItem("");
      } else {
        toast("Failed to add category");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddingCategory(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this category"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/category/${id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast("😔 Category deleted successfully");
          const filteredPosts = categories.filter((p) => p._id !== id);
          setCategories(filteredPosts);
        } else {
          toast("Failed to delete category");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="mb-7 lg:ml-12 text-2xl font-bold xs:text-4xl text-white-800">
        categories✨
      </h1>
      <div className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5 max-w-2xl mx-auto flex flex-col items-center justify-center mb-16 overflow-hidden">
        <Table
          className="max-w-xl whitespace-pre overflow-auto"
          removeWrapper
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>OPTION</TableColumn>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="text-white">{category._id}</TableCell>
                <TableCell className="text-white">
                  {category.categoryName}
                </TableCell>
                <TableCell className="text-white">
                  <div
                    onClick={() => handleDeleteCategory(category._id)}
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
            onSubmit={handleAddCategory}
            className="w-full flex flex-col justify-center sm:flex-row items-center"
          >
            <Input
              type="text"
              className="mb-2 sm:mb-0 max-w-sm sm:max-w-72 mr-3"
              variant="underlined"
              label="Category name :"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-2 rounded active:scale-95 flex items-center justify-center gap-2"
            >
              {addingCategory ? "Uploading..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryTable;
