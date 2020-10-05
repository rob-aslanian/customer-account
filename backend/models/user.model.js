const mongose = require('mongoose'),
  Shcema = mongose.Schema;

let UserSchema = Shcema(
  {
    first_name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    last_name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    personal_number: {
      type: String,
      required: true,
      unique: true,
      minlength: 11,
      maxlength: 11,
    },
    phone: {
      type: Number,
      required: true,
      min: 500000000,
      max: 599999999,
    },
    legal_address: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    actual_address: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongose.model('User', UserSchema);
