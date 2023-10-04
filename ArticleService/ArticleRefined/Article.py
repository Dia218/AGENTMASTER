"""
    Article.py

    written by 김준우
    written at 23.08.17
"""

import requests

from bs4 import BeautifulSoup

# Header for http request.
header = {
    "User-Agent" :
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/73.0.3683.103 Safari/537.36"
}

class Article:
    def __init__(
        self,
        link: str,
        title: str = None,
        company: str = None,
        body: str = None,
        summary: str = None,
        reporter: str = None,
        first_pub: str = None,
        last_pub: str = None
        ) -> None:
        """
            __init__
                Creates Article class.
                link (to the Naver article web page) must be provided. 
        """
        if not link: raise Exception()

        self.attributes = { "title": title, "link": link, "company": company, 
                                  "body":body, "summary": summary, "reporter": reporter, 
                                  "first_pub": first_pub, "last_pub": last_pub }
        self.essential_attributes = ["link"]
        self.post_work_attributes = ["summary"]
        
        # Create members
        for attr in self.attributes.keys():
            arg = self.attributes[attr]
            setattr(self, attr, arg)

    def fill_attributes(self) -> None:
        """
            fill_attributes
                Crawls additional informations from the given link to the article.

        """
        # Get names of attributes requires extra crawling works.
        working_attrs = [at for at in self.attributes.keys() if (not at in self.essential_attributes) and (not at in self.post_work_attributes)]

        # Fetch html document of an article.
        document = BeautifulSoup(requests.get(self.link, headers=header).text, "html.parser")

        for attr in working_attrs:
            working_func = getattr(self, "_parse_" + attr)
            setattr(self, attr, working_func(document))

    def _parse_title(self, document: BeautifulSoup) -> str:
        content = document.find("h2", id="title_area").find("span")

        text = content.text

        return text

    def _parse_body(self, document: BeautifulSoup) -> str: 
        content = document.find("article", id="dic_area")
        for tags in content.find_all() if content else []:
            tags.decompose()

        text = content.text.strip() if content else ""

        return text
    
    def _parse_reporter(self, document: BeautifulSoup) -> str:
        text = ""
    
        content = document.find_all("em", class_="media_end_head_journalist_name")
        if content: text = ', '.join([c.text for c in content])
         
        return text
    
    def _parse_company(self, document: BeautifulSoup) -> str: 
        content = document.find("span", class_="media_end_head_top_channel_layer_text").find("strong")
        text = content.text

        return text
    
    def _parse_first_pub(self, document: BeautifulSoup) -> str: 
        content = document.find("div", class_="media_end_head_info_datestamp") \
                    .find("span", class_="media_end_head_info_datestamp_time _ARTICLE_DATE_TIME")

        text = content['data-date-time']

        return text
    
    def _parse_last_pub(self, document: BeautifulSoup) -> str: 
        content = document.find("div", class_="media_end_head_info_datestamp") \
        .find("span", class_="media_end_head_info_datestamp_time _ARTICLE_MODIFY_DATE_TIME") 
        
        text = self._parse_first_pub(document) if not content.text else content['data-date-time']
        
        return text
    
    def set_summary(self, summ: str) -> None: return

    def to_dict(self) -> dict:
        ret = dict()
        for attr in self.attributes.keys():
            ret[attr] = getattr(self, attr)
        
        return ret
    
    def is_filled(self) -> bool:
        return not self.title or not self.first_pub or not self.company
    
