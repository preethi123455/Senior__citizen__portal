require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const path = require('path');
const cartRoutes = require('./routes/cartRoutes');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// 🔹 MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/faceAuthDB';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((error) => console.error('❌ MongoDB Connection Error:', error));

// 🔹 User Schema (For Face Authentication)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  faceDescriptors: { type: [[Number]], required: true }, // Stores multiple descriptors
});

const User = mongoose.model('User', userSchema);

// 🔹 Load Face Recognition Models
async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, 'models'));
  await faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, 'models'));
  await faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, 'models'));
  console.log("✅ Face API models loaded");
}
loadModels();

// 🔹 Function to Get Face Descriptor
async function getFaceDescriptor(imageBase64) {
  const img = await canvas.loadImage(imageBase64);
  const detection = await faceapi.detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) {
    throw new Error('❌ No face detected');
  }

  return Array.from(detection.descriptor); // Convert descriptor to array
}

// 🔹 Signup Route (Stores Multiple Face Descriptors)
app.post('/signup', async (req, res) => {
  try {
    const { name, age, email, image } = req.body;

    if (!name || !age || !email || !image) {
      return res.status(400).json({ message: '❌ All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '❌ User already exists' });
    }

    const faceDescriptor = await getFaceDescriptor(image);

    const newUser = new User({ name, age, email, faceDescriptors: [faceDescriptor] });
    await newUser.save();

    res.status(201).json({ message: '✅ Signup successful' });

  } catch (error) {
    console.error('❌ Signup Error:', error);
    res.status(500).json({ message: '❌ Signup failed. Try again.' });
  }
});

// 🔹 Login Route (Uses Face Matching)
app.post('/login', async (req, res) => {
  try {
    const { email, image } = req.body;

    if (!email || !image) {
      return res.status(400).json({ message: '❌ Email and image are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '❌ User not found' });
    }

    const loginFaceDescriptor = await getFaceDescriptor(image);

    // 🔥 Compare against stored face descriptors
    const labeledDescriptors = new faceapi.LabeledFaceDescriptors(
      user.email,
      user.faceDescriptors.map(desc => new Float32Array(desc))
    );

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.4); // Stricter threshold (0.4)
    const bestMatch = faceMatcher.findBestMatch(new Float32Array(loginFaceDescriptor));

    console.log("🔍 Best Match:", bestMatch.toString());

    if (bestMatch.label === user.email) {
      res.status(200).json({ success: true, message: '✅ Login successful' });
    } else {
      res.status(400).json({ success: false, message: '❌ Face does not match' });
    }

  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ message: '❌ Login failed. Try again.' });
  }
});

// 🔹 Cart Routes (Handles Add, Remove, Retrieve)
app.use('/api/cart', cartRoutes);

// 🔹 Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
