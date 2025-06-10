import React, { useState } from 'react';
import { Search, Filter, SortDesc, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}

interface MessageListProps {
  messages: ContactMessage[];
  selectedMessage: ContactMessage | null;
  onSelectMessage: (message: ContactMessage) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  selectedMessage, 
  onSelectMessage 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-3 h-3 text-orange-400" />;
      case 'read': return <Clock className="w-3 h-3 text-blue-400" />;
      case 'replied': return <CheckCircle className="w-3 h-3 text-green-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-orange-500';
      case 'read': return 'bg-blue-500';
      case 'replied': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessagePreview = (message: string) => {
    return message.length > 100 ? message.substring(0, 100) + '...' : message;
  };

  const filteredMessages = messages
    .filter(message => {
      const matchesSearch = 
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (message.company && message.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'date':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  return (
    <div className="glass-card">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium text-white flex items-center">
              Contact Messages
              <span className="ml-3 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                {filteredMessages.length}
              </span>
            </h2>
            <p className="text-white/60 text-sm mt-1">Manage and respond to customer inquiries</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
            {/* Enhanced Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 glass-button text-white placeholder-white/50 text-sm focus:outline-none transition-all duration-300 w-full md:w-64"
              />
            </div>
            
            {/* Enhanced Filters */}
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="pl-10 pr-8 py-3 glass-button text-white text-sm focus:outline-none transition-all duration-300 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
              
              <div className="relative">
                <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="pl-10 pr-8 py-3 glass-button text-white text-sm focus:outline-none transition-all duration-300 appearance-none"
                >
                  <option value="date">Latest</option>
                  <option value="name">Name</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Message List */}
      <div className="max-h-[600px] overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 glass-card mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <p className="text-white/60 text-lg mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No messages match your filters' : 'No messages yet'}
            </p>
            <p className="text-white/40 text-sm">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search criteria' : 'New messages will appear here'}
            </p>
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <div
              key={message.id}
              onClick={() => onSelectMessage(message)}
              className={`p-5 border-b border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/5 hover:scale-[1.01] animate-fade-in-up group ${
                selectedMessage?.id === message.id ? 'bg-white/10 scale-[1.01] border-l-4 border-l-blue-400' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(message.status)}
                      <h3 className="text-white font-medium truncate group-hover:text-blue-300 transition-colors duration-200">
                        {message.name}
                      </h3>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(message.status)} animate-pulse`}></span>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-1 truncate group-hover:text-white/90 transition-colors duration-200">
                    {message.email}
                  </p>
                  
                  {message.company && (
                    <p className="text-white/50 text-xs mb-2 truncate">
                      {message.company}
                    </p>
                  )}
                  
                  <p className="text-white/60 text-sm line-clamp-2 group-hover:text-white/80 transition-colors duration-200">
                    {getMessagePreview(message.message)}
                  </p>
                </div>
                
                <div className="text-white/50 text-xs ml-4 text-right flex-shrink-0">
                  <div className="mb-1">{formatDate(message.created_at)}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    message.status === 'new' ? 'bg-orange-500/20 text-orange-400' :
                    message.status === 'read' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {message.status}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Enhanced Footer */}
      <div className="p-4 border-t border-white/10 glass-card">
        <div className="flex items-center justify-between">
          <p className="text-white/60 text-sm">
            Showing {filteredMessages.length} of {messages.length} messages
          </p>
          <div className="flex items-center space-x-4 text-xs text-white/50">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>New</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Read</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Replied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;