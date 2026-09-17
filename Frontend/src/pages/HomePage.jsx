import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#050a18] text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Import Caveat Cursive & Outfit Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
        .font-sans {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
      `}</style>

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#050a18]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none">StudAssist</span>
              <span className="text-[11px] font-medium text-slate-400 block mt-1">For Anna University Students</span>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-9">
            <a href="#home" className="relative text-sm font-bold text-white transition-colors">
              Home
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-1 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/60"></span>
            </a>
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#resources" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Resources
            </a>
            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              About
            </a>
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800/60" aria-label="Search">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/chat"
                  className="rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-500 hover:to-purple-500 active:scale-95"
                >
                  Dashboard ({user?.name ? user.name.split(' ')[0] : 'Student'})
                </Link>
                <button
                  onClick={logout}
                  className="rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 hover:border-slate-600"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-600 hover:to-purple-700 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-[#070c1b] px-4 pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-3">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-white">
                Home
              </a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-300">
                Features
              </a>
              <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-300">
                Resources
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-300">
                About
              </a>
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-col space-y-2">
              {isAuthenticated ? (
                <React.Fragment>
                  <Link
                    to="/chat"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    Logout
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative z-10 bg-gradient-to-b from-[#050a18] via-[#091333] to-[#0d1a45] pt-10 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-cyan-400/20 rounded-full blur-[170px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-7 text-left">
              
              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2.5 rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-slate-200 shadow-lg backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>🎓 Built for Anna University Students</span>
                <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Your{' '}
                <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  Student Journey,
                </span>
                <br />
                Now{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  Smarter.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300/90 max-w-xl leading-relaxed font-normal">
                An AI-powered student assistance system designed exclusively for Anna University students. Get instant answers, academic resources, notices, and personalized guidance — all in one place.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to={isAuthenticated ? '/chat' : '/signup'}
                  className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-600/35 transition hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-95"
                >
                  <span>Get Started</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <button
                  onClick={() => navigate(isAuthenticated ? '/chat' : '/login')}
                  className="inline-flex items-center space-x-2.5 rounded-full border border-slate-700/90 bg-slate-900/80 px-6 py-3.5 text-base font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-blue-400">
                    <svg className="h-3.5 w-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Feature Checkmarks */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-semibold text-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">✓</span>
                  <span>Free for Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">✓</span>
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">✓</span>
                  <span>Always Accessible</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card Stack */}
            <div className="lg:col-span-6 relative flex justify-center items-center mt-8 lg:mt-0">
              
              {/* Handwritten Cursive Overlay Accent */}
              <div className="absolute -top-10 left-2 sm:left-8 z-20 font-handwriting text-3xl sm:text-4xl text-cyan-300 -rotate-12 select-none tracking-wide drop-shadow-lg">
                Learn <br />
                <span className="ml-5">Explore</span> <br />
                <span className="ml-10">Grow</span>
              </div>

              {/* Top Right Quote Floating Card */}
              <div className="absolute -top-6 right-2 sm:right-6 z-20 max-w-[210px] rounded-2xl border border-slate-700/80 bg-[#081024]/95 p-3.5 shadow-2xl backdrop-blur-xl">
                <p className="text-xs font-bold italic text-slate-100 leading-snug">
                  “ Progress Through Knowledge ”
                </p>
                <p className="mt-1 text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">— Anna University</p>
              </div>

              {/* Tall Arch Image Frame */}
              <div className="relative w-full max-w-[390px] h-[490px] rounded-t-[190px] rounded-b-[45px] overflow-hidden border-2 border-white/30 shadow-2xl bg-gradient-to-b from-sky-400 via-blue-700 to-blue-950 group">
                
                {/* Real High-Resolution Photographic Anna University Clock Tower Building */}
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                    alt="Anna University Main Campus Building"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[1.03] contrast-[1.05]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                  {/* Gradient Overlay for card contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081024]/85 via-black/10 to-transparent"></div>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between rounded-2xl border border-white/30 bg-[#081024]/90 p-4 shadow-2xl backdrop-blur-xl">
                  <div>
                    <h4 className="text-sm font-bold text-white">Anna University</h4>
                    <p className="text-xs text-slate-300">Empowering Generations of Engineers</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:scale-105 transition-transform">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Bottom Right Floating Badge Card */}
              <div className="absolute bottom-14 -right-2 sm:right-2 z-30 max-w-[210px] rounded-2xl border border-slate-700/80 bg-[#081024]/95 p-4 shadow-2xl backdrop-blur-xl hidden sm:block">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Students First</p>
                    <p className="text-[10px] text-slate-300 mt-0.5">Knowledge. Support. Success.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* METRICS FLOATING BAR (PRISTINE WHITE GLASS CARD) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-16">
        <div className="rounded-3xl border border-white/90 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl text-slate-900">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            <div className="pt-4 md:pt-0">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">4+</p>
              <p className="text-xs font-semibold text-slate-500 mt-1">Campuses</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100K+</p>
              <p className="text-xs font-semibold text-slate-500 mt-1">Students</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">All Departments</p>
              <p className="text-xs font-semibold text-slate-500 mt-1">Supported</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">24/7</p>
              <p className="text-xs font-semibold text-slate-500 mt-1">AI Assistance</p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION (HIGH CONTRAST LIGHT SECTION WITH PASTEL CARDS) */}
      <section id="features" className="relative z-10 bg-[#f4f7fc] py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 mb-3">
              WHAT YOU CAN DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything a Student Needs,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                In One Place
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600 font-normal">
              From academic resources to real-time notices, get the support you need throughout your Anna University journey.
            </p>
          </div>

          {/* 4 Pastel Tinted Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            
            {/* Card 1: Academic Resources */}
            <div className="group rounded-3xl border border-blue-200/80 bg-[#edf4ff] p-7 transition-all duration-300 hover:border-blue-400 hover:bg-blue-100/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Academic Resources</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Syllabus, previous year questions, notes, and study materials curated for your department.
              </p>
            </div>

            {/* Card 2: Latest Notices */}
            <div className="group rounded-3xl border border-red-200/80 bg-[#ffedef] p-7 transition-all duration-300 hover:border-red-400 hover:bg-pink-100/50 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-md shadow-rose-500/30 group-hover:scale-110 transition-transform">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Latest Notices</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Get real-time updates on examinations, events, timetable schedules, and important announcements.
              </p>
            </div>

            {/* Card 3: AI Assistant */}
            <div className="group rounded-3xl border border-emerald-200/80 bg-[#eafaf1] p-7 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-100/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI Assistant</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Ask anything related to Anna University. Get accurate, reliable answers instantly powered by RAG.
              </p>
            </div>

            {/* Card 4: Student Support */}
            <div className="group rounded-3xl border border-purple-200/80 bg-[#f3edf9] p-7 transition-all duration-300 hover:border-purple-400 hover:bg-purple-100/50 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Student Support</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Guidance for academics, exams, regulations, grading system, placements, and campus life.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="relative z-10 bg-[#f4f7fc] pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#08112c] via-[#101c44] to-[#1e1548] p-8 sm:p-12 border border-slate-700/60 shadow-2xl">
            
            {/* Dots Pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left: Department Avatars */}
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3 overflow-hidden">
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-400 bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">AU</div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-400 bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white">IT</div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-purple-400 bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center font-bold text-xs text-white">CS</div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-emerald-400 bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-xs text-white">EC</div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Trusted by thousands of</p>
                  <p className="text-xs text-blue-200">Anna University students</p>
                </div>
              </div>

              {/* Middle: Cursive Mission */}
              <div className="font-handwriting text-3xl sm:text-4xl text-cyan-300 tracking-wide select-none text-center">
                Your Success Our Mission
              </div>

              {/* Right: CTA Button */}
              <Link
                to={isAuthenticated ? '/chat' : '/signup'}
                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-500/35 transition hover:from-blue-600 hover:to-purple-600 active:scale-95 whitespace-nowrap"
              >
                <span>Join StudAssist Today</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#040816] py-8 text-center text-xs text-slate-400">
        <p>© 2026 StudAssist. All rights reserved. Anna University AI Academic Assistant.</p>
      </footer>
    </div>
  );
};

export default HomePage;
