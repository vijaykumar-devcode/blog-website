import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { FileText, ArrowRight, Twitter, Github, Globe, Share2, Mail, ExternalLink, ShieldCheck, Sparkles, MessageCircle, Heart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { id } = useParams();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get(`/users/profile/${id}`);
                setProfile(data.data.user);
                setPosts(data.data.posts);

                if (currentUser && data.data.user.followers?.includes(currentUser._id)) {
                    setIsFollowing(true);
                }
            } catch (error) {
                console.error('Error fetching profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id, currentUser]);

    const handleFollow = async () => {
        if (!currentUser) return toast.error('Please sign in to follow');
        if (currentUser._id === profile?._id) return toast.error("You can't follow yourself");

        setFollowLoading(true);
        try {
            await api.put(`/users/follow/${profile._id}`);
            setIsFollowing(!isFollowing);
            toast.success(isFollowing ? `Unfollowed ${profile.name}` : `Following ${profile.name}`);
        } catch (error) {
            toast.error('Transaction failed');
        } finally {
            setFollowLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
            <p className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[10px]">Accessing record...</p>
        </div>
    );

    if (!profile) return (
        <div className="flex flex-col justify-center items-center h-[60vh] py-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Identity Not Found</h2>
            <Link to="/" className="text-primary-600 font-bold hover:underline underline-offset-4">Return to feed</Link>
        </div>
    );

    return (
        <div className="min-h-screen pb-32">
            {/* 1. Header Hero Area */}
            <div className="bg-slate-50 border-b border-slate-100 pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[100px] rounded-full translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                        {/* Avatar */}
                        <div className="relative group shrink-0">
                            <img
                                src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.name}&background=6366f1&color=fff`}
                                className="h-44 w-44 rounded-2xl object-cover shadow-2xl ring-4 ring-white"
                                alt={profile.name}
                            />
                            <div className="absolute -bottom-4 -right-4 h-12 w-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary-600 border border-slate-100">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 space-y-8 text-center md:text-left">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-[10px] font-black uppercase tracking-widest">
                                    Editorial Board
                                </div>
                                <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-tight">
                                    {profile.name}
                                </h1>
                                <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
                                    {profile.bio || "Crafting digital narratives and exploring the intersection of technology and human experience."}
                                </p>
                                <div className="flex items-center justify-center md:justify-start gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> {profile.email}</div>
                                    <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                                    <div className="flex items-center gap-2">Member since {new Date(profile.createdAt).getFullYear()}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
                                <div className="flex gap-4">
                                    <SocialIcon icon={Twitter} color="hover:text-blue-400" />
                                    <SocialIcon icon={Github} color="hover:text-slate-900" />
                                    <SocialIcon icon={Globe} color="hover:text-primary-600" />
                                </div>
                                <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
                                <button
                                    onClick={handleFollow}
                                    disabled={followLoading}
                                    className={`px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all active:scale-95 flex items-center gap-3 ${isFollowing
                                            ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                            : 'bg-slate-900 text-white hover:bg-primary-600 shadow-xl shadow-slate-900/10'
                                        }`}
                                >
                                    {followLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (isFollowing ? 'Following' : 'Follow Profile')}
                                </button>
                            </div>
                        </div>

                        {/* Stats Panel */}
                        <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm flex md:flex-col gap-10 md:min-w-[200px] justify-center">
                            <StatItem value={posts.length} label="Publications" />
                            <div className="h-px bg-slate-100 hidden md:block"></div>
                            <StatItem value={(profile.followers?.length || 0)} label="Followers" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Content Grid */}
            <main className="max-w-7xl mx-auto px-6 mt-20">
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center md:text-left">Authored Archives</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] text-center md:text-left">{posts.length} entries published to date</p>
                    </div>
                    <div className="h-px bg-slate-100 flex-1 mx-12 hidden lg:block"></div>
                </div>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post) => (
                            <article key={post._id} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 flex flex-col">
                                <Link to={`/posts/${post.slug}`} className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={post.featuredImage || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </Link>
                                <div className="p-8 space-y-4 flex-grow flex flex-col">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        <div className="h-1 w-1 bg-slate-200 rounded-full"></div>
                                        <span>{post.readTime || 5} min read</span>
                                    </div>
                                    <Link to={`/posts/${post.slug}`}>
                                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors leading-tight line-clamp-2">{post.title}</h3>
                                    </Link>
                                    <p className="text-slate-500 leading-relaxed line-clamp-2 text-sm">
                                        {post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 120)}...
                                    </p>
                                    <div className="pt-6 mt-auto border-t border-slate-50 flex items-center justify-between">
                                        <Link to={`/posts/${post.slug}`} className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-widest text-[10px] group/btn">
                                            Open Artifact <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                        <div className="flex gap-4 text-slate-300">
                                            <Heart className="h-4 w-4" />
                                            <MessageCircle className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <FileText className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Journal Empty</h3>
                        <p className="text-slate-500 mt-2">This identity has yet to share their transcripts.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

const SocialIcon = ({ icon: Icon, color }) => (
    <button className={`h-11 w-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-all hover:bg-slate-50 hover:shadow-sm ${color}`}>
        <Icon className="h-5 w-5" />
    </button>
);

const StatItem = ({ value, label }) => (
    <div className="text-center">
        <p className="text-4xl font-black text-slate-900 leading-none">{value}</p>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">{label}</p>
    </div>
);

export default Profile;
