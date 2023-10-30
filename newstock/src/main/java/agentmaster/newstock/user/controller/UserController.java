package agentmaster.newstock.user.controller;

import agentmaster.newstock.dto.stockPage.mainPage.UserRanking;
import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.response.UserDto;
import agentmaster.newstock.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;

    @ApiOperation("모든 회원 정보 조회")
    @GetMapping("/front_not_implement")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDto> getUsers() {return userService.getUsers();}

    @ApiOperation("단일 회원 랭크 정보 조회")
    @GetMapping("/Ranking")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> getRank(@RequestParam("userName") String userName) {
        UserDto userDto = new UserDto();
        userDto.setName(userName);

        Map<String, Object> result = new HashMap<>();
        List<UserRanking> resultin = new ArrayList<>();

        resultin.add(userService.getUserByName(userDto));
        result.put("RankInfo", resultin);
        return result;
    }
}
