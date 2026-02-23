import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Bell, MessageCircle, Heart, UserPlus, CheckCircle, XCircle, Loader2, Sparkles, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const { data } = await api.get('/users/notifications');
            setNotifications(data.data);

            // Mark as read after fetching
            if (data.data?.some(n => !n.isRead)) {
                await api.put('/users/notifications/read');
            }
        } catch (error) {
            console.error('Error fetching notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'comment': return <MessageCircle className="h-4 w-4 text-blue-500" />;
            case 'like': return <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />;
            case 'follow': return <UserPlus className="h-4 w-4 text-indigo-500" />;
            case 'post_approved': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
            case 'post_rejected': return <XCircle className="h-4 w-4 text-rose-500" />;
            default: return <Bell className="h-4 w-4 text-slate-400" />;
        }
    };

    const getMessage = (n) => {
        const sender = <span className="font-black text-slate-900">{n.sender?.name}</span>;
        switch (n.type) {
            case 'comment': return <>{sender} added a technical response to your archive: <span className="italic">"{n.post?.title}"</span></>;
            case 'like': return <>{sender} endorsed your manuscript artifact: <span className="italic">"{n.post?.title}"</span></>;
            case 'follow': return <>{sender} established a synchronization with your feed</>;
            case 'post_approved': return <>Manuscript <span className="font-bold underline">"{n.post?.title}"</span> has been verified and published to the central index ✨</>;
            case 'post_rejected': return <>Transmission for <span className="font-bold text-rose-600">"{n.post?.title}"</span> was intercepted and returned for revision.</>;
            default: return 'A new system transmission has been received';
        }
    };

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Retrieving telemetry data...</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-32 animate-fade-in px-6">
            <header className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black uppercase tracking-widest border border-slate-200">
                    <Activity className="h-3.5 w-3.5" /> Event Telemetry
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">Intelligence Feed</h1>
                <p className="text-slate-400 text-lg font-medium max-w-xl italic">Real-time monitoring of collective interactions and system status updates.</p>
            </header>

            <div className="bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                {notifications.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                        {notifications.map((n) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={n._id}
                                className={`p-8 md:p-10 flex items-start gap-6 transition-all hover:bg-slate-50/50 group ${!n.isRead ? 'bg-primary-50/10' : ''}`}
                            >
                                <div className="relative">
                                    <div className="p-4 bg-white rounded-xl shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
                                        {getIcon(n.type)}
                                    </div>
                                    {!n.isRead && (
                                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary-600 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-[13px] md:text-base text-slate-600 leading-relaxed">
                                        {getMessage(n)}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            {new Date(n.createdAt).toLocaleDateString()}
                                        </span>
                                        <div className="h-1 w-1 bg-slate-200 rounded-full"></div>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                        <Sparkles className="h-4 w-4 text-slate-200" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center space-y-8 bg-slate-50/20">
                        <div className="h-24 w-24 bg-white rounded-xl shadow-inner mx-auto flex items-center justify-center border border-slate-100">
                            <Bell className="h-12 w-12 text-slate-100" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Archives Quiescent</h3>
                            <p className="text-slate-400 font-medium max-w-xs mx-auto italic">No new telemetry data detected in the current transmission cycle.</p>
                        </div>
                    </div>
                )}
            </div>

            <footer className="pt-10 text-center">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Transmission Terminated — End of Log</p>
            </footer>
        </div>
    );
};

export default Notifications;
