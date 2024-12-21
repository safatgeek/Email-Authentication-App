"use client"
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useUserStore } from "@/store/store";

const DashboardPage = () => {
    const { user } = useUserStore()
    return <div>Dashboard: {user?.name}</div>
};

export default DashboardPage;