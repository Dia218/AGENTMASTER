import ErrorHandler as errorHandler
import json

import requests
from bs4 import BeautifulSoup

sectionCode = {
    "정치" : "100", 
    "경제" : "101",
    "사회" : "102",
    "세계" : "104"
}

class NewsCrawler:
    def __init__(self):
        self.reuqestHeader = {
            "User-Agent" :
            "Mozilla/5.0 (Macintosh; INtel Mac OS X 10_14_4) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/73.0.3683.103 Safari/537.36"
        }
        self.sectionCode = {
            "정치" : "100", 
            "경제" : "101",
            "사회" : "102",
            "세계" : "104"
        }
    
    def aggregate(
        self,
        dayOffset: int = 0, 
        sectionName: str = "경제", 
        narticleLowerBound: int = 1, 
    ) -> dict :
        """
            aggregate()
                A function crawls articles from Naver news web page.

            Parameters
                dayOffset(int)
                Offset changes the date by day from today.

                sectionName(str)
                A news category (section) which allows: "정치", "경제", "사회", "세계"

                narticleLowerBound(int)
                A number of articles that the crawler should cralw at least. 

            Returns

        """
        page = 1
        narticle = 0

        articlePage = {
            "section": self.sectionCode[sectionName],
            "date": self._date(dayOffset),
            "page": page,
            "narticle": None,
            "articles": list()
        }

        webpageUrl = "https://news.naver.com/main/list.naver?mode=LSD&mid=sec" \
                      "&sid1=" + str(self.sectionCode[sectionName]) + "" \
                      "&date=" + self._date(dayOffset) + "" \
                      "&page=" + str(page)
        
        webpage = BeautifulSoup(
            requests.get(webpageUrl, headers=self.requestHeader).text, 
            "html.parser"
        )
        narticle = 0

        webpageArticles = webpage \
        .find("div", class_="persist") \
        .find("ul", class_="sh_list") \
        .find_all("li", class_="sh_item _cluster_content")

        for eachA in webpageArticles:
            article = {
                "number": None,
                "title": None,
                "link": None,
                "company": None,
                "reporter": None,
                "category": None,
                "first_pub": None,
                "last_pub": None,
                "body": None
            }
            narticle += 1

            article["number"] = narticle
            article["title"] = eachA.find("div", class_="sh_text")
            article["link"] = eachA.find("a", class_="sh_text_headline nclicks(cls_eco.clsart)")['href'].strip()
            article["company"] = eachA.find("div", class_="sh_text_press").contents[0].strip()
            article["category"] = sectionName

            articlePage["articles"].append(article)

        return articlePage    

def crawlNewsLinkAtNaverBreakingNewsBySectionName(sectionName: str, nArticleLowerBound: int):
    breakingNewsPageUrl = "https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1="
    nArticles = 0
    parsedArticles = {
        "headlines" : list()
    }

    try:
        breakingNewsPageBySectionUrl = breakingNewsPageUrl + sectionCode[sectionName]

        # HTTP request to news page. 
        requestHeader = {
            "User-Agent" :
            "Mozilla/5.0 (Macintosh; INtel Mac OS X 10_14_4) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/73.0.3683.103 Safari/537.36"
        }
        response = requests.get(breakingNewsPageBySectionUrl, headers = requestHeader)
        
        # Parse reponse of HTML document into BeautifulSoup object.
        parsedResponse = BeautifulSoup(response.text, "html.parser")
        
        # Extract article title, news paper, link from the parsed document.
        articles = parsedResponse.find("ul", class_="type06_headline")
        for article in articles.find_all("dl"):
            nArticles += 1
            headlineContentTag = article.find("dt", class_=None).find("a")
            headlineCompanyTag = article.find("dd").find("span", class_="writing")
            headline = {
                "number" : nArticles, 
                "title" : (headlineContentTag.contents)[0].strip(),
                "link" : headlineContentTag['href'].strip(),
                "company" : (headlineCompanyTag.contents)[0].strip(),
                "category" : sectionName
            }

            parsedArticles["headlines"].append(headline)
    # Invalid sectionName
    except KeyError:
        errorHandler.log()
        return None
    # HTTP Request failed
    except requests.exceptions.RequestException:
        errorHandler.log()
        return None
    # Retrieving html tag from parsed object failed
    except AttributeError:
        errorHandler.log()
        return None

    return parsedArticles

def crawlNewsLinkAtNaverHeadlineNewsBySectionName(sectionName: str, nArticleLowerBound: int):
    headlineNewsPageUrl = "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1="
    nArticles = 0
    parsedArticles = {
        "headlines" : list()
    }

    try:
        breakingNewsPageBySectionUrl = headlineNewsPageUrl + sectionCode[sectionName]

        # HTTP request to news page. 
        requestHeader = {
            "User-Agent" :
            "Mozilla/5.0 (Macintosh; INtel Mac OS X 10_14_4) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/73.0.3683.103 Safari/537.36"
        }
        response = requests.get(breakingNewsPageBySectionUrl, headers = requestHeader)

        # Parse reponse of HTML document into BeautifulSoup object.
        parsedResponse = BeautifulSoup(response.text, "html.parser")

        # Extract article title, news paper, link from the parsed document.
        articleHeadlineTag = parsedResponse.find("div", class_="_persist").find("ul", class_="sh_list")
        for article in articleHeadlineTag.find_all("li", class_="sh_item _cluster_content"):
            nArticles += 1
            
            headlineTag = article.find("div", class_="sh_text")
            headlineContentTag = headlineTag.find("a", class_="sh_text_headline nclicks(cls_eco.clsart)")
            headlineCompanyTag = headlineTag.find("div", class_="sh_text_press")
            
            headline = {
                "number" : nArticles, 
                "title" : (headlineContentTag.contents)[0].strip(),
                "link" : headlineContentTag['href'].strip(),
                "company" : (headlineCompanyTag.contents)[0].strip(),
                "category": sectionName
            }

            parsedArticles["headlines"].append(headline)        
    # Invalid sectionName
    except KeyError:
        errorHandler.log()
        return None
    # HTTP Request failed
    except requests.exceptions.RequestException:
        errorHandler.log()
        return None
    # Retrieving html tag from parsed object failed
    except AttributeError:
        errorHandler.log()
        return None
    
    return parsedArticles

def crawlNewsStoryAtNewsArticle(newsDict: dict):
    newsArticlePageUrl = newsDict["link"]
    try:
        # HTTP request to news page. 
        requestHeader = {
            "User-Agent" :
            "Mozilla/5.0 (Macintosh; INtel Mac OS X 10_14_4) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/73.0.3683.103 Safari/537.36"
        }
        response = requests.get(newsArticlePageUrl, headers = requestHeader)

        # Parse reponse of HTML document into BeautifulSoup object.
        parsedResponse = BeautifulSoup(response.text, "html.parser")

        # Extract detailed information about the news article. 

            # news body
        newsArticleTag = parsedResponse.find("div", id="dic_area")

            # remove detritus from news body
        removingStrongTag = newsArticleTag.find_all("strong", class_="media_end_summary")
        removingSpanTag = newsArticleTag.find_all("span", class_="end_photo_org")
        removingDivTag = newsArticleTag.find_all("div")
        removingTableTag = newsArticleTag.find_all("table", class_="nbd_table") 

        removingDivPictureTag = newsArticleTag.find_all("div", class_="ab_photo photo_center")

            # 맨 처음에 요약문 목적의 <b>태그만 삭제하면 됨. 
        removingBoldTag = newsArticleTag.find("b")

            # 개행 제거
        removingBreakTag = newsArticleTag.find_all("br")

        if removingStrongTag: 
            for rm in removingStrongTag:
                rm.decompose()
        if removingSpanTag: 
            for rm in removingSpanTag:
                rm.decompose()
        if removingDivTag:
            for rm in removingDivTag:
                rm.decompose()
        if removingBoldTag:
            removingBoldTag.decompose()
        if removingBreakTag:
            for rm in removingBreakTag:
                rm.decompose()
        if removingTableTag:
            for rm in removingTableTag:
                rm.decompose()
        if removingDivPictureTag:
            for rm in removingDivPictureTag:
                rm.decompose()

        """
        replacingStrongTag = newsArticleTag.find_all("strong")
        for rp in replacingStrongTag:
            replacingBlock = rp.content
            if replacingBlock == "": continue
            rp.replace_with(replacingBlock)
        """
        replacingSpanCode = newsArticleTag.find_all("span")
        for rp in replacingSpanCode:
            print(type(rp))
            replacingBlock = rp.content

            rp.replace_with(replacingBlock)

        newsDict.setdefault("body", newsArticleTag.contents)

            # news reporter
        reporterTag = parsedResponse.find("div", class_="byline").find("span", class_="byline_s")
        newsDict.setdefault("reporter", reporterTag.contents)
        
            # news date
        dateTag = parsedResponse.find("div", class_="media_end_head_info_datestamp")
        firstDateTag = dateTag.find("span", class_="media_end_head_info_datestamp_time _ARTICLE_DATE_TIME")
        lastestDateTag = dateTag.find("span", class_="media_end_head_info_datestamp_time _ARTICLE_MODIFY_DATE_TIME")
        newsDict.setdefault("first_pub", firstDateTag["data-date-time"])
        if lastestDateTag == None: 
            newsDict.setdefault("last_pub", firstDateTag["data-date-time"])
        else: 
            newsDict.setdefault("last_pub", lastestDateTag["data-modify-date-time"])

        # clean up all the tags
        for t in newsArticleTag.find_all():
            t.decompose()

    except requests.exceptions.RequestException:
        errorHandler.log()
        return None
    except AttributeError:
        errorHandler.log()
        return None

def saveAsJson(articleDict: dict):
    with open("crawled_articles.json", "w", encoding="UTF-8") as file:
        json.dump(articleDict, file, indent=4, default=str, ensure_ascii=False)

def processNewsArticle(article: dict):
    # 기사 본문 앞에 [데일리안 = 이세미 기자] 같은 신문사와 기자 표지 삭제
    # 기사 본문 끝에 유규상 기자 같은 기자 표지 삭제
    # "MobileAdNew center" 이거 뭐임 아무튼 삭제
    # "article_split"
    # 기사에 포함된 "\n"를 삭제하거나 필요한 경우 변환
    # 기사 앞뒤에 포함된 이스케이프 문자 \n\t\t\t 등 삭제

    # (대구=뉴스1) 김종엽 기자 = 
    # "[서울=뉴시스]강주희 기자 = " 
    # [헤럴드경제=박자연 기자]
    # [데일리안 = 오수진 기자]
    # [이데일리 하지나 기자]
    # [파이낸셜뉴스]
    # "울산=하인식 기자 hais@hankyung.com"
    # "이재동 기자 (trigger@yna.co.kr)"
    
    # "SBS Biz 오서영입니다." [앵커] ~> 이건 아예 기사를 거르는게 맞겠다
    # "    mshan@yna.co.kr"
    # "[사진 출처 : 연합뉴스]"
    # "※ '당신의 제보가 뉴스가 됩니다'", "[카카오톡] YTN 검색해 채널 추가", "[전화] 02-398-8585", "[메일] social@ytn.co.kr\n\t\t"
    # #이건희 #예타
    # <span stockcode=\"\"> </span>
    
    body = article["body"]

    delList = list()
    
    # print("<", article["title"], ">", " ", article["link"], sep='')
    for i, token in enumerate(body):
        # print("'", token, "'", sep='')
        if token == "\n": delList.append(i)
        elif token == " ": delList.append(i)
        elif token == " article_split": delList.append(i)
        elif token == "article_split" : delList.append(i)
        elif token == " MobileAdNew center": delList.append(i)
        elif token == " r_start //": delList.append(i)
        elif token == " r_end //": delList.append(i)

    for d in [body[tk] for tk in delList]:
        body.remove(d)

    article["body"] = "".join(body)
    article["body"] = article["body"].strip()


""" TEST ROUTINE """
articles = crawlNewsLinkAtNaverHeadlineNewsBySectionName("경제", 1)

for i, a in enumerate(articles["headlines"]):
    crawlNewsStoryAtNewsArticle(a)

    processNewsArticle(a)

    if i == 3:
        print(f"The type of article: {type(a)}")
        print(a)

saveAsJson(articles)
