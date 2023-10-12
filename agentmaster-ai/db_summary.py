# 기사 요약 기능

from db_main import ServicePreparer
import openai

class ArticleFlowFinder:
    def __init__(self, sp: ServicePreparer):
        self.dbhandler = sp
        openai.api_key = ""

    def llm_request(self, content):
        """
        LLM모델을 호출하고, 사용자가 보고자하는 이슈(키워드)에 대해서 요약해줍니다.

        Args:
            content (str): 사용자가 보고자하는 이슈가 담긴 param입니다. (키워드)
        """
        messages = []
        messages.append({"role": "user", "content": content + "라는 이슈에 대해서 간략하게 요약해줘."})

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        chat_response = completion.choices[0].message.content
        return chat_response

    def find_and_summarize_articles(self):
        # DB에서 기사 본문 추출
        articles = self.dbhandler.articles_without_summary()
        for article in articles:
            article_id, article_body = article[0], article[1] 
            print(f"기사 본문: {article_body}")

            keyword = article_body
            summary_result = self.llm_request(keyword)

            # 최종 요약문을 DB에 추가
            self.dbhandler.add_article_summary(article_id, summary_result)

if __name__ == "__main__":
    # ServicePreparer 클래스 인스턴스 생성
    sp = ServicePreparer()
    
    # ArticleFlowFinder 클래스 인스턴스 생성
    aff = ArticleFlowFinder(sp)

    # 기사를 찾아 요약하는 함수 호출
    aff.find_and_summarize_articles()