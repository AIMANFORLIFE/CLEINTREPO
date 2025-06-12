import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            message: formData.message,
            status: 'new'
          }
        ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error: any) {
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 animate-fade-in-up">
            Get in Touch
          </h2>
          <p className="text-white/70 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Ready to transform your marketing approach?
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          {success ? (
            <div className="text-center py-12 animate-bounce-in">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-white mb-4">Message Sent Successfully</h3>
              <p className="text-white/70 text-lg">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-fade-in-left" style={{ animationDelay: '0.6s' }}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 hover:border-white/30"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="animate-fade-in-right" style={{ animationDelay: '0.7s' }}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 hover:border-white/30"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              
              <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 hover:border-white/30"
                  placeholder="Company"
                />
              </div>
              
              <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 resize-none hover:border-white/30"
                  placeholder="Tell us about your project"
                  required
                />
              </div>

              {error && (
                <div className="glass-card bg-red-500/20 border-red-500/30 p-4 animate-bounce-in">
                  <p className="text-red-200">{error}</p>
                </div>
              )}
              
              <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="glass-button-primary text-white px-8 py-4 text-sm font-medium flex items-center group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10">
                    {loading ? 'Sending...' : 'Send Message'}
                  </span>
                  {!loading && (
                    <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;