import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function Landing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const connections: Array<{
      from: number;
      to: number;
      strength: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    // Create connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        if (Math.random() > 0.98) {
          connections.push({
            from: i,
            to: j,
            strength: Math.random() * 0.5 + 0.5
          });
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = index % 2 === 0 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(14, 165, 233, 0.6)';
        ctx.fill();
      });

      // Draw connections
      connections.forEach(connection => {
        const from = particles[connection.from];
        const to = particles[connection.to];
        const distance = Math.sqrt(
          Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
        );

        if (distance < 200) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = `rgba(34, 197, 94, ${0.2 * connection.strength * (1 - distance / 200)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Network Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-emerald-900/90" />
      
      {/* Abstract Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-slate-500/5 to-slate-600/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6">
        {/* Logo/Brand Mark */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 blur-2xl opacity-50 animate-pulse" />
            <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <div className="w-24 h-24 bg-slate-900/80 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-16 h-16 fill-white">
                  <path d="M50 10 L70 30 L70 50 L50 70 L30 50 L30 30 Z" opacity="0.9"/>
                  <circle cx="50" cy="50" r="8" />
                  <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="2" opacity="0.3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-thin text-white mb-4 tracking-wider text-center">
          EPSILON
        </h1>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8" />
        <p className="text-gray-400 text-sm uppercase tracking-[0.3em] mb-16">
          Executive Intelligence System
        </p>
        
        {/* Login Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/login"
            className="group relative px-12 py-4 overflow-hidden rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 text-white font-light tracking-wider shadow-2xl transition-all duration-300 hover:shadow-emerald-500/25 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">ACCESS PORTAL</span>
          </Link>
          
          <Link
            to="/login?mode=signup"
            className="group relative px-12 py-4 overflow-hidden rounded-lg bg-slate-900/50 border border-slate-700 text-gray-400 font-light tracking-wider shadow-xl transition-all duration-300 hover:text-white hover:border-emerald-500/50 hover:shadow-emerald-500/20 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">REGISTER</span>
          </Link>
        </div>
        
        {/* Bottom Decoration */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 