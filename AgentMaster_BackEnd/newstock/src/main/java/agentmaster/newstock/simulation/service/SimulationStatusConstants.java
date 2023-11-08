package agentmaster.newstock.simulation.service;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SimulationStatusConstants {

    public static String ORDER_STATUS_WAIT = "wait"; //대기
    public static String ORDER_STATUS_CONCLUSION = "comnclusion"; //완료
    public static String ORDER_STATUS_CANCEL = "cancel"; //취소
    public static String TYPE_SELL = "sell"; //매도
    public static String TYPE_BUY = "buy"; //매수
}
