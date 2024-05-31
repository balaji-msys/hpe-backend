const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://balaji:balaji@cluster0.pmwcn7k.mongodb.net/hpe-backend?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Database connected"))
    .catch((err) => {
      console.log("Database connection error:", err);
    });
};
module.exports = connectDB;
