const mongose = require('mongoose'),
  Shcema = mongose.Schema;

let AccountSchema = Shcema({
  user_id: {
    type: mongose.Types.ObjectId,
    required: true,
  },
  account_type: {
    type: String,
    enum: ['current', 'saving', 'accumulation'],
    required: true,
  },
  currency: {
    type: Array,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongose.model('Account', AccountSchema);
