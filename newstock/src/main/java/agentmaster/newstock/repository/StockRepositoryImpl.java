package agentmaster.newstock.repository;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.dto.articlePage.mainPage.FluctuationStockInfo;
import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDetail;
import agentmaster.newstock.dto.stockPage.detailPage.ChartData;
import agentmaster.newstock.dto.stockPage.detailPage.StockBase;
import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.dto.stockPage.mainPage.StockRanking;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.sql.Date;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class StockRepositoryImpl implements StockRepository{

    @PersistenceContext
    EntityManager em;

    @Override
    public List<Stock> findIdByName(Stock stock) {
        return null;
    }

    @Override
    public List<Stock> findIdByCode(Stock stock) {
        return null;
    }

    @Override
    public List<StockRanking> findStockByTopReturn() {
        //SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
        //       sin.stock_range
        //  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
        //          FROM "AGENTMASTER"."Stock" AS inner_sto
        //                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
        //                   ON inner_sto.field_id = inner_fie.field_id) AS sto
        //           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
        //           ON sto.stock_id = sin.stock_id
        // WHERE sin.stock_date = ( /*가장 최신 기준일자를 조건으로 검색*/
        //     SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
        // ORDER BY sin.stock_range DESC /*등락률 내림차순(상한가)*/
        // LIMIT 5;

        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,"
                +"sin.stock_range "
                +"FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name "
                +"FROM \"AGENTMASTER\".\"Stock\" AS inner_sto "
                +"INNER JOIN \"AGENTMASTER\".\"Field\" AS inner_fie "
                +"ON inner_sto.field_id = inner_fie.field_id) AS sto "
                +"INNER JOIN \"AGENTMASTER\".\"Stock_info\" AS sin "
                +"ON sto.stock_id = sin.stock_id "
                +"WHERE sin.stock_date = ( "
                +"SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1) "
                +"ORDER BY sin.stock_range DESC "
                +"LIMIT 5";

        List<Object[]> query = em.createNativeQuery(nativeQuery).getResultList();

        List<StockRanking> result = new ArrayList<>();

        for(Object[] results : query){
            StockRanking stockRanking = new StockRanking((String) results[0], (String) results[1], (String) results[2], (Date) results[3], (Integer) results[4], (Integer) results[5],(Double) results[6]);
            result.add(stockRanking);
        }

        return result;
    }

    @Override
    public List<StockRanking> findStockByBottomReturn() {
        //SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
        //       sin.stock_range
        //  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
        //          FROM "AGENTMASTER"."Stock" AS inner_sto
        //                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
        //                   ON inner_sto.field_id = inner_fie.field_id) AS sto
        //           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
        //           ON sto.stock_id = sin.stock_id
        // WHERE sin.stock_date = ( /*가장 최신 기준일자를 조건으로 검색*/
        //     SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
        // ORDER BY sin.stock_range ASC /*등락률 내림차순(상한가)*/
        // LIMIT 5;

        return null;
    }

    @Override
    public List<StockRanking> findStockByTopRate() {
//        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,"
//                +"sin.stock_range "
//                +"FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name "
//                +"FROM \"AGENTMASTER\".\"Stock\" AS inner_sto "
//                +"INNER JOIN \"AGENTMASTER\".\"Field\" AS inner_fie "
//                +"ON inner_sto.field_id = inner_fie.field_id) AS sto "
//                +"INNER JOIN \"AGENTMASTER\".\"Stock_info\" AS sin "
//                +"ON sto.stock_id = sin.stock_id "
//                +"WHERE sin.stock_date = ( "
//                +"SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1) "
//                +"ORDER BY sin.stock_range ASC "
//                +"LIMIT 5";

        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,"
                +"sin.stock_range "
                +"FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name "
                +"FROM Stock AS inner_sto "
                +"INNER JOIN Field AS inner_fie "
                +"ON inner_sto.field_id = inner_fie.field_id) AS sto "
                +"INNER JOIN Stock_info AS sin "
                +"ON sto.stock_id = sin.stock_id "
                +"WHERE sin.stock_date = ( "
                +"SELECT stock_date FROM stock_info ORDER BY stock_date DESC LIMIT 1) "
                +"ORDER BY sin.stock_range ASC "
                +"LIMIT 5";

        System.out.println(nativeQuery);
        if(em.createNativeQuery(nativeQuery).getResultList().isEmpty()){
            System.out.println("비었음");
        }
        List<Object[]> query = em.createNativeQuery(nativeQuery).getResultList();
        if(query.isEmpty()){
            System.out.print("비었습니다.");
        }
        List<StockRanking> result = new ArrayList<>();

        for(Object[] results : query){
            StockRanking stockRanking = new StockRanking((String) results[0], (String) results[1], (String) results[2], (Date) results[3], (Integer) results[4], (Integer) results[5],(Double) results[6]);
            result.add(stockRanking);
        }

        return result;

    }

    @Override
    public List<StockRanking> findStockByBottomRate() {
        //SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
        //       sin.stock_range
        //  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
        //          FROM "AGENTMASTER"."Stock" AS inner_sto
        //                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
        //                   ON inner_sto.field_id = inner_fie.field_id) AS sto
        //           INNER JOIN (SELECT inner_sin1.stock_id, inner_sin1.stock_date, inner_sin1.stock_price, diff_from_prevday,
        //                              stock_range,
        //                              (((CAST(inner_sin1.stock_price AS FLOAT)) / (CAST(inner_sin2.stock_price AS FLOAT)) *
        //                                100) - 100) AS dif
        //                         FROM (SELECT stock_id, stock_date, stock_price, diff_from_prevday, stock_range, start_price,
        //                                      high_price, low_price, trading_volume, transaction_amount
        //                                 FROM "AGENTMASTER"."Stock_info"
        //                                WHERE stock_date = (SELECT stock_date
        //                                                      FROM "AGENTMASTER"."Stock_info"
        //                                                     ORDER BY stock_date DESC
        //                                                     LIMIT 1)) AS inner_sin1
        //                                  INNER JOIN (SELECT stock_id, stock_date, stock_price
        //                                                FROM "AGENTMASTER"."Stock_info"
        //                                               WHERE stock_date = (SELECT stock_date
        //                                                                     FROM "AGENTMASTER"."Stock_info"
        //                                                                    ORDER BY stock_date DESC
        //                                                                    LIMIT 1) - 6) AS inner_sin2
        //                                  ON inner_sin1.stock_id = inner_sin2.stock_id) AS sin
        //           ON sto.stock_id = sin.stock_id
        // ORDER BY sin.dif ASC
        // LIMIT 5;


        return null;
    }

    @Override
    public List<StockRanking> findStockByTopVolume() {
        //SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
        //       sin.stock_range
        //  FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
        //          FROM "AGENTMASTER"."Stock" AS inner_sto
        //                   INNER JOIN "AGENTMASTER"."Field" AS inner_fie
        //                   ON inner_sto.field_id = inner_fie.field_id) AS sto
        //           INNER JOIN "AGENTMASTER"."Stock_info" AS sin
        //           ON sto.stock_id = sin.stock_id
        // WHERE sin.stock_date = (SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
        // ORDER BY sin.trading_volume DESC
        // LIMIT 5;

        return null;
    }

    @Override
    public List<KeyWordStock> findStockBySearch(String search) {


        return null;
    }

    @Override
    public List<ChartData> findStockByChartData(Stock stock) {
        return null;
    }

    @Override
    public List<StockBase> findStockByBase(Stock stock) {
        return null;
    }

    @Override
    public List<StockDetail> findStockByMoreInfo(Stock stock) {
        return null;
    }

    @Override
    public List<FluctuationStockInfo> findStockByFluctuation() {
        return null;
    }

    @Override
    public void insertStock(Stock stock) {

    }
}
