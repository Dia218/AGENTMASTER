### AGENTMASTER 데이터베이스

- 이 폴더의 두 sql 파일, Queries.sql과 agentmaster_db.sql은 postgres 15로 돌아가도록 작성되었습니다.

# 데이터베이스 구조

    -[고객 | User]
        고객 시리얼번호 (user_id)
        고객ID (user_name)
        비밀번호 (password)
        이메일 (e_mail)
        총 자산 (total_money)
        어제 자산 (yesterday_money)
        가용 자산 (simul_money)
        주식 자산 (stock_money)
        총 손익 (total_return)
        랭킹용 전일대비 수익률 (rank_range)


    -[기사링크 | Article_link]
        기사링크 시리얼번호 (article_link_id)
        링크 (link) - 뉴스 기사의 원본 링크


    -[기사 | Article]
        기사 시리얼번호 (article_id)
        FK 기사링크 시리얼번호 (article_link_id)
        신문사 (company)
        기자 (reporter)
        제목 (title)
        최초 게재일 (first_pub)
        최종 게재일 (last_pub)
        본문 (body)
        FK 분야 시리얼번호 (field_id)
        FK 연관뉴스 시리얼번호 (article_group_id)
        FK 사건요약문 시리얼번호 (Issue_summary_id)


    -[기사요약문 | Article_summary]
        기사요약문 시리얼번호 (article_summary_id)
        FK 기사 시리얼번호 (article_id)
        요약문 (summary)


    -[연관뉴스 (그룹) | Article_group]
        연관뉴스 시리얼번호 (article_group_id)
        그룹명 (group_name)


    -[사건요약문| Issue_summary]
        사건요약문 시리얼번호 (issue_summary_id)
        사건키워드 (issue_keyword)
        사건요약문 (issue_summary)


    -[스크랩 | Article_scrap] - 뉴스 기사 스크랩
        스크랩 시리얼번호 (article_scrap_id)
        FK 고객 시리얼번호 (user_id)
        FK 기사링크 시리얼번호 (article_link_id)


    -[뉴스순서] - AI 사건흐름 중 뉴스순서 데이터
        파일 시스템으로 저장


    -[분야 | Field]
        분야 시리얼번호 (field_id)
        분야명 (field_name)


    -[주식 | Stock] - 종목 정보
        주식 시리얼번호 (stock_id)
        종목코드 (stock_code)
        종목명 (stock_name)
        FK 분야명 (field_id)


    -[주식정보 | Stock_info]
        주식정보 시리얼번호 (stock_info_id)
        FK 주식 시리얼번호 (stock_id)
        기준날짜 (stock_date)
        주가 (stock_price)
        전일비 (diff_from_prevday)
        등락률 (stock_range)
        시가 (start_price)
        고가 (high_price)
        저가 (low_price)
        거래량 (trading_volume)
        거래대금 (transaction_amount)


    -[모의투자 | Simulation]
        모의투자 시리얼번호 (simulation_id)
        FK 고객 시리얼번호 (user_id)
        FK 주식 시리얼번호 (stock_id)
        종목별 보유주식 손익 (simul_return)
        종목별 보유주식 손익률 (simul_range)
        종목별 보유량 (simul_holdings)
        매입 금액 (purchase_amount)
        평균 단가 (average_price)

# 쿼리문 구조

~~~
