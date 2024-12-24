"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DistrictPicker from "../components/DistrictPicker";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useUserStore } from "@/store/store";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { title } from "process";
import Image from "next/image";

const UserProfile = () => {

    const { user, userInfo } = useUserStore()
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [imageUrl, setImageUrl] = useState("")
    const [publicId, setPublicId] = useState("")



    const [formData, setFormData] = useState({
        firebaseId: user?.firebaseId || "",
        name: user?.name || "",
        location: userInfo?.location || "",
        district: userInfo?.district || "",
        mobileNumber: userInfo?.mobileNumber || "",
        institution: userInfo?.institution || "",
        userClass: userInfo?.userClass || 0,
        institutionName: userInfo?.institutionName || "",
        department: userInfo?.department || "",
        year: userInfo?.year || 0,
        experience: userInfo?.experience || 0,
        dateOfBirth: userInfo?.dateOfBirth
            ? new Date(userInfo.dateOfBirth).toISOString().split('T')[0] // Ensure it's YYYY-MM-DD
            : (() => {
                const currentDate = new Date();
                currentDate.setFullYear(currentDate.getFullYear() - 15);
                return currentDate.toISOString().split('T')[0]; // Default to 15 years back
            })(),
        gender: userInfo?.gender || "",
        description: userInfo?.description || "",
        isLookingFor: userInfo?.isLookingFor || false,
        interestedSubjects: userInfo?.interestedSubjects || [],
        profileImg: userInfo?.profileImg || ""
    });

    const setDistrict = (district: string) => {
        setFormData((prev) => ({ ...prev, district }));
    };

    function convertDateToReadableDate(date: string) {
        const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };

        return new Date(date).toLocaleDateString('en-US', options); // Formats the date as "1 January, 2001"
    }

    const handleImageUpload = async (result: CloudinaryUploadWidgetResults) => {
        console.log("result: ", result);

        const info = result.info as object;

        if ("public_id" in info && "secure_url" in info) {
            const url = info.secure_url as string;
            const public_id = info.public_id as string;

            setImageUrl(url);
            setPublicId(public_id)

            setFormData((prev) => ({
                ...prev,
                ["profileImg"]: url,

            }));

        }
    }

    useEffect(() => {
        const updateProfilePicture = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/user-info", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                setIsLoading(false);

                if (!res.ok) {
                    throw new Error("Failed to update Profile Picture");
                }

                setFormData((prev) => ({ ...prev, profileImg: imageUrl }));

                setIsEditing(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error updating user info:", error);
            }
        };

        if (imageUrl) {
            updateProfilePicture();
        } else {
            setImageUrl(userInfo?.profileImg || "")
        }
    }, [imageUrl]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let modifiedValue: any;
        if (name == "year" || name == "experience" || name == "userClass") {
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

    const removeImage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('api/removeImage', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicId })
            })

            if (res.ok) {
                setImageUrl("");
                setPublicId("");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const res = await fetch("/api/user-info", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            setIsLoading(false);

            if (!res.ok) {
                throw new Error("Failed to update user info");
            }


            const data = await res.json();

            const { id, ...dataWithoutId } = data

            setFormData(dataWithoutId)
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
                        <div className="avatar relative -left-28 -top-6 group/avatar">
                            <div className="w-28 rounded-full absolute">
                                {imageUrl && (
                                    <Image src={imageUrl} fill className="" alt={title} />
                                )}

                                {!imageUrl && (
                                    <img src="https://via.placeholder.com/150" />

                                )}
                            </div>
                            <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                className=" absolute z-50 left-16 top-2"
                                onUpload={handleImageUpload}
                                options={{
                                    resourceType: 'image', // Ensures only images are uploaded
                                    clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif'], // Allowed formats
                                    cropping: true,
                                    multiple: false,
                                }}>{imageUrl ? <RiDeleteBinLine onClick={removeImage} className="absolute w-6 h-6 top-2 left-5 p-1 bg-error rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer" /> : <MdEdit className="absolute w-6 h-6 top-2 left-5 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer" />}</CldUploadButton>


                        </div>
                        <div>
                            <h2 className="card-title text-xl">{formData?.name}</h2>
                            <p className="text-sm">{formData?.description}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                </div>
            </div>

            {!isEditing && (
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="card bg-base-100 w-full shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Educational information</h2>
                            <p>A student of {formData?.institutionName}</p>
                            <p>Institution name: {formData?.institutionName}</p>
                            <div>{formData?.institution == "University" ? <div> <p>Department: {formData?.department}</p>
                                <p className="mt-2">Year: {formData?.year}</p></div> : <div>
                                <p>Class: {formData?.userClass}</p>
                            </div>}</div>


                        </div>

                    </div>

                    <div className="card bg-base-100 w-full shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Contact</h2>
                            <p>Location: {formData?.location}</p>
                            <p>District: {formData?.district}</p>
                            <p>Mobile number: {formData?.mobileNumber}</p>
                        </div>

                    </div>
                    <div className="card bg-base-100 w-full shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Personal information</h2>
                            <p>Gender: {formData?.gender}</p>
                            {formData?.dateOfBirth && (
                                <p>Date of birth: {convertDateToReadableDate(formData.dateOfBirth)}</p>

                            )}
                            <p>Description: {formData?.description}</p>

                        </div>

                    </div>
                    <div className="card bg-base-100 w-full shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Want to {user?.role == "TEACHER" ? "teach" : "learn"}</h2>
                            <div>{formData?.isLookingFor ? <div className="flex lg:w-2/12 items-center">
                                <p>Availabe</p>
                                <FaCheck className="text-green-500 w-5 h-5" />
                            </div> : <div className="flex lg:w-2/12 items-center">
                                <p>Not Available</p>
                                <ImCross className="w-4 h-4 text-red-500" />
                            </div>}</div>
                            <p>Subjects: {formData?.interestedSubjects?.join(", ")}</p>
                            <p>Experience: {formData?.experience} {(formData?.experience || 0) < 2 ? "year" : "years"}</p>

                        </div>

                    </div>

                </div>



            )}

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
                                            name="userClass"
                                            value={formData.userClass}
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
                                            name="userClass"
                                            value={formData.userClass}
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

                                        <option value="" disabled>Select your gender</option>
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
                                <button type="submit" disabled={isLoading} className="btn btn-primary">
                                    {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Save"}
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
