import os
import json

import bardapi
import requests

def readNewsFromFile(path: str = None):
    try:
        newsBase = None
        with open(path, "r", encoding="UTF-8") as newsJson:
            newsBase = json.load(newsJson)
        return newsBase
    except IOError as e:
        print(e)
        return None

global PATH_NEWS_JSON
PATH_NEWS_JSON = "./crawled_articles.json"

global NEWS_RELATE_LIMIT
NEWS_RELATE_LIMIT = 20

def relateNewsByGivenNews(givenNewsOid: int, nOutput: int = 3): 
    global PATH_NEWS_JSON

    readNews = readNewsFromFile(PATH_NEWS_JSON)

    targetArticle = readNews["headlines"][givenNewsOid-1]
    targetArticle["body"] = targetArticle["body"].replace("\xa0", " ")
    articles = readNews["headlines"]

    prompt = str()

    for i, news in enumerate(articles): 
        if i >= NEWS_RELATE_LIMIT: break
        if news["title"] == targetArticle["title"]: continue
        prompt += str(i+1) + "." + news["title"] + "\n"

    prompt += targetArticle["title"] + "\"" + "와 연관있는 헤드라인 번호는 몇 번인가? "

    print(prompt)

    os.environ['_BARD_API_KEY'] = "YggKK_zLieM82mRkMkLt1T0Bz9IHYt00qWBG-Hv4PJHrmwXBR84ilHjP2_z0gFDMheHzzA."

    response = bardapi.core.Bard().get_answer(prompt)

    for i, choice in enumerate(response["choices"]):
        print(f"Choise {i+1}: \n", choice["content"][0], "\n")
        

global BARD_API_KEY
BARD_API_KEY = "YggKK_zLieM82mRkMkLt1T0Bz9IHYt00qWBG-Hv4PJHrmwXBR84ilHjP2_z0gFDMheHzzA."

def relate(originArticle: int = 1, criteria: str = "title", narticle: int = 3) -> list():
    """
        relate()
        Pick serveral related articles to the given article from crawled articles. 

        parameter:
            originArticle (int): What is the oid number of the article which you have given? 
            criteria (str): Which standard should be used when determining an association between the articles?
                            Provides; headline, body, summary. 
            narticle (int): How many articles that have an association with the given article should be picked?
    """
    global BARD_API_KEY

    # The other criteria for determining sementic association is a nonsense. 
    if criteria not in ["title", "body", "summary"]: return []

    os.environ['_BARD_API_KEY'] = BARD_API_KEY

    session = requests.Session()
    session.headers = {
        "host": "bard.google.com",
        "X-Same-Domain": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) " \
                      "AppleWebKit/537.36 (KHTML, like Gecko) " \
                      "Chrome/73.0.3683.103 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Origin": "https://bard.google.com",
        "Referer": "https://bard.google.com/",
    }
    session.cookies.set("__Secure-1PSID", BARD_API_KEY)

    baseArticles = readNewsFromFile(PATH_NEWS_JSON)

    origin = baseArticles["headlines"][originArticle - 1]
    if "\xa0" in origin["body"]: origin["body"] = origin["body"].replace("\xa0", " ")
    bases = baseArticles["headlines"]

    prompt = str()

    for i, news in enumerate(bases):
        if i >= NEWS_RELATE_LIMIT: break
        if news[criteria] == origin[criteria]: continue
        prompt += str(i+1) + "." + news[criteria] + "\n"

    prompt += origin[criteria] + "\"" + f"의 주제와 관련된 기사 번호를 최대 {narticle} 개 선택. " \
        "기사 번호는 파이썬 리스트로 반환. "
    
    print(prompt)

    response = bardapi.core.Bard(session=session, timeout=30).get_answer(prompt)

    for i, choice in enumerate(response["choices"]):
            print(f"Choise {i+1}: \n", choice["content"][0], "\n")

relate(7)
