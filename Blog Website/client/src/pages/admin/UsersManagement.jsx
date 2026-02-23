import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { User, Shield, MoreVertical, Trash2, Edit2, Search, Filter, ShieldCheck, UserCheck, Loader2, Sparkles, AlertTriangle, Fingerprint, AtSign, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get('/admin/users');
                setUsers(data.data);
            } catch (error) {
                toast.error('Identity retrieval failed');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.put(`/admin/users/${userId}/role`, { role: newRole });
            toast.success('Permission parameters updated');
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            toast.error('Security override rejected');
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Accessing Personnel Directory Mainframe...</p>
        </div>
    );

    return (
        <div className="space-y-12 pb-32 animate-fade-in px-6 max-w-[1440px] mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-10 border-b border-slate-50">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                        <Fingerprint className="h-4 w-4" /> Global Identity Registry
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-none">Personnel Directory</h1>
                    <p className="text-slate-400 text-lg font-medium max-w-xl italic">Oversee registered identities and orchestrate administrative privileges across the decentralized network.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-fit">
                    <div className="relative flex-1 md:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary-600 transition-colors" />
                        <input
                            id="search-identities"
                            name="search"
                            type="text"
                            placeholder="Locate subject by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none text-[13px] font-bold shadow-xl shadow-slate-200/20"
                        />
                    </div>
                    <button className="p-5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-xl shadow-slate-200/20 active:scale-95">
                        <Filter className="h-6 w-6" />
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Subject Identifier</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Access Protocol</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Archival Status</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                    <td className="px-10 py-10">
                                        <div className="flex items-center gap-8">
                                            <div className="relative group/avatar">
                                                <img
                                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=f1f5f9&color=6366f1`}
                                                    alt={user.name}
                                                    className="h-16 w-16 rounded-xl object-cover ring-4 ring-white shadow-2xl transition-transform group-hover/avatar:scale-110"
                                                />
                                                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <p className="text-lg font-black text-slate-900 tracking-tight">{user.name}</p>
                                                    {user.role === 'admin' || user.role === 'super_admin' ? (
                                                        <ShieldCheck className="h-4 w-4 text-primary-600" />
                                                    ) : (
                                                        <UserCheck className="h-4 w-4 text-emerald-500 opacity-30" />
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] flex items-center gap-2">
                                                    <AtSign className="h-3 w-3" /> {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10">
                                        <div className="relative w-fit group/select">
                                            <select
                                                id={`role-protocol-${user._id}`}
                                                name={`role-protocol-${user._id}`}
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className={`appearance-none text-[10px] font-black uppercase tracking-[0.2em] rounded-xl pl-5 pr-12 py-3.5 border border-transparent cursor-pointer focus:ring-4 focus:ring-primary-500/10 transition-all shadow-sm ${['admin', 'super_admin'].includes(user.role)
                                                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                                                    : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 shadow-md shadow-slate-200/20'
                                                    }`}
                                            >
                                                <option value="user">Standard Agent</option>
                                                <option value="author">Content Broadcaster</option>
                                                <option value="editor">Log Editor</option>
                                                <option value="admin">System Admin</option>
                                                <option value="super_admin">Prime Architect</option>
                                            </select>
                                            <Shield className={`absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${['admin', 'super_admin'].includes(user.role) ? 'text-primary-400' : 'text-slate-300'}`} />
                                            <div className="absolute inset-0 rounded-xl border-2 border-primary-500/0 group-hover/select:border-primary-500/20 pointer-events-none transition-all"></div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                                <Activity className="h-3.5 w-3.5 text-emerald-500" /> Authorized
                                            </div>
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            <button className="p-4 bg-white border border-slate-200 text-slate-400 hover:text-primary-600 hover:border-primary-200 hover:shadow-xl rounded-xl transition-all active:scale-95">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button className="p-4 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:shadow-xl rounded-xl transition-all active:scale-95">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <button className="p-4 bg-slate-50 text-slate-300 rounded-xl hover:bg-slate-100 transition-all">
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="py-48 text-center space-y-8 bg-slate-50/20">
                        <div className="h-24 w-24 bg-white rounded-xl shadow-inner mx-auto flex items-center justify-center border border-slate-100">
                            <AlertTriangle className="h-10 w-10 text-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-slate-900 font-black uppercase tracking-widest text-sm text-center">Identity Not Found</p>
                            <p className="text-slate-400 font-medium italic max-w-xs mx-auto">No subjects in the current directory match your search query: <span className="text-primary-600">"{searchQuery}"</span></p>
                        </div>
                        <button onClick={() => setSearchQuery('')} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-600 transition-all shadow-xl active:scale-95">
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            <footer className="pt-20 text-center">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.6em]">Personnel Registry Terminal — Secure Administrative Session</p>
            </footer>
        </div>
    );
};

export default UsersManagement;
