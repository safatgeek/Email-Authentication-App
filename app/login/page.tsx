"use client"

import { auth } from "@/firebase/firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { FaGoogle } from "react-icons/fa";

interface FormData {
    email: string;
    password: string;  
}

const loginPage = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });

    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("")

    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("")

    const [areAllValid, setAreAllValid] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<string>("")

    const provider = new GoogleAuthProvider()

    const router = useRouter()


    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        validedForm()
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            router.replace("/dashboard")
          } catch (error) {
            if (error instanceof Error) {
              setErrorMessage(error.message);
            } else {
              setErrorMessage("An unknown error occurred");
            }
          }

    }

 

    const handleGoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          router.replace("/dashboard")
          console.log("Google Login Success");
        } catch (error) {
          if (error instanceof Error) {
            setErrorMessage(error.message);
          } else {
            setErrorMessage("An unknown error occurred");
          }
        }
      };

    const validedForm = () => {
        setErrorMessage("")
        if (!formData.email.trim() || !formData.password.trim()) {
            setErrorMessage("Please Provide valid data !!!")
        }
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name == "email") {
            validateEmail(value)
        } else if (name == "password") {
            validatePassword(value)
        }
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format

        if (emailRegex.test(value)) {
            setEmailErrorMessage(""); // Clear the error message if valid
        } else {
            setEmailErrorMessage("Please enter a valid email address."); // Set error message if invalid
        }
    };

    const validatePassword = (value: string) => {
        if (value.length > 5) {
            setPasswordErrorMessage("")
        } else {
            setPasswordErrorMessage("Password must be at least 6 characters !")
        }
    }



    useEffect(() => {
        if (emailErrorMessage || passwordErrorMessage) {
            setAreAllValid(false)
        } else if (formData.email && formData.password) {
            setAreAllValid(true)
        } else {
            setAreAllValid(false);
        }
    }, [formData, emailErrorMessage, passwordErrorMessage])

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center gap-4">
            <div className=" text-4xl font-semibold">
                Register
            </div>

            <form className=" flex flex-col gap-2 w-2/5" onSubmit={submitHandler}>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>

                    <input type="email" required className="grow" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                </label>
                <p className="text-sm text-red-500 font-semibold">{emailErrorMessage}</p>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" required className="grow" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                </label>
                <p className="text-sm text-red-500 font-semibold">{passwordErrorMessage}</p>

                {
                    errorMessage && (
                        <div className="text-sm text-red-500 font-semibold">{errorMessage}</div>
                    )
                }
                <button className="btn btn-success w-full" disabled={!areAllValid}>Signup</button>

                <div className="flex items-center gap-2 mt-2 hover:cursor-pointer m-auto" onClick={handleGoogleLogin}>
                    <FaGoogle className="h-6 w-6"/>
                    <p className=" text-lg font-semibold">Sign in with google</p>

                </div>
            </form>


        </div>
    )
}

export default loginPage;