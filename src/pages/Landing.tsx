import React from 'react';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-blue-50">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Strategic Data Analyzer</h1>
      <p className="text-lg text-gray-600 mb-8">전략적 데이터 분석 플랫폼</p>
      <Link
        to="/login"
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md text-base font-medium transition-colors"
      >
        로그인
      </Link>
    </div>
  );
} 