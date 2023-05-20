const asycnHandler = require("express-async-handler");
const Guest = require("../models/guestMembersModel")

const addNewGuest = asycnHandler(async (req, res) => {
  let guest = await Guest.create(req.body);
  if (guest) {
    res.status(200).json(guest);
  }
});

const deleteGuest = asycnHandler(async (req, res) => {
  let guest = await Guest.findById(req.params.id);
  if (!guest) {
    res.status(400);
    throw new Error("Can not find the requested guest.");
  }
  await Guest.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Guest deleted." });
});

const getAllGuests = asycnHandler(async (req, res) => {
  const guests = await Guest.find({});
  if (guests) {
    res.status(200).json(guests);
  }
});

module.exports = {
  addNewGuest,
  deleteGuest,
  getAllGuests,
};
