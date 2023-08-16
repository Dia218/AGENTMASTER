
                    /*1 뉴스 메인 페이지*/

/*1.1 해당 페이지에서 무작위로 뉴스 기사 5개를 골라 신문사 이름, 기사 제목, 분야를 출력한다. 기사의 제목을 클릭하면 해당 기사의 상세 페이지로 넘어간다. 이 때 해당 기사의 id를 속성으로 넘겨준다.*/
SELECT article_id, company, title, field_name
FROM "AGENTMASTER"."Article"
ORDER BY RANDOM()
LIMIT 5;
/*
랜담한 뉴스 기사 정보를 5튜플 출력합니다.
출력되는 정보는 기사_id, 신문사 이름, 기사 제목, 분야명 순서로 출력됩니다.
*/


/*1.2 해당 페이지에서 등락률 기준 최상위 4개 종목의 종목명, 주가, 전일비, 등락률을 차례대로 출력한다.*/
SELECT result.stock_id, result.stock_name, result.stock_price, result.diff_from_prevday, result.range
FROM
(
	SELECT sinfo.stock_id, sinfo.stock_date, stock.stock_name, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range
	FROM
	"AGENTMASTER"."Stock" AS stock
	JOIN
	"AGENTMASTER"."Stock_info" AS sinfo
	ON stock.stock_id = sinfo.stock_id
	ORDER BY stock_info.stock_date DESC, stock_info.range DESC
	LIMIT 4
)	AS result;
/*
가장 최신일자를 기준으로 등락률 상위 종목 4튜플을 출력합니다.
출력되는 정보는 주식_id, 기준일자, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*1.3 해당 페이지에서 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭 시 무조건 관리자 계정의 정보를 넘겨받고 관리자 계정의 id를 출력한다.*/
SELECT * FROM "AGENTMASTER"."Customer"
WHERE customer_id = '{username}';
/*
{username}에 값을 넣어 주세요.
고객 id가 {username}인 고객 정보를 출력합니다.
*/


/*1.4 해당 페이지에서 아이디와 비밀번호, 이메일을 입력하고 회원 가입 버튼을 클릭하면 입력한 데이터를 db에 저장한다.*/
INSERT INTO "AGENTMASTER"."Customer" VALUES (
	'{username}',
	'{password}',
	'{email}',
	100000,		/*총 자산 초기 값*/
	0,
	100000,		/*현금 자산 초기 값*/
	0,
	0,
	0.00
);
/*
{username}, {password}, {email}에 값을 넣어 주세요.
고객 id가 {username}이고 고객 비밀번호가 {password}이고 고객 이메일이 {email}인 고객 정보를 DB에 추가합니다.
초기 값은 따로 정해 주세요.
*/


                    /*2 뉴스 상세 페이지*/

/*2.1 해당 페이지에서 클릭한 기사의 기사 제목, 스크랩 여부, 신문사 이름, 기자 이름을 출력한다.*/
->
SELECT Article.article_id, Article.title, Article.company, Article.reporter, 
	CASE
	WHEN EXISTS (
		SELECT
		FROM "AGENTMASTER"."Article_Scrap"
		WHERE article_id = {article_id} AND customer_id = '{username}'
	)
	THEN true
	ELSE false
	END AS isScrap
FROM 
"AGENTMASTER"."Article" AS Article
WHERE article_id = {article_id};
/*
{article_id}, {username}에 값을 넣어주세요
출력되는 정보는 기사_id, 제목, 신문사 이름. 기자명 순서로 출력됩니다.
고객 id가 {username}인 고객이 기사 id가 {article_id}인 기사를 스크랩 했다면 isScrap컬럼에 true를 반환하고 그렇지 않으면 false를 반환합니다.
*/


/*2.2 해당 페이지에서 클릭한 기사의 요약문과 해당 기사의 원본 링크를 출력한다.*/
SELECT summary.summary, article.link
FROM "AGENTMASTER"."Article" AS article
LEFT JOIN "AGENTMASTER"."Article_summary" AS summary
    ON article.article_id = summary.article_id
WHERE article.article_id = {article_id};
/*
{article_id}에 값을 넣어주세요
기사 id가 {article_id}인 기사의 링크와 요약문 전부를 출력합니다.
출력되는 정보는 기사 요약문, 링크 순서로 출력됩니다.
출력되는 튜플이 여러 개일 수 있습니다.
*/


