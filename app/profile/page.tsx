"use client";

import { useState } from "react";
import DistrictPicker from "../components/DistrictPicker";

const UserProfile = () => {
    const [selectedDistrict, setSelectedDistrict] = useState("")


    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firebaseId: "testFirebaseId123", // Replace with actual Firebase ID if available
        name: "John Doe",
        location: "New York, USA",
        district: "Bay Area",
        mobileNumber: "+1 234 567 890",
        institution: "ABC University",
        department: "Computer Science",
        year: 3,
        experience: 2,
        dateOfBirth: "2000-01-01",
        gender: "Male",
        description: "Enthusiastic learner and aspiring software developer.",
        isLookingFor: true,
        interestedSubjects: ["Programming", "Data Structures", "Algorithms"],
    });

    const setDistrict = (district:string) => {
        setFormData((prev) => ({ ...prev, ["district"]: district }));

    }



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleModalClose = () => {
        setIsEditing(false);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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

            setIsEditing(false); // Close the modal
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Profile Header */}
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
                            <p className="text-sm text-gray-500">Student</p>
                            <p className="text-sm">{formData.description}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleEditClick}>
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Profile</h3>
                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <DistrictPicker setDistrict={setDistrict} />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mobile Number</span>
                                </label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="select select-bordered w-full"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date of Birth</span>
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="modal-action">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
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
