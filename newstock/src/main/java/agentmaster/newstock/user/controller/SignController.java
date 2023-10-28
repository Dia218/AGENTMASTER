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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/newsMain")
public class SignController {
    private final UserService userService;

    @ApiOperation("회원가입")
    @GetMapping("/join/checkJoin")
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
    @GetMapping("/login")
    @ResponseBody
    public User signin(@RequestParam("userId") String userId, @RequestParam("userPassword") String userPassword) {
        SigninRequest signinRequest = new SigninRequest();
        signinRequest.setName(userId);
        signinRequest.setPassword(userPassword);
        return userService.signin(signinRequest);
    }
}
