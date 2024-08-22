import dotenv from "dotenv"
import { app } from "./app.js"
import { dbConnect } from "./utiles/dbConnect.js"



dotenv.config({
    path: './.env'
})

dbConnect()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Server connection failed !!! ", err);
    })


