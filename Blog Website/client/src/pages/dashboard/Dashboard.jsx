import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FileText, PlusCircle, MessageCircle, Heart, Edit, Trash2, Eye, Bookmark, Users, Star, ArrowRight, Settings, LayoutDashboard, Zap, Activity, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    if (!user) return null;

    const isAuthor = ['author', 'editor', 'admin', 'super_admin'].includes(user.role);
    const isAdmin = ['admin', 'super_admin'].includes(user.role);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuthor) {
                    const { data } = await api.get('/posts/my-posts');
                    setData(data.data);
                } else {
                    const { data: profile } = await api.get('/users/profile/me');
                    setData(profile.data.bookmarks || []);
                }
            } catch (error) {
                console.error('Error fetching dashboard data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [isAuthor]);

    const handleDelete = async (id) => {
        if (!window.confirm('Archive this artifact? This action is permanent.')) return;
        try {
            await api.delete(`/posts/${id}`);
            toast.success('Removed from database');
            setData(data.filter(p => p._id !== id));
        } catch (error) {
            toast.error('Deletion failed');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'submitted': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    };

    return (
        <div className="space-y-10 pb-24 animate-fade-in max-w-7xl mx-auto px-6">
            {/* 1. Dashboard Masthead */}
            <div className="relative bg-slate-900 rounded-xl p-10 md:p-14 overflow-hidden text-white shadow-2xl shadow-slate-200/20">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-600/10 blur-[100px] rounded-full translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                    <div className="space-y-6 max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest text-primary-300 backdrop-blur-md">
                            <LayoutDashboard className="h-3.5 w-3.5" /> Intelligence Interface
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight leading-none">
                            Welcome, <span className="text-primary-500">{user?.name?.split(' ')[0] || 'Visitor'}</span>.
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                            {isAuthor
                                ? "Orchestrate your creative output and monitor your growing influence across the digital collective."
                                : "Your curated repository of technical artifacts and saved insights is synchronized and ready."}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        {isAdmin && (
                            <Link to="/admin" className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-[11px] uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Administrative Access
                            </Link>
                        )}
                        {isAuthor && (
                            <Link to="/write" className="bg-primary-600 text-white px-10 py-5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-600/20 transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-lg shadow-black/20">
                                <PlusCircle className="h-4 w-4 group-hover:rotate-90 transition-transform" /> New Manuscript
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isAuthor ? (
                    <>
                        <StatBlock icon={FileText} label="Manuscripts" value={data.length} trend="+12%" color="indigo" />
                        <StatBlock icon={Activity} label="Reach" value={data.reduce((acc, p) => acc + (p.views || 0), 0)} trend="↑ 8%" color="emerald" />
                        <StatBlock icon={MessageCircle} label="Feedback" value="142" trend="+24" color="amber" />
                        <StatBlock icon={Star} label="Reputation" value="Elite" trend="Top Tier" color="rose" />
                    </>
                ) : (
                    <>
                        <StatBlock icon={Bookmark} label="Archived" value={data.length} trend="+3" color="indigo" />
                        <StatBlock icon={Zap} label="Streak" value="12 Days" trend="Peak" color="amber" />
                        <StatBlock icon={Users} label="Watching" value="18" trend="+2" color="emerald" />
                        <StatBlock icon={Activity} label="Progress" value="84%" trend="↑ 5%" color="rose" />
                    </>
                )}
            </div>

            {/* 3. Terminal Management View */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="p-8 md:p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {isAuthor ? 'Production Archives' : 'Reading Vault'}
                        </h2>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Status: Active Interface</p>
                    </div>
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                        <button className="px-5 py-2.5 bg-white shadow-sm border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900">Linear View</button>
                        <button className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-50 cursor-not-allowed">Grid View</button>
                    </div>
                </div>

                {loading ? (
                    <div className="py-32 text-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary-600 mx-auto mb-4" />
                        <p className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[10px]">Syncing central database...</p>
                    </div>
                ) : data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Manuscript Title</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">{isAuthor ? 'Status' : 'Author'}</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">{isAuthor ? 'Impact' : 'Archived'}</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.map((item) => (
                                    <tr key={item._id} className="group hover:bg-slate-50/30 transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="relative h-14 w-20 rounded-lg overflow-hidden border border-white shadow-md flex-shrink-0">
                                                    <img src={item.featuredImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                                </div>
                                                <div className="space-y-1 min-w-0">
                                                    <Link to={`/posts/${item.slug}`} className="block font-bold text-slate-900 group-hover:text-primary-600 transition-colors text-lg leading-tight line-clamp-1 tracking-tight">{item.title}</Link>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</span>
                                                        <div className="h-1 w-1 bg-slate-200 rounded-full"></div>
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.readTime || 5} min artifact</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm">
                                            {isAuthor ? (
                                                <span className={`px-3 py-1.5 border rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center w-fit gap-2 ${getStatusColor(item.status)}`}>
                                                    <div className={`h-1.5 w-1.5 rounded-full ${item.status === 'published' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-current'}`}></div>
                                                    {item.status}
                                                </span>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <img src={`https://ui-avatars.com/api/?name=${item.author?.name}&background=f8fafc&color=6366f1`} className="h-6 w-6 rounded-md" />
                                                    <span className="text-xs font-bold text-slate-500 truncate max-w-[120px]">{item.author?.name || 'Architect'}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            {isAuthor ? (
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xl font-black text-slate-900 leading-none">{item.views || 0}</span>
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1.5">Impressions</span>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-slate-400 opacity-60">{new Date(item.createdAt).toLocaleDateString()}</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                {isAuthor ? (
                                                    <>
                                                        <Link to={`/edit/${item._id}`} className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-primary-600 hover:border-primary-100 hover:shadow-lg rounded-xl transition-all active:scale-95">
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button onClick={() => handleDelete(item._id)} className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-100 hover:shadow-lg rounded-xl transition-all active:scale-95">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <Link to={`/posts/${item.slug}`} className="p-3 bg-primary-600 text-white shadow-xl shadow-primary-600/20 rounded-xl transition-all hover:bg-primary-500 active:scale-95">
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-40 text-center space-y-8 bg-slate-50/20">
                        <div className="h-24 w-24 bg-white rounded-2xl shadow-inner mx-auto flex items-center justify-center border border-slate-100">
                            <PlusCircle className="h-10 w-10 text-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-slate-900 font-black uppercase tracking-widest text-sm">Central Archives Empty</p>
                            <p className="text-slate-400 font-medium max-w-xs mx-auto">Your historical records haven't reached the transmission feed yet. It's time to initiate your first broadcast.</p>
                        </div>
                        {isAuthor && (
                            <Link to="/write" className="px-12 py-5 bg-slate-950 text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-primary-600 transition-all shadow-xl shadow-slate-950/20 active:scale-95 inline-flex items-center gap-3">
                                Begin Your Broadcast <ArrowRight className="h-4 w-4" />
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatBlock = ({ icon: Icon, label, value, trend, color }) => {
    const colorMap = {
        indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        amber: 'text-amber-600 bg-amber-50 border-amber-100',
        rose: 'text-rose-600 bg-rose-50 border-rose-100',
    };

    return (
        <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm group hover:border-primary-100 transition-all hover:shadow-xl hover:shadow-slate-200/40">
            <div className={`p-4 rounded-xl border w-fit group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ${colorMap[color]}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="mt-8 space-y-2">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{label}</p>
                <div className="flex items-baseline gap-4">
                    <p className="text-3xl font-black text-slate-900 tracking-tight leading-none">{value}</p>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">{trend}</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
