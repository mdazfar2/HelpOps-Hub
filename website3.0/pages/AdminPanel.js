"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCogs, faChartBar, faBell, faLifeRing, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Overview from '@components/admin/dashboard/Overview';
import Blogs from '@components/admin/dashboard/Blogcreation';
import BlogCreation from '@components/admin/dashboard/Blogcreation';
import AllBlogs from '@components/admin/dashboard/AllBlogs';
import Image from 'next/image';

const Users = () => <div>Users Component</div>;
const Settings = () => <div>Settings Component</div>;
const Reports = () => <div>Reports Component</div>;
const Notifications = () => <div>Notifications Component</div>;
const HelpCenter = () => <div>Help Center Component</div>;

const MenuItem = ({ title, icon, children, isCollapsible, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          if (isCollapsible) setIsOpen(!isOpen);
          onClick();
        }}
        className="py-2 px-4 hover:bg-[#546a76] rounded flex items-center cursor-pointer justify-between"
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={icon} className="mr-2" />
          {title}
        </div>
        {isCollapsible && (
          <FontAwesomeIcon icon={faChevronDown} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </div>
      {isCollapsible && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pl-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const AdminPanel = ({authKey}) => {
  // State to keep track of the currently active component to display
  const [activeComponent, setActiveComponent] = useState(null);

  // State to determine if the admin panel should be shown
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // State to store the input key from the user
  const [inputKey, setInputKey] = useState("");

  // Handler function to manage the submission of the DB key
  const handleDbKeySubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Check if the entered key matches the expected authentication key
    if (inputKey === authKey) {
      // If keys match, show the admin panel
      setShowAdminPanel(true);
    } else {
      // If keys do not match, alert the user
      alert("Incorrect DB_KEY. Please try again.");
    }
  };

  // Handler function to set the currently active component
  const handleMenuClick = (component) => {
    // Set the active component based on the menu click
    setActiveComponent(component);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {!showAdminPanel ? (
          <div className="flex w-full items-center justify-center h-screen bg-gray-200">
            <div className="bg-gradient-to-t from-[#80b4bd] border-2 border-black border-dashed to-[#e5e6e7] p-16 py-32 rounded-lg shadow-lg text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to HelpOps Admin Panel</h1>
              <p className="mb-6 text-gray-600">Please enter the DB_KEY to access the admin panel</p>
              <form onSubmit={handleDbKeySubmit} className="flex flex-col items-center">
                <input
                  type="password"
                  id="dbKeyInput"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Enter DB_KEY"
                  className="p-2 border border-gray-300 rounded-md mb-4 w-64 text-center"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                  Submit
                </button>
              </form>
            </div>
          </div>
      ) : (
        <>
          {/* Sidebar */}
          <div className="w-64 bg-[#607f90] text-white flex flex-col fixed h-full">
            <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
            <Image
        src="/HelpOps-H Fevicon.webp" // Path to your image file
        alt="Logo"
        layout="fill" // Makes the image fill the container
        objectFit="contain" // Ensures the image is contained within the container without distortion
        className="rounded-xl" // Optional: Apply additional styles if needed
        draggable="false" // Prevents image dragging
      />              HelpOps Hub
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <MenuItem
                title="Dashboard"
                icon={faTachometerAlt}
                isCollapsible={true}
                onClick={() => {}}
              >
                <ul className="space-y-2 cursor-pointer">
                  <li className="py-2 px-4 hover:bg-[#546a76] rounded" onClick={() => handleMenuClick(<Overview />)}>
                    Overview
                  </li>
                  <li className="py-2 px-4 hover:bg-[#546a76] rounded" onClick={() => handleMenuClick(<Blogs />)}>
                    Blog Creation
                  </li>
                  <li className="py-2 px-4 hover:bg-[#546a76] rounded" onClick={() => handleMenuClick(<AllBlogs />)}>
                    All Blogs
                  </li>
                </ul>
              </MenuItem>
              <hr className="border-gray-700 my-2" />
              <MenuItem title="Users" icon={faUsers} isCollapsible={false} onClick={() => handleMenuClick(<Users />)} />
              <MenuItem title="Settings" icon={faCogs} isCollapsible={false} onClick={() => handleMenuClick(<Settings />)} />
              <hr className="border-gray-700 my-2" />
              <MenuItem title="Reports" icon={faChartBar} isCollapsible={false} onClick={() => handleMenuClick(<Reports />)} />
              <MenuItem title="Notifications" icon={faBell} isCollapsible={false} onClick={() => handleMenuClick(<Notifications />)} />
              <MenuItem title="Help Center" icon={faLifeRing} isCollapsible={false} onClick={() => handleMenuClick(<HelpCenter />)} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col ml-64">
            {/* Top bar */}
            <div className="flex justify-between items-center bg-white p-4 shadow-md">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-2 border border-gray-300 rounded-md flex-grow"
                />
                {/* <img
                  src="https://via.placeholder.com/40"
                  alt="Admin Profile"
                  className="w-10 h-10 rounded-full ml-4"
                /> */}
                 <Image
        src="https://dummyimage.com/600x300" // URL to your image
        alt="Admin Profile"
        layout="fill" // Fills the container
        objectFit="cover" // Ensures the image covers the container while preserving aspect ratio
        className="rounded-full" // Applies rounded corners
        draggable="false" // Prevents image dragging
      />
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-4">
              {activeComponent}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
