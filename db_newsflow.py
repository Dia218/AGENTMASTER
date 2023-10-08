from db_main import ServicePreparer
import openai

class ArticleFlowFinder:
    def __init__(self, sp: ServicePreparer):
        self.dbhandler = sp
        openai.api_key = ""  # OpenAI API 키를 여기에 추가하세요.
    
    def llm_request(content):
        print("=== DATA UPDATE ===")
        """
        LLM모델을 호출하고, 사용자가 보고자하는 이슈(키워드)의 뉴스 순서에 대해서 정리해줍니다.
        Args:
            content (str): 이전 단계를(뉴스 요약) 거친 결과물 입니다.
                        뉴스 요약을 거친 후 요약된 결과를 토대로 뉴스 순서를 정리합니다.
        """
        messages = []
        messages.append(
            {"role": "user", "content": content + "사건 흐름 중 뉴스 순서좀 년도에 맞게 총 3개로 나눠서 알려줘."}
        )

        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)

        chat_response = completion.choices[0].message.content
        messages.append({"role": "assistant", "content": chat_response})

        # 분리된 뉴스 정리
        news_parts = chat_response.split("\n\n")

        news_dict = {
            "1번": {"body": news_parts[0]},
            "2번": {"body": news_parts[1]},
            "3번": {"body": news_parts[2]},
        }

        # 소개 부분 삭제 및 내용이 없는 경우 제거
        for key, value in news_dict.items():
            value["body"] = "\n".join(
                [line for line in value["body"].split("\n")[1:] if line.strip()]
            )

        formatted_results = []

        # 결과물 포맷 만들기
        current_number = 1  # 카운트 변수 초기화
        for key, value in news_dict.items():
            if value["body"]:  # 내용이 있는 경우에만 포맷 만들기
                formatted_results.append(
                    {"role": "user", "content": f"{current_number}번: "}
                )
                formatted_results.append({"input_news": content, "body": value["body"]})
                current_number += 1  # 카운트 변수 증가

        print("=== FORMATTED RESULTS ===")
        for result in formatted_results:
            print(result)

        # 딕셔너리를 텍스트 파일에 저장 (파일명 동적으로 변경)
        with open(
            f"/Users/seojun/vscode/agentmaster/data/issue_{content}.txt", "w"
        ) as file:
            for result in formatted_results:
                file.write(str(result) + "\n")

        print("=== DATA SUCCESSFUL ===")


    def find_and_newsflow_articles(self):
        # DB에서 키워드 조회
        keyword = self.dbhandler.issue_summary.issue_keyword()
        self.llm_request(keyword)

if __name__ == "__main__":
    # ServicePreparer 클래스 인스턴스 생성
    sp = ServicePreparer()
    
    # ArticleFlowFinder 클래스 인스턴스 생성
    aff = ArticleFlowFinder(sp)

    # 기사를 찾아 요약하는 함수 호출
    aff.find_and_newsflow_articles()