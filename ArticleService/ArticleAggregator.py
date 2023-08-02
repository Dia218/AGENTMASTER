"""
    WRITER: Kim Junwoo
    WRITTEN DATE: 2023.08.02
    NAME: NewsAggregatorService.py
"""

import math

from datetime import date, timedelta

import requests
from bs4 import BeautifulSoup

articleTemplate = {
    "title": None,
    "link": None,
    "body": None,
    "summary": None,
    "reporter": None,
    "first_pub": None,
    "last_pub": None,
    "company": None,
}

class ArticleAggregator:
    """
        ArticleAggregator
            A class aggregating articles from Naver news.
            Detailed news webpage is specified in function name. 

        Function dependency
            aggregate_section_general
            \-_parse_section_general
            \-_date

            aggregate_continouse_section_general

            aggregate_articles

        Example
            ArticleAggregator.aggregate_serction_general(nameSection = "세계", narticlesLB = 30)
                will crawl today's 40 news from section general "세계"

    """
    def __init__(self):
        self.codeSection = {
            "정치": 100,
            "경제": 101,
            "사회": 102,
            "세계": 104
        }

        self.codeSectionGeneral = {
            "정치": 269,
            "경제": 263,
            "사회": 257,
            "세계": 322
        }

        self.header = {
            "User-Agent" :
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/73.0.3683.103 Safari/537.36"
        }
        
        # The number of articles in section general web page. 
        self._section_general_narticles = 20

    def _date(self, dayOffset: int = 0) -> str:
        """
            _date()
                A function generates the desired date. 

            Parameters
                dayOffset(int)
                Offset changes the date by day from today.
                    example:
                        dayOffset = -1 means yesterday.
                        dayOffset = +2 means the day after tomorrow.             

            Returns.
                str
                String of the date of designated day in the format of yyyymmdd. 
        """
        dt = timedelta(
            days=dayOffset
        )
        return (date.today() + dt).strftime("%Y%m%d")

    def _parse_section_general(self, document: BeautifulSoup = None) -> list:
        """
            _parse_article_section_general
                A function creates article dictionary instances, and fills the title and link,
                collects them in a list. 

            parameters
                document(BeautifulSoup)
                    A BeautifulSoup instance from the web page of Naver news section general. 
            returns
                A list of dicts, dicts include a title and link to the article. 
        """
        articlesParsed = list()
        
        # When an invalid BeautifulSoup document has given. [v]
        if document == None: return articlesParsed

        """
        Element tree structure (2023.08.01):

        ul class="type06_headline"
        \- li
           \- dl
              \- dt
                 \- a href="(link to the article)" <~ varies acording to the type of the news(video news, non-video news, non-thumbnail news, ...). 
              \- dt
                 \- a href="(link to the article)" <~ always the same. 
                    \- content = (article title)
              \- dd
                 \- span class="writing"
                    \- content = (article press)
        \- li
        \- ...
        ul class="type06"
        \- li
        \- ...
        """
        
        try:
            # Parse data into a dictionary instance from BeautifulSoup instance. [v]
            nameContainer = ("type06_headline", "type06")

            for name in nameContainer:
                for dl in document.find("ul", class_=name).find_all("dl"):
                    templateArticle = {
                        "title": dl.find_all("dt")[-1].find("a").text.strip(),
                        "link": dl.find_all("dt")[-1].find("a")['href'].strip(),
                        "body": None,
                        "summary": None,
                        "reporter": None,
                        "first_pub": None,
                        "last_pub": None,
                        "company": dl.find("dd").find("span", class_="writing").text.strip(),
                    }

                    articlesParsed.append(templateArticle)
        # Wrong element tags
        except AttributeError:
            print("[ai] ArticleAggregator::_parse_section_general\n", 
                  "CONTEXT: Parsing article data from BeautifulSoup instance.\n",
                  "PROBLEM: Incompatable tag elements in the given BeautifulSoup instance.\n",
                  "SOULTION: Check request url or check HTML element structure. Must contact Admin.\n")
            return articlesParsed
        return articlesParsed

    def aggregate_section_general(self, nameSection: str = "정치", narticlesLB: int = 1, dayOffset: int = 0) -> dict:
        """
            aggregate_section_home
                A function aggregates articles, especially at section general -- 'XX 일반'. 

            parameters
                nameSection(str)

                narticlesLB(int)

                dayOffset(int)

            returns
        """
        articlesAggregated = list()
        
        # When an invalid narticlesLB has given:
        if narticlesLB <= 0: return dict()

        # When an invalid name of section has given. 
        if nameSection not in self.codeSection: return dict()

        # Aggregate each articles. [v]
        narticles = 0
        nround = math.ceil(narticlesLB / self._section_general_narticles)

        date = self._date(dayOffset)
        pageLast = nround

        for i in range(0, nround):
            # Generate a complete url to request. [v]
            linkBase = "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm" \
                    "&sid1=" + str(self.codeSection[nameSection]) + "" \
                    "&sid2=" + str(self.codeSectionGeneral[nameSection]) + "" \
                    "&date=" + self._date(dayOffset)
            page = i+1; linkpartPage = "&page=" + str(page)

            # Request a html document. [v]
            document = BeautifulSoup(requests.get(linkBase + linkpartPage, headers=self.header).text, "html.parser")

            # Gather aggregated articles. [v]
            additionalAggregatedArticles = self._parse_section_general(document)
            articlesAggregated.extend(additionalAggregatedArticles)
            narticles += len(additionalAggregatedArticles)

        fileArticles = {
            "date": str(date), 
            "section": nameSection, 
            "page": pageLast,
            "articles": articlesAggregated
        }

        return fileArticles

    def aggregate_continous_section_general(self, aggregated: dict = None, narticlesLB: int = 1) -> dict:
        """
            aggregate_continous_section_general
                A function aggregates article links continuosly from the last. 

            parameters
                aggregated(dict)

                narticlesLB(dict)
            
            returns

        """
        # When an none invalid  of section has given. 
        if aggregated == None: return dict()
        
        # When an invalid narticlesLB has given:
        if narticlesLB <= 0: return dict()

        try:
            lastDate = aggregated['date']
            lastPage = aggregated['page']
            nameSection = aggregated['section']

            # Aggregate each articles. [v]
            narticles = 0
            nround = math.ceil(narticlesLB / self._section_general_narticles)

            for i in range(0, nround):
                # Generate a complete url to request. [v]
                linkBase = "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm" \
                        "&sid1=" + str(self.codeSection[nameSection]) + "" \
                        "&sid2=" + str(self.codeSectionGeneral[nameSection]) + "" \
                        "&date=" + lastDate
                page = lastPage+i; linkpartPage = "&page=" + str(page)

                # Request a html document. [v]
                document = BeautifulSoup(requests.get(linkBase + linkpartPage, headers=self.header).text, "html.parser")

                # Gather aggregated articles. [v]
                additionalAggregatedArticles = self._parse_section_general(document)
                aggregated['articles'].extend(additionalAggregatedArticles)
                narticles += len(additionalAggregatedArticles)

            aggregated['page'] = lastPage + nround

        except KeyError:
            print("[ai] ArticleAggregator::aggregate_continous_section_general\n", 
                  "CONTEXT: Checking the attributes of an aggregated article.\n",
                  "PROBLEM: Invalid article dictionary instance format.\n",
                  "SOULTION: aggregate_continous_section_general must invoked with the dictionary instance returned by aggregate_section_general. Must contact Admin.\n")
            return aggregated
        
        return aggregated
           
    def aggregate_continous_article(self, aggregated: dict = None) -> dict:
        """
            aggregate_continous_article
                A function

            parameters

            
            returns

        """
        if aggregated == None: return dict()

        # Find the starting index of article link that has NOT aggregated its own contents. [v]
        iCtntless = 0
        for i, arti in enumerate(aggregated['articles']):
            if arti['body'] == None:
                iCtntless = i
                break        
        try:
            for article in aggregated['articles'][iCtntless:]:
                document = BeautifulSoup(requests.get(article['link'], headers=self.header).text, "html.parser")

                # Extract body [v]

                bodyText = document.find("div", id="dic_area")

                for t in bodyText.find_all():
                    t.decompose()
                
                article['body'] = bodyText.text.strip()

                # Extract reporter [v]
                nameReporter = ""
                
                reporter = document.find_all("em", class_="media_end_head_journalist_name")
                if len(reporter) > 0: nameReporter = ', '.join([r.text for r in reporter])

                article['reporter'] = nameReporter

                # Extract first_pub & last_pub [v]
                firstPubDate = document.find("div", class_="media_end_head_info_datestamp") \
                    .find("span", class_="media_end_head_info_datestamp_time _ARTICLE_DATE_TIME")
                lastPubDate = document.find("div", class_="media_end_head_info_datestamp") \
                .find("span", class_="media_end_head_info_datestamp_time _ARTICLE_MODIFY_DATE_TIME")
                
                article['first_pub'] = firstPubDate["data-date-time"]
                article['last_pub'] = firstPubDate["data-date-time"] if not lastPubDate else lastPubDate["data-modify-date-time"]
        except KeyError:
            print("[ai] ArticleAggregator::aggregate_articles\n", 
                  "CONTEXT: Checking the link of an aggregated article.\n",
                  "PROBLEM: Invalid article dictionary instance format.\n",
                  "SOULTION: aggregate_articles must invoked with the dictionary instance returned by aggregate_section_general. Must contact Admin.\n")
            return aggregated
            
        return aggregated

    def aggregate_articles(self, aggregated: dict = None) -> dict:
        """
            aggregate_articles
                A function

            parameters
                aggregated(dict)
                
            returns

        """
        if aggregated == None: return dict()

        try:
            for article in aggregated['articles']:
                document = BeautifulSoup(requests.get(article['link'], headers=self.header).text, "html.parser")

                # Extract body [v]
                bodyText = document.find("div", id="dic_area")

                for t in bodyText.find_all():
                    t.decompose()
                
                article['body'] = bodyText.text.strip()

                # Extract reporter [v]
                nameReporter = ""
                
                reporter = document.find_all("em", class_="media_end_head_journalist_name")
                if len(reporter) > 0: nameReporter = ', '.join([r.text for r in reporter])

                article['reporter'] = nameReporter

                # Extract first_pub & last_pub [v]
                firstPubDate = document.find("div", class_="media_end_head_info_datestamp") \
                    .find("span", class_="media_end_head_info_datestamp_time _ARTICLE_DATE_TIME")
                lastPubDate = document.find("div", class_="media_end_head_info_datestamp") \
                .find("span", class_="media_end_head_info_datestamp_time _ARTICLE_MODIFY_DATE_TIME")
                
                article['first_pub'] = firstPubDate["data-date-time"]
                article['last_pub'] = firstPubDate["data-date-time"] if not lastPubDate else lastPubDate["data-modify-date-time"]
        except KeyError:
            print("[ai] ArticleAggregator::aggregate_articles\n", 
                  "CONTEXT: Checking the link of an aggregated article.\n",
                  "PROBLEM: Invalid article dictionary instance format.\n",
                  "SOULTION: aggregate_articles must invoked with the dictionary instance returned by aggregate_section_general. Must contact Admin.\n")
            return aggregated
        
        return aggregated

    def serve(self, nameSection: str = "정치", narticlesLB: int = 1, dayOffset: int = 0) -> dict:
        linkAggregated = self.aggregate_section_general(
            nameSection=nameSection, 
            narticlesLB=narticlesLB, 
            dayOffset=dayOffset)
        return self.aggregate_articles(linkAggregated)


model = ArticleAggregator()

arts = model.aggregate_section_general()
arts = model.aggregate_articles(aggregated=arts)

arts = model.aggregate_continous_section_general(aggregated=arts)

model.aggregate_continous_article(arts)

for i, a in enumerate(arts['articles']):
    print(f'{i:2}: {a["title"]} \n { a["body"][:30] +"..." if a["body"] else "NONE"} \n', sep='')


