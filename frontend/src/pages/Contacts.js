import React, { useEffect, useState } from 'react';
import { Users, Plus, Trash2, Phone, User, Search, X } from 'lucide-react';
import api from '../services/api';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [formError, setFormError] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');
    setAdding(true);
    try {
      await api.post('/contacts', form);
      setForm({ name: '', phone: '' });
      setShowAdd(false);
      fetchContacts();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to add contact');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err) {
      alert('Failed to delete contact');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="pointer-events-none select-none fixed inset-0 z-0">
        {/* Main gradient orbs */}
        <div 
          className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-cyan-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            animation: 'float 22s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-rose-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            animation: 'float 28s ease-in-out infinite reverse',
            animationDelay: '3s'
          }}
        />
        <div 
          className="absolute top-[50%] left-[60%] w-[400px] h-[400px] bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/25 rounded-full blur-3xl animate-pulse"
          style={{
            animation: 'float 35s ease-in-out infinite',
            animationDelay: '6s'
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-2">
              Contacts
            </h1>
            <p className="text-gray-300 text-lg">Manage your contact list</p>
          </div>
          <button
            className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setShowAdd(true)}
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Add Contact</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-white/20">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-white font-medium">Loading contacts...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center space-x-3 bg-red-500/20 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-red-500/30">
              <X className="w-6 h-6 text-red-400" />
              <span className="text-red-300 font-medium">{error}</span>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
            {contacts.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <span className="text-gray-300 text-lg">No contacts found.</span>
                  <p className="text-gray-400">Add your first contact to get started</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                    <Users className="w-6 h-6 text-emerald-400" />
                    <span>Your Contacts</span>
                  </h2>
                  <div className="text-sm text-gray-300 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {contacts.map((contact, index) => (
                    <div 
                      key={contact._id} 
                      className="group bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]"
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-lg">{contact.name}</h3>
                            <div className="flex items-center space-x-2 text-gray-300">
                              <Phone className="w-4 h-4" />
                              <span>{contact.phone}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="group/btn bg-red-500/20 hover:bg-red-500 border border-red-500/30 hover:border-red-500 text-red-300 hover:text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
                          onClick={() => handleDelete(contact._id)}
                        >
                          <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 relative overflow-hidden">
            {/* Modal background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <span>Add New Contact</span>
                </h2>
                <button
                  onClick={() => setShowAdd(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Name</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter contact name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>Phone</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
                
                {formError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm text-center">
                    {formError}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 gap-4">
                  <button
                    type="button"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl transition-all duration-200"
                    onClick={() => setShowAdd(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={adding}
                    onClick={handleAdd}
                  >
                    {adding ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </div>
                    ) : (
                      'Add Contact'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(2deg); }
          66% { transform: translateY(-15px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default Contacts;