import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, TrendingUp, Clock, Filter, ArrowUpRight, Twitter, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    const sort = queryParams.get('sort');
    const category = queryParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch categories
                const { data: catData } = await api.get('/categories');
                setCategories(catData.data || []);

                // Fetch posts
                let url = '/posts';
                const params = [];
                if (search) params.push(`search=${search}`);
                if (sort) params.push(`sort=${sort}`);
                if (category) params.push(`category=${category}`);

                if (params.length > 0) {
                    url += `?${params.join('&')}`;
                }

                const { data } = await api.get(url);
                setPosts(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search, sort, category]);

    const featuredPost = posts[0];
    const latestArticles = posts.slice(1, 10);
    const popularPosts = posts.slice(1, 6);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="h-12 w-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-0">
            {/* 2. Hero Section - Cinematic & Content-Focused */}
            {!search && !category && featuredPost && (
                <section className="relative h-[70vh] md:h-[80vh] w-full mt-[-100px] mb-20 group overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={featuredPost.featuredImage || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000'}
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                            alt={featuredPost.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    </div>

                    <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20 md:pb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl space-y-6"
                        >
                            <span className="inline-block px-4 py-1 bg-primary-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                Featured Post
                            </span>
                            <h1 className="text-4xl md:text-7xl font-display font-black text-white leading-[1] tracking-tight">
                                {featuredPost.title}
                            </h1>
                            <p className="text-xl text-slate-300 font-medium line-clamp-2 leading-relaxed">
                                {featuredPost.excerpt || 'Dive into our most impactful story of the week, exploring the intersection of creative code and digital philosophy.'}
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Link to={`/posts/${featuredPost.slug}`} className="px-10 py-4 bg-white text-slate-950 rounded-lg font-bold hover:bg-primary-500 hover:text-white transition-all shadow-xl shadow-black/20">
                                    Read Article
                                </Link>
                                <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="px-10 py-4 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-all backdrop-blur-md hidden sm:block">
                                    Our Archives
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* 3. Featured Categories - Card-based Grid */}
            {!search && !category && (
                <section className="py-24 max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Curated Topics</h2>
                        <Link to="/categories" className="text-sm font-bold text-primary-600 hover:text-primary-700">Explore all categories →</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.slice(0, 3).map((cat, idx) => (
                            <Link key={cat._id} to={`/?category=${cat.slug}`} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                                <img
                                    src={`https://images.unsplash.com/photo-${1500000000000 + idx}?auto=format&fit=crop&q=80&w=600`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={cat.name}
                                />
                                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors"></div>
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                    <h3 className="text-2xl font-bold leading-none mb-2">{cat.name}</h3>
                                    <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-1">Explore the latest in {cat.name.toLowerCase()}.</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 4. Latest Articles & 5. Sidebar - Dual Layout */}
            <section className="py-20 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Content: Latest Articles */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="flex items-center gap-4">
                            <h2 className="text-3xl font-bold tracking-tight whitespace-nowrap">
                                {search ? `Search results for "${search}"` : category ? `Topics in ${category}` : "Latest Articles"}
                            </h2>
                            <div className="h-px w-full bg-slate-200"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                            {(search || category ? posts : latestArticles).map((post) => (
                                <article key={post._id} className="group flex flex-col h-full">
                                    <Link to={`/posts/${post.slug}`} className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 mb-6">
                                        <img
                                            src={post.featuredImage || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800'}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            alt={post.title}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white text-slate-950 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                                {post.categories?.[0]?.name || 'Story'}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="space-y-4 flex-grow">
                                        <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-widest">
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                            <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                                            <span>{post.readTime || 5} min read</span>
                                        </div>
                                        <Link to={`/posts/${post.slug}`}>
                                            <h3 className="text-2xl font-bold leading-tight hover:text-primary-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p className="text-slate-500 line-clamp-3 leading-relaxed">
                                            {post.excerpt || 'Join us as we navigate the complex landscapes of modern engineering and design philosophy...'}
                                        </p>
                                        <Link to={`/posts/${post.slug}`} className="inline-flex items-center text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                                            Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Desktop Only Sticky */}
                    <aside className="lg:col-span-4 space-y-16">
                        <div className="lg:sticky lg:top-32 space-y-12">
                            {/* Author Bio Card */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="h-20 w-20 rounded-full mx-auto mb-6 shadow-xl ring-4 ring-slate-50"
                                    alt="Author"
                                />
                                <h4 className="text-xl font-bold mb-2">Editor's Note</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    Crafting insights for the next generation of digital builders. I'm passion about minimal code and high-end design.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <SocialLink icon={Twitter} />
                                    <SocialLink icon={Github} />
                                    <SocialLink icon={Linkedin} />
                                </div>
                            </div>

                            {/* Popular Posts */}
                            <div className="space-y-6">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Popular Stories</h4>
                                <div className="space-y-8">
                                    {popularPosts.map(post => (
                                        <Link key={post._id} to={`/posts/${post.slug}`} className="flex gap-4 group">
                                            <div className="h-16 w-16 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                                                <img src={post.featuredImage || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=100'} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="space-y-1">
                                                <h5 className="text-sm font-bold leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h5>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Category List */}
                            <div className="space-y-6">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Archives</h4>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <Link
                                            key={cat._id}
                                            to={`/?category=${cat.slug}`}
                                            className="px-4 py-2 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:border-primary-500 hover:text-primary-600 transition-all shadow-sm"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* 6. Newsletter Section - High Contrast */}
            <section className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[120px] rounded-full"></div>
                <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-tight">
                        Deep intelligence, <br /> <span className="text-primary-500 italic">weekly transmission.</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Join 150k+ digital creators receiving our curated findings on the future of code and culture.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-6">
                        <input
                            placeholder="your@email.com"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-primary-500 transition-all font-bold"
                        />
                        <button className="px-10 py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-500 shadow-2xl shadow-primary-600/20 active:scale-95 transition-all">
                            Join Now
                        </button>
                    </form>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Zero spam. Unsubscribe anytime.</p>
                </div>
            </section>
        </div>
    );
};

const SocialLink = ({ icon: Icon }) => (
    <button className="h-8 w-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
        <Icon className="h-4 w-4" />
    </button>
);


export default Home;
