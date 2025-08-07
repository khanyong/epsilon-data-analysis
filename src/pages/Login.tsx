import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function Login() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')  // 추가
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // URL 파라미터 확인하여 회원가입 모드로 자동 전환 및 이메일 확인 처리
  useEffect(() => {
    const mode = searchParams.get('mode')
    const type = searchParams.get('type')
    
    if (mode === 'signup') {
      setIsSignUp(true)
    }

    // 이메일 확인 처리
    if (type === 'email' && mode === 'confirmation') {
      handleEmailConfirmation()
    }

    // URL 해시에서 토큰 확인 (Supabase가 때로 해시로 토큰을 전달함)
    const handleHashParams = () => {
      const hash = window.location.hash
      if (hash.includes('access_token') && hash.includes('type=signup')) {
        console.log('해시에서 회원가입 토큰 발견:', hash)
        setMessage('✅ 이메일 확인이 완료되었습니다! 이제 로그인할 수 있습니다.')
        setIsSignUp(false)
        // 해시 제거
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }

    handleHashParams()
  }, [searchParams])

  const handleEmailConfirmation = async () => {
    try {
      setLoading(true)
      setError('')
      setMessage('이메일 확인을 처리하고 있습니다...')

      // Supabase가 자동으로 세션을 처리하므로 현재 세션 확인
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('세션 확인 실패:', error)
        setError('이메일 확인에 실패했습니다. 링크가 만료되었거나 잘못되었을 수 있습니다.')
        setMessage('')
      } else if (session?.user?.email_confirmed_at) {
        console.log('이메일 확인 완료:', session.user.email)
        setMessage('✅ 이메일 확인이 완료되었습니다! 이제 로그인할 수 있습니다.')
        setError('')
        setIsSignUp(false) // 로그인 모드로 전환
      } else {
        // 세션이 없으면 URL에서 토큰 찾기
        const accessToken = searchParams.get('access_token')
        const refreshToken = searchParams.get('refresh_token')
        
        if (accessToken && refreshToken) {
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          
          if (sessionError) {
            console.error('세션 설정 실패:', sessionError)
            setError('이메일 확인 처리 중 오류가 발생했습니다.')
            setMessage('')
          } else {
            console.log('세션 설정 성공:', data.user?.email)
            setMessage('✅ 이메일 확인이 완료되었습니다! 이제 로그인할 수 있습니다.')
            setError('')
            setIsSignUp(false)
          }
        } else {
          setMessage('이메일 확인을 위해 이메일의 링크를 다시 클릭해주세요.')
        }
      }
    } catch (err) {
      console.error('이메일 확인 처리 중 오류:', err)
      setError('이메일 확인 처리 중 오류가 발생했습니다.')
      setMessage('')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      console.log(`${isSignUp ? '회원가입' : '로그인'} 시도:`, { email, username })
      
      const { error } = isSignUp 
        ? await signUp(email, password, username)  // username 추가
        : await signIn(email, password)

      if (error) {
        console.error(`${isSignUp ? '회원가입' : '로그인'} 실패:`, error)
        
        // 회원가입 실패 시 특별한 안내
        if (isSignUp && error.includes('서버 오류')) {
          setError('회원가입에 실패했습니다. 이미 계정이 있을 수 있으니 로그인을 시도해보세요.')
          setIsSignUp(false) // 로그인 모드로 전환
        } else {
          setError(error)
        }
      } else {
        console.log(`${isSignUp ? '회원가입' : '로그인'} 성공`)
        if (isSignUp) {
          setMessage('✅ 회원가입이 완료되었습니다! 이메일을 확인하여 계정을 활성화해주세요.')
          setIsSignUp(false) // 로그인 모드로 전환
        } else {
          navigate('/dashboard')
        }
      }
    } catch (err) {
      console.error('예상치 못한 오류:', err)
      setError('알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background - same as Landing */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-emerald-900/90" />
      
      {/* Abstract Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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

      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Back to Home Link */}
        <div className="flex justify-center mb-4">
          <Link
            to="/"
            className="text-gray-400 hover:text-white text-sm font-light tracking-wider transition-colors flex items-center space-x-2"
          >
            <span>← BACK TO HOME</span>
          </Link>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center transform rotate-3">
              <div className="w-14 h-14 bg-slate-900/80 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-10 h-10 fill-white">
                  <path d="M50 10 L70 30 L70 50 L50 70 L30 50 L30 30 Z" opacity="0.9"/>
                  <circle cx="50" cy="50" r="8" />
                </svg>
              </div>
            </div>
          </div>

          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-white mb-2 tracking-wider">
              {isSignUp ? 'CREATE ACCOUNT' : 'ACCESS PORTAL'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Join the Executive System' : 'Enter your credentials'}
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 사용자명 입력 (회원가입 시에만 표시) */}
            {isSignUp && (
              <div>
                <label htmlFor="username" className="block text-sm font-light text-gray-300 mb-2 tracking-wider uppercase">
                  Username <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Enter username"
                  minLength={2}
                  maxLength={20}
                />
              </div>
            )}

            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email" className="block text-sm font-light text-gray-300 mb-2 tracking-wider uppercase">
                Email <span className="text-emerald-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="block text-sm font-light text-gray-300 mb-2 tracking-wider uppercase">
                Password <span className="text-emerald-400">*</span>
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter password"
                minLength={6}
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className={`border rounded-lg p-3 backdrop-blur-sm ${
                error.includes('완료') || error.includes('성공') 
                  ? 'bg-emerald-500/20 border-emerald-500/50' 
                  : 'bg-red-500/20 border-red-500/50'
              }`}>
                <p className={`text-sm ${
                  error.includes('완료') || error.includes('성공') 
                    ? 'text-emerald-300' 
                    : 'text-red-300'
                }`}>{error}</p>
              </div>
            )}

            {/* 성공 메시지 */}
            {message && (
              <div className={`border rounded-lg p-3 backdrop-blur-sm ${
                message.includes('완료') || message.includes('성공') 
                  ? 'bg-emerald-500/20 border-emerald-500/50' 
                  : 'bg-blue-500/20 border-blue-500/50'
              }`}>
                <p className={`text-sm ${
                  message.includes('완료') || message.includes('성공') 
                    ? 'text-emerald-300' 
                    : 'text-blue-300'
                }`}>{message}</p>
              </div>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-sm font-light tracking-wider text-white bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isSignUp ? '가입 중...' : '로그인 중...'}
                </div>
              ) : (
                isSignUp ? '회원가입' : '로그인'
              )}
            </button>
          </form>

          {/* 모드 전환 */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setUsername('') // 모드 전환 시 username 초기화
              }}
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-light tracking-wider"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Register'}
            </button>
          </div>

          {/* 보안 정보 */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
            <h3 className="text-xs font-light text-gray-400 mb-2 uppercase tracking-wider">Security Info</h3>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• End-to-end encryption</li>
              <li>• Secure password hashing</li>
              <li>• HTTPS protocol</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 