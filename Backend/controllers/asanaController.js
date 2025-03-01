import Asana from "../models/asanaModel.js";

// ✅ 1. Get all yoga poses (Public Access)
export const getAllAsanas = async (req, res) => {
  try {
    const asanas = await Asana.find();
    res.status(200).json(asanas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch asanas", error: error.message });
  }
};

// ✅ 2. Get a single asana by ID (Public Access)
export const getAsanaById = async (req, res) => {
  try {
    const asana = await Asana.findById(req.params.asanaId);
    if (!asana) return res.status(404).json({ message: "Asana not found" });

    res.status(200).json(asana);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch asana", error: error.message });
  }
};

// ✅ 3. Add a new asana (Admin Only)
export const addAsana = async (req, res) => {
  try {
    const { name, description, difficulty, benefits, imageUrl } = req.body;
    const newAsana = new Asana({
      name,
      description,
      difficulty,
      benefits,
      imageUrl,
      createdBy: req.user.userId,
    });

    await newAsana.save();
    res
      .status(201)
      .json({ message: "Asana added successfully", asana: newAsana });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add asana", error: error.message });
  }
};

// ✅ 4. Update an asana (Admin Only)
export const updateAsana = async (req, res) => {
  try {
    const updatedAsana = await Asana.findByIdAndUpdate(
      req.params.asanaId,
      req.body,
      { new: true }
    );

    if (!updatedAsana)
      return res.status(404).json({ message: "Asana not found" });

    res
      .status(200)
      .json({ message: "Asana updated successfully", asana: updatedAsana });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update asana", error: error.message });
  }
};

// ✅ 5. Delete an asana (Admin Only)
export const deleteAsana = async (req, res) => {
  try {
    const deletedAsana = await Asana.findByIdAndDelete(req.params.asanaId);

    if (!deletedAsana)
      return res.status(404).json({ message: "Asana not found" });

    res.status(200).json({ message: "Asana deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete asana", error: error.message });
  }
};
