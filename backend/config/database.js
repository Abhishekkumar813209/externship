import mongoose from 'mongoose';

export const connectDB = async(req,res)=>{
    console.log(process.env.MONGO_URI)
    const {connection} = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected with ${connection.host}`)
}