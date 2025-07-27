const express =require ("express")
const app =express()
const dotenv = require("dotenv").config()
const connectDB =require("./config/connectionDB")
const cors =require ("cors")

const PORT =process.env.PORT  || 3000
connectDB()

app.use(express.json())
app.use(cors())

const userRoutes = require('./routes/user')
app.use('/', userRoutes);

app.use("/receipe",require ("./routes/receipe"))

app.listen (PORT ,(err) => {
    console.log(`app is listening on port ${PORT}`)
})