import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  publicId: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [imageSchema],
  featured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  tags: [String],
  specifications: {
    dimensions: String,
    material: String,
    weight: String,
    care: String
  }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
