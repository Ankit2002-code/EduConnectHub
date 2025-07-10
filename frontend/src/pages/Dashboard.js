import React, { useEffect, useState } from 'react';
import { Users, MessageSquare, Clock, CheckCircle, XCircle, RefreshCw, Activity, TrendingUp, Zap } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalMessages: 0, lastMessageTime: null, totalContacts: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState('loading');
  const [dbStatus, setDbStatus] = useState('loading');

  useEffect(() => {
    const checkStatus = async () => {
      setApiStatus('loading');
      setDbStatus('loading');
      try {
        await api.get('/stats');
        setApiStatus('ok');
      } catch {
        setApiStatus('fail');
      }
      try {
        await api.get('/contacts');
        setDbStatus('ok');
      } catch {
        setDbStatus('fail');
      }
    };
    checkStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const statsRes = await api.get('/stats');
        setStats(statsRes.data);
        const msgRes = await api.get('/sms/messages');
        setRecentMessages(msgRes.data || []);
      } catch (err) {
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="pointer-events-none select-none fixed inset-0 z-0">
        {/* Main gradient orbs */}
        <div 
          className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            animation: 'float 20s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            animation: 'float 25s ease-in-out infinite reverse',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-[40%] left-[70%] w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/25 rounded-full blur-3xl animate-pulse"
          style={{
            animation: 'float 30s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Status Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 mb-8">
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
          {apiStatus === 'loading' ? (
            <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
          ) : apiStatus === 'ok' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <XCircle className="w-5 h-5 text-red-400" />
          )}
          <span className={`font-medium ${
            apiStatus === 'ok' ? 'text-emerald-300' : 
            apiStatus === 'fail' ? 'text-red-300' : 'text-gray-300'
          }`}>
            API {apiStatus === 'ok' ? 'is working' : apiStatus === 'fail' ? 'not reachable' : 'checking...'}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
          {dbStatus === 'loading' ? (
            <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
          ) : dbStatus === 'ok' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <XCircle className="w-5 h-5 text-red-400" />
          )}
          <span className={`font-medium ${
            dbStatus === 'ok' ? 'text-emerald-300' : 
            dbStatus === 'fail' ? 'text-red-300' : 'text-gray-300'
          }`}>
            Database {dbStatus === 'ok' ? 'is working' : dbStatus === 'fail' ? 'not reachable' : 'checking...'}
          </span>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-300 text-lg">Monitor your messaging system performance</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-white/20">
              <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
              <span className="text-white font-medium">Loading dashboard...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center space-x-3 bg-red-500/20 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-red-500/30">
              <XCircle className="w-6 h-6 text-red-400" />
              <span className="text-red-300 font-medium">{error}</span>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Messages Card */}
              <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 hover:bg-white/20 hover:scale-105 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.totalMessages}</div>
                    <div className="text-gray-300 font-medium">Messages Sent</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>

              {/* Last Message Card */}
              <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 hover:bg-white/20 hover:scale-105 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {stats.lastMessageTime ? new Date(stats.lastMessageTime).toLocaleString() : 'N/A'}
                    </div>
                    <div className="text-gray-300 font-medium">Last Message Time</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Activity className="w-6 h-6 text-yellow-400" />
                </div>
              </div>

              {/* Contacts Card */}
              <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 hover:bg-white/20 hover:scale-105 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.totalContacts}</div>
                    <div className="text-gray-300 font-medium">Contacts</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <span>Recent Messages</span>
              </h2>
              {recentMessages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">No messages sent yet.</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentMessages.slice(0, 5).map((msg, index) => (
                    <div 
                      key={msg._id} 
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                        <div className="text-white font-medium flex-1 pr-4">
                          {msg.text}
                        </div>
                        <div className="text-gray-300 text-sm bg-white/10 rounded-full px-3 py-1 border border-white/20">
                          {new Date(msg.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

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

export default Dashboard;