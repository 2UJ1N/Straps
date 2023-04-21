const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    password: { type: String, required: true }, // primary key
    full_name: { type: String, required: true },
    address: { type: String, required: false },
    phone_number: { type: String, required: false },
    email: { type: String, required: true },
    regdate: { type: Date, default: Date.now },
    role: {
      // 사용자 1 , 관리자 0
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      // 회원가입한 회원 1, 회원가입하지 않은 회원 0
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

module.exports = UserSchema;
