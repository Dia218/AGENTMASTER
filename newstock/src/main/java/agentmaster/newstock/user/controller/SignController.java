package agentmaster.newstock.user.controller;

import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.request.SigninRequest;
import agentmaster.newstock.user.request.SignupRequest;
import agentmaster.newstock.user.response.SigninResponse;
import agentmaster.newstock.user.response.SignupResponse;
import agentmaster.newstock.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
//@RequestMapping("/newsMain")
public class SignController {
    private final UserService userService;

    @ApiOperation("회원가입")
    @GetMapping("/newsMain/join/checkJoin")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public SignupResponse signup(@RequestParam("userId") String userId, @RequestParam("userPassword") String userPassword, @RequestParam("userEmail") String userEmail){
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setName(userId);
        signupRequest.setPassword(userPassword);
        signupRequest.setEmail(userEmail);
        signupRequest.setBalance(BigDecimal.valueOf(100000));
        return userService.signup(signupRequest);
    }

    @ApiOperation("회원 로그인")
    @GetMapping("/newsMain/login")
    @ResponseBody
    public Map<String,Object> signin(@RequestParam("userId") String userId, @RequestParam("userPassword") String userPassword) {
        SigninRequest signinRequest = new SigninRequest();
        signinRequest.setName(userId);
        signinRequest.setPassword(userPassword);

        Map<String, Object> result = new HashMap<>();
        List<SigninResponse> resultin = new ArrayList<>();

        resultin.add(userService.signin(signinRequest));
        result.put("UserInfo", resultin);
        return result;
    }
}
