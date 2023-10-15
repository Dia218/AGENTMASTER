package agentmaster.newstock.user.request;

import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

    @NotEmpty
    @ApiParam(value = "아이디")
    private String name;

    @NotEmpty
    @ApiParam(value = "비밀번호")
    private String password;

    @NotEmpty
    @Email
    @ApiParam(value = "이메일")
    private String email;

    @NotNull
    @Min(value = 100000)
    @ApiParam(value = "보유 금액")
    private BigDecimal balance;

    private String botYn;
}
