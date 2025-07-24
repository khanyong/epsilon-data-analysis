import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY

// 환경 변수 확인 및 로깅
console.log('Supabase 설정 확인:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlLength: supabaseUrl?.length || 0,
  keyLength: supabaseAnonKey?.length || 0
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 환경 변수가 설정되지 않았습니다.')
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '설정됨' : '누락')
  console.error('VITE_SUPABASE_KEY:', supabaseAnonKey ? '설정됨' : '누락')
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// 연결 테스트 함수
export const testSupabaseConnection = async () => {
  try {
    // 간단한 health check를 위해 auth API 사용
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Supabase 연결 테스트 실패:', error)
      return false
    }
    
    console.log('Supabase 연결 성공 - Auth API 정상')
    return true
  } catch (error) {
    console.error('Supabase 연결 테스트 중 오류:', error)
    return false
  }
}

// 사용자 타입 정의
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

// 로그인 응답 타입
export interface AuthResponse {
  user: User | null
  error: string | null
} 