/*2.3 해당 페이지에서 클릭한 기사에 사건의 흐름이 존재할 경우, 해당 사건의 정보를 출력하고 그 옆에 해당 사건의 흐름에 속하는 뉴스 기사의 제목과 요약을 순서대로 출력한다.
->
사건 흐름과 관련해서는 현재 인공지능 파트와 논의중에 있어 현재는 쿼리문을 도출할 수 없습니다.*/


/*2.4 해당 페이지에서 클릭한 기사에 사건의 흐름이 존재하지 않는 경우, "해당 사건의 정보가 존재하지 않는다"고 출력한다.
->
사건 흐름과 관련해서는 현재 인공지능 파트와 논의중에 있어 현재는 쿼리문을 도출할 수 없습니다.*/


/*2.5 해당 페이지에서 클릭한 기사와 연관된 뉴스 기사 제목을 5~6개 출력한다. 이때 제목을 클릭할 경우 해당 기사의 상세 페이지로 넘어간다.*/
SELECT
    article2.article_id, article2.title
FROM "AGENTMASTER"."Article" AS article1
LEFT JOIN "AGENTMASTER"."Article" AS article2
    ON article1.group_name = article2.group_name
WHERE article1.article_id = {article_id}
  AND article2.article_id <> {article_id}
  AND article2.group_name IS NOT NULL
ORDER BY RANDOM()
LIMIT 5;
/*
{article_id}에 값을 넣어주세요
기사 id가 {article_id}인 기사의 연관된 뉴스 기사 제목 5개를 출력합니다. 연관 뉴스가 없을 때는 아무 것도 출력되지 않습니다.
*/


                    /*3 뉴스 검색 페이지*/

/*3.1 해당 페이지에서 키워드를 입력해 검색하면 해당 키워드를 포함하는 뉴스 기사의 목록을 출력한다.
이때 각 항목은 신문사 이름과 게재일, 제목을 출력한다.
기사의 제목을 클릭하면 해당 기사의 상세 페이지로 넘어간다.
이 때 해당 기사의 id를 속성으로 넘겨준다.*/
SELECT article_id, company, first_pub, last_pub, title
FROM "AGENTMASTER"."Article"
WHERE title LIKE '%{keyword}%' OR issue_keyword LIKE '%{keyword}%';
/*
{keyword}에 값을 넣어주세요
기사 이슈 키워드에 {keyword}가 포함된 기사와, 제목애 {keyword}가 포함된 기사의 기사 id와 신문사 이름, 게재일, 제목을 출력합니다.
*/


                    /*4 주식 메인 페이지*/
	
/*4.1 오늘의 뉴스 부분에서 무작위로 신문사 이름과 기사 요약(한줄 정도)를 띄운다.*/

/*조건이 애미하여 쿼리문 두 개를 만들었습니다.*/

/*4.1.1	오늘의 뉴스 부분에서 무작위로 신문사 이름과 기사 요약(한 줄)을 띄운다.*/
SELECT article.company, summary.summary
FROM "AGENTMASTER"."Article" AS article
JOIN "AGENTMASTER"."Article_summary" AS summary
ON article.article_id = summary.article_id
ORDER BY RANDOM()
LIMIT 1;
/*
랜덤한 기사 id의 기사 요약이 출력됩니다. 요악문이 여러 개인 경우 랜덤으로 한 줄만 출력됩니다.
출력 결과는 신문사 이름, 기사 요약 순서로 출력됩니다.
*/

/*4.1.2	오늘의 뉴스 부분에서 무작위로 신문사 이름과 기사 요약(전부)을 띄운다.*/
SELECT article.company, summary.summary
FROM (
    SELECT article_id, company
    FROM "AGENTMASTER"."Article"
    ORDER BY RANDOM()
    LIMIT 1
) AS article
JOIN "AGENTMASTER"."Article_summary" AS summary
ON article.article_id = summary.article_id;
/*
랜덤한 기사 id의 기사 요약이 출력됩니다. 요약문이 여러 개인 경우 전부 출력됩니다.
출력 결과는 신문사 이름, 기사 요약 순서로 출력됩니다.
출력되는 튜플이 여러 개일 수 있습니다.
*/


/*4.2 검색창 부분에서 사용자가 검색한 키워드를 디비에 저장한다.*/
SELECT stock_id, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_name LIKE '{keyword}%';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목명 정보를 출력합니다.
*/



/*4.3 상한가, 하한가, 상승, 하락, 보합 버튼을 클릭했을 때 그에 맞는 순위 5위 정도의 종목을 현재가, 전일비, 등락률, 거래량, 매수호가, 매도호가, 매수총잔량, 매도총잔량의 정보를 띄운다.*/

