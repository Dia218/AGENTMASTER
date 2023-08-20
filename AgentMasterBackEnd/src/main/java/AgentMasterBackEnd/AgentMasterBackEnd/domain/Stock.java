package AgentMasterBackEnd.AgentMasterBackEnd.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Stock {
    //종목 코드
    private String stockId;
    //종목명
    private String stockName;
    //기준일자
    private Date stockDate;
    //주식가
    private Integer stockPrice;
    //전일비
    private Integer diffFromPreday;
    //어제 대비 수익률
    private Double range;
    //금일 최고가
    private Integer highPrice;
    //금일 최저가
    private Integer lowPrice;
    //52주 최고가
    private Integer maxStockPrice;
    //52주 최소가
    private Integer minStockPrice;
}
