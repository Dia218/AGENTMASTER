/*
주식 메인 페이지
*/

/*뉴스 미리보기 정보 랜덤 SELECT*/

SELECT arti.company, summ.summary
FROM "AGENTMASTER"."Article" AS arti
INNER JOIN "AGENTMASTER"."Article_summary" AS summ
ON arti.article_id = summ.article_id
ORDER BY RANDOM()
LIMIT 5;

/*검색 키워드가 포함된 주식 종목 SELECT*/

SELECT stock_code, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_name ~ '^{keyword}';

/*고객 모의투자 순위 SELECT*/

SELECT ROW_NUMBER() OVER(ORDER BY rank_range DESC) AS ranking, user_name, rank_range
FROM "AGENTMASTER"."User"
LIMIT 10;

/*주식 정보 상한가/하한가/상승/하락/거래량 기준 상위 5개 SELECT*/

/*상한가*/

SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range
FROM(
	SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
	FROM "AGENTMASTER"."Stock" AS inner_sto
	INNER JOIN "AGENTMASTER"."Field" AS inner_fie
	ON inner_sto.field_id = inner_fie.field_id
) AS sto
INNER JOIN "AGENTMASTER"."Stock_info" AS sin
ON sto.stock_id = sin.stock_id
WHERE sin.stock_date = (
	SELECT stock_date
	FROM "AGENTMASTER"."Stock_info"
	ORDER BY stock_date DESC
	LIMIT 1
)
ORDER BY sin.stock_range DESC
LIMIT 5;

/*하한가*/

SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range
FROM(
	SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
	FROM "AGENTMASTER"."Stock" AS inner_sto
	INNER JOIN "AGENTMASTER"."Field" AS inner_fie
	ON inner_sto.field_id = inner_fie.field_id
) AS sto
INNER JOIN "AGENTMASTER"."Stock_info" AS sin
ON sto.stock_id = sin.stock_id
WHERE sin.stock_date = (
	SELECT stock_date
	FROM "AGENTMASTER"."Stock_info"
	ORDER BY stock_date DESC
	LIMIT 1
)
ORDER BY sin.stock_range ASC
LIMIT 5;

/*상승*/

SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range
FROM(
	SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
	FROM "AGENTMASTER"."Stock" AS inner_sto
	INNER JOIN "AGENTMASTER"."Field" AS inner_fie
	ON inner_sto.field_id = inner_fie.field_id
) AS sto
INNER JOIN (
	SELECT inner_sin1.stock_id, inner_sin1.stock_date, inner_sin1.stock_price, diff_from_prevday, stock_range, (((CAST(inner_sin1.stock_price AS FLOAT))/(CAST(inner_sin2.stock_price AS FLOAT)) * 100) - 100) AS dif
	FROM (
		SELECT stock_id, stock_date, stock_price, diff_from_prevday, stock_range, start_price, high_price, low_price, trading_volume, transaction_amount
		FROM "AGENTMASTER"."Stock_info"
		WHERE stock_date = (
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		)
	) AS inner_sin1 
	INNER JOIN (
		SELECT stock_id, stock_date, stock_price
		FROM "AGENTMASTER"."Stock_info"
		WHERE stock_date = (
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		) - 6
	) AS inner_sin2
	ON inner_sin1.stock_id = inner_sin2.stock_id
) AS sin
ON sto.stock_id = sin.stock_id
ORDER BY sin.dif DESC
LIMIT 5;

/*하락*/

SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range
FROM(
	SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
	FROM "AGENTMASTER"."Stock" AS inner_sto
	INNER JOIN "AGENTMASTER"."Field" AS inner_fie
	ON inner_sto.field_id = inner_fie.field_id
) AS sto
INNER JOIN (
	SELECT inner_sin1.stock_id, inner_sin1.stock_date, inner_sin1.stock_price, diff_from_prevday, stock_range, (((CAST(inner_sin1.stock_price AS FLOAT))/(CAST(inner_sin2.stock_price AS FLOAT)) * 100) - 100) AS dif
	FROM (
		SELECT stock_id, stock_date, stock_price, diff_from_prevday, stock_range, start_price, high_price, low_price, trading_volume, transaction_amount
		FROM "AGENTMASTER"."Stock_info"
		WHERE stock_date = (
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		)
	) AS inner_sin1 
	INNER JOIN (
		SELECT stock_id, stock_date, stock_price
		FROM "AGENTMASTER"."Stock_info"
		WHERE stock_date = (
			SELECT stock_date
			FROM "AGENTMASTER"."Stock_info"
			ORDER BY stock_date DESC
			LIMIT 1
		) - 6
	) AS inner_sin2
	ON inner_sin1.stock_id = inner_sin2.stock_id
) AS sin
ON sto.stock_id = sin.stock_id
ORDER BY sin.dif ASC
LIMIT 5;

