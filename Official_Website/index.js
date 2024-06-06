import dotenv from 'dotenv';
import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
const port = 3000;
import Feedback from './models/feedback.js';

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const main = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}
main()
.catch((err) => console.log(err));

app.post('/feedback', async(req, res) => {
    const data = req.body;
    // console.log(`Name: ${name}, Email: ${email}, Comments: ${comments}, Rating: ${rating}`);    
    res.json({ status: 'success', message: 'Feedback submitted successfully' });

    const feedback = new Feedback(data);
    await feedback.save()
    .then(() => console.log("Feedback submitted successfully"))
    .catch((err) => console.log(err));

});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});