import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const ContactUs = mongoose.models.contactcollections || mongoose.model("contactcollections", contactUsSchema);

export default ContactUs;