/*거래량*/

SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range
FROM(
	SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
	FROM "AGENTMASTER"."Stock" AS inner_sto
	INNER JOIN "AGENTMASTER"."Field" AS inner_fie
	ON inner_sto.field_id = inner_fie.field_id
) AS sto
INNER JOIN "AGENTMASTER"."Stock_info" AS sin
ON sto.stock_id = sin.stock_id
WHERE sin.stock_date = (
	SELECT stock_date
	FROM "AGENTMASTER"."Stock_info"
	ORDER BY stock_date DESC
	LIMIT 1
)
ORDER BY sin.trading_volume DESC
LIMIT 5;

/*
주식 상세 페이지
*/

/*선택한 주식 그래프 정보 SELECT*/

SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range
FROM(
	SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
	FROM "AGENTMASTER"."Stock" AS inner_sto
	INNER JOIN "AGENTMASTER"."Field" AS inner_fie
	ON inner_sto.field_id = inner_fie.field_id
) AS sto
INNER JOIN "AGENTMASTER"."Stock_info" AS sin
ON sto.stock_id = sin.stock_id
WHERE sto.stock_id = {stock_id}
ORDER BY sin.stock_date DESC;

/*검색 키워드가 포함된 주식 종목 SELECT*/

SELECT stock_code, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_name ~ '^{keyword}';

/*동일 분야 뉴스 정보 최신(또는 랜덤) 5개 SELECT*/

/*최신*/

SELECT art.title
FROM "AGENTMASTER"."Stock" AS sto
INNER JOIN "AGENTMASTER"."Article" AS art
ON sto.field_id = art.field_id
WHERE sto.stock_id = {stock_id}
ORDER BY art.last_pub DESC
LIMIT 5;

/*랜덤*/

SELECT art.title
FROM "AGENTMASTER"."Stock" AS sto
INNER JOIN "AGENTMASTER"."Article" AS art
ON sto.field_id = art.field_id
WHERE sto.stock_id = {stock_id}
ORDER BY RANDOM()
LIMIT 5;

/*클릭한 뉴스 요약문 SELECT*/

SELECT summ.summary
FROM "AGENTMASTER"."Article" AS arti
INNER JOIN "AGENTMASTER"."Article_summary" AS summ
ON arti.article_id = summ.article_id
WHERE arti.article_id = {article_id};

/*선택한 주식 차트 정보 SELECT*/

SELECT sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range, sin.start_price, sin.high_price, sin.low_price, sin.trading_volume, sin.transaction_amount
FROM "AGENTMASTER"."Stock" AS sto
INNER JOIN "AGENTMASTER"."Stock_info" AS sin
ON sto.stock_id = sin.stock_id
WHERE sto.stock_id = {stock_id}
ORDER BY sin.stock_date DESC;

/*
모의투자 메인 페이지
*/

/*주식 정보 거래량 기준 상위 10개 SELECT*/

SELECT sto.stock_id, sto.stock_code, sto.stock_name, sin.stock_price, sin.diff_from_prevday, sin.stock_range
FROM "AGENTMASTER"."Stock" AS sto
INNER JOIN "AGENTMASTER"."Stock_info" AS sin
ON sto.stock_id = sin.stock_id
WHERE sin.stock_date = (
	SELECT stock_date
	FROM "AGENTMASTER"."Stock_info"
	ORDER BY stock_date DESC
	LIMIT 1
)
ORDER BY sin.trading_volume DESC
LIMIT 10;

/*검색 키워드가 포함된 종목 SELECT*/

/*종목코드 검색*/

SELECT stock_id, stock_code, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_code ~ '^{keyword}';

/*종목명 검색*/

SELECT stock_id, stock_code, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_name ~ '^{keyword}';

/*사용자 랭킹 정보 SELECT*/

SELECT u.user_name, u.rank_range, u.ranking
FROM (
	SELECT user_id, user_name, rank_range, ROW_NUMBER() OVER(ORDER BY rank_range DESC) AS ranking
	FROM "AGENTMASTER"."User"
) AS u
WHERE user_id = {user_id};

