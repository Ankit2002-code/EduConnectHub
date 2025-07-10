import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Users, CheckCircle, AlertCircle, Sparkles, Zap } from 'lucide-react';

const SendSMS = () => {
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '+1234567890' },
    { id: 2, name: 'Jane Smith', phone: '+1234567891' },
    { id: 3, name: 'Bob Johnson', phone: '+1234567892' }
  ]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const maxChars = 160;

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  const fetchContacts = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // setContacts(response.data);
    } catch (error) {
      setError('Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) {
      setError('Please enter a message to send');
      return;
    }
    if (message.length > maxChars) {
      setError(`Message is too long. Maximum ${maxChars} characters allowed.`);
      return;
    }
    if (contacts.length === 0) {
      setError('No contacts found. Please add contacts first.');
      return;
    }
    setIsSending(true);
    setError('');
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      setMessage('');
      setCharCount(0);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Failed to send SMS. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const getCharCountColor = () => {
    if (charCount > maxChars) return 'text-red-500';
    if (charCount > maxChars * 0.8) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20, 
            ease: 'easeInOut'
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-3xl opacity-30"
        />
        
        <motion.div
          animate={{ 
            x: [0, -80, 60, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.8, 1.3, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25, 
            ease: 'easeInOut',
            delay: 5
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-full blur-3xl opacity-25"
        />
        
        <motion.div
          animate={{ 
            x: [0, 40, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 18, 
            ease: 'easeInOut',
            delay: 10
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-full blur-3xl opacity-20"
        />

        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-lg shadow-cyan-500/25"
            >
              <MessageSquare className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
              Send SMS
            </h1>
            <p className="text-xl text-gray-300">Broadcast messages to all your student contacts</p>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-8 p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-emerald-500 rounded-full">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-emerald-400 font-semibold text-lg">Success!</h3>
                    <p className="text-emerald-300">Message sent successfully to all contacts</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-8 p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-red-500 rounded-full">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-red-400 font-semibold text-lg">Error</h3>
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl shadow-black/20"
          >
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Compose Message</h2>
              </div>
              <p className="text-gray-300">Your message will be sent to all registered contacts</p>
            </div>

            <div className="space-y-8">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-3">
                  Message Content
                </label>
                <div className="relative">
                  <motion.textarea
                    id="message"
                    value={message}
                    onChange={handleMessageChange}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 min-h-[140px] resize-none text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Enter your message here..."
                    maxLength={maxChars}
                    required
                  />
                  <div className={`absolute bottom-4 right-4 text-sm font-medium ${getCharCountColor()}`}>
                    {charCount}/{maxChars}
                  </div>
                </div>
                {charCount > maxChars * 0.8 && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm mt-2 ${charCount > maxChars ? 'text-red-400' : 'text-yellow-400'}`}
                  >
                    {charCount > maxChars ? 'Message is too long!' : 'Message is getting long'}
                  </motion.p>
                )}
              </div>

              {/* Message Preview */}
              {message && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Message Preview
                  </h3>
                  <p className="text-white whitespace-pre-wrap mb-3 text-lg leading-relaxed">{message}</p>
                  <p className="text-gray-300 text-sm">
                    This message will be sent to {contacts.length} contact{contacts.length !== 1 ? 's' : ''} in your database.
                  </p>
                </motion.div>
              )}

              {/* Send Button */}
              <div className="flex items-center justify-between pt-6">
                <div className="text-gray-300">
                  <span className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span className="text-lg">{contacts.length} contact{contacts.length !== 1 ? 's' : ''} will receive this message</span>
                  </span>
                </div>
                <motion.button
                  type="button"
                  onClick={handleSend}
                  disabled={isSending || !message.trim() || contacts.length === 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 shadow-lg shadow-cyan-500/25 overflow-hidden"
                >
                  {/* Button Shine Effect */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  
                  {isSending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-lg">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span className="text-lg">Send to All</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Tips Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl shadow-black/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-cyan-400" />
              Tips for Effective Messages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Keep messages concise and clear',
                'Include important dates and times',
                'Use professional language',
                'Double-check spelling and grammar'
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <span className="text-cyan-400 text-xl">•</span>
                  <span className="text-gray-200">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Summary</h3>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300 text-lg">Loading contacts...</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">No contacts found</p>
                <p className="text-gray-400">Add contacts to send SMS messages</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { value: contacts.length, label: 'Total Contacts', color: 'from-cyan-500 to-blue-600' },
                  { value: maxChars, label: 'Max Characters', color: 'from-emerald-500 to-green-600' },
                  { value: charCount, label: 'Current Length', color: 'from-purple-500 to-pink-600' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`p-6 bg-gradient-to-r ${stat.color} rounded-2xl text-white shadow-lg`}
                  >
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SendSMS;