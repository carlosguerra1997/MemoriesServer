import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
