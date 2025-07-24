import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, testSupabaseConnection } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Supabase 연결 테스트
    const testConnection = async () => {
      const isConnected = await testSupabaseConnection()
      if (!isConnected) {
        console.error('Supabase 연결에 실패했습니다.')
      }
    }
    testConnection()

    // 현재 세션 가져오기
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('로그인 시도:', { email })

      if (!supabase) {
        return { error: '데이터베이스 연결에 실패했습니다.' }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('로그인 오류:', error)
        return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
      }

      if (data.user) {
        // profiles 테이블에서 이메일 확인 및 승인 상태 확인
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('approved, status, email_confirmed_at')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          console.error('프로필 조회 오류:', profileError)
          return { error: '사용자 정보를 확인할 수 없습니다.' }
        }

        // 이메일 확인 상태 확인 (profiles 테이블 기준)
        if (!profileData.email_confirmed_at) {
          // auth.users 테이블에서도 확인
          if (!data.user.email_confirmed_at) {
            await supabase.auth.signOut()
            return { error: '이메일을 확인해주세요. 확인 이메일을 다시 보내드릴까요?' }
          } else {
            // auth.users에는 확인됨, profiles 동기화 필요
            console.warn('이메일 확인 상태 동기화 필요:', data.user.id)
          }
        }

        // 관리자 승인 상태 확인
        if (!profileData.approved) {
          await supabase.auth.signOut()
          return { error: '관리자 승인 대기 중입니다. 승인 후 로그인해주세요.' }
        }

        // 계정 상태 확인
        if (profileData.status !== 'active') {
          await supabase.auth.signOut()
          return { error: '계정이 비활성화되었습니다. 관리자에게 문의하세요.' }
        }

        console.log('로그인 성공:', { userId: data.user.id, email: data.user.email })
        return { error: null }
      }

      return { error: '로그인에 실패했습니다.' }
    } catch (error) {
      console.error('로그인 예외 오류:', error)
      return { error: '로그인 중 오류가 발생했습니다.' }
    }
  }

  const signUp = async (email: string, password: string, username: string) => {
    try {
      console.log('회원가입 시도:', { email, username, password: '***' })

      if (!supabase) {
        return { error: '데이터베이스 연결에 실패했습니다.' }
      }

      // 이메일 확인과 함께 회원가입
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            username: username
          }
        }
      })

      if (error) {
        console.error('Supabase Auth 회원가입 오류:', error)
        
        // 이메일 중복 오류 처리
        if (error.message.includes('already registered')) {
          return { error: '이미 등록된 이메일입니다. 로그인을 시도해주세요.' }
        }
        
        return { error: error.message }
      }

      if (data.user) {
        console.log('회원가입 성공:', {
          userId: data.user.id,
          email: data.user.email,
          username: username,
          emailConfirmed: data.user.email_confirmed_at,
          createdAt: data.user.created_at
        })

        // 트리거가 자동으로 profiles 테이블에 레코드를 생성합니다
        return { error: null, message: '회원가입이 완료되었습니다. 이메일을 확인하여 계정을 활성화해주세요.' }
      } else {
        console.error('회원가입 응답에 사용자 데이터가 없습니다.')
        return { error: '회원가입 처리 중 오류가 발생했습니다.' }
      }
    } catch (error) {
      console.error('회원가입 예외 오류:', error)
      return { error: '회원가입 중 예상치 못한 오류가 발생했습니다.' }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('로그아웃 중 오류:', error)
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 