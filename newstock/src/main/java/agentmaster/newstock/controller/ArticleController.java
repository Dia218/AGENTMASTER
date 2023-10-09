package agentmaster.newstock.controller;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.domain.Field;
import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.dto.stockPage.mainPage.TodayArticle;
import agentmaster.newstock.service.ArticleService;
import agentmaster.newstock.service.ArticleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @ResponseBody
    @GetMapping("/test1")
    public Map<String, Object> test(){
        List<Field> A = articleService.provideField();
        Map<String, Object> result = new HashMap<>();
        result.put("search",A);
        result.put("test",1);
        return result;
    }
}
