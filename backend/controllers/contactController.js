import Contact from "../models/Contact.js";

// 📥 GET all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean(); // ⚡ faster & safer

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch contacts",
      error: err.message,
    });
  }
};

// 📤 CREATE contact
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    // 🔒 Validation
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
    });

    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create contact",
      error: err.message,
    });
  }
};

// ❌ DELETE contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Contact deleted successfully",
      id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete contact",
      error: err.message,
    });
  }
};
