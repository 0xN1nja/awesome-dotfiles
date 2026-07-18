"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrefetchAll = ({ routes }: { routes: string[] }) => {
  const router = useRouter();

  useEffect(() => {
    routes.forEach((route) => router.prefetch(route));
  }, [routes, router]);

  return null;
};

export default PrefetchAll;
