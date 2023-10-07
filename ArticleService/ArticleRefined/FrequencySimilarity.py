from itertools import chain
from math import log
 
import numpy as np

class FrequencySimilarity:

    def calculate_frequency(
            self, 
            target: list, 
            base: list) -> list:
        """
            target의 키워드와 base 안에 포함된 각 기사의 키워드를
            tf-idf 기반 코사인 유사도를 바탕으로
            base를 정렬하여 반환한다. 

            parameters: 
                target: 저것은 이것과 비슷함의 이것. 비교의 기준. 
                    str만 허용
                base: 이것과 비슷할수도 있고, 다를수도 있는 다른 모든 것.
                    str만 허용
            returns: 
                tf-idf 기반 코사인 유사도가 큰 순으롲 정렬된 base안의 원소를 리스트로 반환.  
        """
        
        # target은 빈 리스트여서는 안됨. 
        if not target:
            raise Exception(f'Parameter "targat" must not be an empty/none entity.')
        
        # base는 빈 리스트여서는 안됨. 
        if not base:
            raise Exception(f'Parameter "base" must not be an empty/none entity.')

        # target의 원소는 str 형만 있어야 함. 
        if lf := list(filter(lambda x: type(x) is not str, target)):
            raise Exception(f'Paramter "target" cannot have an element type of {type(lf[0])}.')

        # base의 원소는 빈 리스트여서는 안됨. 
        if list(filter(lambda x: not x, base)):
            raise Exception(f'Parameter "base" cannot include empty collections.')

        # base의 하위 리스트의 원소는 str 형만 있어야 함. 
        if (lf := list(filter(lambda x: type(x) is not str, chain(*base)))):
            raise Exception(f'Parameter "base" cannot have a element type of {type(lf[0])}.')
        
        sim_mat = self._similarity_matrix(target, base)
        
        # Sort by similarity
        data = sorted([(simm, base[isimm]) for isimm, simm in enumerate(sim_mat)], key=lambda x: x[0], reverse=True)
        return [d[1] for d in data]
        
    def _similarity_matrix(self, target, base) -> np.array:
        target_freq = self._word_matrix(target, base)[0, :]
        base_freq = self._freq_matrix(target, base)[1:, :]

        mat = np.zeros(shape=(len(base),), dtype=np.float32)

        for iarticle, article in enumerate(base):
            src = target_freq
            dest = base_freq[iarticle,]

            mat[iarticle] = self._cos_sim(src, dest)
    
        return mat
    
    def _word_matrix(self, target, base) -> np.array:
        r, c = self._matrix_dim(target, base)
        mat = np.zeros(shape=(r, c), dtype=np.int32)

        word_index = self._vocab_index(target, base)

        for iarticle, words in enumerate([target] + base):
            for word in words:
                mat[iarticle, word_index[word]] += 1

        return mat

    def _freq_matrix(self, target, base) -> np.array:
        r, c  = self._matrix_dim(target, base)
        mat = np.zeros(shape=(r, c), dtype=np.float32)

        vocab = self._vocab(target, base)
        word_matrix = self._word_matrix(target, base)
        word_index = self._vocab_index(target, base)

        for iarticle, article in enumerate([target] + base):
            for word in vocab:
                tf = word_matrix[iarticle, word_index[word]]
                idf = log(r / (1 + np.nonzero(word_matrix[:, word_index[word]])[0].shape[0]))
                mat[iarticle, word_index[word]] = tf * idf
        
        return mat
    
    def _cos_sim(self, a: np.array, b: np.array) -> float:
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    
    def _matrix_dim(self, target, base) -> tuple:
        group = [target] + base

        narticle = len(group)
        nword = len(self._vocab_index(target, base))

        return narticle, nword
        
    def _vocab_index(self, target, base) -> dict:
        return {w:iw for iw, w in enumerate(self._vocab(target, base))}
    
    def _vocab(self, target, base) -> list:
        group = [target] + base

        return sorted(list(set(chain(*group))))
"""
t = FrequencySimilarity()
d = t.calculate_frequency(['저는', '기차가', '좋아요'], [['먹고', '싶은', '사과'], ['먹고', '싶은', '바나나'], ['길고', '노란', '바나나', '바나나'], ['저는', '과일이', '좋아요']])

print(d)
"""