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
  Image,
} from "@nextui-org/react";

interface Upi {
  _id: string;
  scannerImg: {
    public_id: string;
    url: string;
  };
}

interface UpiTableProps {
  recentScanner: Upi[];
  setRecentScanner: React.Dispatch<React.SetStateAction<Upi[]>>;
}

const UpiTable: React.FC<UpiTableProps> = ({
  recentScanner,
  setRecentScanner,
}) => {
  const [upi, setUpi] = useState({
    scannerImg: {} as File,
  });
  const [addingScanner, setAddingScanner] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUpi({ ...upi, scannerImg: file });
    }
  };

  const createScanner = async (e: FormEvent) => {
    e.preventDefault();

    if (recentScanner.length >= 1) {
      toast("You can add only one scanner at a time.");
      setUpi({ scannerImg: {} as File });
      return;
    }

    setAddingScanner(true);

    const presetKey = process.env.NEXT_PUBLIC_PRESET_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    if (!presetKey || !cloudName) {
      console.error("Cloudinary configuration is missing.");
      setAddingScanner(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", upi.scannerImg);
      data.append("upload_preset", presetKey);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (cloudRes) {
        const resData = await cloudRes.json();

        const imagePublicId = resData.public_id;
        const imageUrl = resData.secure_url;

        const response = await fetch("/api/upi/new", {
          method: "POST",
          body: JSON.stringify({
            scannerImg: {
              public_id: imagePublicId,
              url: imageUrl,
            },
          }),
        });

        if (response.ok) {
          toast("Scanner added successfully");
          const newOffer = await response.json();
          setRecentScanner((prevScanners) => [...prevScanners, newOffer]);
          setUpi({
            scannerImg: {} as File,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddingScanner(false);
    }
  };

  const handleDeleteScanner = async (id: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this scanner"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/upi/${id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast("😔 Scanner deleted successfully");
          const filteredScanners = recentScanner.filter((p) => p._id !== id);
          setRecentScanner(filteredScanners);
        } else {
          toast("Failed to delete scanner");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="mb-7 lg:ml-12 text-2xl font-bold xs:text-4xl text-white-800">
        UPI scanner📄
      </h1>
      <div className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5 max-w-3xl mx-auto flex flex-col items-center justify-center overflow-hidden">
        <Table
          className="whitespace-pre overflow-auto"
          removeWrapper
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>IMAGE</TableColumn>
            <TableColumn>OPTION</TableColumn>
          </TableHeader>
          <TableBody>
            {recentScanner.map((scanner, index) => (
              <TableRow key={index}>
                <TableCell className="text-white">
                  <Image
                    width={200}
                    alt="NextUI hero Image"
                    src={scanner.scannerImg.url}
                  />
                </TableCell>
                <TableCell className="text-white">
                  <div
                    onClick={() => handleDeleteScanner(scanner._id)}
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
            onSubmit={createScanner}
            className="sm:mx-5 flex flex-col justify-center items-center"
          >
            <div className="mt-2 w-full flex flex-col justify-center items-center sm:flex-row">
              <div className="w-full mr-3 sm:mb-2">
                <p className="mb-2 ml-1 text-sm text-gray-200">Scanner Img:</p>
                <Input
                  type="file"
                  className="mb-2 sm:mb-0 sm:max-w-xl"
                  variant="underlined"
                  placeholder=" "
                  onChange={handleImage}
                />
              </div>

              <button
                type="submit"
                className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-2 rounded active:scale-95 flex items-center justify-center gap-2"
              >
                {addingScanner ? "Uploading..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpiTable;
