"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SellerRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {

    const user =
      localStorage.getItem("user");

    if (!user) {

      router.push("/login");
      return;

    }

    const parsed =
      JSON.parse(user);

    if (
      parsed.role !== "SELLER" &&
      parsed.role !== "ADMIN"
    ) {

      router.push("/");

    }

  }, [router]);

  return <>{children}</>;
}