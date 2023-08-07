"""
    WRITER: Kim Junwoo
    WRITTEN DATE: 2023.08.02
    NAME: NewsRelator.py
"""

import os
import json

import requests
import bardapi

import ArticleServiceException as ASE

RelatorJsonIOException = ASE.ArticleServiceException(ASE.ExceptionMessageFormat(
    context = "ArticleRelator._load_articles() has read the json file. ",
    problem = "General file IO Exception. ",
    solution = "Check the path of article file or if it exists. "
))

RelatorConfigurationFileIoException = ASE.ArticleServiceException(ASE.ExceptionMessageFormat(
    context = "ArticleRelator._load_configuration() has invoked. ",
    problem = "General file IO Exception. ",
    solution = "Check the path of configuration file or if it exists. "
))

RelatorConfigurationFileFormatException = ASE.ArticleServiceException(ASE.ExceptionMessageFormat(
    context = "ArticleRelator._load_configuration() has invoked. ",
    problem = "Relator Configuration file does not have a valid format. ",
    solution = "Check the format of configuration file. "
))

class ArticleRelator:
    """
        ArticleRelator
            A class
    """

    def _load_configuration(self, path: str = "") -> None:
        """
            _load_configuration
                A function
        """
        # If path is nonsense.
        if path == "": raise ...

        # Read a configuration file.
        configuration = None
        try:
            with open(path, "r", encoding="UTF-8") as f:
                if not f: raise RelatorConfigurationFileIoException
                cofiguration = json.load(f)

            # Check format.
            if "key" not in configuration or "prompt" not in configuration:
                raise RelatorConfigurationFileFormatException
            self.bard_api_key = configuration["key"]
            self.prompt = configuration["prompt"]
        except RelatorConfigurationFileIoException as e:
            print(e)
            return
        except RelatorConfigurationFileFormatException as e:
            print (e)
            return
            
        # Assign each configuration variables.
        self.bard_api_key = configuration["key"]
        self.prompt = configuration["prompt"]
    
    def _load_articles(self, path: str = "") -> tuple:
        """
            _load_configuration
                A function
        """
        # If path is nonsense. 
        if path == "": return dict()

        # Read the json file.
        try:
            newsBase = None
            with open(path, "r", encoding="UTF-8") as newsJson:
                newsBase = json.load(newsJson)
            return newsBase
        except RelatorJsonIOException as e:
            print(e)
            return None

    def __init__(self):
        """

        """
        self.BARD_USAGE_CONFIGURATION_PATH = ""
        
        prompt, session_header, secures = self._load_configuration(self.BARD_USAGE_CONFIGURATION_PATH)

        self.prompt = prompt
        self.session_header = session_header
        self.secures = secures

        self.sementic_criteria = ["title", "body", "summary"]
        self.criteria_search_limit = [50, 15, 40]
        self.timeout_miliseconds = 30
        self.session = self._session()

        self.bard_api_key = None
        self.prompt = str() 

    def _find_existing_article_index(
            self, 
            article: dict = None, 
            aggregated: dict = None) -> int:
        """
            _find_existing_article_index
                A function

            parameter
                article

                aggregated

            returns
                An index of existing article. -1 if the article does not exist in aggregated. 
        """
        # if article or aggregated bunch of article is not exist.
        if not article: dict()
        if not aggregated: dict()

        for i, ag in enumerate(aggregated):
            if article is ag:
                return i
        
        # Returns -1 if the article does not exist. 
        return -1
    
    def _session(self) -> requests.Session:
        """
            _session
                A function returns the session of Bard (unofficial) api
        """

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

        os.environ['_BARD_API_KEY'] = self.bard_api_key

    def _parse_related_articles(self, response: str = "") -> list:
        """
            _parse_related_articles
                A function
        """
        # If response is nonsense. 
        if response == "": return list()

    def relate_articles(
            self, 
            article: dict = None, 
            aggregated: dict = None, 
            criteria: str = "title", 
            nrelated: int = 5) -> list:
        """
        relate_article
            A function finds 
        """
        # if article or aggregated bunch of article is not exist.
        if not article: list()
        if not aggregated: list()
        
        # The other criteria for determining sementic association is a nonsense. 
        if criteria not in self.sementic_criteria: return list()

        # The number of related article is nonsense.
        if nrelated <= 0: list()

        # Same article Should not be recommended.
        searching_articles = None
        i_exist = self._find_existing_article_index(article, aggregated)
        if i_exist != -1: 
            searching_articles = aggregated[:i_exist] + aggregated[i_exist+1:]
        searching_articles = searching_articles[:self.criteria_search_limit[criteria]]

        response = bardapi.core.Bard(
            session=self.session, 
            timeout=self.timeout_miliseconds).get_answer(self.prompt)
        
        related_article_index = self._parse_related_articles(response)

        return [searching_articles[i] for i in related_article_index]
            
