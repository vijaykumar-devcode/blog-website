import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { CheckCircle, XCircle, Eye, Clock, User, ArrowLeft, ShieldAlert, Sparkles, Loader2, Bookmark, CheckCircle2, Gavel, FileSearch } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PendingReview = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingPosts = async () => {
        try {
            const { data } = await api.get('/posts?status=submitted');
            setPosts(data.data);
        } catch (error) {
            toast.error('Moderation queue synchronization failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingPosts();
    }, []);

    const handleReview = async (id, status) => {
        try {
            await api.put(`/admin/review-post/${id}`, { status });
            toast.success(status === 'published' ? 'Manuscript authorized for broadcast' : 'Manuscript audit complete: Rejected');
            fetchPendingPosts();
        } catch (error) {
            toast.error('Authorization override failed');
        }
    };

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Accessing Restricted Moderation Vault...</p>
        </div>
    );

    return (
        <div className="max-w-[1440px] mx-auto space-y-12 pb-32 animate-fade-in px-6">
            <header className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-50">
                <div className="flex items-center gap-8">
                    <Link to="/admin" className="p-4 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 shadow-sm transition-all hover:-translate-x-1 group">
                        <ArrowLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    </Link>
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 rounded-md text-[10px] font-black uppercase tracking-widest border border-primary-100">
                            <Gavel className="h-3.5 w-3.5" /> Administrative Chamber
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">Manuscript Audit Queue</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <div className="px-6 py-3 bg-white shadow-sm border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                        <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div> Unprocessed: {posts.length}
                    </div>
                </div>
            </header>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                    {posts.map((post) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="group bg-white p-8 md:p-10 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col lg:flex-row lg:items-center justify-between gap-12 transition-all hover:border-primary-100 hover:shadow-2xl"
                        >
                            <div className="flex flex-col md:flex-row items-start gap-10 flex-1">
                                <div className="relative shrink-0 group">
                                    <img
                                        src={post.featuredImage || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400&h=300&fit=crop'}
                                        className="h-40 w-64 object-cover rounded-xl shadow-2xl transition-all duration-700 grayscale group-hover:grayscale-0"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all rounded-xl"></div>
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md border border-slate-100 text-[9px] font-black text-slate-900 uppercase tracking-widest rounded-lg shadow-xl">
                                        Submitted for Review
                                    </div>
                                </div>
                                <div className="space-y-6 max-w-2xl py-2">
                                    <h3 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2 tracking-tight">{post.title}</h3>
                                    <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-3">
                                            <img src={`https://ui-avatars.com/api/?name=${post.author.name}&background=f8fafc&color=6366f1`} className="h-6 w-6 rounded-md shadow-sm" alt="" />
                                            {post.author.name}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300">
                                                <Clock className="h-3 w-3" />
                                            </div>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300">
                                                <Bookmark className="h-3 w-3" />
                                            </div>
                                            Taxonomy: {post.categories?.[0]?.name || 'Unclassified'}
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic line-clamp-2 border-l-2 border-slate-100 pl-4">{post.excerpt || 'No synopsis provided for this artifact.'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 w-full lg:w-auto self-end lg:self-center">
                                <Link
                                    to={`/posts/${post.slug}`}
                                    target="_blank"
                                    className="flex-1 lg:flex-none p-5 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-xl rounded-xl transition-all active:scale-90 border border-transparent hover:border-slate-100 bg-white/50"
                                    title="Examine Draft"
                                >
                                    <Eye className="h-6 w-6 mx-auto" />
                                </Link>
                                <button
                                    onClick={() => handleReview(post._id, 'rejected')}
                                    className="flex-1 lg:flex-none p-5 text-rose-400 hover:text-rose-600 hover:bg-white hover:shadow-xl rounded-xl transition-all active:scale-90 border border-transparent hover:border-slate-100 bg-white/50"
                                    title="Intercept & Reject"
                                >
                                    <XCircle className="h-6 w-6 mx-auto" />
                                </button>
                                <button
                                    onClick={() => handleReview(post._id, 'published')}
                                    className="flex-[2] lg:flex-none px-12 py-5 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95 group"
                                >
                                    <CheckCircle2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    <span>Authorize Broadcast</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center space-y-10 bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03),transparent)]"></div>
                    <div className="relative mx-auto h-32 w-32 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 group">
                        <CheckCircle className="h-16 w-16 text-emerald-100 group-hover:text-emerald-500 transition-all duration-700" />
                        <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping"></div>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Archives Fully Verified</h3>
                        <p className="text-slate-400 text-lg font-medium max-w-md mx-auto italic">The moderation vault contains no unauthorized manuscripts. The community broadcast feed is currently nominal.</p>
                    </div>
                    <Link to="/admin" className="relative z-10 inline-flex items-center gap-3 px-12 py-5 bg-slate-950 text-white rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary-600 transition-all shadow-2xl shadow-slate-950/20 active:scale-95">
                        Return to Command <Sparkles className="h-4 w-4" />
                    </Link>
                </div>
            )}

            <footer className="pt-20 text-center">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">Audit Log End — Moderation Chamber Secure</p>
            </footer>
        </div>
    );
};

export default PendingReview;
