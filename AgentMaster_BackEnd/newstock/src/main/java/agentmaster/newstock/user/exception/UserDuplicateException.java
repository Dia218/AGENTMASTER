package agentmaster.newstock.user.exception;

public class UserDuplicateException extends IllegalArgumentException{
    public UserDuplicateException() {
        super("중복된 회원입니다.");
    }
}
