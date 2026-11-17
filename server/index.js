
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim())

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: '20kb' }))

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

// Enquiry database model
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  isRead: { type: Boolean, default: false }
}, { timestamps: true })

const Enquiry = mongoose.models.Enquiry ||
  mongoose.model('Enquiry', enquirySchema)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Amit Kumar Portfolio API' })
})

// Contact form

// Contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {}

    if (![name, email, message].every(
      value => typeof value === 'string' && value.trim()
    )) {
      return res.status(400).json({
        message: 'Please complete all fields.'
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        message: 'Please enter a valid email.'
      })
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Contact database is not connected. Please try again later.'
      })
    }

    // Save enquiry in MongoDB first
    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    })

    // Send notification email in background
    transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL,
      replyTo: enquiry.email,
      subject: 'New Portfolio Enquiry',
      text: `New enquiry received.

Name: ${enquiry.name}
Email: ${enquiry.email}

Message:
${enquiry.message}`
    })
    .then(() => {
      console.log('Notification email sent successfully')
    })
    .catch(error => {
      console.error('Notification email failed:', error.message)
    })

    // Respond immediately after saving enquiry
    return res.status(201).json({
      message: 'Thank you! Your enquiry has been received.',
      success: true
    })

  } catch (error) {
    console.error('Contact submission error:', error.message)

    return res.status(500).json({
      message: 'Something went wrong. Please try again later.'
    })
  }
})


// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.'
      })
    }

    if (!process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) {
      return res.status(500).json({
        message: 'Admin login is not configured.'
      })
    }

    const emailMatches =
      email.trim().toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()

    const passwordMatches = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    )

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      })
    }

    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    return res.json({
      message: 'Login successful.',
      token
    })
  } catch (error) {
    console.error('Admin login error:', error.message)
    return res.status(500).json({ message: 'Login failed.' })
  }
})

// Admin authentication middleware
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null

  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' })
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({
      message: 'Session expired. Please login again.'
    })
  }
}

// Get all enquiries
app.get('/api/admin/enquiries', verifyAdmin, async (_req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .lean()

    res.json(enquiries)
  } catch (error) {
    console.error('Fetch enquiries error:', error.message)
    res.status(500).json({ message: 'Could not load enquiries.' })
  }
})

// Mark enquiry as read/unread
app.patch('/api/admin/enquiries/:id/read', verifyAdmin, async (req, res) => {
  try {
    const { isRead } = req.body

    if (typeof isRead !== 'boolean') {
      return res.status(400).json({ message: 'Invalid read status.' })
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { isRead },
      { new: true }
    )

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found.' })
    }

    res.json(enquiry)
  } catch (error) {
    res.status(400).json({ message: 'Invalid enquiry ID.' })
  }
})

// Delete enquiry
app.delete('/api/admin/enquiries/:id', verifyAdmin, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id)

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found.' })
    }

    res.json({ message: 'Enquiry deleted successfully.' })
  } catch (error) {
    res.status(400).json({ message: 'Invalid enquiry ID.' })
  }
})

// Start server and connect database
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing in .env')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully')

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Portfolio API running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error.message)
    process.exit(1)
  }
}

startServer()
