package agentmaster.newstock.user.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SigninRequest {

    @NotEmpty
    @Email
    private String name;
    @NotEmpty
    private String password;
}
