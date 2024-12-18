import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
            <p>&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
