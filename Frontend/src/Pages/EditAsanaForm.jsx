import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAsanaForm = () => {
  const { asanaId } = useParams();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: '',
    benefits: [],
    imageUrl: ''
  });

  // For demo purposes - check localStorage or your auth context in real app
  useEffect(() => {
    // This is a placeholder - in your actual app, get the role from your auth system
    const role = localStorage.getItem('userRole') || 'user';
    setUserRole(role);
    
    // Fetch asana data
    fetchAsanaDetails();
  }, [asanaId]);

  const fetchAsanaDetails = async () => {
    try {
      const response = await fetch(`https://yogasanas.onrender.com/api/asanas/${asanaId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setFormData({
        name: data.name,
        description: data.description,
        difficulty: data.difficulty,
        benefits: data.benefits,
        imageUrl: data.imageUrl || ''
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch asana details. Please try again later.');
      setLoading(false);
      console.error('Error fetching asana details:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...formData.benefits];
    updatedBenefits[index] = value;
    setFormData({
      ...formData,
      benefits: updatedBenefits
    });
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, '']
    });
  };

  const removeBenefit = (index) => {
    const updatedBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      benefits: updatedBenefits
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty benefits
    const filteredBenefits = formData.benefits.filter(benefit => benefit.trim() !== '');
    
    if (filteredBenefits.length === 0) {
      setError('Please add at least one benefit');
      return;
    }

    // Create the payload with filtered benefits
    const payload = {
      ...formData,
      benefits: filteredBenefits
    };

    setSaving(true);
    setError(null);

    try {
      // Get token from your auth system
      const token = localStorage.getItem('token'); // Example - use your actual auth method
      
      const response = await fetch(`https://yogasanas.onrender.com/api/asanas/${asanaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      navigate(`/asanas/${asanaId}`);
    } catch (err) {
      setError(`Failed to update asana: ${err.message}`);
      setSaving(false);
      console.error('Error updating asana:', err);
    }
  };

  // Check if user has permission to edit
  if (userRole !== 'super-admin' && userRole !== 'moderator') {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>You must be a super-admin or moderator to edit asanas.</p>
        </div>
        <button 
          onClick={() => navigate(`/asanas/${asanaId}`)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Asana Details
        </button>
      </div>
    );
  }

  if (loading) return <div className="flex justify-center items-center h-96"><p className="text-xl">Loading asana details...</p></div>;
  
  if (error && !saving) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => navigate(`/asanas/${asanaId}`)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Asana Details
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Asana: {formData.name}</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Asana Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="difficulty">
              Difficulty Level*
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Benefits*
            </label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="ml-2 bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200 transition"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBenefit}
              className="mt-1 text-blue-600 hover:text-blue-800"
            >
              + Add Another Benefit
            </button>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(`/asanas/${asanaId}`)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAsanaForm;