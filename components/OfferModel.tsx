"use client";

import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalBody, Image } from "@nextui-org/react";
import Link from "next/link";

interface Offer {
  _id: string;
  offerDescription: string;
  youtubelink: string;
  cover: {
    public_id: string;
    url: string;
  };
}

interface OfferModelProps {
  offer: Offer;
}

export default function OfferModel({ offer }: OfferModelProps) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenModal");
    const timer = setTimeout(() => {
      if (!hasSeenModal) {
        setOpenModal(true);
        sessionStorage.setItem("hasSeenModal", "true");
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  const handleModelClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      isOpen={openModal}
      backdrop="opaque"
      placement="center"
      onClose={handleModelClose}
    >
      <ModalContent>
        <ModalBody>
          <div className="flex my-7 flex-col w-full">
            <Image width={500} alt="Offer Image" src={offer.cover.url} />
            <div className="flex-col mt-2 justify-center items-center">
              <h3 className="text-2xl text-center font-semibold leading-none tracking-tight body-semibold w-full pt-2 text-gradient_purple-blue">
                {offer.offerDescription}
              </h3>
              {offer.youtubelink !== "" && (
                <Link
                  href={offer.youtubelink}
                  target="_blank"
                  className="mt-5 flex flex-col items-center justify-center"
                >
                  <button className="youtube-button">
                    <div className="svg-wrapper-1">
                      <div className="svg-wrapper">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span>Watch on YouTube</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
