import mongoose from 'mongoose';

const openingHoursSchema = new mongoose.Schema({
  open: { type: String, required: true },
  close: { type: String, required: true },
  closed: { type: Boolean, default: false }
});

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Loja Principal' },
  address: { type: String, required: true, default: 'Florista Capim das Pampas, R. da Igreja 26' },
  coordinates: {
    type: [Number], // [latitude, longitude]
    default: [38.7223, -9.1393] // Coordenadas de Lisboa
  },
  openingHours: {
    monday: openingHoursSchema,
    tuesday: openingHoursSchema,
    wednesday: openingHoursSchema,
    thursday: openingHoursSchema,
    friday: openingHoursSchema,
    saturday: openingHoursSchema,
    sunday: openingHoursSchema
  },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.Address || mongoose.model('Address', addressSchema);
