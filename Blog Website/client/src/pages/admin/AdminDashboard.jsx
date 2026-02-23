import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, BookOpen, MessageSquare, AlertCircle, BarChart3, TrendingUp, ShieldCheck, PieChart, Activity, ExternalLink, Loader2, Sparkles, ChevronRight, Gavel, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Synchronizing administrative mainframe...</p>
        </div>
    );

    const cards = [
        { title: 'Authorized Citizens', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', link: '/admin/users', trend: '+14%', trendColor: 'text-emerald-500' },
        { title: 'Archival Manuscripts', value: stats.totalPosts, icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+8%', trendColor: 'text-emerald-500' },
        { title: 'Community Feedback', value: stats.totalComments, icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+22%', trendColor: 'text-emerald-500' },
        { title: 'Awaiting Clearance', value: stats.pendingPosts, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', link: '/admin/posts', trend: 'Priority', trendColor: 'text-rose-500' },
    ];

    return (
        <div className="space-y-12 pb-32 animate-fade-in px-6 max-w-[1440px] mx-auto">
            {/* 1. Command Center Masthead */}
            <div className="relative overflow-hidden bg-slate-950 rounded-xl p-12 md:p-20 text-white shadow-2xl shadow-slate-900/20 translate-y-4">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-600/10 to-transparent"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-16">
                    <div className="space-y-8 max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-md backdrop-blur-md">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-100">Elevated Administrative Access</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight leading-none">
                            Platform <span className="text-primary-500">Mainframe</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed italic border-l-2 border-primary-500/50 pl-8">
                            Coordinate the digital landscape. Audit transmission logs, authorize contributors, and monitor the pulse of the collective archive.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-xl space-y-4 min-w-[200px]">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">System Uptime</p>
                            <div className="text-3xl font-black text-white">99.98<span className="text-primary-500">%</span></div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Nominal state
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-xl space-y-4 min-w-[200px]">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Throughput</p>
                            <div className="text-3xl font-black text-white">1.2<span className="text-primary-500"> GB/s</span></div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary-400">
                                <Cpu className="h-3 w-3" /> Peak Efficient
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Tactical Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="bg-white p-10 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/40 group relative overflow-hidden transition-all"
                    >
                        <Link to={card.link || '#'} className="absolute inset-0 z-10"></Link>
                        <div className="flex justify-between items-start relative z-20">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{card.title}</p>
                                <h3 className="text-5xl font-black text-slate-900 tracking-tight leading-none">{card.value}</h3>
                            </div>
                            <div className={`${card.bg} ${card.color} p-5 rounded-xl group-hover:rotate-12 transition-transform shadow-sm`}>
                                <card.icon className="h-7 w-7" />
                            </div>
                        </div>
                        <div className="mt-10 flex items-center justify-between border-t border-slate-50 pt-6">
                            <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${card.trendColor} bg-slate-50`}>
                                {card.trend}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-primary-600 transition-colors">
                                Interface <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 3. Operational Intelligence */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Elite Operational Contributors */}
                <div className="lg:col-span-2 bg-white p-12 md:p-16 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/40">
                    <div className="flex justify-between items-center mb-16 pb-8 border-b border-slate-50">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Prime Contributors</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Highest Transmission Volume</p>
                        </div>
                        <div className="p-4 bg-primary-50 rounded-xl">
                            <Sparkles className="text-primary-600 h-6 w-6" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {stats.mostActiveAuthors.map((author, idx) => (
                            <div key={idx} className="group p-8 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40 rounded-xl border border-transparent hover:border-slate-100 transition-all">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="relative">
                                        <img src={`https://ui-avatars.com/api/?name=${author.authorDetails.name}&background=f8fafc&color=6366f1`} className="h-16 w-16 rounded-xl shadow-xl border-4 border-white" />
                                        <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-primary-600 leading-none">{author.postCount}</p>
                                        <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mt-2">Archives</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-black text-slate-900 flex items-center gap-2">
                                        {author.authorDetails.name} <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    </p>
                                    <p className="text-xs text-slate-400 font-bold tracking-tight">{author.authorDetails.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Real-time Diagnostics */}
                <div className="lg:col-span-1 bg-slate-950 p-12 md:p-16 rounded-xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-between space-y-12 text-center border border-white/5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent)]"></div>
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full border-2 border-primary-500/20 flex items-center justify-center group relative">
                            <div className="absolute inset-0 rounded-full border-2 border-primary-500 animate-pulse opacity-20"></div>
                            <Activity className="h-12 w-12 text-white group-hover:scale-110 transition-all duration-700" />
                        </div>
                        <div className="absolute -top-4 -right-4 px-3 py-1 bg-primary-600 text-white text-[9px] font-black rounded-md shadow-lg uppercase tracking-widest">Live</div>
                    </div>

                    <div className="relative space-y-6">
                        <h3 className="text-2xl font-black text-white uppercase tracking-[0.3em]">Network Pulse</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed italic px-4">
                            Aggregating real-time behavioral diagnostics from the collective user network.
                        </p>
                    </div>

                    <div className="relative w-full space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                            <span>Indexing Efficiency</span>
                            <span className="text-primary-400">94%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                            <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ duration: 2, ease: "easeOut" }} className="h-full bg-primary-600 shadow-[0_0_12px_rgba(99,102,241,0.5)]"></motion.div>
                        </div>
                    </div>

                    <div className="px-10 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 backdrop-blur-md">
                        Synchronized
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
