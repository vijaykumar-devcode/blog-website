import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { Save, Send, Image as ImageIcon, X, Layout, Eye, Type, Settings, ChevronLeft, Loader2, Sparkles, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        category: '',
        status: 'draft'
    });

    const { title, content, excerpt, featuredImage, category } = formData;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const { data: catData } = await api.get('/categories');
                setCategories(catData.data || []);

                // Fetch post for edit
                const { data: postData } = await api.get(`/posts/my-posts`);
                const post = postData.data.find(p => p._id === id);
                if (post) {
                    setFormData({
                        title: post.title,
                        content: post.content,
                        excerpt: post.excerpt || '',
                        featuredImage: post.featuredImage || '',
                        category: post.categories?.[0]?._id || post.categories?.[0] || '',
                        status: post.status
                    });
                } else {
                    toast.error('Artifact not found or access restricted');
                    navigate('/dashboard');
                }
            } catch (error) {
                toast.error('Error fetching archival data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e, status = formData.status) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            await api.put(`/posts/${id}`, {
                ...formData,
                status,
                categories: category ? [category] : []
            });
            toast.success('Revision secured in archives');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Archival update failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Retrieving manuscript from vault...</p>
        </div>
    );

    return (
        <div className="max-w-[1440px] mx-auto space-y-10 pb-32 animate-fade-in px-6">
            {/* 1. Cinematic Revision Command Bar */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sticky top-24 z-50 bg-white/90 backdrop-blur-xl p-8 rounded-xl border border-slate-100 shadow-2xl shadow-slate-200/40 translate-y-2">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-95 group">
                        <ChevronLeft className="h-5 w-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </button>
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-display font-black text-slate-900 tracking-tight flex items-center gap-3">
                            Refining Masterpiece <Sparkles className="h-5 w-5 text-primary-500 animate-pulse" />
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Status: Editing Historical Record</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={`flex-1 md:flex-none inline-flex items-center justify-center px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${showPreview ? 'bg-slate-950 border-slate-950 text-white shadow-xl shadow-slate-950/20' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900'}`}
                    >
                        {showPreview ? <><Type className="mr-2 h-4 w-4" /> Editorial Mode</> : <><Eye className="mr-2 h-4 w-4" /> Global Preview</>}
                    </button>
                    <button
                        onClick={(e) => onSubmit(e, 'draft')}
                        disabled={saving}
                        className="flex-1 md:flex-none inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4" /> Update Draft</>}
                    </button>
                    <button
                        onClick={(e) => onSubmit(e, 'submitted')}
                        disabled={saving}
                        className="flex-1 md:flex-none inline-flex items-center justify-center px-10 py-4 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-600/20 transition-all active:scale-95 disabled:opacity-50 shadow-lg"
                    >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="mr-2 h-4 w-4" /> Finalize Revision</>}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-4">
                {/* 2. Primary Revision Terminal */}
                <div className="lg:col-span-3 space-y-8">
                    <AnimatePresence mode="wait">
                        {!showPreview ? (
                            <motion.div
                                key="composition"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-6"
                            >
                                <div className="bg-white p-12 md:p-20 rounded-xl border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-12 min-h-[900px]">
                                    <input
                                        id="manuscript-title-edit"
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={onChange}
                                        placeholder="Headline your record..."
                                        className="w-full text-5xl md:text-7xl font-display font-black border-none focus:ring-0 placeholder-slate-100 tracking-tight leading-[1.1] text-slate-900"
                                        required
                                    />
                                    <div className="flex items-center gap-6 pb-6 border-b border-slate-50">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                            <PenTool className="h-3 w-3" /> Syntax: Markdown Compatible
                                        </div>
                                        <div className="h-1 w-1 bg-slate-100 rounded-full"></div>
                                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                            ID: {id.slice(-8).toUpperCase()}
                                        </div>
                                    </div>
                                    <textarea
                                        id="manuscript-content-edit"
                                        name="content"
                                        value={content}
                                        onChange={onChange}
                                        placeholder="Refine your narrative articulation..."
                                        className="w-full h-[700px] border-none focus:ring-0 resize-none text-xl text-slate-600 placeholder-slate-100 leading-relaxed font-serif scrollbar-thin scrollbar-thumb-slate-100"
                                        required
                                    ></textarea>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="global-preview-edit"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="bg-slate-50 p-12 md:p-20 rounded-xl border border-slate-200 min-h-[900px] prose prose-xl max-w-none prose-slate shadow-inner"
                            >
                                <div className="max-w-4xl mx-auto">
                                    <div className="mb-10 text-center space-y-4">
                                        <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-[10px] font-black uppercase tracking-widest">Revision Preview State</div>
                                        <h1 className="font-display font-black text-slate-900 tracking-tight leading-tight text-6xl">{title || 'Untitled Archive'}</h1>
                                    </div>
                                    <div className="mt-16 h-px bg-slate-200 w-full mb-16"></div>
                                    <div className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content || '<p class="text-slate-300 italic text-center text-2xl py-20 font-display">No transmission data received...</p>' }} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 3. Metadata Configuration Sidebar */}
                <aside className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/40 space-y-10 sticky top-64 transition-all">
                        <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                            <Settings className="h-4 w-4 text-primary-500" />
                            <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Archival Meta</h3>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                                    <Layout className="h-3 w-3" /> Classification Node
                                </label>
                                <div className="relative group">
                                    <select
                                        id="select-category-edit"
                                        name="category"
                                        value={category}
                                        onChange={onChange}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-900 focus:bg-white focus:border-primary-500/50 transition-all outline-none appearance-none cursor-pointer pr-10"
                                    >
                                        <option value="">Select Topic</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <div className="h-1.5 w-1.5 border-r-2 border-b-2 border-slate-400 rotate-45 transform translate-y-[-2px]"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current State</label>
                                <div className="px-4 py-2 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-center border border-slate-800 shadow-lg">
                                    {formData.status}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                                    <Type className="h-3 w-3" /> Revision Synopsis
                                </label>
                                <textarea
                                    id="input-excerpt-edit"
                                    name="excerpt"
                                    value={excerpt}
                                    onChange={onChange}
                                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-medium text-slate-600 focus:bg-white focus:border-primary-500/50 transition-all outline-none resize-none leading-relaxed"
                                    rows="5"
                                    placeholder="Update hook for central indices..."
                                ></textarea>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                                    <ImageIcon className="h-3 w-3" /> Hero Asset (URL)
                                </label>
                                <div className="space-y-4">
                                    <input
                                        id="input-featured-image-edit"
                                        type="text"
                                        name="featuredImage"
                                        value={featuredImage}
                                        onChange={onChange}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-medium text-slate-500 focus:bg-white focus:border-primary-500/50 transition-all outline-none"
                                        placeholder="Paste image identifier..."
                                    />
                                    <AnimatePresence>
                                        {featuredImage && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="rounded-xl overflow-hidden aspect-video border-2 border-slate-50 shadow-inner group relative"
                                            >
                                                <img src={featuredImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Preview" />
                                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all"></div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-50 text-center">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] leading-relaxed">Revision latency is minimized <br /> via localized delta updates</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default EditPost;
