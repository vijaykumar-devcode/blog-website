import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-[450px] bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
            >
                <div className="p-10 md:p-14 space-y-10">
                    {/* Brand Header */}
                    <div className="text-center space-y-4">
                        <div className="h-16 w-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto text-primary-600 shadow-inner">
                            <ShieldCheck className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
                            <p className="text-sm text-slate-400 font-medium italic">Secure access to ByteBlog archive</p>
                        </div>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Identity (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-300 group-focus-within:text-primary-600 transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium text-slate-900 shadow-sm"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center pr-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Passkey</label>
                                    <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-primary-600 uppercase tracking-widest hover:underline">Lost access?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-300 group-focus-within:text-primary-600 transition-colors" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium text-slate-900 shadow-sm"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-950 text-white py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-600 transition-all active:scale-[0.98] flex justify-center items-center group shadow-xl shadow-slate-900/10"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <span className="flex items-center gap-3">
                                    Establish Session <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-4 border-t border-slate-50">
                        <Link to="/register" className="text-xs text-slate-400 font-medium">
                            New contributor? <span className="text-primary-600 font-bold hover:underline">Apply for membership</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
