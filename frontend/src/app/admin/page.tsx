'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IoGrid as LayoutDashboard, IoPeople as Users, IoDocumentText as FileText, IoShieldCheckmark as Shield, IoWarning as AlertTriangle,
  IoChatbubbles as MessageSquare, IoStatsChart as TrendingUp, IoSettings as Settings, IoLogOut as LogOut, IoChevronForward as ChevronRight,
  IoSearch as Search, IoAdd as Plus, IoEye as Eye, IoCheckmarkCircle as CheckCircle, IoCloseCircle as XCircle, IoTime as Clock, IoBarChart as BarChart3
} from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'articles', label: 'Articles', icon: FileText },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'reports', label: 'Reports', icon: AlertTriangle },
  { id: 'community', label: 'Community', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Users', value: '12,847', change: '+12%', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Published Articles', value: '486', change: '+8%', icon: FileText, color: 'text-green-600 bg-green-50' },
    { label: 'Pending Reviews', value: '23', change: '-5%', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Open Reports', value: '12', change: '-30%', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    { label: 'Monthly Visitors', value: '284K', change: '+23%', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
    { label: 'Community Questions', value: '2,341', change: '+18%', icon: MessageSquare, color: 'text-primary bg-primary/10' },
  ];

  const recentArticles = [
    { title: 'How to Make Money Online', status: 'Published', author: 'Admin', views: 15420, date: '2 hours ago' },
    { title: '5 Red Flags of Online Scams', status: 'Pending', author: 'Sarah M.', views: 0, date: '5 hours ago' },
    { title: 'Best Freelancing Platforms', status: 'Published', author: 'James R.', views: 12300, date: '1 day ago' },
    { title: 'Digital Skills That Pay', status: 'Draft', author: 'Linda K.', views: 0, date: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r bg-background min-h-screen">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg">TrustGuide</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary font-medium">Admin</span>
            </Link>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
              <Eye className="w-4 h-4" />
              View Site
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Mobile Header */}
          <div className="flex lg:hidden items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" size="sm">Menu</Button>
          </div>

          {activeTab === 'dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className={cn('text-xs mt-1', stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600')}>
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className={cn('p-2.5 rounded-xl', stat.color)}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Articles */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Recent Articles</h2>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('articles')}>
                      View All
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-muted-foreground">
                          <th className="text-left py-3 px-2 font-medium">Title</th>
                          <th className="text-left py-3 px-2 font-medium">Status</th>
                          <th className="text-left py-3 px-2 font-medium">Author</th>
                          <th className="text-left py-3 px-2 font-medium">Views</th>
                          <th className="text-left py-3 px-2 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentArticles.map((article, i) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="py-3 px-2 font-medium">{article.title}</td>
                            <td className="py-3 px-2">
                              <span className={cn(
                                'px-2 py-0.5 rounded-full text-xs font-medium',
                                article.status === 'Published' && 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400',
                                article.status === 'Pending' && 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400',
                                article.status === 'Draft' && 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
                              )}>
                                {article.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-muted-foreground">{article.author}</td>
                            <td className="py-3 px-2 text-muted-foreground">{article.views.toLocaleString()}</td>
                            <td className="py-3 px-2 text-muted-foreground">{article.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'articles' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Articles</h1>
                <Button className="rounded-xl">
                  <Plus className="w-4 h-4 mr-2" /> New Article
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-2 mb-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm" placeholder="Search articles..." />
                    </div>
                    <Button variant="outline">Filter</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Article management interface with CRUD operations will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Users</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">User management interface with role assignment, banning, and moderation will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Reports</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Report management interface for handling user reports will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Analytics</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Analytics dashboard with charts, user activity, and content performance will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'seo' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">SEO Management</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">SEO settings, meta tags, sitemap management, and structured data configuration will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Platform settings, site configuration, and system preferences will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
