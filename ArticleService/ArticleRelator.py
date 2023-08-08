"""
    WRITER: Kim Junwoo
    WRITTEN DATE: 2023.08.08
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

InvalidFilePathException = ASE.ArticleServiceExcpetion(ASE.EceptionMessageForamt(
    context = "",
    problm = "",
    solution = ""
))



class ArticleRelator:
    """
        ArticleRelator
            A class finds related articles from old news.
    """

    def __init__(self):
        """
            __init__
                A function initializes ArticleRelator

            parameters
                None

            returns
                None
        """
        self.BARD_USAGE_CONFIGURATION_PATH = ""
        
        prompt, session_header, secure_key = self._load_configuration(self.BARD_USAGE_CONFIGURATION_PATH)
        self.prompt = prompt
        self.session_header = session_header
        self.secure_key = secure_key

        self.sementic_criteria = ["title", "body", "summary"]
        self.criteria_search_limit = {"title": 50, "body": 15, "summary": 40}
        self.timeout_miliseconds = 30
        self.session = self._session()    

    def _load_configuration(self, path: str = "") -> tuple:
        """
            _load_configuration
                A function

            parameters
                path('str')

            returns

        """
        # If path is nonsense.
        if path == "": raise ...

        try:
            configuration = None
            
            # Read a configuration file.
            with open(path, "r", encoding="UTF-8") as f:
                if not f: raise RelatorConfigurationFileIoException
                configuration = json.load(f)

            # Check format.
            if "key" not in configuration or "prompt" not in configuration:
                raise RelatorConfigurationFileFormatException
            
            # Retrieve informations. 
            secure_key =  configuration["key"]
            prompt = configuration["prompt"]
            header = configuration["header"]

            return prompt, header, secure_key
        except RelatorConfigurationFileIoException as e:
            print(e)
            return None
        except RelatorConfigurationFileFormatException as e:
            print (e)
            return None
    
    def _load_articles(self, path: str = "") -> tuple:
        """
            _load_articles
                A function loads articles from a json file.  
        """
        # If path is nonsense. 
        if path == "": raise InvalidFilePathException

        # Read the json file.
        newsBase = None
        try:
            with open(path, "r", encoding="UTF-8") as newsJson:
                newsBase = json.load(newsJson)
        except RelatorJsonIOException as e:
            print(e)
            return None
        
        return newsBase

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
            if article is ag: return i
        
        # Returns -1 if the article does not exist. 
        return -1
    
    def _session(self) -> requests.Session:
        """
            _session
                A function returns the session of Bard (unofficial) api

            parameters
                None

            returns
                'requests.Session' which the header and the api_key have set. 
        """

        session = requests.Session()
        session.headers = self.session_header
        os.environ['_BARD_API_KEY'] = self.secure_key

    def _parse_related_articles(self, response: str = "") -> list:
        """
            _parse_related_articles
                A function
        """
        # If response is nonsense. 
        if response == "": return list()

    def _exclude_same_articles(aggregated: dict = None) -> dict:
        """
            _exclude_same_articles

            parameters

            returns
        """


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
        searching_articles = self._exclude_same_articles(aggregated=aggregated)

        response = bardapi.core.Bard(
            session=self.session, 
            timeout=self.timeout_miliseconds).get_answer(self.prompt)
        
        related_article_index = self._parse_related_articles(response)
        
        return [searching_articles[i] for i in related_article_index]
            
