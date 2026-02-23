import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../store/slices/authSlice';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { User, Mail, Camera, Save, Bell, Shield, LogOut, ChevronRight, Fingerprint, AtSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        avatar: user?.avatar || ''
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.put('/users/profile', formData);
            dispatch(updateUser(data.data));
            toast.success('Identity profile updated');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-fade-in px-6">
            <header className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black uppercase tracking-widest border border-slate-200">
                    <Fingerprint className="h-3 w-3" /> System Preferences
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">Account Configuration</h1>
                <p className="text-slate-400 text-lg font-medium max-w-xl italic">Orchestrate your platform identity and security protocols from a centralized terminal.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
                {/* 1. Tactical Sidebar */}
                <aside className="lg:col-span-1 space-y-2 sticky top-32">
                    {[
                        { id: 'profile', icon: User, label: 'Identity Profile' },
                        { id: 'notifications', icon: Bell, label: 'Telemetry' },
                        { id: 'security', icon: Shield, label: 'Access Control' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all group ${activeTab === item.id
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10'
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </div>
                            <ChevronRight className={`h-3 w-3 transition-transform ${activeTab === item.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </button>
                    ))}

                    <div className="pt-8 mt-8 border-t border-slate-50">
                        <button className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100">
                            <LogOut className="h-4 w-4" />
                            <span>Terminate Session</span>
                        </button>
                    </div>
                </aside>

                {/* 2. Primary Configuration Manifold */}
                <main className="lg:col-span-3">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 md:p-14 rounded-xl border border-slate-100 shadow-2xl shadow-slate-200/40"
                    >
                        {activeTab === 'profile' && (
                            <form onSubmit={onSubmit} className="space-y-12">
                                {/* Avatar Manifold */}
                                <div className="flex flex-col md:flex-row items-center gap-10 pb-12 border-b border-slate-50">
                                    <div className="relative group">
                                        <div className="absolute -inset-2 bg-gradient-to-tr from-primary-600 to-indigo-600 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-all blur-xl"></div>
                                        <img
                                            src={formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=f8fafc&color=6366f1`}
                                            className="relative h-32 w-32 rounded-xl object-cover ring-4 ring-white shadow-xl transition-transform group-hover:scale-[1.02]"
                                            alt=""
                                        />
                                        <label className="absolute -bottom-2 -right-2 bg-slate-950 p-3 rounded-xl text-white shadow-2xl cursor-pointer hover:bg-primary-600 transition-all border-2 border-white active:scale-90">
                                            <Camera className="h-4 w-4" />
                                            <input id="avatar-input" type="file" className="hidden" />
                                        </label>
                                    </div>
                                    <div className="text-center md:text-left space-y-2">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Identity Visualizer</h3>
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs italic">
                                            Your primary visual identifier across the platform archives. High-resolution artifacts suggested.
                                        </p>
                                    </div>
                                </div>

                                {/* Fields Manifold */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                            <AtSign className="h-3 w-3" /> Designated Name
                                        </label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary-600 transition-colors" />
                                            <input
                                                id="input-name"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={onChange}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold text-slate-900 focus:bg-white focus:border-primary-500/50 transition-all outline-none"
                                                placeholder="Enter full name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                            <Mail className="h-3 w-3" /> Communication Node
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-200" />
                                            <input
                                                id="input-email"
                                                type="email"
                                                value={user?.email}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-50 rounded-xl text-[13px] font-bold text-slate-300 cursor-not-allowed"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Professional Abstract (Bio)</label>
                                    <textarea
                                        id="input-bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={onChange}
                                        className="w-full p-6 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-medium text-slate-600 focus:bg-white focus:border-primary-500/50 transition-all outline-none min-h-[160px] resize-none leading-relaxed"
                                        placeholder="Articulate your technical focus and personal background..."
                                    ></textarea>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Asset Repository (Avatar URL)</label>
                                    <input
                                        id="input-avatar-url"
                                        type="text"
                                        name="avatar"
                                        value={formData.avatar}
                                        onChange={onChange}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold text-slate-600 focus:bg-white focus:border-primary-500/50 transition-all outline-none"
                                        placeholder="https://cdn.archives.com/your-artifact.jpg"
                                    />
                                </div>

                                <div className="pt-8 border-t border-slate-50 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full md:w-auto bg-slate-950 text-white px-12 py-5 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-primary-600 shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {loading ? <span className="animate-pulse">Synchronizing...</span> : <><Save className="h-4 w-4" /> Secure Profile Updates</>}
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab !== 'profile' && (
                            <div className="py-24 text-center space-y-6">
                                <div className="h-20 w-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-200 border border-slate-100">
                                    <Shield className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">System Restricted</h3>
                                    <p className="text-slate-400 font-medium italic">These configuration nodes are currently undergoing maintenance or require elevated clearance.</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
