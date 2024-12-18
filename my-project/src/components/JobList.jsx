import React, { useState, useEffect } from "react";
import './Loader.css';

const JobList = () => {
    const [jobs, setJobs] = useState([]); // State to store job listings
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [query, setQuery] = useState(""); // State to store the search query
    const [isListening, setIsListening] = useState(false); // State to track microphone status
    const [page, setPage] = useState(1); // Page number for pagination

    // Setup for SpeechRecognition (Voice Input)
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    useEffect(() => {
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setQuery(transcript); // Set the voice input as the search query
        };

        recognition.onerror = (event) => {
            console.error("Error occurred in speech recognition:", event.error);
            setError("Error occurred while capturing voice input.");
        };

        return () => {
            recognition.stop(); // Clean up the recognition on component unmount
        };
    }, [recognition]);

    // Fetch Jobs function with pagination
    const fetchJobs = async () => {
        if (!query.trim()) {
            setError("Please enter a valid search term.");
            return;
        }

        const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
            query
        )}&page=${page}&num_pages=5&country=us&date_posted=all`;

        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "1adb89eefemsh941826bb58040d3p125251jsnde6979537c29", // Replace with your RapidAPI key
                "x-rapidapi-host": "jsearch.p.rapidapi.com",
            },
        };

        setLoading(true); // Show loader while fetching
        setError(null); // Clear previous errors
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Failed to fetch job data.");
            }
            const result = await response.json();
            setJobs((prevJobs) => [...prevJobs, ...(result.data || [])]); // Append new jobs
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setError("Failed to load job listings. Please try again.");
        } finally {
            setLoading(false); // Hide loader once fetching is done
        }
    };

    // Handle the search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        setJobs([]); // Reset jobs list
        setPage(1); // Reset to page 1 on new search
        fetchJobs(); // Fetch jobs
    };

    // Handle scroll to load more jobs when reaching the bottom
    const handleScroll = () => {
        const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
        if (bottom && !loading) {
            setPage((prevPage) => prevPage + 1); // Increment the page number to load next set of jobs
        }
    };

    // Trigger fetchJobs when page changes (for infinite scrolling)
    useEffect(() => {
        if (page > 1) {
            fetchJobs(); // Fetch next page when page number increments
        }
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll); // Add scroll event listener
        return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    }, [loading]); // Only when loading state changes

    const startListening = () => {
        recognition.start();
        setIsListening(true);
    };

    const stopListening = () => {
        recognition.stop();
        setIsListening(false);
    };

    return (
        <div className="container mx-auto p-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-4 justify-center">
                <input
                    type="text"
                    placeholder="Search for jobs (e.g., React Developer)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                />
                {/* Microphone Button */}
                <div className="justify-center mt-2">
                    <img
                        src={
                            isListening
                                ? 'https://cdn-icons-png.flaticon.com/128/14502/14502821.png' // "Stop" mic icon when listening
                                : 'https://cdn-icons-png.flaticon.com/128/12260/12260307.png' // Mic closed when not listening
                        }
                        alt={isListening ? "Stop Listening" : "Start Listening"}
                        onClick={isListening ? stopListening : startListening}
                        className="w-8 h-8 cursor-pointer"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Search
                </button>
            </form>

            {loading && <p className="text-center">Loading jobs...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Job Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
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

            {/* Loader displayed when more jobs are being fetched */}
            {loading && (
                <div className="flex justify-center mt-6">
                    <div className="loader"></div> {/* Custom Loader */}
                </div>
            )}
        </div>
    );
};

export default JobList;
