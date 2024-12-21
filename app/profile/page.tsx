"use client";

import { useEffect, useState } from "react";
import DistrictPicker from "../components/DistrictPicker";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useUserStore } from "@/store/store";

const UserProfile = () => {

    const { user, userInfo } = useUserStore()
    const [isEditing, setIsEditing] = useState(false);

  

    const [formData, setFormData] = useState({
        firebaseId: user?.firebaseId || "",
        name: user?.name || "",
        location: userInfo?.location || "",
        district: userInfo?.district || "",
        mobileNumber: userInfo?.mobileNumber || "",
        institution: userInfo?.institution || "",
        class: userInfo?.class || 0,
        institutionName: userInfo?.department || "",
        department: "Computer Science",
        year: 3,
        experience: 2,
        dateOfBirth: "2000-01-01",
        gender: "Male", // Default value for gender
        description: "Enthusiastic learner and aspiring software developer.",
        isLookingFor: true,
        interestedSubjects: ["Programming", "Data Structures", "Algorithms"],
    });

    const setDistrict = (district: string) => {
        setFormData((prev) => ({ ...prev, district }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let modifiedValue: any;
        if (name == "year" || name == "experience") {
            modifiedValue = Number(value)
        } else {
            modifiedValue = value
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : modifiedValue,
        }));
    };


    const handleArrayChange = (index: number, value: string) => {
        const updatedSubjects = [...formData.interestedSubjects];
        updatedSubjects[index] = value;
        setFormData((prev) => ({ ...prev, interestedSubjects: updatedSubjects }));
    };

    const addSubject = () => {
        setFormData((prev) => ({
            ...prev,
            interestedSubjects: [...prev.interestedSubjects, ""],
        }));
    };

    const removeSubject = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            interestedSubjects: prev.interestedSubjects.filter((_, i) => i !== index),
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)

        try {
            const res = await fetch("/api/user-info", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to update user info");
            }

            const data = await res.json();
            console.log("User info updated successfully:", data);

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://via.placeholder.com/150" alt="Profile Picture" />
                            </div>
                        </div>
                        <div>
                            <h2 className="card-title text-xl">{formData.name}</h2>
                            <p className="text-sm">{formData.description}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Profile</h3>
                        <form className="space-y-4 flex flex-col" onSubmit={handleFormSubmit}>
                            <label className=" form-control w-full">
                                <div className=" label">
                                    <span className=" label-text">Name</span>
                                </div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="grow"
                                        placeholder="Add name" />
                                </label>
                            </label>

                            <label className=" form-control w-full">
                                <div className=" label">
                                    <span className=" label-text">Location</span>
                                </div>
                                <label className="input input-bordered flex items-center gap-2">

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="grow"
                                        placeholder="Add location"
                                    />
                                </label>

                            </label>

                            <label className=" form-control w-full">
                                <div className=" label">
                                    <span className=" label-text">District</span>
                                </div>

                                <DistrictPicker setDistrict={setDistrict} />

                            </label>


                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Mobile Number</span>
                                </div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        onBlur={(e) => {
                                            const isValid = /^(?:\+88|88)?01[3-9]\d{8}$/.test(e.target.value);
                                            if (!isValid) {
                                                alert("Please enter a valid Bangladeshi mobile number.");
                                            }
                                        }}
                                        className="grow"
                                        placeholder="Add mobile number"
                                    />
                                </label>
                            </label>


                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Are you a student of:</span>
                                </div>
                                <div className="flex gap-4">
                                    {["School", "College", "University", "Masters"].map((option) => (
                                        <label key={option} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="studentOf"
                                                value={option}
                                                checked={formData.institution === option}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, institution: e.target.value }))
                                                }
                                                className="radio radio-info"
                                            />
                                            <span className="text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </label>

                            <label className=" form-control w-full">
                                <div className=" label">
                                    <span className=" label-text">Institution Name</span>
                                </div>

                                <label className="input input-bordered flex items-center gap-2">

                                    <input
                                        type="text"
                                        name="institutionName"
                                        value={formData.institutionName}
                                        onChange={handleInputChange}
                                        className="grow"
                                        placeholder="Add Institution Name"
                                    />
                                </label>

                            </label>

                            {formData.institution == "University" && (
                                <label className=" form-control w-full">
                                    <div className=" label">
                                        <span className=" label-text">Department</span>
                                    </div>

                                    <label className="input input-bordered flex items-center gap-2">

                                        <input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            className="grow"
                                            placeholder="Add Department"
                                        />
                                    </label>

                                </label>


                            )}

                            {formData.institution == "University" && (

                                <label className=" form-control w-full">
                                    <div className=" label">
                                        <span className=" label-text">Year</span>
                                    </div>

                                    <label className="input input-bordered flex items-center gap-2">

                                        <input
                                            type="number"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            className="grow"
                                            placeholder="Add class"
                                            min={1}
                                            max={4}
                                        />
                                    </label>
                                </label>

                            )}



                            {formData.institution == "School" && (

                                <label className=" form-control w-full">
                                    <div className=" label">
                                        <span className=" label-text">Class</span>
                                    </div>

                                    <label className="input input-bordered flex items-center gap-2">

                                        <input
                                            type="number"
                                            name="class"
                                            value={formData.class}
                                            onChange={handleInputChange}
                                            className="grow"
                                            placeholder="Add class"
                                            min={1}
                                            max={10}
                                        />
                                    </label>
                                </label>
                            )}

                            {formData.institution == "College" && (

                                <label className=" form-control w-full">
                                    <div className=" label">
                                        <span className=" label-text">Class</span>
                                    </div>

                                    <label className="input input-bordered flex items-center gap-2">

                                        <input
                                            type="number"
                                            name="class"
                                            value={formData.class}
                                            onChange={handleInputChange}
                                            className="grow"
                                            placeholder="Add class"
                                            min={11}
                                            max={12}
                                        />
                                    </label>
                                </label>
                            )}

                            <label className=" form-control w-full">
                                <div className=" label">
                                    <span className=" label-text">Experience</span>
                                </div>

                                <label className="input input-bordered flex items-center gap-2">

                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className="grow"
                                        placeholder="Experience"
                                        min={0}
                                        max={10}
                                    />
                                </label>
                            </label>

                            <label className=" form-control w-full">
                                <div className=" label">
                                    <span className=" label-text">Date of birth</span>
                                </div>


                                <label className="input input-bordered flex items-center gap-2">

                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        className="grow"
                                    />

                                </label>
                            </label>

                            <label className=" form-control w-full">

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Gender</span>

                                    </div>
                                    <select
                                        className="select select-bordered"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>

                                    </select>

                                </label>
                            </label>

                            <label className=" form-control w-full">
                                <div className=" label">
                                    <span className=" label-text">Description</span>
                                </div>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered"
                                    placeholder="Add Description"
                                />
                            </label>

                            <label className=" form-control w-full">

                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <span className="label-text">Looking for Opportunities</span>
                                            {formData.isLookingFor && (
                                                <FaCheck className=" text-green-500 h-6 w-6" />
                                            )}

                                            {!formData.isLookingFor && (
                                                <ImCross className=" text-red-500 h-5 w-5" />
                                            )}


                                        </div>
                                        <input
                                            type="checkbox"
                                            name="isLookingFor"
                                            checked={formData.isLookingFor}
                                            onChange={handleInputChange}
                                            className="toggle"
                                        />
                                    </label>
                                </div>
                            </label>

                            <label className=" form-control w-full">
                                <div className=" label">
                                    <span className=" label-text">Interested Subjects</span>
                                </div>

                                <div>
                                    {formData.interestedSubjects.map((subject, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={subject}
                                                onChange={(e) => handleArrayChange(index, e.target.value)}
                                                className="input input-bordered"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSubject(index)}
                                                className="btn btn-error btn-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addSubject} className="btn btn-primary btn-sm mt-2">
                                        Add Subject
                                    </button>
                                </div>
                            </label>

                            <div className="modal-action">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
