import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Loader2, ArrowRight, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });

    const { name, email, password, role } = formData;
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
        dispatch(register({ name, email, password, role }));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[500px] bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
            >
                <div className="p-10 md:p-14 space-y-10">
                    <div className="text-center space-y-4">
                        <div className="h-16 w-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto text-primary-600 shadow-inner">
                            <PenTool className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Identity</h1>
                            <p className="text-sm text-slate-400 font-medium italic">Join the ByteBlog editorial community</p>
                        </div>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-300 group-focus-within:text-primary-600 transition-colors" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium text-slate-900 shadow-sm"
                                        placeholder="John Wick"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
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
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Secure Passkey</label>
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

                            <div className="space-y-3 pt-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Intended Focus</label>
                                <div className="flex gap-4">
                                    {['user', 'author'].map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: r })}
                                            className={`flex-1 py-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${role === r
                                                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg'
                                                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                                                }`}
                                        >
                                            {r === 'user' ? 'Reader' : 'Architect'}
                                        </button>
                                    ))}
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
                                    Initialize Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-4 border-t border-slate-50">
                        <Link to="/login" className="text-xs text-slate-400 font-medium">
                            Already a member? <span className="text-primary-600 font-bold hover:underline">Establish session</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
