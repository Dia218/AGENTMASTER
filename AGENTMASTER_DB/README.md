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
        고객 id와 주식 id로 모의투자 id 반환
    
1) 뉴스 메인 페이지

무작위 기사 5개 선택 후 이름, 제목, 분야 SELECT [1]
    반환: article_id, company, title, field_id(고유번호, 회사, 제목, 분야번호)
    표시: 뉴스 메인 페이지 화면 중앙 뉴스 미리보기 5개


등락률 상위 4종목 이름, 주가, 전일비, 등락률 SELECT [2]
    반환: stock_id, stock_name, stock_price, diff_from_prevday, stock_range(주식고유번호, 주식이름, 주가, 전일비, 등락률)
    표시: 뉴스 메인 페이지 왼쪽 하단 증시 표

id, 비밀번호, 이메일 입력 후 관리자 계정 정보, id SELECT [3]
    입력: user_name(사용자 이름)
    반환: user_id,
              user_name,
              password,
              e_mail,
              total_money,
              yesterday_money,
              simul_money,
              stock_money,
              rank_range
    표시: 사용자 정보 창

id, 비밀번호, 이메일 입력 후 회원가입 INSERT [4]
    입력: user_name, password, email (사용자 이름, 비밀번호, 메일)
    삽입: user_name, password, email

2)뉴스 상세 페이지

선택 기사의 제목, 스크랩 여부, 신문사 이름, 기자 SELECT [1]
    입력: 기사_id, 유저_id (article_id, username)
    반환: article.article_id, article.title, article.company, article.reporter, isScrap (기사_id, 제목, 신문사 이름. 기자명, 스크랩 여부)
    표시: 왼쪽 상단의 뉴스 제목 칸
    입력: 유저_id, 스크랩 T/F ()
    갱신:  ? 
    표시: 뉴스 제목 칸의 별 표시

선택 기사 요약문 SELECT [2]
    입력: 기사_id (article_id)
    반환: summary.article_summary, article.article_link_id (요약문, 링크)
    표시: 왼쪽 상단의 뉴스 본문 칸

동일 사건 뉴스 정보 및 순서 SELECT -> AI 미구현 [3]
    반환:  -> ?
    표시: 하단의 사건 흐름 및 뉴스 순서 칸

선택 기사 흐름이 존재하지 않을 경우 ->미구현 [4]

연관 뉴스 제목 5개 SELECT [5]
    입력: 기사_id (article_id)
    반환: article2.article_id, article2.title (기사_id, 기사 제목)
    표시: 오른쪽 상단의 연관 기사 칸

선택 기사 스크랩 등록 INSERT [6]
    입력: user_id, article_id (사용자 고유번호, 기사 고유번호)
    삽입: user_id, article_id

선택 기사 스크랩 DELETE [6.1]
    입력: user_id, article_link_id
    삭제: 해당 기사 스크랩 전체

3) 뉴스 검색 페이지

검색 키워드를 포함하는 모든 뉴스 정보 SELECT [1]
    입력: 검색 키워드 (keyword)
    반환: article_id, company, first_pub, last_pub, title (기사 id, 신문사 이름, 게재일, 제목)
    표시: 검색바 하단 검색 결과 뉴스 목록

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

6) 사용자 페이지

사용자 등록 INSERT [1]
    입력: user_id, user_name, password, e_mail (사용자고유번호, 사용자명, 비밀번호, 이메일)
    삽입: user_id, user_name, password, e_mail

로그인 수정 UPDATE [2]
    입력: user_id, e_mail, password (사용자고유번호, 이메일, 비밀번호; 비밀번호와 이메일 값은 없거나, 존재하는 것과 같으면 삽입되지 않는다)
    수정: user_id, e_mail, password (사용자고유번호, 이메일, 비밀번호)

사용자 스크랩 표시 SELECT [3]
    입력: user_id (사용자고유번호)
    반환: article_id, title, reporter(기사고유번호, 기사명, 기자명)

7) 모의투자 메인 페이지
주식 정보 거래량 기준 상위 10개 SELECT [1]
    조회: (10튜플) 주식_id (stock_id), Stock.종목코드, 종목명, Stock_info.주가, 전일비, 등락률)
    표시: 좌측 거래 상위 모의투자 종목 차트 (종목코드, 종목명, 현재가, 전일비, 등락률)
검색 키워드가 포함된 종목 SELECT [2]
    입력: 검색창에 입력한 키워드 - 종목코드, 종목명 둘 다 가능
    조회: 주식_id(stock_id), Stock.종목코드, 종목명
    표시: 상단 모의투자 종목 검색바
사용자 랭킹 정보 SELECT [3]
    입력: 유저_id (user_id)
    조회: User.유저 아이디, User.전일대비 수익률, 모의투자 순위(ranking)
    표시: 우측 사용자 투자 정보 중 상단 (아이디, 랭킹, 수익률)
