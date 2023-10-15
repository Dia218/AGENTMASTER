package agentmaster.newstock.user.response;

import agentmaster.newstock.ranking.dto.RankingDto;
import agentmaster.newstock.user.entitiy.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String name;
    private String password;
    private BigDecimal balance;
    private String role;
    private List<RankingDto> ranking;

    public UserDto(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.password = user.getPassword();
        this.balance = user.getBalance();
        this.role = user.getRole();
        this.ranking = List.of(new RankingDto(user.getRanking()));
    }
}
