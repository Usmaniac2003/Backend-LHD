const mongoose = require("mongoose");
const passwordSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  oldPassword: {
    type: String,
    required: true,
    minLength: 8
  },
  newPassword: {
    type: String,
    required: true,
    minLength: 8
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function(confirmPassword) {
        // Check if confirmPassword matches newPassword
        return confirmPassword === this.newPassword;
      },
      message: "Confirm password does not match new password"
    }
  },
  qualityController:
  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
  }
});
module.exports = mongoose.model("changepassword", passwordSchema);
