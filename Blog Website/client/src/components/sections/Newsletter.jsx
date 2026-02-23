import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            // Simulated or real API call
            // await api.post('/subscribers', { email });
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitted(true);
            toast.success('Successfully subscribed to our newsletter!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-slate-950 px-8 py-16 md:px-24 md:py-32 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
            {/* Architectural Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-600/20 to-transparent blur-3xl opacity-30"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 text-left"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl shadow-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Community Engine</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                        The future <br />
                        <span className="text-primary-500 italic">unfolds</span> weekly.
                    </h2>

                    <div className="space-y-6 max-w-lg text-lg text-slate-400 font-medium leading-relaxed opacity-80">
                        <p>Join 150k+ creators, engineers, and digital architects receiving our curated intelligence on the next wave of implementation.</p>
                        <div className="flex -space-x-3 items-center">
                            {[11, 22, 33, 44].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="h-12 w-12 rounded-2xl border-4 border-slate-950 shadow-2xl" alt="Subscriber" />
                            ))}
                            <div className="h-12 w-12 rounded-2xl bg-white/5 border-4 border-slate-950 shadow-2xl flex items-center justify-center text-[10px] font-black text-primary-400">+150k</div>
                        </div>
                    </div>
                </motion.div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.div
                                key="form-container"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-2">Access Point</label>
                                        <input
                                            id="newsletter-email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            required
                                            className="w-full px-8 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:bg-white/[0.05] transition-all text-lg font-bold shadow-inner"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-5 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center space-x-4 disabled:opacity-50 shadow-2xl shadow-primary-500/30 active:scale-[0.98] group"
                                    >
                                        {loading ? (
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                        ) : (
                                            <>
                                                <span>Join the Collective</span>
                                                <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                                <div className="mt-8 flex items-center justify-center gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-3 w-3 text-emerald-500" /> No Spam
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Weekly Insights
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success-container"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-primary-600/10 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-primary-500/30 text-center space-y-6 shadow-2xl"
                            >
                                <div className="h-24 w-24 bg-primary-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl shadow-primary-500/40">
                                    <CheckCircle2 className="h-12 w-12 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-3xl font-black text-white tracking-tight">Transmission Received.</h4>
                                    <p className="text-primary-200 mt-2 font-medium text-lg">You're now part of the global collective.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
