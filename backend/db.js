import mongoose from "mongoose";


export default async function connect() {
  mongoose.connection.on('connected', () => console.log('DB connected'))
  mongoose.connection.on('error', (error) => console.log('DB Error', error))

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Successfully connected to the database');
  } catch (error) {
    console.log('Error connecting to the database', error);
    process.exit(1)
  }
}
