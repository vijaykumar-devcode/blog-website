import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ArrowRight, Filter, TrendingUp, Search } from 'lucide-react';

const Category = () => {
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            try {
                // Fetch category details
                const { data: catData } = await api.get('/categories');
                const currentCat = catData.data.find(c => c.slug === slug);
                setCategory(currentCat);

                // Fetch posts for this category
                const { data: postData } = await api.get(`/posts?category=${slug}`);
                setPosts(postData.data);
            } catch (error) {
                console.error('Error fetching category data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="h-12 w-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen pb-32">
            {/* 1. Category Header - Cinematic Banner */}
            <header className="relative bg-slate-900 pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src={`https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=2000`}
                        className="w-full h-full object-cover"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center space-y-6">
                    <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Feed
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-display font-black text-white tracking-tight">
                            {category?.name || 'Category'} <span className="text-primary-500 italic">Archive</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-6">
                            Deep dives and curated insights into the world of {category?.name.toLowerCase() || 'this topic'}.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* 2. Main Discovery Grid */}
            <main className="max-w-7xl mx-auto px-6 mt-20">
                <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                            <Filter className="h-5 w-5" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">{posts.length} Artifacts Collected</h2>
                    </div>
                </div>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map((post) => (
                            <article key={post._id} className="group flex flex-col">
                                <Link to={`/posts/${post.slug}`} className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 mb-6 border border-slate-100">
                                    <img
                                        src={post.featuredImage || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt={post.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
                                </Link>
                                <div className="space-y-4 flex-grow">
                                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                                        <span>{post.readTime || 5} min read</span>
                                    </div>
                                    <Link to={`/posts/${post.slug}`}>
                                        <h3 className="text-2xl font-bold leading-tight hover:text-primary-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <p className="text-slate-500 line-clamp-2 leading-relaxed">
                                        {post.excerpt || 'An exploration into the next generation of digital infrastructure...'}
                                    </p>
                                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.name}&background=f1f5f9&color=64748b`}
                                                className="h-8 w-8 rounded-full"
                                                alt=""
                                            />
                                            <span className="text-xs font-bold text-slate-700">{post.author?.name}</span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <Search className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                        <h3 className="text-3xl font-black text-slate-900">Transmission Void</h3>
                        <p className="text-slate-500 mt-4 max-w-sm mx-auto">This category archive is currently empty. Stay tuned for future transmissions.</p>
                        <Link to="/" className="inline-block mt-8 px-10 py-4 bg-slate-950 text-white rounded-xl font-bold uppercase tracking-widest text-xs">Return to Feed</Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Category;
