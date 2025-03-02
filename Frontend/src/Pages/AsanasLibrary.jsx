import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const AsanasLibrary = () => {
  const [asanas, setAsanas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  useEffect(() => {
    fetchAsanas();
  }, []);

  const fetchAsanas = async () => {
    try {
      const response = await fetch('https://yogasanas.onrender.com/api/asanas');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAsanas(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch asanas. Please try again later.');
      setLoading(false);
      console.error('Error fetching asanas:', err);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-96 text-white"><p className="text-xl">Loading asanas...</p></div>;
  
  if (error) return <div className="p-4 bg-red-600 text-white rounded mt-4">{error}</div>;

  // ✅ Filtering logic
  const filteredAsanas = asanas.filter(asana => 
    asana.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (difficultyFilter === "" || asana.difficulty === difficultyFilter)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Yoga Asanas Library</h1>
          <Link 
            to="/add-asana" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add New Asana
          </Link>
        </div>

        {/* ✅ Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for an asana..."
            className="w-full md:w-1/2 px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="w-full md:w-1/4 px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* ✅ Display Filtered Asanas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAsanas.length > 0 ? (
            filteredAsanas.map((asana) => (
              <div key={asana._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <img 
                  src={asana.imageUrl} 
                  alt={asana.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-2xl font-semibold mb-2 text-blue-400">{asana.name}</h2>
                  <p className="text-gray-300 text-sm">{asana.description}</p>
                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      asana.difficulty === 'Beginner' ? 'bg-green-600 text-white' :
                      asana.difficulty === 'Intermediate' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {asana.difficulty}
                    </span>
                  </div>
                  <Link 
                    to={`/asanas/${asana._id}`}
                    className="block mt-4 text-blue-500 hover:text-blue-400 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-700 p-8 text-center rounded-lg col-span-full">
              <p className="text-xl text-gray-300">No matching asanas found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AsanasLibrary;
