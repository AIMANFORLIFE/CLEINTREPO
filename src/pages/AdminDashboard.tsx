import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, RefreshCw, Download, Settings, Bell, User } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import CursorTracker from '../components/CursorTracker';
import AdminStats from '../components/AdminStats';
import MessageList from '../components/MessageList';
import MessageDetail from '../components/MessageDetail';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}

const AdminDashboard = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchMessages();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('contact_messages')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'contact_messages' },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchMessages(); // Refresh messages on any change
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin');
    } else {
      setUser(user);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateMessageStatus = async (id: string, status: 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ));
      
      // Update selected message if it's the one being updated
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setMessages(messages.filter(msg => msg.id !== id));
      
      // Clear selected message if it was deleted
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
  };

  const exportMessages = () => {
    const csvContent = [
      ['Name', 'Email', 'Company', 'Message', 'Status', 'Created At', 'Updated At'],
      ...messages.map(msg => [
        msg.name,
        msg.email,
        msg.company || '',
        msg.message.replace(/"/g, '""'), // Escape quotes
        msg.status,
        new Date(msg.created_at).toLocaleString(),
        new Date(msg.created_at).toLocaleString()
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `augmentum-messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const newMessagesCount = messages.filter(msg => msg.status === 'new').length;

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center cursor-none">
        <AnimatedBackground />
        <CursorTracker />
        <div className="relative z-10 text-center">
          <div className="glass-card p-8 animate-scale-in">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white/20 mx-auto mb-4"></div>
            <p className="text-white/70 animate-pulse text-lg">Loading dashboard...</p>
            <p className="text-white/50 text-sm mt-2">Fetching latest messages</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden cursor-none">
      <AnimatedBackground />
      <CursorTracker />
      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="glass-card border-b border-white/10 p-6 animate-fade-in-down">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="animate-fade-in-left">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 glass-card flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white">
                    Augmentum Dashboard
                  </h1>
                  <p className="text-white/60 text-sm">
                    Welcome back, {user?.email?.split('@')[0] || 'Admin'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 animate-fade-in-right">
              {/* Notifications */}
              <div className="relative">
                <button className="glass-button p-3 relative">
                  <Bell className="w-5 h-5 text-white" />
                  {newMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {newMessagesCount}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center glass-button text-white px-4 py-3 text-sm transition-all duration-300 disabled:opacity-50 hover:scale-105"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={exportMessages}
                className="flex items-center glass-button text-white px-4 py-3 text-sm transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center glass-button bg-red-500/20 border-red-500/30 text-white px-4 py-3 text-sm transition-all duration-300 hover:scale-105"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          {/* Statistics */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <AdminStats messages={messages} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Message List */}
            <div className="xl:col-span-2 animate-fade-in-left" style={{ animationDelay: '0.4s' }}>
              <MessageList
                messages={messages}
                selectedMessage={selectedMessage}
                onSelectMessage={setSelectedMessage}
              />
            </div>

            {/* Message Detail */}
            <div className="xl:col-span-3 animate-fade-in-right" style={{ animationDelay: '0.6s' }}>
              <MessageDetail
                message={selectedMessage}
                onUpdateStatus={updateMessageStatus}
                onDeleteMessage={deleteMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;