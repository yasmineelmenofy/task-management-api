//imports
import express from "express";

//declarations
const app = express();
const port = 5000;

//middlewares
app.use(express.json());

//routes
app.get('/', (req,res) => {
    res.send("Task Management API is Running ");
})

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})