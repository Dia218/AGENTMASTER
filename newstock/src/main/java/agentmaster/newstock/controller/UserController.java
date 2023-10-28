package agentmaster.newstock.controller;

import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.repository.UserRepositoryCustom;
import agentmaster.newstock.user.request.SignupRequest;
import agentmaster.newstock.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/newsMain/login")
    @ResponseBody
    public Map<String, Object> loginRequest(@RequestParam("userId") String userId, @RequestParam("Password") String password){
        User inputUser = User.builder().name(userId).password(password).build();
        //코드를 채워주세요

        return null;
    }

    @GetMapping("/newsMain/join/doubleCheck")
    @ResponseBody
    public Map<String, Object> doubleCheckName(@RequestParam("userId") String userId){
        User inputUser = User.builder().name(userId).build();

        //코드를 채워주세요

        return null;
    }

    @GetMapping("/newsMain/join/checkJoin")
    @ResponseBody
    public Map<String, Object> joinRequest(@RequestParam("userId") String userId, @RequestParam("userPassword") String userPw, @RequestParam("userEmail") String eMail){
        User inputUser = User.builder().name(userId).password(userPw).email(eMail).build();

        SignupRequest signupRequest = new SignupRequest();
        
        //코드를 채워주세요
        
        return null;
    }

    //여기 위로 보냄


    //모의투자 순위 탑 10의 사람들을 반환하는 컨트롤러
    @GetMapping("/Ranking")
    @ResponseBody
    public Map<String, Object> rankerRequest(){
        
        //코드를 채워주세요
        
        return null;
    }

    //개인 유저의 랭크 정보를 반환하는 컨트롤러
    @GetMapping("/RankInfo")
    @ResponseBody
    public Map<String, Object> rankInfoRequest(@RequestParam("userName") String userName){
        User inputUser = User.builder().name(userName).build();

        //코드를 채워주세요

        return null;
    }


    //개인 유저의 계좌(보유자산 등) 정보를 반환하는 컨트롤러
    @GetMapping("/AccountInfo")
    @ResponseBody
    public Map<String, Object> accountInfoRequest(@RequestParam("userName") String userName){
        User inputUser = User.builder().name(userName).build();

        //코드를 채워주세요

        return null;
    }


    //개인 유저의 보유 주식 정보를 반환하는 컨트롤러
    @GetMapping("/getHoldingInfo")
    @ResponseBody
    public Map<String, Object> holdingInfoRequest(@RequestParam("userName") String userName){
        User inputUser = User.builder().name(userName).build();


        return null;
    }

    //사용자 계정 정보 업데이트
    //post('http://localhost:8080/updateUserInfo', { userName, password, email })
    @PostMapping("/updateUserInfo")
    @ResponseBody
    public Map<String, Object> updateUserInfoRequest(HttpServletRequest request){


        User inputUser = User.builder().name(request.getParameter("userName"))
                .password(request.getParameter("password"))
                .email(request.getParameter("email"))
                .build();

        return null;
    }


    //사용자 계좌 초기화
    @PostMapping("/resetAccount")
    @ResponseBody
    public Map<String, Object> resetAccountRequest(HttpServletRequest request){
        User inputUser = User.builder().name(request.getParameter("userName")).build();


        return null;

    }
}
