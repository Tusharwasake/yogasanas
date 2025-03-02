import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Dash/Sidebar';

const AsanaDetails = () => {
  const { asanaId } = useParams();
  const navigate = useNavigate();
  const [asana, setAsana] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null); // In real app, get from authentication context
  
  // For demo purposes - check localStorage or your auth context in real app
  useEffect(() => {
    // This is a placeholder - in your actual app, get the role from your auth system
    const role = localStorage.getItem('userRole') || 'user'; // Default to regular user
    setUserRole(role);
    
    fetchAsanaDetails();
  }, [asanaId]);

  const fetchAsanaDetails = async () => {
    try {
      const response = await fetch(`https://yogasanas.onrender.com/api/asanas/${asanaId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAsana(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch asana details. Please try again later.');
      setLoading(false);
      console.error('Error fetching asana details:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this asana? This action cannot be undone.')) {
      return;
    }

    try {
      // Get token from your auth system
      const token = localStorage.getItem('token'); // Example - use your actual auth method
      
      const response = await fetch(`https://yogasanas.onrender.com/api/asanas/${asanaId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      navigate('/asanas');
    } catch (err) {
      setError(`Failed to delete asana: ${err.message}`);
      console.error('Error deleting asana:', err);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-96"><p className="text-xl">Loading asana details...</p></div>;
  
  if (error) return <div className="p-4 bg-red-100 text-red-700 rounded mt-4">{error}</div>;
  
  if (!asana) return <div className="p-4 bg-yellow-100 text-yellow-700 rounded mt-4">Asana not found</div>;

  const canEdit = userRole === 'super-admin' || userRole === 'moderator';
  const canDelete = userRole === 'super-admin';

  return (
    <div className="flex min-h-screen">
    {/* Sidebar */}
    <div className="bg-gray-900 text-white">
      <Sidebar/>
    </div>
    <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-6"></div>
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="flex justify-between p-4 bg-blue-50">
          <Link to="/asana-library" className="text-blue-600 hover:text-blue-800">
            ← Back to Library
          </Link>
          
          {(canEdit || canDelete) && (
            <div className="space-x-2">
              {canEdit && (
                <Link 
                  to={`/edit-asana/${asanaId}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
              )}
              
              {canDelete && (
                <button 
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className="md:flex">
          {asana.imageUrl && (
            <div className="md:w-1/2">
              <img 
                src={asana.imageUrl} 
                alt={asana.name} 
                className="w-full h-64 md:h-full object-cover"
              
              />
            </div>
          )}
          
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{asana.name}</h1>
            
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                asana.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                asana.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {asana.difficulty}
              </span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{asana.description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Benefits</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {asana.benefits.map((benefit, index) => (
                  <li key={index} className="mb-1">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AsanaDetails;