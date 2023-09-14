/*0.1 선택 종목 모의투자_id SELECT*/
SELECT simulation_id
  FROM "AGENTMASTER"."Simulation"
 WHERE user_id = '{user_id}'
   AND stock_id = '{stock_id}';

   
/*0.2 나의 투자 정보 화면에서 사용자_id를 출력한다.*/
SELECT *
  FROM "AGENTMASTER"."User"
 WHERE user_id = '{user_id}';
/*
{user_id}에 값을 넣어 주세요.
고객 id가 {user_id}인 고객 정보를 출력합니다.
*/


/*1 뉴스 메인 페이지*/

/*1.1 해당 페이지에서 무작위로 뉴스 기사 5개를 골라 신문사 이름, 기사 제목, 분야를 출력한다. 기사의 제목을 클릭하면 해당 기사의 상세 페이지로 넘어간다. 이 때 해당 기사의 id를 속성으로 넘겨준다.*/
SELECT article_id, company, title, field_id
  FROM "AGENTMASTER"."Article"
 ORDER BY RANDOM()
 LIMIT 5;
/*
랜담한 뉴스 기사 정보를 5튜플 출력합니다.
출력되는 정보는 기사_id, 신문사 이름, 기사 제목, 분야명 순서로 출력됩니다.
*/


/*1.2 해당 페이지에서 등락률 기준 최상위 4개 종목의 종목명, 주가, 전일비, 등락률을 차례대로 출력한다.*/
SELECT result.stock_id, result.stock_name, result.stock_price, result.diff_from_prevday, result.stock_range
  FROM (SELECT sinfo.stock_id, sinfo.stock_date, stock.stock_name, sinfo.stock_price, sinfo.diff_from_prevday,
               sinfo.stock_range
          FROM "AGENTMASTER"."Stock" AS stock
                   JOIN "AGENTMASTER"."Stock_info" AS sinfo
                   ON stock.stock_id = sinfo.stock_id
         ORDER BY sinfo.stock_date DESC, sinfo.stock_range DESC
         LIMIT 4) AS result;
/*
가장 최신일자를 기준으로 등락률 상위 종목 4튜플을 출력합니다.
출력되는 정보는 주식_id, 기준일자, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*1.3 해당 페이지에서 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭 시 무조건 관리자 계정의 정보를 넘겨받고 관리자 계정의 id를 출력한다.*/
SELECT *
  FROM "AGENTMASTER"."User"
 WHERE user_name = '{user_name}';
/*
{username}에 값을 넣어 주세요.
고객 id가 {username}인 고객 정보를 출력합니다.
*/


/*1.4 해당 페이지에서 아이디와 비밀번호, 이메일을 입력하고 회원 가입 버튼을 클릭하면 입력한 데이터를 db에 저장한다.*/
INSERT INTO "AGENTMASTER"."User"
VALUES ('{username}',
        '{password}',
        '{email}',
        100000, /*총 자산 초기 값*/
        0,
        100000, /*현금 자산 초기 값*/
        0,
        0,
        0.00);
/*
{username}, {password}, {email}에 값을 넣어 주세요.
고객 id가 {username}이고 고객 비밀번호가 {password}이고 고객 이메일이 {email}인 고객 정보를 DB에 추가합니다.
초기 값은 따로 정해 주세요.
*/


/*2 뉴스 상세 페이지*/

/*2.1 해당 페이지에서 클릭한 기사의 기사 제목, 스크랩 여부, 신문사 이름, 기자 이름을 출력한다.*/
SELECT article.article_id, article.title, article.company, article.reporter,
       CASE WHEN EXISTS (SELECT
                           FROM "AGENTMASTER"."Article_scrap"
                          WHERE article_id = '{article_id}' AND user_id = '{username}') THEN TRUE
            ELSE FALSE END AS isscrap
  FROM "AGENTMASTER"."Article" AS article
 WHERE article_id = '{article_id}';
/*
{article_id}, {username}에 값을 넣어주세요
출력되는 정보는 기사_id, 제목, 신문사 이름. 기자명 순서로 출력됩니다.
고객 id가 {username}인 고객이 기사 id가 {article_id}인 기사를 스크랩 했다면 isScrap컬럼에 true를 반환하고 그렇지 않으면 false를 반환합니다.
*/


/*2.2 해당 페이지에서 클릭한 기사의 요약문과 해당 기사의 원본 링크를 출력한다.*/
SELECT summary.article_summary, article.article_link_id
  FROM "AGENTMASTER"."Article" AS article
           LEFT JOIN "AGENTMASTER"."Article_summary" AS summary
           ON article.article_id = summary.article_id
 WHERE article.article_id = '{article_id}';
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
SELECT article2.article_id, article2.title
  FROM "AGENTMASTER"."Article" AS article1
           LEFT JOIN "AGENTMASTER"."Article" AS article2
           ON article1.article_group_id = article2.article_group_id
 WHERE article1.article_id = '{article_id}'
   AND article2.article_id <> '{article_id}'
   AND article2.article_group_id IS NOT NULL
 ORDER BY RANDOM()
 LIMIT 5;
/*
{article_id}에 값을 넣어주세요
기사 id가 {article_id}인 기사의 연관된 뉴스 기사 제목 5개를 출력합니다. 연관 뉴스가 없을 때는 아무 것도 출력되지 않습니다.
*/
/*2.6 선택된 뉴스 스크랩을 등록한다.*/
INSERT INTO "AGENTMASTER"."Article_scrap" (user_id, article_link_id)
VALUES ('{customer_id}', '{article_id}');
/*customer_id와 article_id를 받아 입력합니다.*/
/*2.6.1 선택된 뉴스 스크랩을 삭제한다.*/
DELETE
  FROM "AGENTMASTER"."Article_scrap"
 WHERE user_id = '{customer_id}'
   AND article_link_id = '{article_id}';
/*customer_id와 article_id를 받아 해당 스크랩을 삭제합니다.*/

/*3 뉴스 검색 페이지*/

/*3.1 해당 페이지에서 키워드를 입력해 검색하면 해당 키워드를 포함하는 뉴스 기사의 목록을 출력한다.
이때 각 항목은 신문사 이름과 게재일, 제목을 출력한다.
기사의 제목을 클릭하면 해당 기사의 상세 페이지로 넘어간다.
이 때 해당 기사의 id를 속성으로 넘겨준다.*/
SELECT article_id, company, first_pub, last_pub, title
  FROM "AGENTMASTER"."Article"
 WHERE title LIKE '%{keyword}%'
    OR (SELECT issue_keyword
          FROM "AGENTMASTER"."Issue_summary"
         WHERE "AGENTMASTER"."Issue_summary".issue_summary_id = "AGENTMASTER"."Article".issue_summary_id) LIKE
       '%{keyword}%';
/*
{keyword}에 값을 넣어주세요
기사 이슈 키워드에 {keyword}가 포함된 기사와, 제목애 {keyword}가 포함된 기사의 기사 id와 신문사 이름, 게재일, 제목을 출력합니다.
*/


/*4 주식 메인 페이지*/

/*4.1 최신 뉴스 미리보기 정보 랜덤 5개 SELECT*/
SELECT arti.company, summ.article_summary
  FROM "AGENTMASTER"."Article" AS arti
           INNER JOIN "AGENTMASTER"."Article_summary" AS summ
           ON arti.article_id = summ.article_id
 WHERE TO_CHAR(arti.last_pub, 'YYYY-MM-DD') = (
     SELECT MAX(TO_CHAR(last_pub, 'YYYY-MM-DD')) 
     FROM "AGENTMASTER"."Article"
 )
 ORDER BY RANDOM()
 LIMIT 5;
/*
랜덤한 기사 id의 기사 요약이 5개 출력됩니다.
출력 결과는 신문사 이름, 기사 요약 순서로 출력됩니다.
*/


/*4.2 검색 키워드가 포함된 주식 종목 SELECT*/
SELECT stock_code, stock_name
  FROM "AGENTMASTER"."Stock"
 WHERE stock_name ~ '^{keyword}';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목명 정보를 출력합니다.
*/


/*4.3 주식 정보 상한가/하한가/상승/하락/거래량 기준 상위 5개 SELECT*/

/*4.3.1 상한가*/
SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
       sin.stock_range
  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
          FROM "AGENTMASTER"."Stock" AS inner_sto
                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
                   ON inner_sto.field_id = inner_fie.field_id) AS sto
           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
           ON sto.stock_id = sin.stock_id
 WHERE sin.stock_date = ( /*가장 최신 기준일자를 조건으로 검색*/
     SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
 ORDER BY sin.stock_range DESC /*등락률 내림차순(상한가)*/
 LIMIT 5;
/*5튜플 출력*/
/*
등락률이 높은 순서대로 주식정보를 5튜플 출력합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*4.3.2 하한가*/
SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
       sin.stock_range
  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
          FROM "AGENTMASTER"."Stock" AS inner_sto
                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
                   ON inner_sto.field_id = inner_fie.field_id) AS sto
           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
           ON sto.stock_id = sin.stock_id
 WHERE sin.stock_date = ( /*가장 최신 기준일자를 조건으로 검색*/
     SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
 ORDER BY sin.stock_range ASC /*등락률 내림차순(상한가)*/
 LIMIT 5;
/*5튜플 출력*/
/*
등락률이 낮은 순서대로 주식정보를 5튜플 출력합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*4.3.3 상승*/
SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
       sin.stock_range
  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
          FROM "AGENTMASTER"."Stock" AS inner_sto
                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
                   ON inner_sto.field_id = inner_fie.field_id) AS sto
           INNER JOIN (SELECT inner_sin1.stock_id, inner_sin1.stock_date, inner_sin1.stock_price, diff_from_prevday,
                              stock_range,
                              (((CAST(inner_sin1.stock_price AS FLOAT)) / (CAST(inner_sin2.stock_price AS FLOAT)) *
                                100) - 100) AS dif
                         FROM (SELECT stock_id, stock_date, stock_price, diff_from_prevday, stock_range, start_price,
                                      high_price, low_price, trading_volume, transaction_amount
                                 FROM "AGENTMASTER"."Stock_info"
                                WHERE stock_date = (SELECT stock_date
                                                      FROM "AGENTMASTER"."Stock_info"
                                                     ORDER BY stock_date DESC
                                                     LIMIT 1)) AS inner_sin1
                                  INNER JOIN (SELECT stock_id, stock_date, stock_price
                                                FROM "AGENTMASTER"."Stock_info"
                                               WHERE stock_date = (SELECT stock_date
                                                                     FROM "AGENTMASTER"."Stock_info"
                                                                    ORDER BY stock_date DESC
                                                                    LIMIT 1) - 6) AS inner_sin2
                                  ON inner_sin1.stock_id = inner_sin2.stock_id) AS sin
           ON sto.stock_id = sin.stock_id
 ORDER BY sin.dif DESC
 LIMIT 5;
/*
상승 폭이 높은 순서대로 주식정보를 5튜플 출력합니다.
일주일 전 주가와 비교하여 현재 주가가 오른 경우를 상승 중인 종목으로 간주합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/


/*4.3.4 하락*/
SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
       sin.stock_range
  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
          FROM "AGENTMASTER"."Stock" AS inner_sto
                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
                   ON inner_sto.field_id = inner_fie.field_id) AS sto
           INNER JOIN (SELECT inner_sin1.stock_id, inner_sin1.stock_date, inner_sin1.stock_price, diff_from_prevday,
                              stock_range,
                              (((CAST(inner_sin1.stock_price AS FLOAT)) / (CAST(inner_sin2.stock_price AS FLOAT)) *
                                100) - 100) AS dif
                         FROM (SELECT stock_id, stock_date, stock_price, diff_from_prevday, stock_range, start_price,
                                      high_price, low_price, trading_volume, transaction_amount
                                 FROM "AGENTMASTER"."Stock_info"
                                WHERE stock_date = (SELECT stock_date
                                                      FROM "AGENTMASTER"."Stock_info"
                                                     ORDER BY stock_date DESC
                                                     LIMIT 1)) AS inner_sin1
                                  INNER JOIN (SELECT stock_id, stock_date, stock_price
                                                FROM "AGENTMASTER"."Stock_info"
                                               WHERE stock_date = (SELECT stock_date
                                                                     FROM "AGENTMASTER"."Stock_info"
                                                                    ORDER BY stock_date DESC
                                                                    LIMIT 1) - 6) AS inner_sin2
                                  ON inner_sin1.stock_id = inner_sin2.stock_id) AS sin
           ON sto.stock_id = sin.stock_id
 ORDER BY sin.dif ASC
 LIMIT 5;
/*
하락 폭이 높은 순서대로 주식정보를 5튜플 출력합니다.
일주일 전 주가와 비교하여 현재 주가가 떨어진 경우를 하락 중인 종목으로 간주합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률 순서로 출력됩니다.
*/

/*4.3.5 거래량*/
SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
       sin.stock_range
  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
          FROM "AGENTMASTER"."Stock" AS inner_sto
                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
                   ON inner_sto.field_id = inner_fie.field_id) AS sto
           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
           ON sto.stock_id = sin.stock_id
 WHERE sin.stock_date = (SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
 ORDER BY sin.trading_volume DESC
 LIMIT 5;
/*
거래량이 높은 순서대로 주식정보를 5튜플 출력합니다.
출력되는 정보는 종목코드, 종목명, 분야명, 주가, 전일비, 등락률, 거래량 순서로 출력됩니다.
*/


/*4.4 고객 모의투자 순위 SELECT*/
SELECT ROW_NUMBER() OVER (ORDER BY rank_range DESC) AS ranking, user_name, rank_range
  FROM "AGENTMASTER"."User"
 LIMIT 10;
/*
1위부터 10위까지 모의투자 순위, 유저 아이디, 랭킹용 등락률을 순서대로 출력합니다.
*/


/*5 주식 상세 페이지*/

/*5.1 선택한 주식 그래프 정보 SELECT*/
SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
       sin.stock_range
  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
          FROM "AGENTMASTER"."Stock" AS inner_sto
                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
                   ON inner_sto.field_id = inner_fie.field_id) AS sto
           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
           ON sto.stock_id = sin.stock_id
 WHERE sto.stock_id = '{stock_id}'
 ORDER BY sin.stock_date DESC;
/*
{stock_id}에 값을 넣어주세요
특정 종목의 종목코드, 종목명, 분야이름, 기준일자, 주가, 전일비, 등락률
*/


/*검색 키워드가 포함된 주식 종목 SELECT -> 4.2과 동일*/


/*5.2 디비에 저장되었던 검색한 키워드에 관한 기사들을 한줄 정도 띄운다. - 수정 필요
SELECT article_id, article_summary
FROM (SELECT art.article_id,
             artsum.article_summary,
             ROW_NUMBER() OVER (PARTITION BY art.article_id ORDER BY RANDOM()) AS rn
      FROM "AGENTMASTER"."Article" AS art
               JOIN "AGENTMASTER"."Article_summary" AS artsum
                    ON art.article_id = artsum.article_id
      WHERE art.issue_keyword LIKE '%{keyword}%') AS random_summaries
WHERE rn = 1;
*/
SELECT "AGENTMASTER"."Article".article_id, article_summary
  FROM "AGENTMASTER"."Article"
           JOIN "AGENTMASTER"."Article_summary"
           ON "AGENTMASTER"."Article_summary".article_id = "AGENTMASTER"."Article".article_id
 WHERE (SELECT issue_summary
          FROM "AGENTMASTER"."Issue_summary"
         WHERE "Article".issue_summary_id = "AGENTMASTER"."Article".issue_summary_id) LIKE '{keyword}'
 ORDER BY RANDOM()
 LIMIT 1;
/*
{keyword}에 값을 넣어주세요
고객이 입력한 키워드가 기사.이슈_키워드에 포함된 기사들의 요약문을 랜덤하게 1줄 출력합니다.
*/


/*5.3 동일 분야 뉴스 정보 최신(또는 랜덤) 5개 SELECT*/

/*5.3.1 랜덤하게 5튜플 출력한다.*/
SELECT art.title
  FROM "AGENTMASTER"."Stock" AS sto
           INNER JOIN "AGENTMASTER"."Article" AS art
           ON sto.field_id = art.field_id
 WHERE sto.stock_id = '{stock_id}'
 ORDER BY RANDOM()
 LIMIT 5;
/*
{stock_id}에 값을 넣어 주세요.
{stock_id}에 해당하는 주식과 동일한 분야의 기사 제목을 랜덤하게 5튜플 출력합니다
*/


/*5.3.2 최신 순으로 5튜플 출력한다.*/
SELECT art.article_id, art.title, art.company
  FROM "AGENTMASTER"."Stock" AS sto
           INNER JOIN "AGENTMASTER"."Article" AS art
           ON sto.field_id = art.field_id
 WHERE sto.stock_id = '{stock_id}'
 ORDER BY art.last_pub DESC
 LIMIT 5;
/*
{stock_id}에 값을 넣어 주세요.
{stock_id}에 해당하는 주식과 동일한 분야의 기사 제목을 최신 순으로 5튜플 출력합니다.
*/


/*5.4 클릭한 뉴스 요약문 SELECT*/
SELECT summ.article_summary
  FROM "AGENTMASTER"."Article" AS arti
           INNER JOIN "AGENTMASTER"."Article_summary" AS summ
           ON arti.article_id = summ.article_id
 WHERE arti.article_id = '{article_id}';
/*
{article_id}에 값을 넣어 주세요.
{article_id}에 해당하는 기사의 요약문을 전부 출력합니다.
*/


/*5.5 선택한 주식 차트 정보 SELECT*/
SELECT sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range, sin.start_price, sin.high_price,
       sin.low_price, sin.trading_volume, sin.transaction_amount
  FROM "AGENTMASTER"."Stock" AS sto
           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
           ON sto.stock_id = sin.stock_id
 WHERE sto.stock_id = '{stock_id}'
 ORDER BY sin.stock_date DESC;
/*
{stock_id}에 값을 넣어 주세요.
{stock_id}에 해당하는 주식의 차트 정보를 출력합니다.
*/


/*6 사용자 페이지*/

/* 6.1 사용자 등록 과정*/
INSERT INTO "AGENTMASTER"."User" (user_id, user_name, password, e_mail)
VALUES ('{user_id}', '{user_name}', '{password]', '{e_mail}');


/*6.1 로그인 수정 */
UPDATE "AGENTMASTER"."User"
   SET password = CASE WHEN '{password}' !=
                            (SELECT password FROM "AGENTMASTER"."User" WHERE user_id = '{customer_id}') AND
                            '{password}' IS NOT NULL THEN '{password}'
                       ELSE password END,

       e_mail = CASE WHEN '{e_mail}' != (SELECT e_mail FROM "AGENTMASTER"."User") AND '{e_mail}' IS NOT NULL
                         THEN '{e_mail}'
                     ELSE e_mail END
 WHERE user_id = '{User_id}';
/*'{customer_id}', '{e_mail}'과 '{password}'에 값을 넣으세요.
  '{password}' 값 입력은 선택으로, NULL값이 들어가거나, 기존의 비밀번호와 같으면 변경되지 않습니다.
  '{e_mail}' 값 입력은 선택으로, NULL값이 들어가거나, 고객 테이블에 존재하는 이메일과 겹치면 변경되지 않습니다.
  사용자 아이디와 이메일, 비밀번호를 선택적으로 받아 변경합니다.
 */

/*6.2 사용자 스크랩 표시 */
SELECT "AGENTMASTER"."Article".article_id, "AGENTMASTER"."Article".title, "AGENTMASTER"."Article".reporter,
       "AGENTMASTER"."Article".first_pub
  FROM "AGENTMASTER"."Article"
           JOIN "AGENTMASTER"."Article_scrap"
           ON "AGENTMASTER"."Article".article_link_id = "AGENTMASTER"."Article_scrap".article_link_id
 WHERE user_id = '{user_id}';


/*7 모의투자 메인 페이지*/

/*7.1 주식 정보 거래량 기준 상위 10개 SELECT*/
SELECT sto.stock_id, sto.stock_code, sto.stock_name, sin.stock_price, sin.diff_from_prevday, sin.stock_range
  FROM "AGENTMASTER"."Stock" AS sto
           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
           ON sto.stock_id = sin.stock_id
 WHERE sin.stock_date = (SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
 ORDER BY sin.trading_volume DESC
 LIMIT 10;


/*7.2 검색 키워드가 포함된 종목 SELECT*/

/*7.2.1 종목코드 검색 시*/
SELECT stock_id, stock_code, stock_name
  FROM "AGENTMASTER"."Stock"
 WHERE stock_code ~ '^{keyword}';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목코드 정보를 출력합니다.
*/


/*7.2.2 종목명 검색 시*/
SELECT stock_id, stock_code, stock_name
  FROM "AGENTMASTER"."Stock"
 WHERE stock_name ~ '^{keyword}';
/*
{keyword}에 값을 넣어 주세요.
{keyword}로 시작하는 종목명 정보를 출력합니다.
*/


/*7.3 사용자 랭킹 정보 SELECT*/
SELECT u.user_name, u.rank_range, u.ranking
  FROM (SELECT user_id, user_name, rank_range, ROW_NUMBER() OVER (ORDER BY rank_range DESC) AS ranking
          FROM "AGENTMASTER"."User") AS u
 WHERE user_id = '{user_id}';
/*
{user_id}에 값을 넣어 주세요.
고객 id가 {user_id}인 고객 아이디, 랭킹용 등락률, 모의투자 순위를 출력합니다.
*/


/*7.4 사용자 자산 정보 SELECT*/
SELECT u.total_money, u.simul_money, u.stock_money, SUM(simul_holdings)
  FROM "AGENTMASTER"."User" AS u
           INNER JOIN "AGENTMASTER"."Simulation" AS s
           ON u.user_id = s.user_id
 WHERE u.user_id = '{user_id}'
 GROUP BY u.user_id;
/*
{user_id}에 값을 넣어 주세요.
고객 id가 {user_id}인 고객 총 자산, 가용 자산, 보유 주식 총액, 보유 종목 수를 출력합니다.
*/


/*7.5 사용자가 보유한 종목 정보 SELECT*/
SELECT sto.stock_name, sim.purchase_amount, sim.simul_return, sim.simul_range, sim.simul_holdings
  FROM "AGENTMASTER"."Simulation" AS sim
           INNER JOIN "AGENTMASTER"."Stock" AS sto
           ON sim.stock_id = sto.stock_id
 WHERE sim.user_id = '{user_id}';
/*
{user_id}에 값을 넣어 주세요.
고객 id가 {user_id}인 고객의 보유 종목 정보를 출력합니다.
*/


/*7.6 사용자 자산 정보 UPDATE*/
UPDATE "AGENTMASTER"."User"
   SET total_money = 100000,
       yesterday_money = 100000,
       simul_money = 100000,
       stock_money = 0,
       rank_range = 0
 WHERE user_id = '{user_id}';


/*7.7 모의투자 거래 정보 초기화 DELETE*/
DELETE
  FROM "AGENTMASTER"."Simulation"
 WHERE user_id = '{user_id}';


/*8 모의투자 거래*/

/*8.1 선택 종목 정보 SELECT*/
SELECT sto.stock_code, sto.stock_name, fie.field_name
  FROM "AGENTMASTER"."Stock" AS sto
           INNER JOIN "AGENTMASTER"."Field" AS fie
           ON sto.field_id = fie.field_id
 WHERE stock_id = '{stock_id}';


/*8.2 선택 종목 그래프 정보 SELECT*/
SELECT stock_date, stock_price, diff_from_prevday, stock_range, start_price, high_price, low_price, trading_volume,
       transaction_amount
  FROM "AGENTMASTER"."Stock_info"
 WHERE stock_date > (SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1) - 7
   AND stock_id = '{stock_id}';


/*8.3선택 종목 주식 상세 정보 SELECT*/
SELECT stock_date, stock_price, diff_from_prevday, stock_range, start_price, high_price, low_price, trading_volume,
       transaction_amount
  FROM "AGENTMASTER"."Stock_info"
 WHERE stock_date = (SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
   AND stock_id = '{stock_id}';


/*8.4 선택 종목 모의투자 상세 정보 SELECT*/
SELECT simul_return, simul_range, simul_holdings, purchase_amount, average_price
  FROM "AGENTMASTER"."Simulation"
 WHERE simulation_id = '{simulation_id}';


/*8.5 선택 종목 모의투자 자산 SELECT*/
SELECT u.simul_money, s.simul_holdings
  FROM "AGENTMASTER"."Simulation" AS s
           INNER JOIN "AGENTMASTER"."User" AS u
           ON s.user_id = u.user_id
 WHERE simulation_id = '{simulation_id}';


/*8.6 모의투자 거래 결과 INSERT AND UPDATE*/
INSERT INTO "AGENTMASTER"."Simulation" AS simul (user_id,
                                                 stock_id,
                                                 simul_return,
                                                 simul_range,
                                                 simul_holdings,
                                                 purchase_amount,
                                                 average_price)
VALUES ('{user_id}',
        '{stock_id}',
        '{simul_return}',
        '{simul_range}',
        '{simul_holdings}',
        '{purchase_amount}',
        '{average_price}')
    ON CONFLICT(user_id, stock_id) DO UPDATE SET simul_return = '{simul_return}',
                                                 simul_range = '{simul_range}',
                                                 simul_holdings = '{simul_holdings}',
                                                 purchase_amount = '{purchase_amount}',
                                                 average_price = '{average_price}'
 WHERE simul.user_id = '{user_id}'
   AND simul.stock_id = '{stock_id}';


/*8.7 사용자 자산 정보 UPDATE*/
UPDATE "AGENTMASTER"."User"
   SET total_money = '{total_money}',
       simul_money = '{simul_money}',
       stock_money = '{stock_money}',
       rank_range = '{rank_range}'
 WHERE user_id = '{user_id}';


/*8.8 동일 분야 종목 주식 정보 거래량 기준 상위 4개 SELECT*/
SELECT sto.stock_name, sin.stock_price, sin.diff_from_prevday, sin.stock_range
  FROM "AGENTMASTER"."Stock" AS sto
           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
           ON sto.stock_id = sin.stock_id
 WHERE field_id = (SELECT field_id FROM "AGENTMASTER"."Stock" WHERE stock_id = 1)
   AND sin.stock_date = (SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
 ORDER BY sin.trading_volume DESC;


/*9 기사 요약문*/

/*9.1 [SELECT] 기사 요약문이 없는 기사의 본문 필요*/

SELECT article_id, body
  FROM "AGENTMASTER"."Article"
 WHERE article_id NOT IN (SELECT DISTINCT article_id FROM "AGENTMASTER"."Article_summary");


/*9.2 [INSERT] 기사 요약문의 저장*/

INSERT INTO "AGENTMASTER"."Article_summary"(article_id, article_summary)
VALUES ({article_id},
         '{article_summary}');


/*9.3 [UPDATE] 기사 요약문의 수정*/

UPDATE "AGENTMASTER"."Article_summary"
   SET article_summary = '{new_article_summary}'
 WHERE article_id = {article_id} AND article_summary = '{previous_article_summary}';

/*10.1 사건흐름 - 사건정리, 수행 전 사건 키워드 저장
  issue_keyword에 값을 삽입하세요.  */
INSERT INTO "AGENTMASTER"."Issue_summary" (issue_keyword)
VALUES ('{issue_keyword}');

/*10.2 사건흐름 - 사건정리, 사건 키워드 수정
  old_issue_keyword에 옛 값을 삽입하면 issue_keyword에 new_issue_keyword를 입력합니다.  */
UPDATE "AGENTMASTER"."Issue_summary"
   SET issue_keyword = '{new_issue_keyword}'
 WHERE issue_keyword = '{old_issue_keyword}';

/*10.3 사건흐름 - 사건정리, 사건 키워드에 해당하는 본문 불러오기
  issue_keyword에 대한 사건 요약번호와 본문을 가져옵니다.*/
SELECT "AGENTMASTER"."Article".body, "AGENTMASTER"."Issue_summary".issue_summary_id
  FROM "AGENTMASTER"."Issue_summary"
           INNER JOIN "AGENTMASTER"."Article"
           ON "AGENTMASTER"."Issue_summary".issue_summary_id = "AGENTMASTER"."Article".issue_summary_id
 WHERE "AGENTMASTER"."Issue_summary".issue_keyword = '{issue_keyword}';

/*10.4 사건흐름 - 사건정리, 사건 요약문의 저장 및 수정
issue_summary_id에 해당하는 사건요약문을 수정합니다.*/
UPDATE "AGENTMASTER"."Issue_summary"
   SET issue_summary = '{issue_summary}'
 WHERE issue_summary_id = '{issue_summary_id}';