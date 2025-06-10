import React from 'react';
import { Mail, MessageSquare, Check, Clock, TrendingUp, Users, AlertCircle, Calendar } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}

interface AdminStatsProps {
  messages: ContactMessage[];
}

const AdminStats: React.FC<AdminStatsProps> = ({ messages }) => {
  const newMessages = messages.filter(msg => msg.status === 'new').length;
  const readMessages = messages.filter(msg => msg.status === 'read').length;
  const repliedMessages = messages.filter(msg => msg.status === 'replied').length;
  const totalMessages = messages.length;
  
  const responseRate = totalMessages > 0 ? Math.round((repliedMessages / totalMessages) * 100) : 0;
  
  // Calculate messages from last 7 days
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const recentMessages = messages.filter(msg => new Date(msg.created_at) > lastWeek).length;
  
  // Calculate unique companies
  const uniqueCompanies = new Set(messages.filter(msg => msg.company).map(msg => msg.company)).size;

  // Calculate today's messages
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMessages = messages.filter(msg => new Date(msg.created_at) >= today).length;

  // Calculate pending messages (new + read)
  const pendingMessages = newMessages + readMessages;

  const stats = [
    {
      icon: AlertCircle,
      label: 'New Messages',
      value: newMessages,
      color: 'orange',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-400',
      trend: newMessages > 0 ? '+' + newMessages : '0',
      priority: 'high'
    },
    {
      icon: Clock,
      label: 'Pending',
      value: pendingMessages,
      color: 'amber',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      trend: pendingMessages > 0 ? pendingMessages + ' awaiting' : 'All clear',
      priority: 'medium'
    },
    {
      icon: Check,
      label: 'Response Rate',
      value: `${responseRate}%`,
      color: 'green',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
      trend: responseRate >= 80 ? 'Excellent' : responseRate >= 60 ? 'Good' : 'Needs attention',
      priority: 'low'
    },
    {
      icon: Calendar,
      label: 'Today',
      value: todayMessages,
      color: 'blue',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      trend: todayMessages > 0 ? 'Active day' : 'Quiet day',
      priority: 'low'
    },
    {
      icon: TrendingUp,
      label: 'This Week',
      value: recentMessages,
      color: 'purple',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      trend: recentMessages > 5 ? 'High activity' : 'Normal',
      priority: 'low'
    },
    {
      icon: Users,
      label: 'Companies',
      value: uniqueCompanies,
      color: 'indigo',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-400',
      trend: uniqueCompanies > 0 ? uniqueCompanies + ' unique' : 'None yet',
      priority: 'low'
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-white animate-fade-in-left">Dashboard Overview</h2>
        <div className="flex items-center space-x-2 animate-fade-in-right">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/60 text-sm">Live updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`glass-card p-6 transition-all duration-500 group animate-scale-in hover:scale-105 relative overflow-hidden ${
              stat.priority === 'high' ? 'ring-2 ring-orange-500/30' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} border ${stat.borderColor} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:animate-glow`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                {stat.priority === 'high' && (
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white transition-all duration-300 group-hover:scale-105">
                  {stat.value}
                </p>
                <p className={`text-xs ${stat.iconColor} font-medium`}>
                  {stat.trend}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="glass-card p-4 text-center group hover:scale-105 transition-all duration-300">
          <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-white font-medium">{totalMessages}</p>
          <p className="text-white/60 text-sm">Total Messages</p>
        </div>
        
        <div className="glass-card p-4 text-center group hover:scale-105 transition-all duration-300">
          <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-white font-medium">{repliedMessages}</p>
          <p className="text-white/60 text-sm">Replied</p>
        </div>
        
        <div className="glass-card p-4 text-center group hover:scale-105 transition-all duration-300">
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-white font-medium">{uniqueCompanies}</p>
          <p className="text-white/60 text-sm">Companies</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;