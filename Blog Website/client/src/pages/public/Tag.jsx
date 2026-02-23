import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { Tag as TagIcon, ArrowRight, Calendar, Clock, Loader2, Sparkles } from 'lucide-react';

const Tag = () => {
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostsByTag = async () => {
            setLoading(true);
            try {
                // Assuming backend has a tag search endpoint or we use search query
                const { data } = await api.get(`/posts?tag=${slug}`);
                setPosts(data.data.posts);
            } catch (error) {
                console.error('Error fetching tag posts');
            } finally {
                setLoading(false);
            }
        };
        fetchPostsByTag();
    }, [slug]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Retrieving artifacts...</p>
        </div>
    );

    return (
        <div className="min-h-screen pb-32">
            {/* Header */}
            <header className="bg-slate-900 pt-48 pb-24 text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-md text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10">
                    <TagIcon className="h-3 w-3" /> Taxonomy Node
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tight capitalize">
                    #{slug}
                </h1>
                <p className="text-slate-400 font-medium max-w-lg mx-auto italic">
                    All intellectual artifacts categorized under the #{slug} identifier.
                </p>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-20">
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post) => (
                            <article key={post._id} className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                                <Link to={`/posts/${post.slug}`} className="block aspect-[16/10] overflow-hidden">
                                    <img
                                        src={post.featuredImage || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt=""
                                    />
                                </Link>
                                <div className="p-8 space-y-4">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <Calendar className="h-3 w-3" /> {new Date(post.createdAt).toLocaleDateString()}
                                        <Clock className="h-3 w-3 ml-2" /> {post.readTime || 5} min read
                                    </div>
                                    <Link to={`/posts/${post.slug}`}>
                                        <h3 className="text-2xl font-bold text-slate-900 hover:text-primary-600 transition-colors leading-tight line-clamp-2">{post.title}</h3>
                                    </Link>
                                    <Link to={`/posts/${post.slug}`} className="inline-flex items-center text-[10px] font-black text-primary-600 uppercase tracking-widest pt-2 group/btn">
                                        Read Transcript <ArrowRight className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center animate-fade-in">
                        <Sparkles className="h-16 w-16 text-slate-100 mx-auto mb-6" />
                        <h2 className="text-2xl font-black text-slate-300 uppercase tracking-[0.3em]">No matching transmissions found</h2>
                        <Link to="/" className="text-primary-600 font-bold hover:underline mt-4 inline-block">Return to Discover</Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Tag;
