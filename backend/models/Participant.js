const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  evenments: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  participants: { type: [String], required: true }, // Array of participants
});

module.exports = mongoose.model("Participant", ParticipantSchema);