"use client"

import { auth } from "@/firebase/firebase";
import { useAuthStore } from "@/store/store";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const router = useRouter();

    const { isAuthenticated } = useAuthStore()

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    const handleLogout = async () => {


        try {
            await signOut(auth); // Signs the user out of Firebase
            //   await fetch("/api/logout"); // Call the logout API route to delete the cookie
            router.replace("/login"); // Redirect to login page after logout
        } catch (error) {
            if (error instanceof Error) {
                console.error("Logout error:", error.message);
            } else {
                console.error("Unknown error");
            }
        }
    };

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    {isAuthenticated && (
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><Link href={"/"}>Home</Link></li>
                                <li><a>Portfolio</a></li>
                                <li><a>About</a></li>
                            </ul>


                        </div>
                    )}
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">BD tution</a>
                </div>
                <div className="navbar-end">

                    <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {isAuthenticated && (
                        <button className="btn btn-ghost btn-circle">

                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>

                        </button>
                    )}

                    {isAuthenticated && (
                        <div className="relative ml-2">

                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="avatar placeholder cursor-pointer" onClick={toggleMenu}>
                                        <div className="bg-neutral text-neutral-content w-12 rounded-full">
                                            <span>SY</span>
                                        </div>
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow absolute -left-44 top-14">
                                    <li><Link href={"/profile"}>Profile</Link></li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>


                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar