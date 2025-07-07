# 🔒 RLS (Row Level Security) 정책 설명서

## 📋 개요
모든 테이블(`kt_pops`, `rfq_middlemile`, `sof_middlemile`, `epsilon_pops`, `kotra`)에 동일한 보안 정책을 적용합니다.

## 🛡️ 적용되는 4가지 표준 정책

### 1. 읽기 정책 (Read Policy)
```sql
CREATE POLICY "Enable read access for all users" ON public.{table_name}
    FOR SELECT USING (true);
```

**의미:**
- 모든 사용자가 테이블 데이터를 **읽을 수 있음**
- 인증 여부와 관계없이 `SELECT` 쿼리 허용
- 웹 애플리케이션에서 데이터 조회/분석 가능

**효과:**
- ✅ 대시보드에서 차트와 통계 표시 가능
- ✅ CSV 다운로드 기능 정상 동작
- ✅ 익명 사용자도 데이터 열람 가능

---

### 2. 입력 정책 (Insert Policy)
```sql
CREATE POLICY "Enable insert for authenticated users only" ON public.{table_name}
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

**의미:**
- **인증된 사용자**만 새 데이터를 추가할 수 있음
- 로그인하지 않은 사용자는 `INSERT` 불가
- Supabase 인증을 통과한 사용자만 허용

**효과:**
- ✅ 관리자만 새 데이터 업로드 가능
- ❌ 익명 사용자의 데이터 입력 차단
- 🔒 데이터 무결성 보장

---

### 3. 수정 정책 (Update Policy)
```sql
CREATE POLICY "Enable update for authenticated users only" ON public.{table_name}
    FOR UPDATE USING (auth.role() = 'authenticated');
```

**의미:**
- **인증된 사용자**만 기존 데이터를 수정할 수 있음
- 로그인하지 않은 사용자는 `UPDATE` 불가
- 모든 행(row)에 대해 동일한 권한 적용

**효과:**
- ✅ 관리자만 데이터 편집 가능
- ❌ 익명 사용자의 데이터 변경 차단
- 🔒 데이터 변조 방지

---

### 4. 삭제 정책 (Delete Policy)
```sql
CREATE POLICY "Enable delete for authenticated users only" ON public.{table_name}
    FOR DELETE USING (auth.role() = 'authenticated');
```

**의미:**
- **인증된 사용자**만 데이터를 삭제할 수 있음
- 로그인하지 않은 사용자는 `DELETE` 불가
- 모든 행(row)에 대해 동일한 권한 적용

**효과:**
- ✅ 관리자만 데이터 삭제 가능
- ❌ 익명 사용자의 데이터 삭제 차단
- 🔒 실수로 인한 데이터 손실 방지

---

## 🎯 정책 적용 결과

### 👀 일반 사용자 (비인증)
- ✅ **읽기**: 모든 데이터 조회 가능
- ❌ **쓰기**: 입력/수정/삭제 불가능
- 📊 **용도**: 대시보드 열람, 분석 보고서 확인

### 🔑 관리자 (인증된 사용자)
- ✅ **읽기**: 모든 데이터 조회 가능
- ✅ **쓰기**: 입력/수정/삭제 모두 가능
- 🛠️ **용도**: 데이터 관리, CSV 업로드, 편집

---

## 🔍 보안 수준 비교

| 작업 | 익명 사용자 | 인증된 사용자 | 보안 효과 |
|------|-------------|---------------|-----------|
| SELECT (조회) | ✅ 허용 | ✅ 허용 | 📊 오픈 데이터 정책 |
| INSERT (입력) | ❌ 차단 | ✅ 허용 | 🔒 데이터 품질 관리 |
| UPDATE (수정) | ❌ 차단 | ✅ 허용 | 🛡️ 무단 변경 방지 |
| DELETE (삭제) | ❌ 차단 | ✅ 허용 | 🚫 데이터 손실 방지 |

---

## 📈 실제 사용 시나리오

### 시나리오 1: 일반 사용자
```javascript
// ✅ 가능: 데이터 조회
const { data } = await supabase.from('rfq_middlemile').select('*');

// ❌ 실패: 데이터 입력 (RLS 정책으로 차단)
const { error } = await supabase.from('rfq_middlemile').insert([{...}]);
// error: new row violates row-level security policy
```

### 시나리오 2: 인증된 관리자
```javascript
// ✅ 가능: 데이터 조회
const { data } = await supabase.from('rfq_middlemile').select('*');

// ✅ 가능: 데이터 입력 (인증된 사용자)
const { data, error } = await supabase.from('rfq_middlemile').insert([{...}]);
```

---

## 🚀 적용 방법

1. **Supabase 대시보드 접속**
2. **SQL Editor 열기**
3. **`standardize_all_table_policies.sql` 파일 내용 붙여넣기**
4. **실행 버튼 클릭**
5. **완료 메시지 확인**

---

## ✅ 정책 확인 방법

```sql
-- 모든 테이블의 정책 상태 확인
SELECT 
    tablename, 
    policyname, 
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('kt_pops', 'rfq_middlemile', 'sof_middlemile', 'epsilon_pops', 'kotra')
ORDER BY tablename, policyname;
```

이 정책 설정으로 **데이터 보안**과 **사용자 편의성**의 균형을 맞출 수 있습니다! 🎉 