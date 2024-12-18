import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleSkillSelect = (skill) => {
        setSelectedSkills((prevSkills) =>
            prevSkills.includes(skill)
                ? prevSkills.filter((s) => s !== skill)
                : [...prevSkills, skill]
        );
    };

    return (
        <div className="container mx-auto p-6 text-center mt-20">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
                Welcome to Job Finder
            </h1>
            <p className="text-gray-600 mb-6">
                Search and explore job opportunities tailored to your skills and interests.
            </p>



        </div>
    );
};

export default Hero;
