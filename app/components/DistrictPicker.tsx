"use client"

import React, { useEffect, useState } from 'react'


const DistrictPicker = () => {

    const districts = [
        { name: "Bagerhat", value: "Bagerhat" },
        { name: "Bandarban", value: "Bandarban" },
        { name: "Barguna", value: "Barguna" },
        { name: "Barishal", value: "Barishal" },
        { name: "Bhola", value: "Bhola" },
        { name: "Bogura", value: "Bogura" },
        { name: "Brahmanbaria", value: "Brahmanbaria" },
        { name: "Chandpur", value: "Chandpur" },
        { name: "Chattogram", value: "Chattogram" },
        { name: "Chuadanga", value: "Chuadanga" },
        { name: "Cox's Bazar", value: "Cox's Bazar" },
        { name: "Cumilla", value: "Cumilla" },
        { name: "Dhaka", value: "Dhaka" },
        { name: "Dinajpur", value: "Dinajpur" },
        { name: "Faridpur", value: "Faridpur" },
        { name: "Feni", value: "Feni" },
        { name: "Gaibandha", value: "Gaibandha" },
        { name: "Gazipur", value: "Gazipur" },
        { name: "Gopalganj", value: "Gopalganj" },
        { name: "Habiganj", value: "Habiganj" },
        { name: "Jamalpur", value: "Jamalpur" },
        { name: "Jashore", value: "Jashore" },
        { name: "Jhalokati", value: "Jhalokati" },
        { name: "Jhenaidah", value: "Jhenaidah" },
        { name: "Joypurhat", value: "Joypurhat" },
        { name: "Khagrachari", value: "Khagrachari" },
        { name: "Khulna", value: "Khulna" },
        { name: "Kishoreganj", value: "Kishoreganj" },
        { name: "Kurigram", value: "Kurigram" },
        { name: "Kushtia", value: "Kushtia" },
        { name: "Lakshmipur", value: "Lakshmipur" },
        { name: "Lalmonirhat", value: "Lalmonirhat" },
        { name: "Madaripur", value: "Madaripur" },
        { name: "Magura", value: "Magura" },
        { name: "Manikganj", value: "Manikganj" },
        { name: "Meherpur", value: "Meherpur" },
        { name: "Moulvibazar", value: "Moulvibazar" },
        { name: "Munshiganj", value: "Munshiganj" },
        { name: "Mymensingh", value: "Mymensingh" },
        { name: "Naogaon", value: "Naogaon" },
        { name: "Narail", value: "Narail" },
        { name: "Narayanganj", value: "Narayanganj" },
        { name: "Narsingdi", value: "Narsingdi" },
        { name: "Natore", value: "Natore" },
        { name: "Netrokona", value: "Netrokona" },
        { name: "Nilphamari", value: "Nilphamari" },
        { name: "Noakhali", value: "Noakhali" },
        { name: "Pabna", value: "Pabna" },
        { name: "Panchagarh", value: "Panchagarh" },
        { name: "Patuakhali", value: "Patuakhali" },
        { name: "Pirojpur", value: "Pirojpur" },
        { name: "Rajbari", value: "Rajbari" },
        { name: "Rajshahi", value: "Rajshahi" },
        { name: "Rangamati", value: "Rangamati" },
        { name: "Rangpur", value: "Rangpur" },
        { name: "Satkhira", value: "Satkhira" },
        { name: "Shariatpur", value: "Shariatpur" },
        { name: "Sherpur", value: "Sherpur" },
        { name: "Sirajganj", value: "Sirajganj" },
        { name: "Sunamganj", value: "Sunamganj" },
        { name: "Sylhet", value: "Sylhet" },
        { name: "Tangail", value: "Tangail" },
        { name: "Thakurgaon", value: "Thakurgaon" }
    ];


    const [filteredDistricts, setFilterDistricts] = useState(districts)

    const [searchedDistrict, setSearchedDistrict] = useState("")

    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false)

    const [selectedDistrict, setSelectedDistrict] = useState("")

    const handleDistrict = () => {
        setIsPopupOpened((prev) => !prev)
    }

    useEffect(() => {
        let filteredItems = districts.filter((district) => district.name.toLowerCase().startsWith(searchedDistrict.toLowerCase()))

        if (!filteredItems) {
            filteredItems = districts
        }

        setFilterDistricts(filteredItems)

    }, [searchedDistrict])

    const selectHandler = (event:React.MouseEvent<HTMLParagraphElement>) => {
        setSelectedDistrict(event.currentTarget.innerText)
    }

    return (
        <div>
            <label htmlFor="district" className="form-control w-full">
                <div className=' relative'>
                    <p onClick={handleDistrict}>
                        Select District
                    </p>

                    <p>{selectedDistrict}</p>

                    {isPopupOpened && (
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" onChange={(e) => {
                                setSearchedDistrict(e.target.value)
                            }}/>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    )}

                    {isPopupOpened && (
                        <div className=' h-32 w-44 rounded border border-slate-500 overflow-y-scroll absolute bg-stone-800 p-2'>
                            {filteredDistricts.map((district) => (
                                <p className='overflow-y-auto' key={district.value} onClick={selectHandler}>{district.name}</p>
                            ))}
                        </div>
                    )}
                </div>
            </label>
        </div>
    )
}

export default DistrictPicker