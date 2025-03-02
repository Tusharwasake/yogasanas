import User from "../models/User.js";

// ✅ Get Logged-in User Profile (Protected)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password -refreshToken"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update User Profile (Protected)
export const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, profilePicture, fitnessGoals } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;
    user.fitnessGoals = fitnessGoals || user.fitnessGoals;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get Another User's Profile
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update Privacy Settings (Protected)
export const updatePrivacySettings = async (req, res) => {
  try {
    const { showStats } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.privacySettings.showStats = showStats;
    await user.save();

    res.status(200).json({ message: "Privacy settings updated", user });
  } catch (error) {
    console.error("Error updating privacy settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
