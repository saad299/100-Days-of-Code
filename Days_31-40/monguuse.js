
const mongoose = require("mongoose")
const uri = process.env.MONGO_URI

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isWorking: Boolean,
})

const user = mongoose.model("User", userSchema)

async function run() {
  await mongoose.connect(uri)

  console.log("Connected");
  
  await user.create({ name: "Saad", age: 26, isWorking: false})

  const users = await user.find()
  console.log(users);
  
  await mongoose.disconnect()
}

run().catch(console.error)