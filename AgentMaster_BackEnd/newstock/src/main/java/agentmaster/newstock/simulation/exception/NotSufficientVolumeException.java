package agentmaster.newstock.simulation.exception;

public class NotSufficientVolumeException extends IllegalArgumentException{
    public NotSufficientVolumeException() {super("보유 주식이 부족합니다.");}
}
