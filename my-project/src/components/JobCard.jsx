import React from "react";

const JobCard = ({ title, company, location }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{company}</p>
            <p className="text-gray-500 text-sm">{location}</p>
            <button className="mt-4 text-blue-500 font-medium hover:underline">
                View Details
            </button>
        </div>
    );
};

export default JobCard;
