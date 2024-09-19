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

interface Offer {
  _id: string;
  offerDescription: string;
  youtubelink: string;
  cover: {
    public_id: string;
    url: string;
  };
}

interface OfferTableProps {
  recentOffer: Offer[];
  setRecentOffer: React.Dispatch<React.SetStateAction<Offer[]>>;
}

const OfferTable: React.FC<OfferTableProps> = ({
  recentOffer,
  setRecentOffer,
}) => {
  const [offer, setOffer] = useState({
    offerDescription: "",
    youtubelink: "",
    cover: {} as File,
  });
  const [addingOffer, setAddingOffer] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOffer({ ...offer, cover: file });
    }
  };

  const createOffer = async (e: FormEvent) => {
    e.preventDefault();

    if (recentOffer.length >= 1) {
      toast("You can add only one offer at a time.");
      setOffer({ offerDescription: "", youtubelink: "", cover: {} as File });
      return;
    }

    setAddingOffer(true);

    const presetKey = process.env.NEXT_PUBLIC_PRESET_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    if (!presetKey || !cloudName) {
      console.error("Cloudinary configuration is missing.");
      setAddingOffer(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", offer.cover);
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

        const response = await fetch("/api/offer/new", {
          method: "POST",
          body: JSON.stringify({
            offerDescription: offer.offerDescription,
            youtubelink: offer.youtubelink,
            cover: {
              public_id: imagePublicId,
              url: imageUrl,
            },
          }),
        });

        if (response.ok) {
          toast("Offer added successfully");
          const newOffer = await response.json();
          setRecentOffer((prevOffers) => [...prevOffers, newOffer]);
          setOffer({
            offerDescription: "",
            youtubelink: "",
            cover: {} as File,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddingOffer(false);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    const hasConfirmed = confirm("Are you sure you want to delete this offer");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/offer/${id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast("😔 Offer deleted successfully");
          const filteredOffers = recentOffer.filter((p) => p._id !== id);
          setRecentOffer(filteredOffers);
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
        Recent offer🎉
      </h1>
      <div className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5 max-w-3xl mx-auto flex flex-col items-center justify-center overflow-hidden">
        <Table
          className="whitespace-pre overflow-auto"
          removeWrapper
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>OFFER</TableColumn>
            <TableColumn>IMAGE</TableColumn>
            <TableColumn>OPTION</TableColumn>
          </TableHeader>
          <TableBody>
            {recentOffer.map((offer, index) => (
              <TableRow key={index}>
                <TableCell className="text-white">
                  {offer.offerDescription}
                </TableCell>
                <TableCell className="text-white">
                  <Image
                    width={100}
                    alt="NextUI hero Image"
                    src={offer.cover.url}
                  />
                </TableCell>
                <TableCell className="text-white">
                  <div
                    onClick={() => handleDeleteOffer(offer._id)}
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
            onSubmit={createOffer}
            className="sm:mx-5 flex flex-col justify-center items-center"
          >
            <Input
              type="text"
              className="mb-3"
              variant="underlined"
              label="Offer description / Youtube title :"
              value={offer.offerDescription}
              onChange={(e) =>
                setOffer({ ...offer, offerDescription: e.target.value })
              }
            />
            <Input
              type="text"
              className="mb-5"
              variant="underlined"
              label="Youtube link (not mandatory) :"
              value={offer.youtubelink}
              onChange={(e) =>
                setOffer({ ...offer, youtubelink: e.target.value })
              }
            />
            <div className="mt-2 w-full flex flex-col justify-center items-center sm:flex-row">
              <div className="w-full mr-3 sm:mb-2">
                <p className="mb-2 ml-1 text-sm text-gray-200">
                  Offer image / Youtube thumbnail :
                </p>
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
                {addingOffer ? "Uploading..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OfferTable;
