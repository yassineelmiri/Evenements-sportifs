const express = require("express");
const router = express.Router();
const ParticipantController = require("../controllers/ParticipantController");

// Créer un nouveau participant
router.post("/", ParticipantController.createParticipant);

// Récupérer tous les participants
router.get("/", ParticipantController.getAllParticipants);

// Récupérer un participant spécifique par ID
router.get("/:id", ParticipantController.getParticipantById);

// Mettre à jour un participant
router.put("/:id", ParticipantController.updateParticipant);

// Supprimer un participant
router.delete("/:id", ParticipantController.deleteParticipant);

module.exports = router;
