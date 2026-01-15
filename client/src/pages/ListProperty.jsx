import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function ListProperty() {
  const { user } = useUserAuth();
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('1');
  const [type, setType] = useState('Apartment');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    if (!propertyName.trim()) return setMessage({ type: 'error', text: 'Property title is required' });
    if (!imageFile) return setMessage({ type: 'error', text: 'Property image is required' });

    setLoading(true);
    try {
      // Create FormData for multipart/form-data upload
      const formData = new FormData();
      formData.append('name', propertyName.trim());
      formData.append('description', description || '');
      formData.append('location', location || '');
      formData.append('price', price || '');
      formData.append('bedrooms', bedrooms);
      formData.append('type', type);
      formData.append('image', imageFile); // Single image file

      // Use fetch directly since we need to send FormData
      const response = await fetch(`${API_BASE}/api/resource`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token
        },
        body: formData,
      });

      const data = await response.json();

      if (data && data.success) {
        setMessage({ type: 'success', text: 'Listing submitted successfully' });
        setFullName('');
        setWhatsapp('');
        setPropertyName('');
        setDescription('');
        setLocation('');
        setPrice('');
        setBedrooms('1');
        setType('Apartment');
        setImageFile(null);
        setImagePreview(null);
        setBedrooms('1');
        setType('Apartment');
        setImageFile(null);
        setImagePreview(null);
        // Navigate to user dashboard
        navigate('/dashboard');
      } else {
        setMessage({ type: 'error', text: data ? data.message : 'Failed to submit' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Network error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black text-slate-900 mb-2">List Your Property</h1>
      <p className="text-gray-500 mb-10">Takes less than 5 minutes. KES 1,000/month. No commissions.</p>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Your Details Section */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold border-b pb-4">Your Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="w-full p-3 bg-gray-50 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Phone Number</label>
              <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+254 700 000 000" className="w-full p-3 bg-gray-50 border rounded-xl" />
            </div>
          </div>
        </div>

        {/* Property Details Section */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold border-b pb-4">Property Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Property Title</label>
              <input value={propertyName} onChange={(e) => setPropertyName(e.target.value)} type="text" placeholder="Ocean-view Cottage" className="w-full p-3 bg-gray-50 border rounded-xl" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your property..." className="w-full p-3 bg-gray-50 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Town</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-xl">
                <option value="">Select a town</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Diani">Diani</option>
                <option value="Kilifi">Kilifi</option>
                <option value="Watamu">Watamu</option>
                <option value="Malindi">Malindi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Bedrooms</label>
              <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-xl">
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Property Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-xl">
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Cottage">Cottage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nightly Price (KES)</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="3000" className="w-full p-3 bg-gray-50 border rounded-xl" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Main Photo *</label>
              <input onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (!file.type.startsWith('image/')) {
                    setMessage({ type: 'error', text: 'Only image files are allowed' });
                    return;
                  }
                  setImageFile(file);
                  // generate preview
                  try {
                    setImagePreview(URL.createObjectURL(file));
                  } catch {
                    setImagePreview(null);
                  }
                }
              }} type="file" accept="image/*" className="w-full" />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="w-32 h-20 object-cover rounded" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-red-50 text-blue-600 rounded-2xl text-center text-sm font-bold">
          After submission, we'll contact you via WhatsApp to verify details and share payment instructions!
        </div>

        {message && (
          <div className={`py-3 px-4 rounded-xl ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message.text}</div>
        )}

        <button disabled={loading} className="w-full py-4 bg-[#007EA7] text-white rounded-2xl font-black text-xl">
          {loading ? 'Submitting...' : 'Request Listing'}
        </button>
      </form>
    </div>
  );
}