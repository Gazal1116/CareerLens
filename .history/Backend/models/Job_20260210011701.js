const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a job description']
  },
  requirements: {
    type: [String],
    required: [true, 'Please add job requirements']
  },
  responsibilities: {
    type: [String]
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  locationType: {
    type: String,
    enum: ['onsite', 'remote', 'hybrid'],
    default: 'onsite'
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary'],
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hour', 'day', 'month', 'year'],
      default: 'year'
    }
  },
  skills: {
    type: [String],
    required: [true, 'Please add required skills']
  },
  benefits: {
    type: [String]
  },
  category: {
    type: String,
    required: [true, 'Please add a job category'],
    enum: [
      'Software Development',
      'Data Science',
      'Design',
      'Marketing',
      'Sales',
      'Customer Service',
      'Human Resources',
      'Finance',
      'Operations',
      'Other'
    ]
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicationDeadline: {
    type: Date
  },
  applicants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'interview', 'accepted', 'rejected'],
      default: 'pending'
    },
    coverLetter: String,
    resume: String
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create index for text search
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

module.exports = mongoose.model('Job', jobSchema);
