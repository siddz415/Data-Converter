import express, { response } from "express";
import cors from "cors"
import generate from "./generate.js";

const app = express();
app.use(express.json())
app.use(cors());
const port = process.env.Port || 3005;

app.get("/", (req, res) => {
    res.send('Hello world')
})

app.post("/generate",async (req, res) => {
    const queryDescription = req.body.queryDescription
    try {
        const sqlQuery = await generate(queryDescription)
        res.json({response: sqlQuery})
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})