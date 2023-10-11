from db_main import ServicePreparer
import openai

class ArticleFlowFinder:
    def __init__(self, sp: ServicePreparer):
        self.dbhandler = sp
        openai.api_key = ""  # OpenAI API 키를 여기에 추가하세요.
    
    def llm_request(self, content):
        """
        LLM모델을 호출하고, 사용자가 보고자하는 이슈(키워드)의 기사에 대해서 정리해줍니다.

        Args:
            content (str): 이전 단계를(뉴스 요약) 거친 결과물 입니다.
                        뉴스 요약을 거친 후 요약된 결과를 토대로 기사를 정리합니다.
        """
        messages = []
        messages.append({"role":"user", "content":content + "위 뉴스들을 간략하게 정리해줘."})

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        chat_response = completion.choices[0].message.content
        return chat_response


    def find_and_organize_articles(self):
        # DB에서 키워드 조회
        keyword = self.dbhandler.issue_summary.issue_keyword()
        articles = self.dbhandler.find_article_body_with_issue_keywords(keyword)
        for article in articles:
            article_body, article_id = article
            print(f"기사 본문: {article_body}")

            # 키워드를 사용해서 반환된 기사 본문
            response = article_body
            summary_result = self.llm_request(response)

            # 최종 요약문을 DB에 추가 (add함수 수정 필요)
            self.dbhandler.add_article_summary(summary_result, article_id)

if __name__ == "__main__":
    # ServicePreparer 클래스 인스턴스 생성
    sp = ServicePreparer()
    
    # ArticleFlowFinder 클래스 인스턴스 생성
    aff = ArticleFlowFinder(sp)

    # 기사를 찾아 요약하는 함수 호출
    aff.find_and_organize_articles()