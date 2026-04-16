const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Technology', 'Sports', 'Business', 'Entertainment', 'Politics', 'Health', 'General'],
      default: 'General',
    },
    source: {
      type: String,
      default: 'Unknown',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    originalUrl: {
      type: String,
      default: '',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);
