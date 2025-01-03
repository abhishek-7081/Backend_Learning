import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB= async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`\n MONGODB connected !! DB host : ${connectionInstance.connection.host} ${DB_NAME}`);
    } catch (error) {
        console.log("MONGODB connection error !!" ,error);
        process.exit(1)        
    }
}

export default connectDB