import mongoose from "mongoose";

const Schema=mongoose.Schema;
const feedbackSchema = new Schema({
    name: String,
    email: String,
    comments: String,
    rating: Number
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;