/*
거래량, 매수호가, 매도호가, 매수총잔량, 매도총잔량은 데이터베이스에 저장되지 않습니다.
데이터베이스에 저장된 값으로는 현재가, 전일비, 등락률 정도만 출력이 가능합니다.
이에 따라서 상한가, 하한가 기준으로는 쿼리문을 출력할 수 있겠지만, 상승중이거나 하락중이거나 보합중인 주식은 등락률 말고도 이동평균선, 거래량 등의 여러 데이터의 분석이 필요하기 때문에 쿼리문 출력을 하더라도 정확성이 떨어질 수 있습니다.
*/

/*4.3.1 상한가 버튼*/
SELECT stock.stock_id, stock.stock_name, stock.field_name, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range
FROM "AGENTMASTER"."Stock" AS stock
JOIN (
	SELECT *
	FROM "AGENTMASTER"."Stock_info"
	WHERE stock_date =(			                    /*가장 최신 기준일자를 조건으로 검색*/
		SELECT stock_date
		FROM "AGENTMASTER"."Stock_info"
		ORDER BY stock_date DESC
		LIMIT 1
	)
) AS sinfo
ON stock.stock_id = sinfo.stock_id
ORDER BY range DESC			                        /*등락률 내림차순(상한가)*/
LIMIT 5;				                            /*5튜플 출력*/
/*
등락률이 높은 순서대로 주식정보를 5튜플 출력합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*4.3.2 하한가 버튼*/
SELECT stock.stock_id, stock.stock_name, stock.field_name, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range
FROM "AGENTMASTER"."Stock" AS stock
JOIN (
	SELECT *
	FROM "AGENTMASTER"."Stock_info"
	WHERE stock_date =(			                    /*가장 최신 기준일자를 조건으로 검색*/
		SELECT stock_date
		FROM "AGENTMASTER"."Stock_info"
		ORDER BY stock_date DESC
		LIMIT 1
	)
) AS sinfo
ON stock.stock_id = sinfo.stock_id
ORDER BY range ASC			                        /*등락률 오름차순(하한가)*/
LIMIT 5; 				                            /*5튜플 출력*/
/*
등락률이 낮은 순서대로 주식정보를 5튜플 출력합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*4.3.3 상승 버튼*/
SELECT stock.stock_id, stock.stock_name, stock.field_name, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range
FROM "AGENTMASTER"."Stock" AS stock
JOIN (
	SELECT cinfo.stock_id, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range, cinfo.cid
	FROM(
		SELECT stock_id, COUNT(stock_id) AS cid
		FROM "AGENTMASTER"."Stock_info"
		WHERE stock_date BETWEEN	                /*최근 10일간의 기준일자를 조건으로 검색*/
		(
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		) - 10 AND
		(
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		) AND RANGE > 0		                        /*등락률이 양수일 때를 조건으로 검색*/
		GROUP BY stock_id
	) AS cinfo
	JOIN
	"AGENTMASTER"."Stock_info" AS sinfo
	ON sinfo.stock_id = cinfo.stock_id
	WHERE cid > 4 AND sinfo.stock_date = (	        /*등락률이 양수였던 날이 5일 이상일 때를 조건*/
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		)
	ORDER BY cinfo.cid DESC
	LIMIT 5				                            /*5튜플 출력*/
) AS sinfo
ON stock.stock_id = sinfo.stock_id
ORDER BY sinfo.cid DESC;
/*
상승 중인 종목의 주식정보를 5튜플 출력합니다.
최근 10일 중 등락률이 양수였던 날이 5영업일 이상일 경우를 상승 중인 종목으로 간주합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*4.3.4 하락 버튼*/
SELECT stock.stock_id, stock.stock_name, stock.field_name, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range
FROM "AGENTMASTER"."Stock" AS stock
JOIN (
	SELECT cinfo.stock_id, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range, cinfo.cid
	FROM(
		SELECT tock_id, COUNT(stock_id) AS cid
		FROM "AGENTMASTER"."Stock_info"
		WHERE stock_date BETWEEN	                /*최근 10일간의 기준일자를 조건으로 검색*/
		(
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		) - 10 AND
		(
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		) AND RANGE < 0		                        /*등락률이 음수일 때를 조건으로 검색*/
		GROUP BY stock_id
	) AS cinfo
	JOIN
	"AGENTMASTER"."Stock_info" AS sinfo
	ON sinfo.stock_id = cinfo.stock_id
	WHERE cid > 4 AND sinfo.stock_date = (	        /*등락률이 음수였던 날이 5일 이상일 때를 조건*/
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		)
	ORDER BY cinfo.cid DESC
	LIMIT 5				                            /*5튜플 출력*/
) AS sinfo
ON stock.stock_id = sinfo.stock_id
ORDER BY sinfo.cid DESC;
/*
하락 중인 종목의 주식정보를 5튜플 출력합니다.
최근 10일 중 등락률이 음수였던 날이 5영업일 이상일 경우를 상승 중인 종목으로 간주합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*4.3.5 보합 버튼*/
SELECT stock.stock_id, stock.stock_name, stock.field_name, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range
FROM "AGENTMASTER"."Stock" AS stock
JOIN (
	SELECT cinfo.stock_id, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range, cinfo.cid
	FROM(
		SELECT stock_id, COUNT(stock_id) AS cid
		FROM "AGENTMASTER"."Stock_info"
		WHERE stock_date BETWEEN	                /*최근 10일간의 기준일자를 조건으로 검색*/
		(
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		) - 10 AND
		(
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		) AND RANGE < 5 AND RANGE > -5	            /*등락률이 +-5 사이일 때를 조건으로 검색*/
		GROUP BY stock_id
	) AS cinfo
	JOIN
	"AGENTMASTER"."Stock_info" AS sinfo
	ON sinfo.stock_id = cinfo.stock_id
	WHERE cid > 4 AND sinfo.stock_date = (	        /*등락률이 +-5 사이인 날이 5일 이상일 때를 조건*/
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		)
	ORDER BY cinfo.cid DESC
	LIMIT 5				                            /*5튜플 출력*/
) AS sinfo
ON stock.stock_id = sinfo.stock_id
ORDER BY sinfo.cid DESC;
/*
보합 중인 종목의 주식정보를 5튜플 출력합니다.
최근 10일 중 등락률이 +-5 사이였던 날이 5영업일 이상일 경우를 상승 중인 종목으로 간주합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*4.3.6 거래량 버튼*/
SELECT stock.stock_id, stock.stock_name, stock.field_name, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range, sinfo.trading_volume
FROM "AGENTMASTER"."Stock" AS stock
JOIN (
	SELECT *
	FROM "AGENTMASTER"."Stock_info"
	WHERE stock_date =(				/*가장 최신 기준일자를 조건으로 검색*/
		SELECT stock_date
		FROM "AGENTMASTER"."Stock_info"
		ORDER BY stock_date DESC
		LIMIT 1
	)
) AS sinfo
ON stock.stock_id = sinfo.stock_id
ORDER BY trading_volume DESC		/*거래량 내림차순(높은 순서)*/
LIMIT 5; 							/*5튜플 출력*/
/*
거래량이 높은 순서대로 주식정보를 5튜플 출력합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률, 거래량 순서로 출력됩니다.
*/


/*4.4 모의투자랭킹 부분은 실시간으로 업데이트하여 출력한다.*/
SELECT (ROW_NUMBER() OVER(ORDER BY rank_range DESC)) AS rank, customer_id, rank_range
FROM "AGENTMASTER"."Customer"
ORDER BY rank_range DESC;
/*
고객의 모의투자 랭킹을 1위부터 순위, 고객ID, 랭킹용 등락률 순서대로 출력합니다.
*/


/*4.5 검색창 부분에서 사용자가 검색한 키워드로 시작하는 종목명 정보를 출력한다.*/
SELECT stock_id, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_name LIKE '{keyword}%';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목명 정보를 출력합니다.
*/


                    /*5 주식 상세 페이지*/

/*5.1 디비에 저장된 종목 데이터를 그래프에 반영한다.*/
SELECT stock.stock_id, stock.stock_name, stock.field_name, sinfo.stock_date, sinfo.stock_price, sinfo.diff_from_prevday, sinfo.range
FROM "AGENTMASTER"."Stock" AS stock
JOIN "AGENTMASTER"."Stock_info" AS sinfo
ON stock.stock_id = sinfo.stock_id
WHERE sinfo.stock_date = (
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
) AND stock.stock_id = '{stock_id}';
/*
{stock_id}에 값을 넣어주세요
특정 종목의 종목코드, 종목명, 분야이름, 기준일자, 주가, 전일비, 등락률
*/


/*5.2 디비에 저장되었던 검색한 키워드에 관한 기사들을 한줄 정도 띄운다.*/
SELECT article_id, summary
FROM (
    SELECT art.article_id, artsum.summary,
    ROW_NUMBER() OVER (PARTITION BY art.article_id ORDER BY RANDOM()) AS rn
    FROM "AGENTMASTER"."Article" AS art
    JOIN "AGENTMASTER"."Article_summary" AS artsum 
	ON art.article_id = artsum.article_id
    WHERE art.issue_keyword LIKE '%{keyword}%'
) AS random_summaries
WHERE rn = 1;
/*
{keyword}에 값을 넣어주세요
고객이 입력한 키워드가 기사.이슈_키워드에 포함된 기사들의 요약문을 랜덤하게 1줄 출력합니다.
*/


/*5.3	디비에 저장된 종목 데이터(전일, 고가, 거래량, 시가, 저가, 거래대금)을 테이블 형식으로 출력한다.
->
//종목 데이터를 그래프에 반영하는 쿼리문과 같습니다. 데이터베이스에 고가, 거래량, 시가, 저가, 거래대금을 저장할 데이터는 추후 업데이트 하겠습니다.*/


/*5.4 검색창 부분에서 사용자가 검색한 키워드로 시작하는 종목명 정보를 출력한다.*/
SELECT stock_id, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_name LIKE '{keyword}%';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목명 정보를 출력합니다.
*/


/*5.5 페이지가 시작될 때 주식과 동일한 분야의 기사 제목을 5튜플 출력한다.*/

/*정렬 순서에 따라 쿼리문을 작성하였습니다.*/

/*5.5.1 랜덤하게 5튜플 출력한다.*/
SELECT art.article_id, art.title
FROM "AGENTMASTER"."Article" AS art
JOIN (
	SELECT *
	FROM "AGENTMASTER"."Stock"
	WHERE stock_id = '{stock_id}'
) AS sto
ON art.field_name = sto.field_name
ORDER BY RANDOM()
LIMIT 5;
/*
{stock_id}에 값을 넣어 주세요.
{stock_id}에 해당하는 주식과 동일한 분야의 기사 제목을 랜덤하게 5튜플 출력합니다
*/


/*5.5.2 최신 순으로 5튜플 출력한다.*/
SELECT art.article_id, art.title
FROM "AGENTMASTER"."Article" AS art
JOIN (
	SELECT *
	FROM "AGENTMASTER"."Stock"
	WHERE stock_id = '{stock_id}'
) AS sto
ON art.field_name = sto.field_name
ORDER BY art.last_pub DESC
LIMIT 5;
/*
{stock_id}에 값을 넣어 주세요.
{stock_id}에 해당하는 주식과 동일한 분야의 기사 제목을 최신 순으로 5튜플 출력합니다.
*/


/*5.6 동일한 분야의 기사 하나를 클릭했을 때 기사의 요약문을 출력합니다.*/

/*요약문을 하나만 출력할지 전체 출력할 지에 따라 쿼리문을 작성하였습니다.*/

/*5.6.1 기사의 요약문을 전부 출력한다.*/
SELECT article_id, summary
FROM "AGENTMASTER"."Article_summary"
WHERE article_id = '{article_id}';
/*
{article_id}에 값을 넣어 주세요.
{article_id}에 해당하는 기사의 요약문을 전부 출력합니다.
*/


/*5.6.2 기사의 요약문을 하나만 출력한다.*/
SELECT article_id, summary
FROM "AGENTMASTER"."Article_summary"
WHERE article_id = '{article_id}'
ORDER BY RANDOM()
LIMIT 1;
/*
{article_id}에 값을 넣어 주세요.
{article_id}에 해당하는 기사의 요약문을 하나만 출력합니다.
*/


                    /*6 사용자 페이지*/

/*로그인 수정 
->
*/


                    /*7 모의투자 메인 페이지*/

/*7.1 주식 거래 상위 10개 종목 순서대로 종목코드, 종목명, 현재가, 전일비, 등락률을 출력한다.*/
SELECT s.stock_id, s.stock_name, i.stock_price, i.diff_from_prevday, i.range
FROM
"AGENTMASTER"."Stock" AS s
JOIN
"AGENTMASTER"."Stock_info" AS i
ON s.stock_id = i.stock_id
ORDER BY stock_date DESC, range DESC
LIMIT 10;


/*7.2 나의 투자 정보 화면에서 사용자_id를 출력한다.*/
SELECT * FROM "AGENTMASTER"."Customer"
WHERE customer_id = '{username}';
/*
{username}에 값을 넣어 주세요.
고객 id가 {username}인 고객ID를 출력합니다.
*/


/*7.3 나의 투자 정보 화면에서 모의투자 수익률과 모의투자 순위를 출력한다.*/
SELECT inner_select.customer_id, inner_select.rank_range, inner_select.ranking 
FROM (
	SELECT customer_id, rank_range, ROW_NUMBER() OVER (ORDER BY rank_range DESC) AS ranking 
	FROM "AGENTMASTER"."Customer"
) AS inner_select
WHERE customer_id = '{username}';
/*
{username}에 값을 넣어 주세요.
고객 id가 {username}인 고객 랭킹용 등락률, 모의투자 순위를 출력합니다.
*/


/*7.4 나의 투자 정보 화면에서 총 자산, 가용 자산, 보유 주식 총액, 보유 종목 수를 출력한다.*/
SELECT cus.total_money, cus.simul_money, cus.stock_money, sim.sum
FROM "AGENTMASTER"."Customer" AS cus
JOIN (
	SELECT customer_id , SUM(simul_holdings) AS sum FROM 
	"AGENTMASTER"."Simulation"
	GROUP BY customer_id
) AS sim
ON cus.customer_id = sim.customer_id
WHERE cus.customer_id = '{username}';
/*
{username}에 값을 넣어 주세요.
고객 id가 {username}인 고객 총 자산, 가용 자산, 보유 주식 총액, 보유 종목 수를 출력합니다.
*/


/*7.5 보유 종목 화면에서 종목명, 매입 금액, 수익, 등락률, 주식 보유량을 출력한다.*/
SELECT sto.stock_name, sim.perchase_amount, sim.simul_return, sim.simul_range, sim.simul_holdings
FROM "AGENTMASTER"."Simulation" AS sim
JOIN "AGENTMASTER"."Stock" AS sto
ON sim.stock_id = sto.stock_id
WHERE sim.customer_id = '{username}';
/*
{username}에 값을 넣어 주세요.
고객 id가 {username}인 고객의 보유 종목 정보를 출력합니다.
*/


/*7.6 검색 화면에서 검색어가 바뀔 때 마다 키워드가 포함된 종목 정보를 출력한다. 키워드가 숫자로 시작할 때에는 종목코드를 검색하고, 키워드가 숫자로 시작하지 않을 때는 종목명을 검색한다.*/

/*7.6.1 종목코드 검색 시*/
SELECT stock_id, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_id LIKE '{keyword}%';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목코드 정보를 출력합니다.
*/


/*7.6.2 종목명 검색 시*/
SELECT stock_id, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_name LIKE '{keyword}%';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목명 정보를 출력합니다.
*/


					/*8 모의투자 거래*/

/*8.1 그래프/타이틀 페이지에서 주식의 이름과 주식 정보를 불러옵니다.*/
SELECT stock_name, stock_date, stock_price, diff_from_prevday, range
FROM "AGENTMASTER"."Stock_info" AS stockInfo
JOIN "AGENTMASTER"."Stock" AS Stock
ON stockInfo.stock_id = Stock.stock_id
WHERE stockInfo.stock_id = {stock_id}
ORDER BY stock_date DESC
LIMIT 7;
/*선택된 주식의 7일간 정보를 불러옵니다.*/


/*8.2 매수/매도 페이지에서 가용자산과 보유량을 불러옵니다.*/
SELECT simul_money, stock_money
FROM "AGENTMASTER"."Customer"
WHERE customer_id = {customer_id};
/*선택된 사용자의 가용자산과 보유량 정보를 불러옵니다.*/


/*8.3 동일업종 페이지에서 가용자산과 보유량을 불러옵니다.*/
SELECT stock_name, stock_price, diff_from_prevday, range
FROM "AGENTMASTER"."Stock_info" AS stockInfo
JOIN "AGENTMASTER"."Stock" AS Stock
ON stockInfo.stock_id = Stock.stock_id
WHERE Stock.field_name = (
	SELECT field_name
	FROM "AGENTMASTER"."Stock"
	WHERE Stock.stock_id = {stock_id}
)
ORDER BY RANDOM()
LIMIT 4;
/*동일업종 주식의 정보를 불러옵니다.*/


/*8.4 주식정보 페이지에서 우상단 주식정보를 불러옵니다.*/
SELECT stock_price, diff_from_prevday, range
FROM "AGENTMASTER"."Stock_info" AS stockInfo
WHERE stock_id = {stock_id};
/*우상단 주식정보를 불러옵니다.*/