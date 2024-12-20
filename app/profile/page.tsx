"use client";

import { useState } from "react";
import DistrictPicker from "../components/DistrictPicker";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firebaseId: "testFirebaseId123",
        name: "John Doe",
        location: "New York, USA",
        district: "Bay Area",
        mobileNumber: "+1 234 567 890",
        institution: "ABC University",
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







                            <label className="input input-bordered flex items-center gap-2">
                                Mobile Number:
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="Add mobile number"
                                />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Department:
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="Department"
                                />
                            </label>



                            <label className="input input-bordered flex items-center gap-2">
                                Academic year:
                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="Add year"
                                />
                            </label>


                            <label className="input input-bordered flex items-center gap-2">
                                Experience:
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="Experience"
                                />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Date of birth:
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="grow"
                                />

                            </label>



                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Select gender</span>

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




                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="textarea textarea-bordered"
                                placeholder="Description"
                            />
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Looking for Opportunities</span>
                                    <input
                                        type="checkbox"
                                        name="isLookingFor"
                                        checked={formData.isLookingFor}
                                        onChange={handleInputChange}
                                        className="toggle"
                                    />
                                </label>
                            </div>
                            <div>
                                <h4>Interested Subjects</h4>
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
