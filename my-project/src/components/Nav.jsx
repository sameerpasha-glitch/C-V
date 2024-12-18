import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-500">
                    <Link to="/">JobFinder</Link>
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                    <Link to="/">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            Home
                        </button>
                    </Link>
                    <Link to="/jobs">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Explore Jobs
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
