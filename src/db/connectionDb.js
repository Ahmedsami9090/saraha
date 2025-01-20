import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL_ONLINE);
    console.log("connected to db successfully");
  } catch (error) {
    console.log(`error connecting to db, ${error}`);
  }
};
export default connection