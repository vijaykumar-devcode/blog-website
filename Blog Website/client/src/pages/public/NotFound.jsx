import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Telescope, ArrowLeft, Home, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <div className="max-w-2xl w-full text-center space-y-12">
                {/* 1. Illustration / Icon Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative inline-block"
                >
                    <div className="absolute -inset-10 bg-primary-500/10 blur-[60px] rounded-full"></div>
                    <div className="relative h-40 w-40 md:h-56 md:w-56 bg-white rounded-[3rem] shadow-2xl border border-slate-100 flex items-center justify-center mx-auto text-slate-200">
                        <Telescope className="h-20 w-20 md:h-32 md:w-32 animate-pulse" />
                        <div className="absolute -top-4 -right-4 bg-slate-900 text-white px-6 py-2 rounded-xl font-black text-2xl shadow-xl">
                            404
                        </div>
                    </div>
                </motion.div>

                {/* 2. Text Content */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-none">
                        Transmission <br /> <span className="text-primary-600 italic">Interrupted.</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
                        The artifact you are searching for has been moved or purged from the central archive.
                    </p>
                </div>

                {/* 3. Action Hub */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                    <Link to="/" className="px-10 py-4 bg-slate-950 text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-primary-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-3">
                        <Home className="h-4 w-4" /> Return to feed
                    </Link>
                    <Link to="/?showSearch=true" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3">
                        <Search className="h-4 w-4" /> Try new search
                    </Link>
                </div>

                {/* 4. Footer Helper */}
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 pt-12">
                    ByteBlog Central Intelligence — Status: Void
                </p>
            </div>
        </div>
    );
};

export default NotFound;
