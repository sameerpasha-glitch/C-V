import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from './components/Nav';
import Hero from './components/Hero';
import JobList from './components/JobList';
import Footer from './components/Footer';
import ListPage from './components/ListPage';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Router>
        {/* Navigation Bar */}
        <Nav />

        {/* Define Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Home Page with Hero and JobList */}
                <Hero />
                <JobList />
              </>
            }
          />
          <Route path="/jobs" element={<ListPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
