import React, { useState } from 'react';
import { User, Mail, Building, Calendar, Eye, Check, Reply, Trash2, Archive } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}

interface MessageDetailProps {
  message: ContactMessage | null;
  onUpdateStatus: (id: string, status: 'read' | 'replied') => void;
  onDeleteMessage?: (id: string) => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ 
  message, 
  onUpdateStatus, 
  onDeleteMessage 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!message) {
    return (
      <div className="glass-card">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-medium text-white">Message Details</h2>
        </div>
        <div className="p-6 text-center text-white/60">
          Select a message to view details
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    if (onDeleteMessage) {
      onDeleteMessage(message.id);
      setShowDeleteConfirm(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      new: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      read: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      replied: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    
    return (
      <span className={`px-3 py-1 text-xs font-medium border rounded-full ${colors[status as keyof typeof colors]} animate-pulse`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="glass-card animate-scale-in">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-white">Message Details</h2>
          {getStatusBadge(message.status)}
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-4 glass-card animate-fade-in-left">
              <User className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">{message.name}</p>
                <p className="text-white/60 text-sm">Contact Name</p>
              </div>
            </div>

            <div className="flex items-center p-4 glass-card animate-fade-in-right">
              <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
              <div>
                <p className="text-white font-medium break-all">{message.email}</p>
                <p className="text-white/60 text-sm">Email Address</p>
              </div>
            </div>

            {message.company && (
              <div className="flex items-center p-4 glass-card animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                <Building className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">{message.company}</p>
                  <p className="text-white/60 text-sm">Company</p>
                </div>
              </div>
            )}

            <div className="flex items-center p-4 glass-card animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
              <Calendar className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">{formatDate(message.created_at)}</p>
                <p className="text-white/60 text-sm">Received</p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-4 glass-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-white/60 text-sm mb-3 font-medium">Message Content</p>
            <div className="glass-card p-4">
              <p className="text-white leading-relaxed whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {message.status === 'new' && (
              <button
                onClick={() => onUpdateStatus(message.id, 'read')}
                className="flex items-center glass-button text-white px-4 py-3 text-sm transition-all duration-300 hover:scale-105"
              >
                <Eye className="w-4 h-4 mr-2" />
                Mark as Read
              </button>
            )}
            
            {message.status !== 'replied' && (
              <button
                onClick={() => onUpdateStatus(message.id, 'replied')}
                className="flex items-center glass-button text-white px-4 py-3 text-sm transition-all duration-300 hover:scale-105"
              >
                <Reply className="w-4 h-4 mr-2" />
                Mark as Replied
              </button>
            )}

            <a
              href={`mailto:${message.email}?subject=Re: Your inquiry&body=Hi ${message.name},%0D%0A%0D%0AThank you for reaching out to Augmentum Marketing.%0D%0A%0D%0A`}
              className="flex items-center glass-button text-white px-4 py-3 text-sm transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4 mr-2" />
              Reply via Email
            </a>

            {onDeleteMessage && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center glass-button bg-red-500/20 border-red-500/30 text-white px-4 py-3 text-sm transition-all duration-300 hover:scale-105"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            )}
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="p-4 glass-card bg-red-500/20 border-red-500/30 animate-bounce-in">
              <p className="text-red-200 mb-3">Are you sure you want to delete this message? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="glass-button bg-red-600/80 text-white px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="glass-button text-white px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;