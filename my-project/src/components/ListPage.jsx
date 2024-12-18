import React, { useState, useEffect } from "react";
import './Loader.css';

const ListPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch jobs
    const fetchJobs = async () => {
        const url =
            "https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all";
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "1adb89eefemsh941826bb58040d3p125251jsnde6979537c29",
                "x-rapidapi-host": "jsearch.p.rapidapi.com",
            },
        };

        try {
            setLoading(true); // Show loader while fetching
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Failed to fetch job data.");
            }
            const result = await response.json();
            const sortedJobs = (result.data || []).sort((a, b) =>
                a.job_title.localeCompare(b.job_title) // Sorting jobs alphabetically by job title
            );
            setJobs((prevJobs) => [...prevJobs, ...sortedJobs]); // Append sorted jobs
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setError("Failed to load job listings. Please try again.");
        } finally {
            setLoading(false); // Hide loader
        }
    };

    // Fetch jobs initially and then at regular intervals
    useEffect(() => {
        fetchJobs(); // Initial fetch
        const interval = setInterval(fetchJobs, 3000); // Fetch every 30 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Group jobs by starting letter
    const groupedJobs = jobs.reduce((acc, job) => {
        const firstLetter = job.job_title.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(job);
        return acc;
    }, {});

    // Function to handle scrolling to a specific section
    const scrollToLetter = (letter) => {
        const element = document.getElementById(letter);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Job Listings</h2>

            {/* A-Z Scroller */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {Array.from(Array(26), (_, index) => {
                    const letter = String.fromCharCode(65 + index);
                    return (
                        <button
                            key={letter}
                            className="px-2 py-1 border rounded-lg hover:bg-blue-500"
                            onClick={() => scrollToLetter(letter)}
                        >
                            {letter}
                        </button>
                    );
                })}
            </div>

            {loading && <div className="loader text-center mt-8"></div>} {/* Loader */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Job Listings */}
            {Object.keys(groupedJobs).map((letter) => (
                <div key={letter} id={letter} className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{letter}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedJobs[letter].map((job, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {job.job_title || "Job Title"}
                                </h3>
                                <p className="text-gray-600 mb-3">
                                    {job.employer_name || "Company Name"}
                                </p>
                                <p className="text-gray-500">
                                    {job.job_city || "Location not specified"}
                                </p>
                                <a
                                    href={job.job_apply_link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Apply Now
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListPage;
