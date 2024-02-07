import mongoose from "mongoose";

let isConnected = false;
const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  try {
    if (isConnected) {
      return;
    } else {
      await mongoose.connect(process.env.MONGODB_URL, {
        dbName: "devOverflow",
      });
      isConnected = true;
      console.log("Successfully Connected");
    }
  } catch (error) {
    console.log(error);
  }
};
export default connectToDB;
