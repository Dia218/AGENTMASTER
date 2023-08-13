                    /*모의투자 메인 페이지*/

/*주식 거래 상위 10개 종목 순서대로 종목코드, 종목명, 현재가, 전일비, 등락률을 출력한다.*/
SELECT s.stock_id, s.stock_name, i.stock_price, i.diff_from_prevday, i.range
FROM
"AGENTMASTER"."Stock" AS s
JOIN
"AGENTMASTER"."Stock_info" AS i
ON s.stock_id = i.stock_id
ORDER BY stock_date DESC, range DESC
LIMIT 10;


/*나의 투자 정보 화면에서 사용자_id를 출력한다.*/

SELECT * FROM "AGENTMASTER"."Customer"
WHERE customer_id = '{username}';
/*
{username}에 값을 넣어 주세요.
고객 id가 {username}인 고객ID를 출력합니다.
*/


/*나의 투자 정보 화면에서 모의투자 수익률과 모의투자 순위를 출력한다.*/
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


/*나의 투자 정보 화면에서 총 자산, 가용 자산, 보유 주식 총액, 보유 종목 수를 출력한다.*/
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


/*보유 종목 화면에서 종목명, 매입 금액, 수익, 등락률, 주식 보유량을 출력한다.*/
SELECT sto.stock_name, sim.perchase_amount, sim.simul_return, sim.simul_range, sim.simul_holdings
FROM "AGENTMASTER"."Simulation" AS sim
JOIN "AGENTMASTER"."Stock" AS sto
ON sim.stock_id = sto.stock_id
WHERE sim.customer_id = '{username}';
/*
{username}에 값을 넣어 주세요.
고객 id가 {username}인 고객의 보유 종목 정보를 출력합니다.
*/


/*검색 화면에서 검색어가 바뀔 때 마다 키워드가 포함된 종목 정보를 출력한다. 키워드가 숫자로 시작할 때에는 종목코드를 검색하고, 키워드가 숫자로 시작하지 않을 때는 종목명을 검색한다.*/

/*종목코드 검색 시*/
SELECT stock_id, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_id LIKE '{keyword}%';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목코드 정보를 출력합니다.
*/


/*종목명 검색 시*/
SELECT stock_id, stock_name
FROM "AGENTMASTER"."Stock"
WHERE stock_name LIKE '{keyword}%'
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목명 정보를 출력합니다.
*/