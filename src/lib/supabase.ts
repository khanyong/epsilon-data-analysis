import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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