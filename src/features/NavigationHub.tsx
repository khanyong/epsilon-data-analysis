import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ChartBar, 
  FileText, 
  Globe, 
  TrendingUp,
  Database,
  BarChart3,
  DollarSign,
  Target,
  BookOpen,
  Activity,
  Map,
  LogOut,
  ChevronRight,
  Grid
} from 'lucide-react';

interface NavigationCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  category: 'analysis' | 'report' | 'strategy';
  available: boolean;
}

export function NavigationHub() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'analysis' | 'report' | 'strategy'>('all');

  const navigationCards: NavigationCard[] = [
    // Analysis Category
    {
      id: 'rfq',
      title: 'RFQ Analysis',
      subtitle: 'Request for Quotation 데이터 분석',
      icon: <FileText className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-600',
      category: 'analysis',
      available: true
    },
    {
      id: 'sof',
      title: 'SOF Analysis',
      subtitle: 'Statement of Facts 데이터 분석',
      icon: <Database className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-600',
      category: 'analysis',
      available: true
    },
    {
      id: 'kotra',
      title: 'KOTRA Analysis',
      subtitle: '무역투자진흥공사 데이터 분석',
      icon: <Globe className="w-8 h-8" />,
      gradient: 'from-green-500 to-teal-600',
      category: 'analysis',
      available: true
    },
    // Report Category
    {
      id: 'investment',
      title: 'Investment Strategy',
      subtitle: '투자 전략 종합 보고서',
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: 'from-orange-500 to-red-600',
      category: 'report',
      available: true
    },
    {
      id: 'business',
      title: 'Business Feasibility',
      subtitle: '사업성 분석 보고서',
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: 'from-indigo-500 to-blue-600',
      category: 'report',
      available: true
    },
    {
      id: 'ny-discount',
      title: 'NY Discount Report',
      subtitle: '뉴욕법인 할인율 보고서',
      icon: <DollarSign className="w-8 h-8" />,
      gradient: 'from-yellow-500 to-orange-600',
      category: 'report',
      available: true
    },
    {
      id: 'factbook',
      title: 'Epsilon Factbook',
      subtitle: '기업 현황 종합 자료집',
      icon: <BookOpen className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-green-600',
      category: 'report',
      available: true
    },
    // Strategy Category
    {
      id: 'synergy',
      title: 'Synergy Sales',
      subtitle: '시너지 매출 전략 분석',
      icon: <Activity className="w-8 h-8" />,
      gradient: 'from-rose-500 to-pink-600',
      category: 'strategy',
      available: true
    },
    {
      id: 'euro-marketing',
      title: 'Euro Marketing',
      subtitle: '유럽 마케팅 전략 보고서',
      icon: <Target className="w-8 h-8" />,
      gradient: 'from-violet-500 to-purple-600',
      category: 'strategy',
      available: true
    },
    {
      id: 'epsilon-pop',
      title: 'Epsilon PoP',
      subtitle: '네트워크 인프라 현황',
      icon: <Map className="w-8 h-8" />,
      gradient: 'from-gray-400 to-gray-600',
      category: 'analysis',
      available: false
    }
  ];

  const filteredCards = selectedCategory === 'all' 
    ? navigationCards 
    : navigationCards.filter(card => card.category === selectedCategory);

  const handleCardClick = (cardId: string, available: boolean) => {
    if (!available) return;
    navigate(`/dashboard?view=${cardId}`);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-slate-800 shadow-lg border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-white tracking-wider">EPSILON</h1>
                <p className="text-xs text-gray-300 uppercase tracking-widest">Executive Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 text-sm">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex justify-center space-x-2 mb-8">
          {[
            { value: 'all', label: 'All Systems' },
            { value: 'analysis', label: 'Data Analysis' },
            { value: 'report', label: 'Reports' },
            { value: 'strategy', label: 'Strategy' }
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value as any)}
              className={`px-6 py-2 rounded-lg font-light tracking-wider transition-all ${
                selectedCategory === cat.value
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Grid */}
      <main className="relative z-10 container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id, card.available)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                card.available 
                  ? 'cursor-pointer transform hover:scale-105 hover:shadow-2xl' 
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-white" />
              
              {/* Gradient Overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />
              
              {/* Content */}
              <div className="relative p-6 h-full">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Icon Container */}
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${card.gradient} mb-4 text-white shadow-lg`}>
                      {card.icon}
                    </div>
                    
                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-light text-gray-800 mb-2 tracking-wide">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {card.subtitle}
                    </p>
                  </div>
                  
                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs uppercase tracking-wider ${
                      card.available ? 'text-emerald-400' : 'text-gray-500'
                    }`}>
                      {card.available ? 'Available' : 'Coming Soon'}
                    </span>
                    {card.available && (
                      <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        hoveredCard === card.id ? 'translate-x-1' : ''
                      }`} />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Border Effect */}
              <div className={`absolute inset-0 rounded-xl border ${
                card.available 
                  ? 'border-gray-200 group-hover:border-emerald-500' 
                  : 'border-gray-200'
              } transition-colors pointer-events-none`} />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Epsilon Networks. Executive Intelligence System.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}