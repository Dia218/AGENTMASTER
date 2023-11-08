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
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;

    @ApiOperation("모든 회원 정보 조회")
    @GetMapping("/Ranking")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> getRanker() {

        //실제 배포시 동시성 이슈 문제로 인하여 ConcurrentHashMap<>()을 쓰는 것이 맞으나
        //현재는 단일 사용자만 있기에, 동시성보다 효율을 더 생각하여 HashMap()을 사용함
        Map<String, Object> result = new HashMap<>();

        List<UserDto> users = userService.getUsers();

        result.put("Ranking", users);
        return result;
    }

    @ApiOperation("단일 회원 랭크 정보 조회")
    @GetMapping("/RankInfo")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> getUserRank(@RequestParam("userName") String userName) {
        UserDto userDto = new UserDto();
        userDto.setName(userName);

        Map<String, Object> result = new HashMap<>();
        List<UserRanking> resultin = new ArrayList<>();

        resultin.add(userService.getRankByName(userDto));
        result.put("RankInfo", resultin);
        return result;
    }
}
