import React from 'react';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-green-100 overflow-hidden">
      {/* 지도 윤곽선 + 네트워크 SVG 배경 */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 0 }}
      >
        {/* 지도 윤곽선 (심플 월드맵) */}
        <path d="M200,400 Q400,200 700,300 T1300,400 Q1200,600 900,700 T200,400" stroke="#b6e3c6" strokeWidth="2" fill="none" opacity="0.18"/>
        <ellipse cx="720" cy="450" rx="600" ry="250" fill="#e0f2fe" opacity="0.12"/>
        {/* 네트워크 점 */}
        <circle cx="300" cy="200" r="5" fill="#22c55e" />
        <circle cx="1200" cy="300" r="5" fill="#0ea5e9" />
        <circle cx="900" cy="700" r="5" fill="#22c55e" />
        <circle cx="600" cy="500" r="5" fill="#0ea5e9" />
        <circle cx="1100" cy="600" r="5" fill="#22c55e" />
        <circle cx="400" cy="700" r="5" fill="#0ea5e9" />
        <circle cx="720" cy="450" r="7" fill="#22c55e" opacity="0.7"/>
        {/* 곡선 네트워크 연결선 */}
        <path d="M300,200 Q500,350 600,500" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M600,500 Q800,600 900,700" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M900,700 Q1000,650 1100,600" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M400,700 Q600,600 900,700" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M1200,300 Q1000,400 1100,600" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5"/>
        {/* 반투명 원/글로우 */}
        <circle cx="1200" cy="300" r="40" fill="#0ea5e9" opacity="0.08"/>
        <circle cx="300" cy="200" r="30" fill="#22c55e" opacity="0.08"/>
        <circle cx="900" cy="700" r="50" fill="#22c55e" opacity="0.06"/>
      </svg>

      {/* 중앙 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center bg-white/80 rounded-xl shadow-xl px-10 py-12 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 tracking-tight text-center drop-shadow">
          Strategic Data Analyzer
        </h1>
        <p className="text-xl text-gray-700 mb-8 text-center font-medium">
          글로벌 네트워크 비즈니스 인사이트를 위한 데이터 분석 플랫폼
        </p>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md text-base font-semibold transition-colors shadow"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 rounded-md text-base font-semibold transition-colors shadow"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
} 