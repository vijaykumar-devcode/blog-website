import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, ShieldCheck, PenTool, ArrowRight, Zap, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen pb-32">
            {/* 1. Cinematic Hero Section */}
            <header className="relative bg-slate-900 pt-48 pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
                </div>

                <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-display font-black text-white tracking-tight leading-[0.9]">
                            Curating the <br /> <span className="text-primary-500 italic">Digital Future.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mt-8 font-medium leading-relaxed">
                            ByteBlog is a dedicated intellectual collective focused on the intersection of architecture, engineering, and digital culture.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* 2. Mission & Philosophy */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Zap}
                        title="Pure speed"
                        description="We believe in the power of optimized experiences and minimal, purposeful code."
                    />
                    <FeatureCard
                        icon={Target}
                        title="Deep Focus"
                        description="Our editorial process prioritizes depth over volume, curating only the most impactful insights."
                    />
                    <FeatureCard
                        icon={Users}
                        title="Collective Intelligence"
                        description="A community-driven platform for elite creators to share their artifacts with the world."
                    />
                </div>
            </section>

            {/* 3. Detailed Story Section */}
            <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-[10px] font-black uppercase tracking-widest">
                        The Chronicle
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Built for the <span className="italic">next generation</span> of digital architects.
                    </h2>
                    <div className="prose prose-lg text-slate-500 leading-relaxed font-medium space-y-6">
                        <p>
                            ByteBlog emerged from a simple observation: the digital landscape is saturated with noise, but starved for substance. We founded this platform to be a sanctuary for high-fidelity technical writing and editorial excellence.
                        </p>
                        <p>
                            Our philosophy is rooted in the "Editorial Architecture" framework—the idea that every story, every line of code, and every interface should be treated with the same precision as a physical structure.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Link to="/contact" className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-primary-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 inline-flex items-center gap-3">
                            Connect with us <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-primary-100 rounded-[2rem] rotate-2 -z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
                        className="rounded-2xl shadow-2xl w-full aspect-square object-cover"
                        alt="Editorial Studio"
                    />
                </div>
            </section>

            {/* 4. CTA Section */}
            <section className="bg-slate-50 py-32 border-y border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
                    <Sparkles className="h-12 w-12 text-primary-500 mx-auto" />
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        Ready to contribute to the archive?
                    </h2>
                    <p className="text-xl text-slate-500 font-medium">
                        Join our elite circle of authors and share your technical artifacts with a global audience of digital builders.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                        <Link to="/register" className="px-12 py-5 bg-primary-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/20 active:scale-95">
                            Apply to Write
                        </Link>
                        <Link to="/" className="px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all active:scale-95">
                            Explore feed
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-50 space-y-6 group">
        <div className="h-16 w-16 bg-slate-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-inner">
            <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
);

export default About;
