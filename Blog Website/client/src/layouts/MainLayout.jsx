import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/slices/authSlice';
import Logo from '../components/common/Logo';
import { Search, Bell, User, LogOut, Menu, X, ChevronDown, ChevronRight, Plus, LayoutDashboard, Settings, PenTool, Globe, Github, Twitter, Linkedin, Sparkles, TrendingUp, Sun, Moon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const MainLayout = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
    const hideFooter = isAuthPage;
    const hideNavbar = isAuthPage;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${searchQuery}`);
            setShowSearch(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
            {/* 1. Industrial Sticky Header */}
            {!hideNavbar && (
                <header
                    className={`fixed top-4 inset-x-6 z-[100] transition-all duration-700 ${isScrolled
                        ? 'translate-y-0'
                        : 'translate-y-2'
                        }`}
                >
                    <nav className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between rounded-xl border transition-all duration-700 ${isScrolled
                        ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/40 border-slate-100 py-3'
                        : 'bg-transparent border-transparent py-5'
                        }`}>
                        {/* Logo Hub */}
                        <Link to="/" className="relative z-50">
                            <Logo className="h-7 md:h-8" />
                        </Link>

                        {/* Navigation Manifold */}
                        <div className="hidden lg:flex items-center gap-12">
                            <NavLink to="/">Index</NavLink>
                            <NavLink to="/about">About</NavLink>
                            <NavLink to="/contact">Contact</NavLink>
                        </div>

                        {/* Terminal Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowSearch(true)}
                                className="p-2.5 text-slate-400 hover:text-primary-600 transition-colors bg-slate-50 rounded-xl border border-transparent hover:border-slate-100"
                                aria-label="Search Feed"
                            >
                                <Search className="h-4 w-4" />
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="p-2.5 text-slate-400 hover:text-primary-600 transition-colors bg-slate-50 rounded-xl border border-transparent hover:border-slate-100"
                            >
                                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>

                            <div className="h-6 w-px bg-slate-100 mx-2 hidden md:block"></div>

                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link to="/dashboard" className="flex items-center gap-3 group pl-2">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[10px] font-black text-slate-900 leading-none">{user?.name?.split(' ')[0] || 'User'}</p>
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Dashboard</p>
                                        </div>
                                        <img
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=f1f5f9&color=6366f1`}
                                            className="h-10 w-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-primary-500/20 transition-all shadow-md group-hover:shadow-xl group-hover:-translate-y-0.5"
                                            alt={user.name}
                                        />
                                    </Link>
                                    <button onClick={handleLogout} className="p-2.5 text-rose-400 hover:text-rose-600 bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-all active:scale-95 hidden md:block">
                                        <LogOut className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link to="/login" className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/register" className="px-6 py-3 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-950/20 hover:bg-primary-600 transition-all active:scale-95">
                                        Establish Identity
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 shadow-sm"
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </nav>

                    {/* Desktop Search Overlay */}
                    <AnimatePresence>
                        {showSearch && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[110] bg-slate-950/98 backdrop-blur-xl flex items-center justify-center p-8"
                            >
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    className="w-full max-w-4xl"
                                >
                                    <form onSubmit={handleSearch} className="relative">
                                        <input
                                            autoFocus
                                            placeholder="Audit archival manuscripts..."
                                            className="w-full bg-transparent border-b-4 border-white/5 pb-8 text-4xl md:text-7xl font-display font-black text-white outline-none focus:border-primary-500 transition-all placeholder:text-white/5 tracking-tighter"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowSearch(false)}
                                            className="absolute -top-24 right-0 p-4 bg-white/5 rounded-2xl text-white/30 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                        >
                                            <X className="h-8 w-8" />
                                        </button>
                                        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                            {['Architecture', 'Engineering', 'Creative', 'DevOps'].map(tag => (
                                                <button key={tag} onClick={() => setSearchQuery(tag)} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/30 transition-all flex-shrink-0">
                                                    #{tag}
                                                </button>
                                            ))}
                                        </div>
                                    </form>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </header>
            )}

            {/* Mobile Navigation Manifold */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed inset-0 z-[90] lg:hidden bg-white px-10 pt-40 pb-12 flex flex-col justify-between"
                    >
                        <div className="flex flex-col gap-10 items-start">
                            <MobileLink to="/">Index</MobileLink>
                            <MobileLink to="/about">Archives</MobileLink>
                            <MobileLink to="/contact">Transmission</MobileLink>

                            <div className="w-full h-px bg-slate-50 my-4"></div>

                            {!user ? (
                                <div className="space-y-6 w-full text-left">
                                    <Link to="/login" className="block text-4xl font-black text-slate-300 hover:text-slate-900 transition-colors">Login</Link>
                                    <Link to="/register" className="block w-full py-6 bg-slate-950 text-white rounded-xl font-black uppercase tracking-widest text-center shadow-2xl">Establish Identity</Link>
                                </div>
                            ) : (
                                <div className="space-y-6 w-full">
                                    <Link to="/dashboard" className="text-4xl font-black text-primary-600 block">System Hub</Link>
                                    <button onClick={handleLogout} className="text-xl font-bold text-rose-500">Terminate Session</button>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <SocialBtn icon={Twitter} />
                            <SocialBtn icon={Github} />
                            <SocialBtn icon={Linkedin} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Primary Viewport */}
            <main className="flex-1 w-full pt-16">
                <Outlet />
            </main>

            {/* 7. Industrial Footer Portal */}
            {!hideFooter && (
                <footer className="bg-slate-950 text-white pt-32 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-24 relative z-10">
                        {/* Core Log */}
                        <div className="space-y-10">
                            <Logo className="h-8 brightness-0 invert" />
                            <p className="text-slate-500 leading-relaxed font-medium italic border-l-2 border-white/5 pl-6">
                                Curating the finest technical artifacts in digital architecture and creative engineering.
                            </p>
                            <div className="flex gap-4">
                                <SocialBtn icon={Twitter} />
                                <SocialBtn icon={Github} />
                                <SocialBtn icon={Linkedin} />
                            </div>
                        </div>

                        {/* Navigation Nodes */}
                        <div className="space-y-10">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-500">Navigation</h4>
                            <ul className="space-y-6">
                                <FooterLink label="The Index" to="/" />
                                <FooterLink label="Archives" to="/about" />
                                <FooterLink label="Transmission" to="/contact" />
                                <FooterLink label="System Status" to="/dashboard" />
                            </ul>
                        </div>

                        {/* Exploration Clusters */}
                        <div className="space-y-10">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-500">Exploration</h4>
                            <ul className="space-y-6">
                                <FooterLink label="#Technology" to="/category/technology" />
                                <FooterLink label="#Engineering" to="/category/engineering" />
                                <FooterLink label="#DevOps" to="/category/devops" />
                                <FooterLink label="#Future" to="/category/future" />
                            </ul>
                        </div>

                        {/* Subscription Manifold */}
                        <div className="space-y-10">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-500">The Collective</h4>
                            <p className="text-slate-500 font-medium">Synchronize with our curated weekly insights.</p>
                            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1.5 focus-within:border-primary-500/50 transition-all">
                                <input type="email" placeholder="Communication Node" className="bg-transparent px-5 py-3 flex-1 outline-none text-sm font-bold placeholder:text-slate-700" />
                                <button className="bg-white text-slate-950 px-6 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all active:scale-95 shadow-lg">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Log Termination */}
                    <div className="border-t border-white/5 py-12 bg-black/20">
                        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
                            <p>&copy; 2026 BYTEBLOG REPOSITORY. ALL TRANSMISSIONS SECURED.</p>
                            <div className="flex gap-10">
                                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Protocol</Link>
                                <Link to="/terms" className="hover:text-white transition-colors">Terms of Engagement</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary-600 transition-all relative group"
    >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
    </Link>
);

const MobileLink = ({ to, children }) => (
    <Link to={to} className="text-6xl font-black text-slate-900 tracking-tighter hover:text-primary-600 transition-colors">
        {children}
    </Link>
);

const SocialBtn = ({ icon: Icon }) => (
    <button className="h-12 w-12 flex items-center justify-center bg-white/5 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/0 hover:border-white/10">
        <Icon className="h-5 w-5" />
    </button>
);

const FooterLink = ({ label, to = "#" }) => (
    <li>
        <Link to={to} className="text-slate-500 hover:text-white transition-all text-xs font-bold flex items-center gap-2 group">
            <ChevronRight className="h-3 w-3 text-white/10 group-hover:translate-x-1 group-hover:text-primary-500 transition-all" />
            {label}
        </Link>
    </li>
);

export default MainLayout;
