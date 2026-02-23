import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';

const FeaturedPosts = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    const mainPost = posts[0];
    const sidePosts = posts.slice(1, 4);

    return (
        <section className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[var(--border-main)] pb-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary-500" />
                        <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Prime Narrative</h2>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] font-medium">Handpicked masterpieces from the ByteBlog community.</p>
                </div>
                <Link to="/?sort=-views" className="inline-flex items-center px-6 py-3 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-2xl text-primary-600 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all shadow-sm active:scale-95">
                    Explore Popular
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Featured Post - The Centerpiece */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-8 group relative"
                >
                    <Link to={`/posts/${mainPost.slug}`} className="block relative aspect-[16/10] md:aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl border border-[var(--border-main)]">
                        <img
                            src={mainPost.featuredImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'}
                            alt={mainPost.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                        />
                        {/* Dramatic Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full space-y-6">
                            <div className="flex items-center gap-4">
                                {mainPost.categories?.map(cat => (
                                    <span key={cat._id} className="text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-xl text-white px-4 py-2 rounded-xl border border-white/20">
                                        {cat.name}
                                    </span>
                                ))}
                                <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-500"></div>
                                    {mainPost.readTime || 5} min read
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-6xl lg:text-7xl font-black text-white leading-[1] md:leading-[0.95] tracking-tighter group-hover:text-primary-100 transition-colors duration-500">
                                {mainPost.title}
                            </h3>

                            <p className="hidden md:block text-slate-300 text-xl font-medium line-clamp-2 max-w-3xl opacity-80 group-hover:opacity-100 transition-opacity">
                                {mainPost.excerpt || 'An in-depth analysis of emerging digital landscapes and the critical intersection of code and creativity.'}
                            </p>
                        </div>

                        {/* Interactive Corner Accent */}
                        <div className="absolute top-8 right-8 h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-700">
                            <ArrowRight className="h-6 w-6" />
                        </div>
                    </Link>
                </motion.div>

                {/* Side Stream - Curated List */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    {sidePosts.map((post, idx) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15, duration: 0.8 }}
                            className="group flex gap-6 items-center bg-[var(--card-bg)] p-4 rounded-[2.5rem] border border-transparent hover:border-[var(--border-main)] hover:shadow-xl transition-all duration-500"
                        >
                            <Link to={`/posts/${post.slug}`} className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0 rounded-[2rem] overflow-hidden border border-[var(--border-main)] shadow-sm">
                                <img
                                    src={post.featuredImage || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=300'}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                            </Link>
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-500">
                                        {post.categories?.[0]?.name || 'Insights'}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400">
                                        {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <Link to={`/posts/${post.slug}`}>
                                    <h4 className="text-lg md:text-xl font-black text-[var(--text-primary)] group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight tracking-tighter">
                                        {post.title}
                                    </h4>
                                </Link>
                                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>{post.readTime || 5} MINS READ</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* High-Impact Creator CTA */}
                    <Link
                        to="/register"
                        className="relative flex flex-col justify-center p-8 bg-slate-950 rounded-[2.5rem] overflow-hidden group/cta shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full mt-auto"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover/cta:scale-150 transition-transform duration-[2s]"></div>
                        <div className="relative z-10 space-y-4">
                            <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center text-white mb-2 shadow-lg shadow-primary-500/40">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary-400">Creator Hub</p>
                                <h5 className="text-2xl font-black text-white tracking-tight">Lead the conversation.<br />Become an Author.</h5>
                            </div>
                            <div className="inline-flex items-center gap-3 text-xs font-black text-white uppercase tracking-widest group-hover/cta:gap-5 transition-all">
                                Join Now <ArrowRight className="h-4 w-4 text-primary-500" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPosts;
