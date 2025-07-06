const mongoose = require("mongoose");
const url = "mongodb+srv://dasaridileep82:55lucaotimOeSK1X@cluster0.267qdmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connection = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

module.exports = connection;
