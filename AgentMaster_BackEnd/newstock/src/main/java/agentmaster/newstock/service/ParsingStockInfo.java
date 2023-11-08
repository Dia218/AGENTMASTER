package agentmaster.newstock.service;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.domain.StockInfo;
import agentmaster.newstock.etc.Company;
import agentmaster.newstock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Stack;

@Component
@RequiredArgsConstructor
@Transactional
public class ParsingStockInfo {
    private final StockRepository stockRepository;

    public void parsing() throws IOException, ParseException {

        Company company = new Company();
        List<List<String>> companylist = company.getList();


        LocalDate today = LocalDate.now();
        today = today.minusDays(20);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String todayDate = today.format(formatter);


        String key = "%2BGrpFkDt3Nbz4S2PZZGEHeaikrVWMSdXnfPqMAq%2BdFMO8om8UJzTIYOpCoin1J3hpaTnIeEuJga%2FviZ6gjq3YQ%3D%3D";

        for (int i = 0; i < companylist.size(); i++) {
            String result = "";
            for(int j=0;j<companylist.get(i).size();j++) {
                    StringBuilder urlBuilder = new StringBuilder("https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=%2BGrpFkDt3Nbz4S2PZZGEHeaikrVWMSdXnfPqMAq%2BdFMO8om8UJzTIYOpCoin1J3hpaTnIeEuJga%2FviZ6gjq3YQ%3D%3D&numOfRows=10&pageNo=1&resultType=json&beginBasDt=");
                    urlBuilder.append(todayDate);
                    urlBuilder.append("&itmsNm=");
                    System.out.println("\n\n\n\n\n\n"+companylist.get(i).get(j)+"\n\n\n\n\n\n\n");

                    System.out.println("\n\n\n\n\n\n"+urlBuilder+"\n\n\n\n\n\n\n");
                    urlBuilder.append(URLEncoder.encode(companylist.get(i).get(j), "UTF-8"));

                URL url = new URL(urlBuilder.toString());

                BufferedReader bf;
                bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));

                result = bf.readLine();

                JSONParser parser = new JSONParser();
                Object obj = parser.parse(result);

                JSONObject jsonObj = (JSONObject) obj;

                JSONObject jsonObj2 = (JSONObject) jsonObj.get("response");

                JSONObject jsonObj3 = (JSONObject) jsonObj2.get("body");

                JSONObject jsonObj4 = (JSONObject) jsonObj3.get("items");

                JSONArray jsonArr = (JSONArray) jsonObj4.get("item");

                if (jsonArr.size() > 0) {
                    for (int h = 0; h < jsonArr.size(); h++) {
                        JSONObject jsonresult = (JSONObject) jsonArr.get(h);

                        String inputDateStr = (String) jsonresult.get("basDt");
                        LocalDate localDateTime = LocalDate.parse(inputDateStr, DateTimeFormatter.ofPattern("yyyyMMdd"));

                        String formattedDate = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                        LocalDate ouputDate = LocalDate.parse(formattedDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                        StockInfo stockInfo = new StockInfo();
                        Stock stock = new Stock();
                        System.out.println("\n\n\n\n\n\n\n\n"+jsonresult.get("itmsNm")+"\n\n\n\n\n");
                        stock.setStockCode((String) jsonresult.get("srtnCd"));
                        stockInfo.setStock((stockRepository.findIdByCode(stock)).get(0));
                        stockInfo.setStockDate(ouputDate);
                        stockInfo.setStockPrice(Integer.valueOf(jsonresult.get("clpr").toString()));
                        stockInfo.setStockRange(Double.parseDouble(jsonresult.get("fltRt").toString()));
                        stockInfo.setDiffFromPrevday(Integer.valueOf(jsonresult.get("vs").toString()));
                        stockInfo.setHighPrice(Integer.parseInt(jsonresult.get("hipr").toString()) );
                        stockInfo.setLowPrice(Integer.parseInt(jsonresult.get("lopr").toString()));
                        stockInfo.setTradingVolume(Long.parseLong(jsonresult.get("trqu").toString()));
                        stockInfo.setTransactionAmount(Long.parseLong(jsonresult.get("trPrc").toString()) );
                        stockInfo.setStartPrice(Integer.valueOf(jsonresult.get("mkp").toString()));
                        stockRepository.insertStock(stockInfo);
                    }
                }

            }
        }
    }
}
