"use client"

import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { FaGoogle } from "react-icons/fa";

interface FormData {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState<string>("")

    const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>("")

    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("")

    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("")

    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>("")

    const [areAllValid, setAreAllValid] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<string>("")

    const provider = new GoogleAuthProvider()


    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        validedForm()
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
                //   if (error.message.includes("email-already-in-use")) {
                //     setErrorMessage("Email Already Exits");
                //   } else {
                //     setErrorMessage(error.message);
                //   }
            } else {
                setErrorMessage("An unknown errr occured");
            }
        }

    }

 

    const handleGoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
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
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
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
        if (name == "firstName") {
            validateFirstName(value);
        } else if (name == "lastName") {
            validateLastName(value);
        } else if (name == "email") {
            validateEmail(value)
        } else if (name == "password") {
            validatePassword(value)
        } else if (name == "confirmPassword") {
            validateConfirmPassword(value)
        }
    };

    const validateFirstName = (value: string) => {
        if (value.trim().length >= 3) {
            setFirstNameErrorMessage("")
        } else {
            setFirstNameErrorMessage("First Name must be of at least 3 characters")
        }
    }

    const validateLastName = (value: string) => {
        if (value.trim().length > 2) {
            setLastNameErrorMessage("")
        } else {
            setLastNameErrorMessage("Last Name must be of at least 3 characters")
        }
    }

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

    const validateConfirmPassword = (value: string) => {
        if (value === formData.password) {
            setConfirmPasswordErrorMessage("")
        } else {
            setConfirmPasswordErrorMessage("Password does not match !")
        }
    }


    useEffect(() => {
        if (firstNameErrorMessage || lastNameErrorMessage) {
            setAreAllValid(false)
        } else if (formData.firstName && formData.lastName && formData.gender && formData.email && formData.password && formData.confirmPassword) {
            setAreAllValid(true)
        } else {
            setAreAllValid(false);
        }
    }, [formData, firstNameErrorMessage, lastNameErrorMessage, emailErrorMessage, passwordErrorMessage, confirmPasswordErrorMessage])

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
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" required className="grow" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />

                </label>
                <p className="text-sm text-red-500 font-semibold">{firstNameErrorMessage}</p>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>

                    <input type="text" required className="grow" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                </label>
                <p className="text-sm text-red-500 font-semibold">{lastNameErrorMessage}</p>

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


                <label htmlFor="gender" className="form-control w-full">
                    <select className="select select-bordered" required id="gender" value={formData.gender} name="gender" onChange={handleChange}>
                        <option value="" disabled>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                </label>
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
                    <input type="password" required className="grow" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                </label>
                <p className="text-sm text-red-500 font-semibold">{confirmPasswordErrorMessage}</p>

                {
                    errorMessage && (
                        <div className="text-sm text-red-500 font-semibold">{errorMessage}</div>
                    )
                }
                <button className="btn btn-success w-full" disabled={!areAllValid}>Signup</button>

                <div className="flex items-center gap-2 mt-2 hover:cursor-pointer m-auto" onClick={handleGoogleLogin}>
                    <FaGoogle className="h-6 w-6"/>
                    <p className=" text-lg font-semibold">Sign up with google</p>

                </div>
            </form>


        </div>
    )
}

export default RegisterPage;