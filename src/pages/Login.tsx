import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function Login() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')  // 추가
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // URL 파라미터 확인하여 회원가입 모드로 자동 전환
  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'signup') {
      setIsSignUp(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

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
          setError('✅ 회원가입이 완료되었습니다! 이메일을 확인하여 계정을 활성화해주세요.')
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? '회원가입' : '로그인'}
            </h1>
            <p className="text-gray-600">
              {isSignUp ? '새 계정을 만들어주세요' : '계정에 로그인해주세요'}
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 사용자명 입력 (회원가입 시에만 표시) */}
            {isSignUp && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  사용자명 <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="사용자명을 입력하세요"
                  minLength={2}
                  maxLength={20}
                />
              </div>
            )}

            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className={`border rounded-md p-3 ${
                error.includes('완료') || error.includes('성공') 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm ${
                  error.includes('완료') || error.includes('성공') 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>{error}</p>
              </div>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
            </button>
          </div>

          {/* 보안 정보 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">🔒 보안 정보</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 모든 데이터는 암호화되어 저장됩니다</li>
              <li>• 비밀번호는 안전하게 해시화됩니다</li>
              <li>• HTTPS를 통한 안전한 통신</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 