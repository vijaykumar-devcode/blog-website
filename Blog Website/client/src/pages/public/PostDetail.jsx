import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { Calendar, User, Eye, ArrowLeft, Send, Heart, Bookmark, Share2, MessageCircle, Trash2, Clock, Check, Copy, Twitter, Linkedin, Facebook } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import ReadingProgressBar from '../../components/common/ReadingProgressBar';

const PostDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const { user } = useSelector((state) => state.auth);
    const [isLiked, setIsLiked] = useState(false);

    const fetchPost = async () => {
        try {
            const { data } = await api.get(`/posts/slug/${slug}`);
            setPost(data.data);

            // Fetch related posts based on category
            if (data.data.categories?.length > 0) {
                const { data: relatedData } = await api.get(`/posts?category=${data.data.categories[0].slug}&limit=3`);
                setRelatedPosts(relatedData.data.filter(p => p._id !== data.data._id));
            }
        } catch (error) {
            toast.error('Error fetching post');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
        window.scrollTo(0, 0);
    }, [slug, user]);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to comment');
            return;
        }
        if (!comment.trim()) return;

        try {
            await api.post('/comments', {
                content: comment,
                postId: post._id
            });
            toast.success('Response shared!');
            setComment('');
            fetchPost();
        } catch (error) {
            toast.error('Error sharing response');
        }
    };

    const toggleLike = async () => {
        if (!user) return toast.error('Please login to like');
        try {
            await api.post(`/posts/${post._id}/like`);
            setIsLiked(!isLiked);
            toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
        } catch (error) {
            toast.error('Error updating like state');
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Delete this comment?')) return;
        try {
            await api.delete(`/comments/${commentId}`);
            toast.success('Response removed');
            fetchPost();
        } catch (error) {
            toast.error('Error removing response');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
    };

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <div className="h-12 w-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!post) return (
        <div className="text-center py-40 space-y-6">
            <h2 className="text-5xl font-black text-slate-200">Story Not Found</h2>
            <Link to="/" className="inline-block text-primary-600 font-bold">Explore other stories</Link>
        </div>
    );

    return (
        <div className="relative">
            <ReadingProgressBar />

            <article className="pb-32">
                {/* 📄 Blog Post Page Layout - Article Header */}
                <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center space-y-8">
                    <div className="flex justify-center flex-wrap gap-3">
                        {post.categories?.map(cat => (
                            <Link
                                key={cat._id}
                                to={`/?category=${cat.slug}`}
                                className="px-4 py-1.5 bg-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-widest rounded-full"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-[1.1] tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3">
                            <img
                                src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.name}&background=f1f5f9&color=64748b`}
                                className="h-10 w-10 rounded-full ring-2 ring-slate-100"
                                alt={post.author?.name}
                            />
                            <span className="text-slate-900">{post.author?.name}</span>
                        </div>
                        <div className="h-1 w-1 bg-slate-200 rounded-full"></div>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <div className="h-1 w-1 bg-slate-200 rounded-full"></div>
                        <span>{post.readTime || 5} min read</span>
                    </div>

                    {/* Wide Featured Image */}
                    <div className="pt-12 px-0 md:px-0">
                        <img
                            src={post.featuredImage || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=2000'}
                            className="w-full h-auto aspect-[16/9] md:aspect-[21/9] object-cover rounded-[2rem] shadow-2xl"
                            alt={post.title}
                        />
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Floating Social Share (Desktop Only) */}
                    <aside className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32 flex flex-col items-center gap-6">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest vertical-rl mb-4">Share Story</p>
                            <ShareLink href="#" icon={Twitter} color="hover:bg-sky-500 hover:text-white" />
                            <ShareLink href="#" icon={Facebook} color="hover:bg-blue-600 hover:text-white" />
                            <ShareLink href="#" icon={Linkedin} color="hover:bg-blue-700 hover:text-white" />
                            <button onClick={copyToClipboard} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary-600 hover:border-primary-100 transition-all active:scale-95 shadow-sm">
                                <Share2 className="h-6 w-6" />
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Container (Max width 750px for readability) */}
                    <div className="lg:col-span-8 lg:col-start-3">
                        <div className="max-w-[750px] mx-auto space-y-12">
                            <div
                                className="content-rendered prose prose-lg prose-slate max-w-none 
                                prose-p:text-[18px] md:prose-p:text-[20px] prose-p:leading-[1.8] prose-p:text-slate-600 prose-p:mb-8
                                prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950
                                prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
                                prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-slate-50 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:text-slate-900
                                prose-img:rounded-3xl prose-img:shadow-xl prose-img:mt-12
                                prose-ul:space-y-4 prose-li:text-lg
                                prose-strong:text-slate-900
                                prose-code:bg-slate-100 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-primary-600"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Author Bio Card */}
                            <div className="mt-24 bg-slate-50 rounded-[2.5rem] p-10 md:p-16 border border-slate-100 flex flex-col md:flex-row items-center gap-10">
                                <img
                                    src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.name}&background=64748b&color=fff`}
                                    className="h-24 w-24 md:h-32 md:w-32 rounded-3xl object-cover shadow-xl ring-4 ring-white"
                                    alt={post.author?.name}
                                />
                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div className="space-y-1">
                                        <p className="text-primary-600 font-bold text-xs uppercase tracking-widest">Storyteller</p>
                                        <h3 className="text-2xl font-black text-slate-900">{post.author?.name}</h3>
                                    </div>
                                    <p className="text-slate-500 leading-relaxed italic">
                                        {post.author?.bio || "A dedicated explorer of the digital frontier, unraveling the complexities of modern engineering and design philosophy."}
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <Link to={`/profile/${post.author?._id}`} className="text-sm font-bold text-slate-900 hover:text-primary-600 transition-colors">View Profile →</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Posts Section */}
                        {relatedPosts.length > 0 && (
                            <section className="mt-32 space-y-12 pb-16 border-b border-slate-100">
                                <h2 className="text-3xl font-bold tracking-tight">You might also like</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {relatedPosts.map(rp => (
                                        <Link key={rp._id} to={`/posts/${rp.slug}`} className="group space-y-4">
                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                                                <img src={rp.featuredImage || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400'} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                            </div>
                                            <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                {rp.title}
                                            </h4>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Modern Comments Section */}
                        <section className="mt-24 space-y-12">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight">The Conversation</h2>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{post.comments?.length || 0} Responses shared</p>
                            </div>

                            <form onSubmit={handleComment} className="space-y-6">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder={user ? "Share your insights..." : "Sign in to join the conversation"}
                                    disabled={!user}
                                    className="w-full p-8 bg-slate-50 border-none focus:ring-4 focus:ring-primary-500/5 rounded-3xl transition-all outline-none text-lg font-medium placeholder-slate-400 min-h-[150px] resize-none"
                                ></textarea>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!user || !comment.trim()}
                                        className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary-600 transition-all hover:shadow-lg disabled:opacity-30 active:scale-95 flex items-center"
                                    >
                                        Share Response <Send className="ml-3 h-4 w-4" />
                                    </button>
                                </div>
                            </form>

                            <div className="space-y-10">
                                {post.comments?.length > 0 ? (
                                    post.comments.map(c => (
                                        <div key={c._id} className="group relative">
                                            <div className="flex gap-6">
                                                <img src={c.user?.avatar || `https://ui-avatars.com/api/?name=${c.user?.name}&background=f8fafc&color=64748b`} className="h-12 w-12 rounded-2xl object-cover ring-2 ring-slate-100 flex-shrink-0" alt="" />
                                                <div className="space-y-4 flex-1">
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold text-slate-950">{c.user?.name}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(c.createdAt).toLocaleDateString()}</span>
                                                        {(user?.id === c.user?._id || ['admin', 'super_admin'].includes(user?.role)) && (
                                                            <button onClick={() => handleDeleteComment(c._id)} className="ml-auto opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all">
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-600 text-lg leading-relaxed">{c.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                        <MessageCircle className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Awaiting first response</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </article>
        </div>
    );
};

const ShareLink = ({ href, icon: Icon, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`h-12 w-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 transition-all hover:scale-110 shadow-sm ${color}`}
    >
        <Icon className="h-5 w-5" />
    </a>
);

export default PostDetail;
