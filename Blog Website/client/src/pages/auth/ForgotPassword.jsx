import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ArrowRight, Mail, Loader2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/users/forgot-password', { email });
            setIsSent(true);
            toast.success('Reset link dispatched');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[450px] bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
            >
                <div className="p-10 md:p-14">
                    <AnimatePresence mode="wait">
                        {!isSent ? (
                            <motion.div
                                key="request"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-10"
                            >
                                <div className="text-center space-y-4">
                                    <div className="h-16 w-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-600 shadow-inner">
                                        <ShieldAlert className="h-8 w-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Access Recovery</h1>
                                        <p className="text-sm text-slate-400 font-medium italic">Verify identity to reset passkey</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Registered Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-300 group-focus-within:text-primary-600 transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium text-slate-900 shadow-sm"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || !email}
                                        className="w-full bg-slate-950 text-white py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-600 transition-all active:scale-[0.98] flex justify-center items-center group shadow-xl shadow-slate-900/10 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                                            <span className="flex items-center gap-3">
                                                Request Reset Link <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-center space-y-10"
                            >
                                <div className="h-20 w-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                                    <CheckCircle2 className="h-10 w-10 animate-bounce" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Link Dispatched</h2>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        Our systems have sent an identity verification link to <span className="text-slate-900 font-bold">{email}</span>. Please check your inbox and spam folder.
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-slate-50">
                                    <button
                                        onClick={() => setIsSent(false)}
                                        className="text-xs font-black uppercase tracking-widest text-primary-600 hover:text-primary-700"
                                    >
                                        Resend transmission
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="text-center pt-10 mt-10 border-t border-slate-50">
                        <Link to="/login" className="text-xs text-slate-400 font-medium hover:text-slate-900 transition-colors">
                            Recall passkey? <span className="font-bold underline underline-offset-4">Return to login</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
