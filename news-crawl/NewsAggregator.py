import ErrorHandler as errorHandler

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

    except requests.exceptions.RequestException:
        errorHandler.log()
        return None
    except AttributeError:
        errorHandler.log()
        return None

""" TEST ROUTINE """
articles = crawlNewsLinkAtNaverHeadlineNewsBySectionName("경제", 1)

for a in articles["headlines"]:
    crawlNewsStoryAtNewsArticle(a)
    print(a)