const mongoose = require("mongoose");

const guestMemberSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
    address: {
      city: {
        type: String,
      },
      subCity: {
        type: String,
      },
      woreda: {
        type: Number,
      },
      houseNumber: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Guest", guestMemberSchema);
