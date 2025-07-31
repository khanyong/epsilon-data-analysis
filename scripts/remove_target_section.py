def remove_target_section():
    """구체적인 타겟 고객 선정 섹션을 삭제하는 함수"""
    
    # 파일 읽기
    with open('src/pages/MarketingReport/BusinessFeasibilitySections2.tsx', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # 삭제할 섹션의 시작과 끝 찾기
    start_line = None
    end_line = None
    
    for i, line in enumerate(lines):
        if '구체적인 타겟 고객 선정' in line:
            start_line = i
        elif start_line is not None and '주요 특징 및 전략' in line:
            end_line = i
            break
    
    if start_line is not None and end_line is not None:
        # 해당 섹션 삭제
        new_lines = lines[:start_line] + lines[end_line:]
        
        # 파일 다시 쓰기
        with open('src/pages/MarketingReport/BusinessFeasibilitySections2.tsx', 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        
        print(f"✅ 구체적인 타겟 고객 선정 섹션이 삭제되었습니다!")
        print(f"   - 삭제된 라인: {start_line + 1} ~ {end_line}")
        print(f"   - 삭제된 내용: {end_line - start_line}줄")
    else:
        print("❌ 삭제할 섹션을 찾을 수 없습니다.")

if __name__ == "__main__":
    remove_target_section() 