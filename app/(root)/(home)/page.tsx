"use client";

import React, { Suspense, useState, useEffect } from "react";
import Feed from "@/components/Feed";
import OfferModel from "@/components/OfferModel";

interface Offer {
  _id: string;
  offerDescription: string;
  youtubelink: string;
  cover: {
    public_id: string;
    url: string;
  };
}

const page = () => {
  const [recentOffer, setRecentOffer] = useState<Offer[]>([]);

  const fetchOffers = async () => {
    try {
      const response = await fetch("api/offer", {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      const data = await response.json();
      setRecentOffer(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
        <Feed />
        {recentOffer.length === 1 && <OfferModel offer={recentOffer[0]} />}
      </main>
    </Suspense>
  );
};

export default page;
