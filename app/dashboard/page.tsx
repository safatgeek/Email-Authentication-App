"use client"
import React, { useEffect, useState } from "react";
import firebase from "firebase-admin";
import { verifyTokenAndFetchUserInfo } from "@/utils/authUtils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const DashboardPage = () => {
    const [userId, setUserId] = useState<string>("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          
            setUserId(user?.uid || "")

        });
    
        return () => unsubscribe(); // Cleanup Firebase listener
      }, []);



    return <div>Dashboard: {userId} </div>
};

export default DashboardPage;