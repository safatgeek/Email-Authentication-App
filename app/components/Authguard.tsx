"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useAuthStore } from "@/store/store";
import { fetchUser } from "@/lib/api-calls";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { setIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (pathName === "/login" || pathName === "/register") {
        } else {
          router.replace("/login");
        }

        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        //get user-info API

        fetchUser(user.uid)

        if (pathName === "/login" || pathName === "/register") {
          router.replace("/dashboard");
        } else {
        }
      }

      // Set loading to false after 2-second delay
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });

    return () => unsubscribe(); // Cleanup Firebase listener
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">Pleae wait...</div>
    ); // Show loading while auth state is checked
  }

  return <>{children}</>; // Render children if authenticated
}