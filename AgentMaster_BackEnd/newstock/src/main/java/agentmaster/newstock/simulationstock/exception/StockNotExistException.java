package agentmaster.newstock.simulationstock.exception;

public class StockNotExistException extends IllegalArgumentException{
    public StockNotExistException() {super("주식을 보유하지 않고 있습니다.");}
}