사용자 자산 정보 SELECT [4]
    입력: 유저_id (user_id)
    조회: User.총 자산, User.가용 자산, User.주식 자산, 보유 종목 수(sum)
    표시: 우측 사용자 투자 정보 중 중앙 (총 자산, 가용 자산, 보유 주식 총액 = 주식 자산, 보유 종목 수)
사용자가 보유한 종목 정보 SELECT [5]
    입력: 유저_id (user_id)
    조회: Stock.종목명, Simulation.매입 금액, 손익, 손익률, 종목 보유량
    표시: 우측 사용자 투자 정보 중 하단  -> (종목명, 매입 금액, 손익, 손익률, 주식 보유량) 인터페이스 수정중, 검토 진행 안됨 
사용자 자산 정보 초기화 UPDATE [6]
    입력: 유저_id (user_id)
    갱신: User.총 자산, 어제 자산, 가용 자산 = 초기값(100000), User.주식 자산, 총 손익, 전일대비 수익률 = 0
    실행: 모의투자 초기화 후
모의투자 거래 정보 초기화 DELETE [7]
    입력: 유저_id (user_id)
    삭제: 연결된 모의투자(Simulation) 튜플 전체
    실행: 모의투자 초기화 실행 후

8) 모의투자 거래 페이지
해당 모의투자_id SELECT [0] ,
    입력: 유저_id (user_id), 주식_id (stock_id)
    조회: 모의투자_id (simulation_id)
선택 종목 기본 정보 SELECT [1]
    입력:  주식_id (stock_id)
    조회: Stock.종목코드, 종목명, 분야이름
    표시: 상단 모의투자 종목 이름
선택 종목 그래프 정보 SELECT [2]
    입력:  주식_id (stock_id)
    조회: (7튜플) Stock_info.기준일자,  주가, 전일비, 등락률, 시가, 고가, 저가, 거래량, 거래대금
    표시: 좌측 모의투자 그래프 -> 인터페이스 수정 진행중, 검토 진행 안됨
선택 종목 주식 상세 정보 SELECT [3]
    입력: 주식_id (stock_id)
    조회: Stock.기준일자, 주가, 전일비, 등락률, 시가, 고가, 저가, 거래량, 거래대금
    표시: 우측 상단 종목 주식 상세 정보 차트 (현재가 = 주가, 등락률, 거래량, 시가, 고가, 저가)
선택 종목 모의투자 상세 정보 SELECT [4]
    입력: 모의투자_id (simulation_id)
    조회: Simulation.손익, 손익률, 종목 보유량, 매입 금액, 평균 단가
    표시: 우측 중앙 종목 모의투자 상세 정보 (손익률, 손익, 매입금액, 평균단가)
선택 종목 모의투자 자산 SELECT [5]
    입력: 모의투자_id (simulation_id)
    조회: User.가용 자산, Simulation.종목 보유량
    표시: 우측 하단 모의투자 거래창 (가용 자산, 보유량)
모의투자 거래 결과 INSERT or UPDATE [6]
    입력: 유저_id (user_id), 주식_id (stock_id), 손익, 손익률, 종목 보유량, 매입금액, 평균단가
    저장 or 갱신: Simulation.손익, 손익률, 종목 보유량, 매입금액, 평균단가
    실행: 모의투자 거래 후
사용자 자산 정보 UPDATE [7]
    입력: 유저_id (user_id), User.총 자산, 가용 자산, 주식 자산, 전일대비 수익률
    갱신: User.총 자산, 가용 자산, 주식 자산, 전일대비 수익률
    실행: 모의투자 거래 후
동일 분야 종목 주식 정보 거래량 기준 상위 4개 SELECT [8]
    입력: 유저_id (user_id), 주식_id (stock_id)
    반환: Stock.종목명, Stock_info.전일비, 주가, 등락률
    표시: 하단 동일 분야 종목 (종목명, 전일비, 현재가, 등락률)

9) 기사요약문

요약문이 없는 기사의 본문 SELECT [1]
    반환: article_id, body (기사고유번호, 본문)

기사 요약문 INSERT [2]
    입력: article_id, article_summary (기사고유번호, 기사요약문)
    삽입: article_id, article_summary

기사 요약문 UPDATE [3]
    입력: previous_article_summary, new_article_summary(이전 기사요약문, 새로운 기사요약문)
    수정: previous_article_summary, new_article_summary

10) 사건흐름

수행 전 사건 키워드 INSERT [1]
    입력: issue_keyword (사건키워드)
    삽입: issue_keyword

사건 키워드 UPDATE [2]
    입력: new_issue_keyword, old_issue_keyword (새로운 사건키워드, 이전 사건키워드)
    수정: issue_keyword

사건키워드에 해당하는 본문 SELECT [3]
    입력: issue_keyword (사건키워드)
    반환: body, issue_summary_id (본문, 사건요약문고유번호)

사건요약문 UPDATE [4]
    입력: issue_summary_id (사건요약문고유번호)
    수정: issue_summary_id