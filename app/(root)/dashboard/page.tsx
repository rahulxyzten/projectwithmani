"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminTable from "@/components/AdminTable";
import CategoryTable from "@/components/CategoryTable";
import OfferTable from "@/components/OfferTable";

interface Admin {
  _id: string;
  email: string;
}

interface Category {
  _id: string;
  categoryName: string;
}

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
  const router = useRouter();
  const { data: session } = useSession();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentOffer, setRecentOffer] = useState<Offer[]>([]);

  useEffect(() => {
    // Redirect if not an admin
    if (!session?.user?.isAdmin) {
      router.push("/");
      return;
    }
  }, [session, router]);

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/admin", {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category", {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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
    fetchAdmins();
    fetchCategories();
    fetchOffers();
  }, []);

  return (
    <section className="flex-center paddings mx-auto max-w-screen-lg flex-col">
      <div className="nav-padding w-full">
        <AdminTable admins={admins} setAdmins={setAdmins} />
        <CategoryTable categories={categories} setCategories={setCategories} />
        <OfferTable recentOffer={recentOffer} setRecentOffer={setRecentOffer} />
      </div>
    </section>
  );
};

export default page;
