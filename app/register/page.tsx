"use client";

import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

interface FormData {
    name: string;
    email: string;
    role: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        role: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter()

    const [nameErrorMessage, setNameErrorMessage] = useState<string>("");
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>("");
    const [areAllValid, setAreAllValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const provider = new GoogleAuthProvider();

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        validedForm();
        if (!areAllValid) return; // Prevent submission if form is not valid

        try {
            // 1. Create user with Firebase
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // 2. Call API to create user in the backend after Firebase registration
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firebaseId: userCredential.user.uid,
                    name: formData.name,
                    role: formData.role,
                    email: formData.email,
                    isGoogleLogin : false,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            router.replace("/api/dashboard")
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unknown error occurred");
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google Login Success");
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firebaseId: result.user.uid,
                    name: result.user.displayName,
                    role: formData.role,
                    email: result.user.email,
                    isGoogleLogin: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            router.replace("/dashboard")
            console.log('User registered successfully');
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unknown error occurred");
            }
        }
    };

    const validedForm = () => {
        setErrorMessage("");
        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password.trim() ||
            !formData.confirmPassword.trim()
        ) {
            setErrorMessage("Please Provide valid data !!!");
        }
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === "name") {
            validateName(value);
        } else if (name === "email") {
            validateEmail(value);
        } else if (name === "password") {
            validatePassword(value);
        } else if (name === "confirmPassword") {
            validateConfirmPassword(value);
        }
    };

    const validateName = (value: string) => {
        if (value.trim().length > 2) {
            setNameErrorMessage("");
        } else {
            setNameErrorMessage("Name must be at least 3 characters");
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
            setPasswordErrorMessage("");
        } else {
            setPasswordErrorMessage("Password must be at least 6 characters!");
        }
    };

    const validateConfirmPassword = (value: string) => {
        if (value === formData.password) {
            setConfirmPasswordErrorMessage("");
        } else {
            setConfirmPasswordErrorMessage("Password does not match!");
        }
    };

    useEffect(() => {
        if (nameErrorMessage) {
            setAreAllValid(false);
        } else if (
            formData.name &&
            formData.role &&
            formData.email &&
            formData.password &&
            formData.confirmPassword &&
            formData.password === formData.confirmPassword
        ) {
            setAreAllValid(true);
        } else {
            setAreAllValid(false);
        }
    }, [
        formData,
        nameErrorMessage,
        emailErrorMessage,
        passwordErrorMessage,
        confirmPasswordErrorMessage,
    ]);

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center gap-4">
            <div className="flex flex-col gap-4 items-center w-2/6">
                <div className=" text-4xl font-semibold">Register</div>

                <form className=" flex flex-col gap-2 w-full" onSubmit={submitHandler}>
                    {/* Form Fields (Name, Email, etc.) */}
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            required
                            className="grow"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                    </label>
                    <p className="text-sm text-red-500 font-semibold">{nameErrorMessage}</p>

                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="email"
                            required
                            className="grow"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    </label>
                    <p className="text-sm text-red-500 font-semibold">{emailErrorMessage}</p>

                    <label htmlFor="role" className="form-control w-full">
                        <select
                            className="select select-bordered"
                            required
                            id="role"
                            value={formData.role}
                            name="role"
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Role
                            </option>
                            <option value="TEACHER">Teacher</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </label>

                    <label className="input input-bordered mt-2 flex items-center gap-2">
                        <input
                            type="password"
                            required
                            className="grow"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </label>
                    <p className="text-sm text-red-500 font-semibold">{passwordErrorMessage}</p>

                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="password"
                            required
                            className="grow"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                    </label>
                    <p className="text-sm text-red-500 font-semibold">{confirmPasswordErrorMessage}</p>

                    {errorMessage && <div className="text-sm text-red-500 font-semibold">{errorMessage}</div>}

                    <button className="btn btn-success w-full" disabled={!areAllValid}>
                        Signup
                    </button>
                </form>

                <div className="flex items-center gap-2 mt-2 hover:cursor-pointer m-auto" onClick={() => {
                    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
                    if (modal) {
                        modal.showModal();
                    }
                }}>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <label htmlFor="role" className="form-control w-2/3">
                                <select
                                    className="select select-bordered"
                                    required
                                    id="role"
                                    value={formData.role}
                                    name="role"
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        Role
                                    </option>
                                    <option value="TEACHER">Teacher</option>
                                    <option value="STUDENT">Student</option>
                                </select>
                            </label>

                            <button className="btn btn-success btn-sm mt-2" onClick={handleGoogleLogin} disabled={!formData.role}>Submit</button>
                        </div>
                    </dialog>
                    <FaGoogle className="h-6 w-6" />
                    <p className=" text-lg font-semibold">Sign up with Google</p>
                </div>
            </div>

        </div>
    );
};

export default RegisterPage;
