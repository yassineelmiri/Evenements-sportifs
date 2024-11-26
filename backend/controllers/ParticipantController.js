const Participant = require("../models/Participant");

// Créer un nouveau participant
exports.createParticipant = async (req, res) => {
  const { evenments, participants } = req.body;

  try {
    const newParticipant = new Participant({
      evenments,
      participants,
    });
    await newParticipant.save();
    res.status(201).json({ message: "Participant(s) ajouté(s) avec succès", newParticipant });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création des participants", error });
  }
};

// Récupérer tous les participants
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate("evenments"); // Populate with event details
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des participants", error });
  }
};

// Récupérer un participant spécifique
exports.getParticipantById = async (req, res) => {
  const { id } = req.params;

  try {
    const participant = await Participant.findById(id).populate("evenments");
    if (!participant) return res.status(404).json({ message: "Participant non trouvé" });
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du participant", error });
  }
};

// Mettre à jour un participant (ajouter/supprimer des participants)
exports.updateParticipant = async (req, res) => {
  const { id } = req.params;
  const { participants } = req.body;

  try {
    const participant = await Participant.findByIdAndUpdate(
      id,
      { participants },
      { new: true } // Return the updated document
    );
    if (!participant) return res.status(404).json({ message: "Participant non trouvé" });
    res.status(200).json({ message: "Participant mis à jour avec succès", participant });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du participant", error });
  }
};

// Supprimer un participant
exports.deleteParticipant = async (req, res) => {
  const { id } = req.params;

  try {
    const participant = await Participant.findByIdAndDelete(id);
    if (!participant) return res.status(404).json({ message: "Participant non trouvé" });
    res.status(200).json({ message: "Participant supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du participant", error });
  }
};
