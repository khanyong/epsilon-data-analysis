/// <reference types="vite/client" /> 

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  // 다른 환경변수도 여기에 추가 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 