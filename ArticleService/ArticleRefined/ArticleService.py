import json

import numpy as np
from eunjeon import Mecab

from ArticleBundle import ArticleBundle
from DatabaseHandler import DatabaseHandler
from FrequencySimilarity import FrequencySimilarity

"""

               ArticleArchiver
            /      |      |      \
        economics_article_bundles
                society_article_bundles
                        politics_article_bundles
                                international_article_bundles: 'list' of 'ArticleBundle'
                                    /       |       |      ... 
                                Article  Article   Article  ...
                                 
"""

class ArticleService:
    """
        ArticleArchiver
        - relate()
            : 입력으로 받은 기사의 연관 기사를 narticle 개만큼 찾아서 반환. 
                - search()
                    입력으로 받은 기사가 어느 ArticleBundle에 속해있는지 판단. 

            - DB를 사용하는 기능임!! 
    """
    def __init__(self, 
                 db_handler, 
                 model):
        """

        """

        self.model = model
        self.db_handler = db_handler
        self.tokenizer = Mecab()

    def relate(self, 
               target_id: int, 
               narticle: int = 5, 
               criteria: str = 'title'):
        """

        """
        if criteria not in ('title', 'body'):
            raise Exception(f'Invalid criteria. Parameter "criteria" does not allow {criteria}.')
        
        if narticle <= 0:
            raise Exception(f'Invalid nariticle. Parameter "narticle" must be larger than 0.')
        
        if target_id <= 0:
            raise Exception(f'Invalid target_id. Parameter "target_id" must be a positive integer.')
        
        target_article = self.db_handler.article_by_id(target_id)
        if not target_article:
            raise Exception(f'Non exsisting target_article.')
        
        target_words = self._nouns(target_article)
        
        base_articles = self.db_handler.articles_by_keywords(target_words)
        
        # 비교군이 필요보다 적으면 그냥 다 반환한다. 
        if len(base_articles) < narticle:
            return base_articles

        base_word = list()
        for base_article in base_articles:
            base_article_words = self._nouns(base_article)

            base_word.append(base_article_words)

        # 유사도 검사
        sim = FrequencySimilarity()
        sorted_bases = sim.calculate_frequency(target=target_words, base=base_word)[:narticle+1]
        
        return sorted_bases
    
    def _nouns(self, criteria: str, text: str) -> list:
        attr_index = {
            'title': 4,
            'body': 7
        }

        return [wt[0] for wt in self.tokenizer.pos(text[attr_index[criteria]]) if wt[1][0] == 'N']