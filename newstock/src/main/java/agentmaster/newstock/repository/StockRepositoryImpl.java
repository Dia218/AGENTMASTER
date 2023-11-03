package agentmaster.newstock.repository;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.domain.StockInfo;
import agentmaster.newstock.dto.articlePage.mainPage.FluctuationStockInfo;
import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDetail;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDto;
import agentmaster.newstock.dto.simulPage.simulTrade.StockSameField;
import agentmaster.newstock.dto.stockPage.detailPage.ChartData;
import agentmaster.newstock.dto.stockPage.detailPage.StockBase;
import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.dto.stockPage.mainPage.StockRanking;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.math.BigDecimal;
import java.math.BigInteger;
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

        String jpql = "SELECT s " +
                " FROM Stock s " +
                " Where s.stockName = :stockName";



        TypedQuery<Stock> query = em.createQuery(jpql,Stock.class);
        List<Stock> queryResult = query.setParameter("stockName",stock.getStockName()).getResultList();

        return queryResult;
    }

    @Override
    public List<Stock> findIdByCode(Stock stock) {

        String jpql = "SELECT s " +
                " FROM Stock s "
                + "Where s.stockCode = :stockCode";

        TypedQuery<Stock> query = em.createQuery(jpql,Stock.class);
        List<Stock> queryResult = query.setParameter("stockCode", stock.getStockCode()).getResultList();

        return queryResult;
    }

    @Override
    public List<StockRanking> findStockByTopReturn() {
//        SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
//               sin.stock_range
//          FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
//                  FROM "AGENTMASTER"."Stock" AS inner_sto
//                           INNER JOIN "AGENTMASTER"."Field" AS inner_fie
//                           ON inner_sto.field_id = inner_fie.field_id) AS sto
//                   INNER JOIN "AGENTMASTER"."Stock_info" AS sin
//                   ON sto.stock_id = sin.stock_id
//         WHERE sin.stock_date = ( /*가장 최신 기준일자를 조건으로 검색*/
//             SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
//         ORDER BY sin.stock_range DESC /*등락률 내림차순(상한가)*/
//         LIMIT 5;

        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,"
                    +"sin.stock_range, sin.trading_volume "
                +"FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name "
                        +"FROM \"AGENTMASTER\".\"Stock\" AS inner_sto "
                            +"INNER JOIN \"AGENTMASTER\".\"Field\" AS inner_fie "
                            +"ON inner_sto.field_id = inner_fie.field_id) AS sto "
                        +"INNER JOIN \"AGENTMASTER\".\"Stock_info\" AS sin "
                    +"ON sto.stock_id = sin.stock_id "
                +"WHERE sin.stock_date = ( "
                  +"SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1) "
                +"ORDER BY sin.diff_from_prevday DESC ";

        Query query = em.createNativeQuery(nativeQuery).setMaxResults(5);
        List<Object[]> results = query.getResultList();
        List<StockRanking> result = new ArrayList<>();

        for(int i=0;i<results.size();i++){
            StockRanking stockRanking = new StockRanking(i+1,(String) results.get(i)[0], (String) results.get(i)[1], (String) results.get(i)[2], (Date) results.get(i)[3], (Integer) results.get(i)[4], (Integer) results.get(i)[5],((Double) results.get(i)[6]).doubleValue(),((BigInteger) results.get(i)[7]).longValue());
            result.add(stockRanking);
        }

        return result;
    }

    @Override
    public List<StockRanking> findStockByBottomReturn() {
        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, "
               +"sin.stock_range, sin.trading_volume  "
          +"FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name "
                  +"FROM \"AGENTMASTER\".\"Stock\" AS inner_sto "
                           +"INNER JOIN \"AGENTMASTER\".\"Field\" AS inner_fie "
                           +"ON inner_sto.field_id = inner_fie.field_id) AS sto "
                   +"INNER JOIN \"AGENTMASTER\".\"Stock_info\" AS sin "
                   +"ON sto.stock_id = sin.stock_id "
         +"WHERE sin.stock_date = ( /*가장 최신 기준일자를 조건으로 검색*/ "
             +"SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1) "
         +"ORDER BY sin.diff_from_prevday ASC /*등락률 내림차순(하한가)*/";

        Query query = em.createNativeQuery(nativeQuery);
        List<Object[]> results = query.setMaxResults(5).getResultList();
        List<StockRanking> result = new ArrayList<>();

        for(int i=0;i<results.size();i++){
            StockRanking stockRanking = new StockRanking(i+1,(String) results.get(i)[0], (String) results.get(i)[1], (String) results.get(i)[2], (Date) results.get(i)[3], (Integer) results.get(i)[4], (Integer) results.get(i)[5],((Double) results.get(i)[6]).doubleValue(),((BigInteger)results.get(i)[7]).longValue());
            result.add(stockRanking);
        }

        return result;
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
//

        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range, sin.trading_volume  " +
                "FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name " +
                "FROM \"AGENTMASTER\".\"Stock\" AS inner_sto " +
                "INNER JOIN \"AGENTMASTER\".\"Field\" AS inner_fie " +
                "ON inner_sto.field_id = inner_fie.field_id) AS sto " +
                "INNER JOIN (SELECT inner_sin1.stock_id, inner_sin1.stock_date, inner_sin1.stock_price, diff_from_prevday, " +
                "stock_range, inner_sin1.trading_volume,(((CAST(inner_sin1.stock_price AS FLOAT)) / (CAST(inner_sin2.stock_price AS FLOAT)) * " +
                "100) - 100) AS dif " +
                "FROM (SELECT stock_id, stock_date, stock_price, diff_from_prevday, stock_range, start_price, " +
                "high_price, low_price, trading_volume, transaction_amount " +
                "FROM \"AGENTMASTER\".\"Stock_info\" " +
                "WHERE stock_date = (SELECT stock_date " +
                "FROM \"AGENTMASTER\".\"Stock_info\" " +
                "ORDER BY stock_date DESC " +
                "LIMIT 1)) AS inner_sin1 " +
                "INNER JOIN (SELECT stock_id, stock_date, stock_price " +
                "FROM \"AGENTMASTER\".\"Stock_info\" " +
                "WHERE stock_date = (SELECT stock_date " +
                "FROM \"AGENTMASTER\".\"Stock_info\" " +
                "ORDER BY stock_date DESC " +
                "LIMIT 1) - 1) AS inner_sin2 " +
                "ON inner_sin1.stock_id = inner_sin2.stock_id) AS sin " +
                "ON sto.stock_id = sin.stock_id " +
                "ORDER BY sin.dif DESC ";

        List<Object[]> query = em.createNativeQuery(nativeQuery).setMaxResults(5).getResultList();

        List<StockRanking> result = new ArrayList<>();
        int i = 1;
        for(Object[] results : query){
            StockRanking stockRanking = new StockRanking(i++,(String) results[0], (String) results[1], (String) results[2], (Date) results[3], (Integer) results[4], (Integer) results[5],((Double) results[6]).doubleValue(),((BigInteger) results[7]).longValue());
            result.add(stockRanking);
        }

        return result;

    }

    @Override
    public List<StockRanking> findStockByBottomRate() {
//        SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,
//               sin.stock_range
//          FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name
//                  FROM "AGENTMASTER"."Stock" AS inner_sto
//                           INNER JOIN "AGENTMASTER"."Field" AS inner_fie
//                           ON inner_sto.field_id = inner_fie.field_id) AS sto
//                   INNER JOIN (SELECT inner_sin1.stock_id, inner_sin1.stock_date, inner_sin1.stock_price, diff_from_prevday,
//                                      stock_range,
//                                      (((CAST(inner_sin1.stock_price AS FLOAT)) / (CAST(inner_sin2.stock_price AS FLOAT)) *
//                                        100) - 100) AS dif
//                                 FROM (SELECT stock_id, stock_date, stock_price, diff_from_prevday, stock_range, start_price,
//                                              high_price, low_price, trading_volume, transaction_amount
//                                         FROM "AGENTMASTER"."Stock_info"
//                                        WHERE stock_date = (SELECT stock_date
//                                                              FROM "AGENTMASTER"."Stock_info"
//                                                             ORDER BY stock_date DESC
//                                                             LIMIT 1)) AS inner_sin1
//                                          INNER JOIN (SELECT stock_id, stock_date, stock_price
//                                                        FROM "AGENTMASTER"."Stock_info"
//                                                       WHERE stock_date = (SELECT stock_date
//                                                                             FROM "AGENTMASTER"."Stock_info"
//                                                                            ORDER BY stock_date DESC
//                                                                            LIMIT 1) - 1) AS inner_sin2
//                                          ON inner_sin1.stock_id = inner_sin2.stock_id) AS sin
//                   ON sto.stock_id = sin.stock_id
//         ORDER BY sin.dif ASC
//         LIMIT 5;

        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range, sin.trading_volume  " +
                "FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name " +
                "FROM \"AGENTMASTER\".\"Stock\" AS inner_sto " +
                "INNER JOIN \"AGENTMASTER\".\"Field\" AS inner_fie " +
                "ON inner_sto.field_id = inner_fie.field_id) AS sto " +
                "INNER JOIN (SELECT inner_sin1.stock_id, inner_sin1.stock_date, inner_sin1.stock_price, diff_from_prevday, " +
                "stock_range, inner_sin1.trading_volume, (((CAST(inner_sin1.stock_price AS FLOAT)) / (CAST(inner_sin2.stock_price AS FLOAT)) * " +
                "100) - 100) AS dif " +
                "FROM (SELECT stock_id, stock_date, stock_price, diff_from_prevday, stock_range, start_price, " +
                "high_price, low_price, trading_volume, transaction_amount " +
                "FROM \"AGENTMASTER\".\"Stock_info\" " +
                "WHERE stock_date = (SELECT stock_date " +
                "FROM \"AGENTMASTER\".\"Stock_info\" " +
                "ORDER BY stock_date DESC " +
                "LIMIT 1)) AS inner_sin1 " +
                "INNER JOIN (SELECT stock_id, stock_date, stock_price " +
                "FROM \"AGENTMASTER\".\"Stock_info\" " +
                "WHERE stock_date = (SELECT stock_date " +
                "FROM \"AGENTMASTER\".\"Stock_info\" " +
                "ORDER BY stock_date DESC " +
                "LIMIT 1) - 1) AS inner_sin2 " +
                "ON inner_sin1.stock_id = inner_sin2.stock_id) AS sin " +
                "ON sto.stock_id = sin.stock_id " +
                "ORDER BY sin.dif ASC ";
        List<Object[]> query = em.createNativeQuery(nativeQuery).setMaxResults(5).getResultList();

        List<StockRanking> result = new ArrayList<>();
        int i =1;
        for(Object[] results : query){
            StockRanking stockRanking = new StockRanking(i++,(String) results[0], (String) results[1], (String) results[2], (Date) results[3], (Integer) results[4], (Integer) results[5],((Double) results[6]).doubleValue(),((BigInteger) results[7]).longValue());
            result.add(stockRanking);
        }
        return result;
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
        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday, "
                                + "sin.stock_range, sin.trading_volume  "
                            + "FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name "
                                + "FROM \"AGENTMASTER\".\"Stock\" AS inner_sto "
                                    + "INNER JOIN \"AGENTMASTER\".\"Field\" AS inner_fie "
                                    + "ON inner_sto.field_id = inner_fie.field_id) AS sto "
                                +"INNER JOIN \"AGENTMASTER\".\"Stock_info\" AS sin "
                                +"ON sto.stock_id = sin.stock_id "
                            + "WHERE sin.stock_date = (SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1) "
                            + "ORDER BY sin.trading_volume DESC ";

        Query query = em.createNativeQuery(nativeQuery);
        query.setMaxResults(5);

        List<Object[]> queryResult = query.getResultList();
        List<StockRanking> result = new ArrayList<>();
        int i = 1;
        for(Object[] results : queryResult){
            StockRanking stockRanking = new StockRanking(i++,(String) results[0], (String) results[1], (String) results[2], (Date) results[3], (Integer) results[4], (Integer) results[5],((Double) results[6]).doubleValue(),((BigInteger) results[7]).longValue());
            result.add(stockRanking);
        }
        return result;
    }

    @Override
    public List<KeyWordStock> findStockBySearch(String search) {
        String jpql = "SELECT s " +
                "FROM Stock s " +
                "WHERE s.stockName LIKE :search Or s.stockCode Like :search2";

        TypedQuery<Stock> query= em.createQuery(jpql,Stock.class);
        query.setParameter("search", search+"%");
        query.setParameter("search2",search+"%");

        List<Stock> queryResult = query.getResultList();

        List<KeyWordStock> result = new ArrayList<>();

        for(Stock stock : queryResult){
            result.add(new KeyWordStock(stock.getId(), stock.getStockCode(), stock.getStockName()));
        }
        return result;
    }

    @Override
    public List<ChartData> findStockByChartData(Stock stock) {


        String nativeQuery = "SELECT sto.stock_code, sto.stock_name, sto.field_name, sin.stock_date, sin.stock_price, sin.diff_from_prevday,"
                + " sin.stock_range"
                + " FROM (SELECT inner_sto.stock_id, inner_sto.stock_code, inner_sto.stock_name, inner_fie.field_name"
                + " FROM \"AGENTMASTER\".\"Stock\" AS inner_sto"
                + " INNER JOIN \"AGENTMASTER\".\"Field\" AS inner_fie"
                + " ON inner_sto.field_id = inner_fie.field_id) AS sto"
                + " INNER JOIN \"AGENTMASTER\".\"Stock_info\" AS sin"
                + " ON sto.stock_id = sin.stock_id"
                + " WHERE sto.stock_id = \'"+ stock.getId()+"\'"
                + " ORDER BY sin.stock_date DESC";

        Query query = em.createNativeQuery(nativeQuery);

        List<Object[]> queryResult = query.setMaxResults(7).getResultList();
        List<ChartData> result = new ArrayList<>();
        for(Object[] objects : queryResult){
            result.add(new ChartData((String)objects[0],(String)objects[1],(String)objects[2],(Date)objects[3],(Integer) objects[4],(Integer) objects[5],(Double)objects[6]));
        }

        return result;

    }

    @Override
    public List<StockBase> findStockByBase(Stock stock) {
        String nativeQuery = "SELECT sin.stock_date, sin.stock_price, sin.diff_from_prevday, sin.stock_range, sin.start_price, sin.high_price,"
                      + " sin.low_price, sin.trading_volume, sin.transaction_amount"
                    + " FROM \"AGENTMASTER\".\"Stock\" AS sto"
                            + " INNER JOIN \"AGENTMASTER\".\"Stock_info\" AS sin"
                            + " ON sto.stock_id = sin.stock_id"
                    + " WHERE sto.stock_id = \'"+stock.getId()+"\'"
                    + " ORDER BY sin.stock_date DESC";


        Query query = em.createNativeQuery(nativeQuery);


        List<Object[]> queryResult = query.setMaxResults(1).getResultList();

        List<StockBase> result = new ArrayList<>();

        for(Object[] results : queryResult){
            result.add(new StockBase((Date) results[0],(Integer)results[1], (Integer)results[2], ((Double)results[3]).doubleValue(),((Integer)results[4]),(Integer)results[5],(Integer) results[6],((BigInteger) results[7]).longValue(), ((BigInteger) results[8]).longValue()));
        }

        return result;
    }

    @Override
    public List<StockBase> findStockByMoreInfo(Stock stock) {
        String nativeQuery = "SELECT stock_date, stock_price, diff_from_prevday, stock_range, start_price, high_price, low_price, trading_volume," +
                "       transaction_amount" +
                "  FROM \"AGENTMASTER\".\"Stock_info\"" +
                " WHERE stock_date = (SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1)" +
                "   AND stock_id = \'"+stock.getId()+"\'";

        Query query = em.createNativeQuery(nativeQuery);

        List<Object[]> queryResult = query.getResultList();

        List<StockBase> result = new ArrayList<>();

        for(Object[] temp : queryResult){
            result.add(new StockBase((Date)temp[0],(Integer)temp[1], (Integer)temp[2], ((Double)temp[3]), (Integer)temp[4],(Integer)temp[5],(Integer)temp[6], ((BigInteger)temp[7]).longValue(),((BigInteger)temp[8]).longValue()));
        }

        return result;

    }

    @Override
    public List<StockBase> findStockBySimulChartData(Stock stock) {
        String nativeQuery = "SELECT stock_date, stock_price, diff_from_prevday, stock_range, start_price, high_price, low_price, trading_volume," +
                "       transaction_amount" +
                "  FROM \"AGENTMASTER\".\"Stock_info\"" +
                " WHERE stock_date > (SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1) - 7" +
                "   AND stock_id = \'"+stock.getId()+"\'";

        Query query = em.createNativeQuery(nativeQuery);

        List<Object[]> queryResult = query.getResultList();

        List<StockBase> result = new ArrayList<>();

        for(Object[] temp : queryResult){
            result.add(new StockBase((Date)temp[0],(Integer)temp[1], (Integer)temp[2], ((BigDecimal)temp[3]).doubleValue(), (Integer)temp[4],(Integer)temp[5],(Integer)temp[6], ((BigInteger)temp[7]).longValue(),((BigInteger)temp[8]).longValue()));
        }

        return result;
    }


    @Override
    public List<FluctuationStockInfo> findStockByFluctuation() {
        //  String nativeQuery = "SELECT result.stock_id, result.stock_name, result.stock_price, result.diff_from_prevday, result.stock_range " +
        //            "  FROM (SELECT sinfo.stock_id, sinfo.stock_date, stock.stock_name, sinfo.stock_price, sinfo.diff_from_prevday, " +
        //            "               sinfo.stock_range\n" +
        //            "          FROM \"AGENTMASTER\".\"Stock\" AS stock\n" +
        //            "                   JOIN \"AGENTMASTER\".\"Stock_info\" AS sinfo\n" +
        //            "                   ON stock.stock_id = sinfo.stock_id\n" +
        //            "         ORDER BY sinfo.stock_date DESC, sinfo.stock_range DESC\n" +
        //            "         LIMIT 4) AS result";
        String nativeQuery = "SELECT result.stock_code, result.stock_name, result.stock_price, result.diff_from_prevday, result.stock_range " +
                "FROM (SELECT stock.stock_code, sinfo.stock_date, stock.stock_name, sinfo.stock_price, sinfo.diff_from_prevday, " +
                "sinfo.stock_range " +
                "FROM \"AGENTMASTER\".\"Stock\" AS stock" +
                " JOIN \"AGENTMASTER\".\"Stock_info\" AS sinfo" +
                " ON stock.stock_id = sinfo.stock_id" +
                " ORDER BY sinfo.stock_date DESC, sinfo.stock_range DESC" +
                " LIMIT 4) AS result";

        Query query = em.createNativeQuery(nativeQuery);

        List<Object[]> queryResult = query.getResultList();

        List<FluctuationStockInfo> result = new ArrayList<>();

        for(Object[] results : queryResult){
            result.add(new FluctuationStockInfo((String) results[0],(String) results[1], (Integer) results[2], (Integer) results[3], (Double)results[4]));
        }

        return result;
    }

    @Override
    public List<StockSameField> findStockBySameField(Stock stock) {
//        SELECT sto.stock_name, sin.stock_price, sin.diff_from_prevday, sin.stock_range
//        FROM "AGENTMASTER"."Stock" AS sto
//                 INNER JOIN "AGENTMASTER"."Stock_info" AS sin
//                            ON sto.stock_id = sin.stock_id
//        WHERE field_id = (SELECT field_id FROM "AGENTMASTER"."Stock" WHERE stock_id = '{stock_id}')
//          AND sin.stock_date = (SELECT stock_date FROM "AGENTMASTER"."Stock_info" ORDER BY stock_date DESC LIMIT 1)
//        ORDER BY sin.trading_volume DESC
//        LIMIT 4;

        String nativeQuery = "SELECT sto.stock_name, sin.stock_price, sin.diff_from_prevday, sin.stock_range " +
                "FROM \"AGENTMASTER\".\"Stock\" AS sto " +
                "INNER JOIN \"AGENTMASTER\".\"Stock_info\" AS sin " +
                "ON sto.stock_id = sin.stock_id " +
                "WHERE field_id = (SELECT field_id FROM \"AGENTMASTER\".\"Stock\" WHERE stock_Name = \'"+stock.getStockName()+"\') " +
                "AND sin.stock_date = (SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1) " +
                "ORDER BY sin.trading_volume DESC " +
                "LIMIT 4";

        Query query = em.createNativeQuery(nativeQuery);
        List<Object[]> queryResult = query.getResultList();

        List<StockSameField> result = new ArrayList<>();

        for(Object[] results : queryResult){
            result.add(StockSameField.builder().stockName((String)results[0])
                    .stockPrice((Integer)results[1])
                    .stockDiff((Integer)results[2])
                    .stockRange(((Double) results[3]))
                    .build());
        }

        return result;
    }

    @Override
    public void insertStock(StockInfo stockInfo) {
        em.persist(stockInfo);
    }

    @Override
    public List<StockDto> findByStockId(Stock stock) {
        String nativeQuery = "SELECT stock.stock_name ,stock.stock_code, sinfo.stock_price, sinfo.high_price,sinfo.low_price,sinfo.trading_volume,sinfo.transaction_amount,sinfo.diff_from_prevday, " +
                "sinfo.stock_range " +
                "FROM \"AGENTMASTER\".\"Stock\" AS stock" +
                " JOIN \"AGENTMASTER\".\"Stock_info\" AS sinfo" +
                " ON stock.stock_id = sinfo.stock_id" +
                " Where stock.stock_id = "+stock.getId()+
                " ORDER BY sinfo.stock_date DESC";

        Query query = em.createNativeQuery(nativeQuery).setMaxResults(1);

        List<Object[]> queryResult = query.getResultList();

        List<StockDto> result = new ArrayList<>();

        for(Object[] results : queryResult){
            result.add(
                    StockDto.builder().stockCode((String)results[1])
                            .stockName((String)results[0])
                            .stockPrice(BigDecimal.valueOf(((Integer) results[2])))
                            .highPrice(BigDecimal.valueOf((Integer) results[3]))
                            .lowPrice(BigDecimal.valueOf((Integer) results[4]))
                            .tradingVolume(BigDecimal.valueOf(((BigInteger) results[5]).longValue()))
                            .transactionAmount(BigDecimal.valueOf(((BigInteger) results[6]).longValue()))
                            .diffFromPreday(BigDecimal.valueOf((Integer) results[7]))
                            .stockRange((BigDecimal) results[8])
                    .build());
        }

        return result;
    }
    @Override
    public List<StockDto> findAll() {
        String nativeQuery = "SELECT stock.stock_name ,stock.stock_code, sinfo.stock_price, sinfo.high_price,sinfo.low_price,sinfo.trading_volume,sinfo.transaction_amount,sinfo.diff_from_prevday, " +
                "sinfo.stock_range " +
                "FROM \"AGENTMASTER\".\"Stock\" AS stock" +
                " JOIN \"AGENTMASTER\".\"Stock_info\" AS sinfo" +
                " ON stock.stock_id = sinfo.stock_id" +
                " WHERE stock_date = (SELECT stock_date FROM \"AGENTMASTER\".\"Stock_info\" ORDER BY stock_date DESC LIMIT 1)";

        Query query = em.createNativeQuery(nativeQuery);

        List<Object[]> queryResult = query.getResultList();

        List<StockDto> result = new ArrayList<>();

        for(Object[] results : queryResult){
            result.add(
                    StockDto.builder().stockCode((String)results[1])
                            .stockName((String)results[0])
                            .stockPrice(BigDecimal.valueOf(((Integer) results[2])))
                            .highPrice(BigDecimal.valueOf((Integer) results[3]))
                            .lowPrice(BigDecimal.valueOf((Integer) results[4]))
                            .tradingVolume(BigDecimal.valueOf(((BigInteger) results[5]).longValue()))
                            .transactionAmount(BigDecimal.valueOf(((BigInteger) results[6]).longValue()))
                            .diffFromPreday(BigDecimal.valueOf((Integer) results[7]))
                            .stockRange((BigDecimal) results[8])
                            .build());
        }

        return result;
    }
}
