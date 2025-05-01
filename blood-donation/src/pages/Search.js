/*import React, { useState } from 'react';
import { Search, MapPin, Droplets, Clock } from 'lucide-react';
import Header from '../components/Header';
import './Search.css'; // Ensure this file exists
// Define the structure of a donor object using comments for clarity
// Donor object example:
// {
//   id: 1,
//   name: "John Doe",
//   bloodType: "A+",
//   location: "City, State",
//   availability: "Available",
//   lastDonation: "YYYY-MM-DD",
//   contact: "Phone Number",
//   image: "Image URL"
// }

const initialDonors = [
  {
    id: 1,
    name: "Sarah Johnson",
    bloodType: "A+",
    location: "New York, NY",
    availability: "Available",
    lastDonation: "2024-01-15",
    contact: "+1 (555) 123-4567",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    name: "Michael Chen",
    bloodType: "O-",
    location: "San Francisco, CA",
    availability: "Available in 2 weeks",
    lastDonation: "2024-02-20",
    contact: "+1 (555) 987-6543",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    bloodType: "B+",
    location: "Miami, FL",
    availability: "Available",
    lastDonation: "2024-01-30",
    contact: "+1 (555) 456-7890",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const donors = initialDonors;

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodType = !selectedBloodType || donor.bloodType === selectedBloodType;
    const matchesLocation = !selectedLocation || donor.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesBloodType && matchesLocation;
  });

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-red-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Blood Donor Search</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name"
                className="pl-10 w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

           \
            <div className="relative">
              <Droplets className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="pl-10 w-full p-2 border rounded-md appearance-none"
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
              >
                <option value="">All Blood Types</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by location"
                className="pl-10 w-full p-2 border rounded-md"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map(donor => (
            <div key={donor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={donor.image}
                    alt={donor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{donor.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{donor.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Blood Type:</span>
                    <span className="font-semibold text-red-600">{donor.bloodType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">{donor.availability}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Donation:</span>
                    <span>{donor.lastDonation}</span>
                  </div>
                </div>

                <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors">
                  Contact Donor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Search;  
*/

import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, Droplets, Clock } from 'lucide-react';
// import Header from '../components/Header';
import './Search.css';

const donorsPerPage = 6;

const initialDonors = [
  {
    id: 1, name: "Sarah Johnson", bloodType: "A+", location: "New York, NY", availability: "Available",
    lastDonation: "2024-01-15", contact: "+1 (555) 123-4567", image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2, name: "Michael Chen", bloodType: "O-", location: "San Francisco, CA", availability: "Available in 2 weeks",
    lastDonation: "2024-02-20", contact: "+1 (555) 987-6543", image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3, name: "Emily Rodriguez", bloodType: "B+", location: "Miami, FL", availability: "Available",
    lastDonation: "2024-01-30", contact: "+1 (555) 456-7890", image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4, name: "David Kim", bloodType: "AB+", location: "Chicago, IL", availability: "Available",
    lastDonation: "2024-02-10", contact: "+1 (555) 789-0123", image: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 5, name: "Anna Singh", bloodType: "O+", location: "Dallas, TX", availability: "Available in 1 week",
    lastDonation: "2024-03-01", contact: "+1 (555) 321-6547", image: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    id: 6, name: "James Lee", bloodType: "A-", location: "Seattle, WA", availability: "Available",
    lastDonation: "2024-01-05", contact: "+1 (555) 654-0987", image: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    id: 7, name: "Maria Gonzalez", bloodType: "B-", location: "Boston, MA", availability: "Available",
    lastDonation: "2024-03-05", contact: "+1 (555) 888-1234", image: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    id: 8, name: "John Smith", bloodType: "AB-", location: "Denver, CO", availability: "Available in 3 weeks",
    lastDonation: "2024-02-18", contact: "+1 (555) 444-5555", image: "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
    id: 9, name: "Linda Carter", bloodType: "A+", location: "Atlanta, GA", availability: "Available",
    lastDonation: "2024-03-10", contact: "+1 (555) 333-2222", image: "https://randomuser.me/api/portraits/women/9.jpg"
  },
  {
    id: 10, name: "Chris Evans", bloodType: "O+", location: "Houston, TX", availability: "Available",
    lastDonation: "2024-03-15", contact: "+1 (555) 111-0000", image: "https://randomuser.me/api/portraits/men/10.jpg"
  }
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDonors = initialDonors.filter(donor => {
    return (
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedBloodType || donor.bloodType === selectedBloodType) &&
      (!selectedLocation || donor.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredDonors.length / donorsPerPage);
  const startIndex = (currentPage - 1) * donorsPerPage;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + donorsPerPage);

  const changePage = (page) => setCurrentPage(page);
  const resetPage = () => setCurrentPage(1);

  return (
    <>
      {/* <Header /> */}
      <div className="search-page">
        <div className="search-header">
          <Droplets size={24} />
          <h1>Blood Donor Search</h1>
        </div>

        <div className="filters">
          <div className="filter">
            <SearchIcon size={16} className="icon" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); resetPage(); }}
            />
          </div>

          <div className="filter">
            <Droplets size={16} className="icon" />
            <select
              value={selectedBloodType}
              onChange={(e) => { setSelectedBloodType(e.target.value); resetPage(); }}
            >
              <option value="">All Blood Types</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter">
            <MapPin size={16} className="icon" />
            <input
              type="text"
              placeholder="Filter by location"
              value={selectedLocation}
              onChange={(e) => { setSelectedLocation(e.target.value); resetPage(); }}
            />
          </div>
        </div>

        <div className="donor-grid">
          {paginatedDonors.length === 0 ? (
            <p className="no-results">No donors found.</p>
          ) : (
            paginatedDonors.map(donor => (
              <div className="donor-card" key={donor.id}>
                <img src={donor.image} alt={donor.name} className="avatar" />
                <h3>{donor.name}</h3>
                <p><MapPin size={14} /> {donor.location}</p>
                <p><strong>Blood Type:</strong> {donor.bloodType}</p>
                <p><strong>Availability:</strong> {donor.availability}</p>
                <p><strong>Last Donation:</strong> {donor.lastDonation}</p>
                <button className="contact-btn">Contact Donor</button>
              </div>
            ))
          )}
        </div>

        {filteredDonors.length > donorsPerPage && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>Prev</button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => changePage(currentPage + 1)}>Next</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