/*사용자 자산 정보 SELECT*/

SELECT u.total_money, u.simul_money, u.stock_money, SUM(simul_holdings)
FROM "AGENTMASTER"."User" AS u
INNER JOIN "AGENTMASTER"."Simulation" AS s
ON u.user_id = s.user_id
WHERE u.user_id = {user_id}
GROUP BY u.user_id;

/*사용자가 보유한 종목 정보 SELECT*/

SELECT sto.stock_name, sim.purchase_amount, sim.simul_range, sim.simul_holdings
FROM "AGENTMASTER"."Simulation" AS sim
INNER JOIN "AGENTMASTER"."Stock" AS sto
ON sim.stock_id = sto.stock_id
WHERE sim.user_id = {user_id};

/*사용자 자산 정보 UPDATE*/

UPDATE "AGENTMASTER"."User"
SET total_money = 100000,
	yesterday_money = 100000,
	simul_money = 100000,
	stock_money = 0,
	total_return = 0,
	rank_range = 0
WHERE user_id = {user_id};

/*모의투자 거래 정보 초기화 DELETE*/

DELETE FROM "AGENTMASTER"."Simulation"
WHERE user_id = {user_id};

/*
모의투자 거래 페이지
*/

/*선택 종목 모의투자id SELECT*/

SELECT simulation_id
FROM "AGENTMASTER"."Simulation"
WHERE user_id = {user_id} AND stock_id = {stock_id};

/*선택 종목 그래프 정보 SELECT*/

/*종목 정보*/

SELECT sto.stock_code, sto.stock_name, fie.field_name
FROM "AGENTMASTER"."Stock" AS sto
INNER JOIN "AGENTMASTER"."Field" AS fie
ON sto.field_id = fie.field_id
WHERE stock_id = {stock_id}

/*종목 그래프 정보*/

SELECT stock_date, stock_price, diff_from_prevday, stock_range, start_price, high_price, low_price, trading_volume, transaction_amount
FROM "AGENTMASTER"."Stock_info"
WHERE stock_date > (
	SELECT stock_date
	FROM "AGENTMASTER"."Stock_info"
	ORDER BY stock_date DESC
	LIMIT 1
) - 7 AND stock_id = {stock_id}

/*선택 종목 주식 상세 정보 SELECT*/

SELECT stock_date, stock_price, diff_from_prevday, stock_range, start_price, high_price, low_price, trading_volume, transaction_amount
FROM "AGENTMASTER"."Stock_info"
WHERE stock_date = (
	SELECT stock_date
	FROM "AGENTMASTER"."Stock_info"
	ORDER BY stock_date DESC
	LIMIT 1
) AND stock_id = {stock_id}

/*선택 종목 모의투자 상세 정보 SELECT*/

SELECT simul_return, simul_range, simul_holdings, purchase_amount, average_price
FROM "AGENTMASTER"."Simulation"
WHERE simulation_id = {simulation_id}

/*선택 종목 모의투자 자산 SELECT*/

SELECT purchase_amount, simul_holdings
FROM "AGENTMASTER"."Simulation"
WHERE simulation_id = {simulation_id}

/*모의투자 거래 결과 UPDATE*/

UPDATE "AGENTMASTER"."Simulation"
SET simul_holdings = simul_holdings + {price}, purchase_amount = purchase_amount + {amount * price}
WHERE simulation_id = {simulation_id};

/*사용자 자산 정보 UPDATE*/

UPDATE "AGENTMASTER"."User"
SET simul_money = simul_money - {amount * price}, stock_money = stock_money + {amount * price}
WHERE user_id = {user_id};

/*동일 분야 종목 자산 보유량 기준 상위 4개 SELECT*/

SELECT sto.stock_name, sim.simul_return, sim.simul_range
FROM "AGENTMASTER"."Simulation" AS sim
INNER JOIN "AGENTMASTER"."Stock" AS sto
ON sim.stock_id = sto.stock_id
WHERE field_id = (
	SELECT sto.field_id
	FROM "AGENTMASTER"."Simulation" AS sim
	INNER JOIN "AGENTMASTER"."Stock" AS sto
	ON sim.stock_id = sto.stock_id
	WHERE sim.user_id = {user_id} AND sim.stock_id = {stock_id}
) AND sim.user_id = {user_id} AND sim.stock_id != {stock_id}
ORDER BY sim.simul_holdings DESC
LIMIT 4;