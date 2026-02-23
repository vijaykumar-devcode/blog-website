import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Message sent! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">

                {/* 1. Contact Information Header/Sidebar */}
                <div className="lg:col-span-12 text-center space-y-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tight">
                            Get in <span className="text-primary-600 italic">touch.</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto mt-6">
                            Have a story to share or a technical question? Our collective is always open to new transmissions and collaborations.
                        </p>
                    </motion.div>
                </div>

                {/* 2. Contact Form - Centered Narrow Layout */}
                <div className="lg:col-span-7 lg:col-start-1 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-slate-900"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-slate-900"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                            <input
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-slate-900"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Your Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-8 outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-slate-900 resize-none"
                                placeholder="Tell us more about your inquiry..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-12 py-5 bg-slate-950 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending Transmission...' : 'Send Message'}
                            {!isSubmitting && <Send className="h-4 w-4" />}
                        </button>
                    </form>
                </div>

                {/* 3. Side Info / Contact Cards */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full"></div>

                        <h3 className="text-2xl font-black mb-8">Contact Information</h3>

                        <div className="space-y-8">
                            <ContactInfo icon={Mail} title="Email" detail="hello@byteblog.com" />
                            <ContactInfo icon={MessageSquare} title="Discord" detail="ByteBlog Community" />
                            <ContactInfo icon={MapPin} title="HQ" detail="123 Creator Lane, San Francisco, CA" />
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/10">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Social Connect</h4>
                            <div className="flex gap-4">
                                <SocialBtn icon={Twitter} />
                                <SocialBtn icon={Github} />
                                <SocialBtn icon={Linkedin} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary-50 border border-primary-100 p-10 rounded-[2.5rem]">
                        <h3 className="text-xl font-black text-slate-900 mb-4">Are you a writer?</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            We're always looking for new voices to join our editorial team. If you have deep technical insights, we'd love to hear from you.
                        </p>
                        <button className="text-primary-600 font-bold hover:text-primary-700 transition-colors">Apply to write →</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

const ContactInfo = ({ icon: Icon, title, detail }) => (
    <div className="flex gap-6">
        <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary-400 flex-shrink-0">
            <Icon className="h-5 w-5" />
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-lg font-medium">{detail}</p>
        </div>
    </div>
);

const SocialBtn = ({ icon: Icon }) => (
    <button className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-primary-600 transition-all border border-white/10">
        <Icon className="h-5 w-5" />
    </button>
);

export default Contact;
