"""

"""

import math
import json
from datetime import date, timedelta

import requests
from bs4 import BeautifulSoup 

from Article import Article
from Link import assemble_link

allowed_sections = ("정치", "경제", "사회", "세계")

section_to_code = {
    "정치": 100,
    "경제": 101,
    "사회": 102,
    "세계": 104
}

section_to_general_code = {
    "정치": 269,
    "경제": 263,
    "사회": 257,
    "세계": 322
}

header = {
            "User-Agent" :
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/73.0.3683.103 Safari/537.36"
}

N_ARTICLES_PER_PAGE = 20

class ArticleBundle:
    def __init__(
        self,
        section: str,
        day_offset: int = 0):
        """
            __init__
                Initialize ArticleBundle, contains crawled articles -- same date and same section
                section (of news) must be provided. 
        """
        if not section in allowed_sections: raise Exception("Invalid section")

        # 
        self.attributes = ("section", "date", "last_crawled_page")
        self.post_work_attributes = ("aggregated")

        self.section = section
        # Make a date string in the format of yyyyMMdd
        # Negative day_offset means days before today, 
        # Positive day_offset menas days after today.
        self.date = (date.today() + timedelta(days=day_offset)).strftime('%Y%m%d')
        
        self.last_crawled_page = 0
        self.aggregated = list() 

    def aggregate(self, narticleLB: int = 0) -> None:
        """
            aggregate
                Crawls article links

            parameters
                narticleLB 'int'
                    Specify how much article links should be crawled at least.
                    Because of the efficiency, the number of links crawled by this function is a multiple of variable N_ARTICLES_PER_PAGE.
                    Recommend to keep the N_ARTICLES_PER_AGE as a multiple of 20.
        """
        if narticleLB <= 0: raise Exception("")

        crawl_round = math.ceil(narticleLB / N_ARTICLES_PER_PAGE)
        
        for r in range(crawl_round):
            l = assemble_link(base= "https://news.naver.com/main/list.naver",
                              keys=["mode", "mid", "sid1", "sid2", "date", "page"],
                              values=["LS2D",
                                      "shm",
                                    str(section_to_code[self.section]), 
                                      str(section_to_general_code[self.section]), 
                                      self.date, 
                                      str(self.last_crawled_page + r)])
            print('total link', l)
            # Fetch html document containing article links. 
            document = BeautifulSoup(requests.get(l, headers=header).text, "html.parser")
            aggregated = self._parse_links(document)

            self.aggregated += aggregated

        self.last_crawled_page += r

    def _parse_links(self, document: BeautifulSoup) -> list:
        aggregated = list()

        # Fetch all available links
        for tags in ("type06_headline", "type06"):
            for content in document.find("ul", class_=tags).find_all("dl"):
                text = content.find_all("dt")[-1].find("a")['href'].strip()
                new = Article(link=text)

                aggregated.append(new)

        return aggregated
    
    def fetch_articles(self) -> None:
        """
            fetch_articles

        """
        start = self._find_non_filled_index()
        if start == -1: return

        for article in self.aggregated[start:]:
            article.fill_attributes()

    def _find_non_filled_index(self) -> int:
        for i, article in enumerate(self.aggregated):
            if not article.is_filled(): return i
        return -1
    
    def to_dict(self) -> dict:
        ret = dict()
        for attr in self.attributes:
            ret[attr] = getattr(self, attr)
        ret['aggregated'] = list()

        for article in self.aggregated:
            ret['aggregated'].append(article.to_dict())
        
        return ret
    
    def save_to_json(self) -> None:
        f_path = "./crawled_articles/"
        f_name = self.section + "_" + self.date + ".json"

        with open(f_path + f_name, "w", encoding="utf-8") as f:
            json.dump(self.to_dict(), f, indent = 4)