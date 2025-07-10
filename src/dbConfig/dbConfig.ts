import mongoose from "mongoose";
export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("connected to datacase sucessfully");
        });
        connection.on('error', (error)=>{
            console.log("Error connecting to the database:", error);
            process.exit();
        });

        
    } catch (error) {
        console.log("Error connecting to the database:", error);
    }
}