import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAsanaForm = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'Beginner',
    benefits: [''],
    imageUrl: ''
  });

  // For demo purposes - check localStorage or your auth context in real app
  useEffect(() => {
    // This is a placeholder - in your actual app, get the role from your auth system
    const role = localStorage.getItem('userRole') || 'user';
    setUserRole(role);
    
    // Redirect if not authorized
    if (role !== 'super-admin' && role !== 'moderator') {
      setError('Access denied. You must be a super-admin or moderator to add asanas.');
    }
  }, []);

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

    setLoading(true);
    setError(null);

    try {
      // Get token from your auth system
      const token = localStorage.getItem('token'); // Example - use your actual auth method
      
      const response = await fetch('https://yogasanas.onrender.com/api/asanas', {
        method: 'POST',
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
      
      const data = await response.json();
      navigate(`/asanas/${data.asana._id}`);
    } catch (err) {
      setError(`Failed to add asana: ${err.message}`);
      setLoading(false);
      console.error('Error adding asana:', err);
    }
  };

  if (error && (userRole !== 'super-admin' && userRole !== 'moderator')) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => navigate('/asanas')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Asanas Library
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Asana</h1>
        
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
              placeholder="e.g., Padmasana"
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
              placeholder="Brief description of the asana"
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
                  placeholder="e.g., Improves flexibility"
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
              placeholder="https://example.com/asana-image.jpg"
            />
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/asanas')}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding...' : 'Add Asana'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsanaForm;