package agentmaster.newstock.simulation.exception;

public class NotSufficientBalanceException extends IllegalArgumentException{
    public NotSufficientBalanceException() {super("자산이 충분하지 않습니다.");}
}
