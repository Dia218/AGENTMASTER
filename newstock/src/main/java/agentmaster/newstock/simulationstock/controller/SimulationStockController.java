package agentmaster.newstock.simulationstock.controller;

import agentmaster.newstock.simulationstock.response.Holdings;
import agentmaster.newstock.simulationstock.service.SimulationStockService;
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
public class SimulationStockController {
    private final UserService userService;
    private final SimulationStockService simulationStockService;

    @ApiOperation("회원 계좌 정보 조회")
    @GetMapping("/AccountInfo")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> getUserAccount(@RequestParam("userName") String userName) {

        User user = userService.getUser(userName);

        Map<String, Object> result = new HashMap<>();
        List<Holdings> resultin = new ArrayList<>();

        resultin.add(simulationStockService.getSimulationStocks(user));
        result.put("AccountInfo", resultin);
        return result;
    }

    @ApiOperation("회원 보유 주식 정보 조회")
    @GetMapping("/getHoldingInfo")
    public Map<String, Object> holdingStockInfo(@RequestParam("userName") String userName) {
        User user = userService.getUser(userName);

        Map<String, Object> result = new HashMap<>();
        List<Holdings> resultin = new ArrayList<>();

        resultin.add(simulationStockService.getSimulationStocks(user));
        result.put("AccountInfo", resultin);
        return result;
    }
}
