// import { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../components/Dash/Sidebar";

// const Settings = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     bio: "",
//     profilePicture: "",
//     fitnessGoals: "",
//     privacySettings: { showStats: true },
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("Unauthorized! Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get("https://yogasanas.onrender.com/api/users/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("🔹 User Profile:", response.data);
//         setUser(response.data);
//       } catch (err) {
//         console.error("🚨 Error fetching profile:", err);
//         setError("Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setUser((prev) => ({
//         ...prev,
//         privacySettings: { ...prev.privacySettings, [name]: checked },
//       }));
//     } else {
//       setUser((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUser((prev) => ({ ...prev, profilePicture: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const token = localStorage.getItem("token");
//       await axios.patch("https://yogasanas.onrender.com/api/users/profile", user, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("🚨 Error updating profile:", err);
//       alert("Failed to update profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar */}
//       <div className="bg-gray-900 text-white w-64">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-white">
//         <h2 className="text-2xl font-semibold text-center mb-5 text-gray-900">⚙️ Settings</h2>

//         <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
//           {/* Profile Picture */}
//           <div className="flex flex-col items-center mb-5">
//             <img
//               src={user.profilePicture || ""}
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-2 border-gray-400"
//             />
//             <input type="file" accept="image/*" className="mt-2 text-black" onChange={handleFileChange} />
//           </div>

//           {/* Name */}
//           <label className="block mb-2 text-gray-700">Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-4 text-black"
//           />

//           {/* Email (Read-only) */}
//           <label className="block mb-2 text-gray-700">Email:</label>
//           <input
//             type="email"
//             value={user.email}
//             disabled
//             className="w-full p-2 border rounded mb-4 bg-gray-200 cursor-not-allowed text-black"
//           />

//           {/* Bio */}
//           <label className="block mb-2 text-gray-700">Bio:</label>
//           <textarea
//             name="bio"
//             value={user.bio}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-4 text-black"
//           />

//           {/* Fitness Goals */}
//           <label className="block mb-2 text-gray-700">Fitness Goals:</label>
//           <input
//             type="text"
//             name="fitnessGoals"
//             value={user.fitnessGoals}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-4 text-black"
//           />

//           {/* Privacy Settings */}
//           <div className="flex items-center mb-4">
//             <input
//               type="checkbox"
//               name="showStats"
//               checked={user.privacySettings.showStats}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-gray-700">Show My Stats Publicly</label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={saving}
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//           >
//             {saving ? "Saving..." : "Save Changes"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Settings;
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Dash/Sidebar";

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
    fitnessGoals: "",
    privacySettings: { showStats: true },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized! Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://yogasanas.onrender.com/api/users/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("🔹 User Profile:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("🚨 Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setUser((prev) => ({
        ...prev,
        privacySettings: { ...prev.privacySettings, [name]: checked },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      await axios.patch("https://yogasanas.onrender.com/api/users/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("🚨 Error updating profile:", err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white relative flex">
        {loading ? (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-5 text-gray-900">⚙️ Settings</h2>

            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-5">
                <img
                  src={user.profilePicture || ""}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-gray-400"
                />
                <input type="file" accept="image/*" className="mt-2 text-black" onChange={handleFileChange} />
              </div>

              {/* Name */}
              <label className="block mb-2 text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4 text-black"
              />

              {/* Email (Read-only) */}
              <label className="block mb-2 text-gray-700">Email:</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full p-2 border rounded mb-4 bg-gray-200 cursor-not-allowed text-black"
              />

              {/* Bio */}
              <label className="block mb-2 text-gray-700">Bio:</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4 text-black"
              />

              {/* Fitness Goals */}
              <label className="block mb-2 text-gray-700">Fitness Goals:</label>
              <input
                type="text"
                name="fitnessGoals"
                value={user.fitnessGoals}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4 text-black"
              />

              {/* Privacy Settings */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="showStats"
                  checked={user.privacySettings.showStats}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Show My Stats Publicly</label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
