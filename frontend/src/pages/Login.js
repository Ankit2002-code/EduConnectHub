import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, User, KeyRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SchoolJPG from '../assets/school.jpg';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-teal-400">
      {/* Animated Gradient Blobs */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 0.18 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-indigo-300 blur-2xl z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.13 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-teal-200 blur-2xl z-0"
      />
      <div className="flex w-full max-w-5xl mx-auto z-10 relative">
        {/* Hero Section for large screens */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="hidden md:flex flex-col justify-center flex-1 pr-10"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="inline-block bg-white/30 p-4 rounded-full shadow-lg mb-4"
            >
              <LogIn className="w-12 h-12 text-indigo-700" />
            </motion.div>
            <h2 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Welcome to School SMS</h2>
            <p className="text-lg text-indigo-100 max-w-md">A modern, secure platform for managing student contacts and sending important messages. Stay connected, stay informed.</p>
          </div>
          <motion.img
            src={SchoolJPG}
            alt="School SMS Illustration"
            className="w-80 rounded-xl shadow-xl border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          />
        </motion.div>
        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="flex-1 flex flex-col justify-center items-center"
        >
          <div className="relative w-full max-w-md">
            {/* Glassmorphism Card with Gradient Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 via-white/40 to-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl z-0" />
            <div className="relative z-10 p-10 rounded-2xl flex flex-col items-center">
              {/* Logo/Illustration */}
              <motion.img
                src={SchoolJPG}
                alt="School Logo"
                className="w-16 h-16 mb-2 drop-shadow-xl rounded-full bg-white/60 p-2 border border-white/40"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
              />
              {/* Animated Icon in Blurred Circle */}
              <motion.div
                initial={{ scale: 0.8, y: -10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
                className="bg-indigo-100/80 backdrop-blur-md p-4 rounded-full mb-2 shadow-lg flex items-center justify-center"
              >
                <LogIn className="w-10 h-10 text-indigo-600" />
              </motion.div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Sign In</h1>
              <p className="text-gray-500 text-sm mb-6">Access your School SMS dashboard</p>
              <form onSubmit={handleSubmit} className="space-y-7 w-full">
                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-200 rounded-lg bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 placeholder-transparent shadow-inner focus:shadow-lg"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 bg-white/60 px-1 rounded"
                  >
                    <span className="flex items-center gap-1"><User className="w-4 h-4 mr-1 inline-block" /> Email</span>
                  </label>
                </div>
                {/* Password Field */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-200 rounded-lg bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 placeholder-transparent shadow-inner focus:shadow-lg"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder=" "
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 bg-white/60 px-1 rounded"
                  >
                    <span className="flex items-center gap-1"><KeyRound className="w-4 h-4 mr-1 inline-block" /> Password</span>
                  </label>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 focus:outline-none"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Forgot Password Link */}
                <div className="flex justify-end mb-2">
                  <a href="#" className="text-indigo-500 text-sm hover:underline transition-all">Forgot Password?</a>
                </div>
                {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm text-center">{error}</motion.div>}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.18)' }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 hover:from-indigo-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 border-2 border-transparent hover:border-indigo-400"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  ) : (
                    <LogIn className="w-5 h-5 mr-2" />
                  )}
                  {loading ? 'Signing in...' : 'Sign In'}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 