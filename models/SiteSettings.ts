import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  photo: { type: String, default: '' }
});

const siteSettingsSchema = new mongoose.Schema({
  // Informações gerais do site
  name: { type: String, required: true, default: 'Capim das Pampas' },
  email: { type: String, required: true, default: 'capimdaspampas@gmail.com' },
  phone: { type: String, required: true, default: '+351 934 305 372' },
  whatsapp: { type: String, required: true, default: '+351 934 305 372' },
  
  // Equipa
  team: [teamMemberSchema]
}, {
  timestamps: true
});

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
