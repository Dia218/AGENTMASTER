"""
    WRITER: Kim Junwoo
    WRITTEN DATE: 2023.08.02
    NAME: NewsRelator.py
"""

import os
import json

import requests
import bardapi

class ArticleBucket:
    """
    """
    def __init__(self):
        ...
    ...

class ArticleRelator:
    """
        ArticleRelator
    """
    
    def _load_configuration(self, path: str = "") -> tuple:
        """
        
        """
        # If path is nonsense. 
        if path == "": return dict()

    def __init__(self):
        self.BARD_USAGE_CONFIGURATION_PATH = ""
        
        prompt, session_header, secures = self._load_configuration(self.BARD_USAGE_CONFIGURATION_PATH)

        self.prompt = prompt
        self.session_header = session_header
        self.secures = secures

        self.sementic_criteria = ["title", "body", "summary"]
        self.criteria_search_limit = [50, 15, 40]
        self.timeout_miliseconds = 30    

    def _find_existing_article_index(
            self, 
            article: dict = None, 
            aggregated: dict = None) -> int:
        """
            _find_existing_article_index
                A function
        """
        # if article or aggregated bunch of article is not exist.
        if not article: dict()
        if not aggregated: dict()
    
    def _session(self) -> requests.Session:
        """
            _session
                A function
        """

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

        response = bardapi.core.Bard(session=self._session(), timeout=self.timeout_miliseconds).get_answer(self.prompt)
        
        related_article_index = self._parse_related_articles(response)

        return [searching_articles[i] for i in related_article_index]
            
