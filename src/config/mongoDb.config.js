import mongoose from "mongoose"
import envs from "./env.config.js"


export const connectMongoDB = async () =>{
    try {
        ///conexion con la base de datos direecion de la api
        mongoose.connect(envs.MONGO_URL)
        console.log("Mongo DB Conectado")
    } catch (error) {
        console.log(error)
    }
}