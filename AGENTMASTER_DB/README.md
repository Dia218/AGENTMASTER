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
0) id 반환 쿼리
    .1 고객
        고객 id로 전 내용 반환
    .2 기사링크
        기사 시리얼번호로 기사링크 id 반환
    .3 기사
        기사 제목으로 기사 id 반환
    .4 기사요약문
        기사 시리얼번호로 기사 요약 id 반환
    .5 연관뉴스
        그룹 이름으로 연관뉴스 id 반환
    .6 사건요약문
        이슈 키워드로 사건요약문 id 반환
    .7 스크랩
        고객 id로 스크랩 id 반환
    .8 분야
        분야 이름으로 분야 id 반환
    .9 주식
        분야 id로 주식 id 반환
    .10 주식정보
        주식 id로 주식정보 id 반환
    .11 모의투자
        고객 id와 주식 id로 모의투자 id 반
    
    4) 주식 메인 페이지
        최신 랜덤 뉴스 정보 SELECT [1]
    반환: (5튜플) Article.신문사 이름, Article_summary.기사요약문
    표시: 왼쪽 상단 오늘의 뉴스 (신문사 이름, 뉴스 요약문)
        검색 키워드가 포함된 주식 종목 SELECT [2]
    입력: 검색창에 입력한 키워드
    반환: Stock.종목코드, 종목명
    표시: 오른쪽 상단 주식 종목 검색바
        고객 모의투자 순위 1~10위 SELECT [3]
    반환: 순위(ranking), User.유저 아이디. 전일대비 수익률
    표시: 오른쪽 하단 모의투자 랭킹 (순위, 수익률, 아이디)
        주식 정보 상한가 기준 상위 5개 SELECT [4]
    반환: Stock.종목코드, 종목명, Field.분야명, Stock_info.주가, 전일비, 등락률
    표시: 최하단 주식 차트 중 상한가 버튼 (종목코드, 종목명, 분야명, 주가, 전일비, 등락률)
        주식 정보 하한가 기준 상위 5개 SELECT [5]
    반환: Stock.종목코드, 종목명, Field.분야명, Stock_info.주가, 전일비, 등락률
    표시: 최하단 주식 차트 중 하한가 버튼 (종목코드, 종목명, 분야명, 주가, 전일비, 등락률)
        주식 정보 상승 기준 상위 5개 SELECT [6]
    반환: Stock.종목코드, 종목명, Field.분야명, Stock_info.주가, 전일비, 등락률
    표시: 최하단 주식 차트 중 상승 버튼 (종목코드, 종목명, 분야명, 주가, 전일비, 등락률)
        주식 정보 하락 기준 상위 5개 SELECT [7]
    반환: Stock.종목코드, 종목명, Field.분야명, Stock_info.주가, 전일비, 등락률
    표시: 최하단 주식 차트 중 하락 버튼 (종목코드, 종목명, 분야명, 주가, 전일비, 등락률)
        주식 정보 거래량 기준 상위 5개 SELECT [8]
    반환: Stock.종목코드, 종목명, Field.분야명, Stock_info.주가, 전일비, 등락률
    표시: 최하단 주식 차트 중 거래량 버튼 (종목코드, 종목명, 분야명, 주가, 전일비, 등락률)


    5) 주식 상세 페이지
        선택한 주식 그래프 정보 SELECT [1]
    입력: 주식_id (stock_id)
    반환: Stock_info.종목코드, 종목명, 분야이름, 기준일자, 주가, 전일비, 등락률
    표시: 상단 주식 그래프 (종목코드, 종목명, 분야이름, 기준일자, 주가, 전일비, 등락률)
        검색 키워드가 포함된 주식 종목 SELECT
    주식 메인 페이지 [2]번 검색바 쿼리문과 동일
        동일 분야 뉴스 정보 최신 5개 SELECT [2]
    입력: 주식_id (stock_id)
    반환: 기사_id, 제목, 신문사
    표시: 하단 동일 분야 뉴스 (신문사 이름, 뉴스 제목)
        클릭한 뉴스 요약문 SELECT [3]
    입력: 기사_id (article_id)
    반환: Article_summary.기사요약문
    표시: 하단 동일 분야 뉴스 클릭 시의 팝업창 (뉴스 제목, 뉴스 요약문)
        선택한 주식 차트 정보 SELECT [4]
    입력: : 주식_id (stock_id)
    반환: Stock_info.전일비, 고가, 거래량, 시가, 저가, 거래량, 거래대금
    표시: 하단 주식 차트 (전일비, 고가, 거래량, 시가, 저가, 거래대금)
