"use client"

import { useState } from "react";


const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleModalClose = () => {
        setIsEditing(false);
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
                            <h2 className="card-title text-xl">John Doe</h2>
                            <p className="text-sm text-gray-500">Student</p>
                            <p className="text-sm">johndoe@example.com</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleEditClick}>
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Personal Information */}
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <h3 className="text-lg font-bold mb-2">Personal Information</h3>
                        <div className="space-y-2">
                            <p>Location: <span className="text-gray-600">New York, USA</span></p>
                            <p>Mobile: <span className="text-gray-600">+1 234 567 890</span></p>
                            <p>Date of Birth: <span className="text-gray-600">January 1, 2000</span></p>
                            <p>Gender: <span className="text-gray-600">Male</span></p>
                        </div>
                    </div>
                </div>

                {/* Educational/Professional Info */}
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <h3 className="text-lg font-bold mb-2">Educational/Professional Information</h3>
                        <div className="space-y-2">
                            <p>Institution: <span className="text-gray-600">ABC University</span></p>
                            <p>Department: <span className="text-gray-600">Computer Science</span></p>
                            <p>Year: <span className="text-gray-600">3rd Year</span></p>
                            <p>Experience: <span className="text-gray-600">2 years</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="card bg-base-100 shadow-md mt-6">
                <div className="card-body">
                    <h3 className="text-lg font-bold mb-2">Additional Information</h3>
                    <div className="space-y-2">
                        <p>Description: <span className="text-gray-600">Enthusiastic learner and aspiring software developer.</span></p>
                        <p>Looking for opportunities: <span className="text-green-600 font-bold">Yes</span></p>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Profile</h3>
                        <form className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered"
                                    defaultValue="John Doe"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your location"
                                    className="input input-bordered"
                                    defaultValue="New York, USA"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mobile Number</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your mobile number"
                                    className="input input-bordered"
                                    defaultValue="+1 234 567 890"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select className="select select-bordered w-full">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date of birth</span>
                                </label>
                               <div className="flex gap-4">
                               <input
                                    type="text"
                                    placeholder="Day"
                                    className="input w-36 input-bordered"
                                    defaultValue="21"
                                />
                                  <input
                                    type="text"
                                    placeholder="Month"
                                    className="input w-36 input-bordered"
                                    defaultValue="10"
                                />
                                  <input
                                    type="text"
                                    placeholder="Year"
                                    className="input w-36 input-bordered"
                                    defaultValue="2001"
                                />
                               </div>
                            </div>

                            


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Institution</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your institution"
                                    className="input input-bordered"
                                    defaultValue="ABC University"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Department</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your department"
                                    className="input input-bordered"
                                    defaultValue="CSE"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Year</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your Year"
                                    className="input input-bordered"
                                    defaultValue="2nd"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Experience</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your Expeience"
                                    className="input input-bordered"
                                    defaultValue="2 years"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    placeholder="Write a short description"
                                    defaultValue="Enthusiastic learner and aspiring software developer."
                                ></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered"
                                    defaultValue="johndoe@example.com"
                                    readOnly
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
