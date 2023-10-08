from konlpy.tag import Okt

class ArticleWordsRelator:
    """
        ArticleWordsRelator
            A class 

    """

    def __init__(self):
        """
            
        """
        self.okt = Okt()
        self._load_stop_words()

    def _load_stop_words(self, sw_path: str = "stop_words_list.txt"):
        """
            _load_stop_words
                A function retrieves stop words from local storage. 

            parameter
                sw_path
                    local storage path where the stop words text file is saved. 
        """
        with open(sw_path, "r", encoding="utf=8") as f:
            raw = f.read()
            self.stop_words = set(raw.split(", "))

    def _compute_words_share(self, fr: list, to: list) -> float:
        """
            _is_similar
                A function
        """
        nwords_intersection = len(set(fr).intersection(set(to)))
        nwords_union = len(set(fr).union(len(to)))

        return nwords_intersection / nwords_union

    def relate(
        self, 
        froms: dict, 
        to: dict,
        criteria: str = "title",
        narticle: int = 5) -> dict:
        """
            relate
                A function finds semantically similar articles from 'froms' articles to a 'to' article.  

            parameters
                froms 'dict'

                tos 'dict'

                criteria 'str'
                    
            returns
        """

        if not type(to) == str: raise TypeError()
        if not type(froms) == str: raise TypeError()
    
        if not criteria in ("title", "body", "summary"): raise Exception("Invalid")
        
        words_share = list()

        # Find simliar articles by same words. 
        to_keywords = self.okt.phrase(to)

        for i, a in enumerate(froms['articles']):
            from_keywords = self.okt.phrase(a)

            words_share.append((i, self._compute_words_share(from_keywords, to_keywords)))
        
        sorted_words_share = sorted(words_share, key=lambda x: x[1])

        return sorted_words_share[:narticle]
        

        
        
        

        

