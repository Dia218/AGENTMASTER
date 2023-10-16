# 뉴스 정리 기능
import openai

openai.api_key = ""

def llm_request(content):
    """
    LLM모델을 호출하고, 사용자가 보고자하는 이슈(키워드)의 뉴스 순서에 대해서 정리해줍니다.

    Args:
        content (str): 이전 단계를(뉴스 요약) 거친 결과물 입니다.
                       뉴스 요약을 거친 후 요약된 결과를 토대로 뉴스 순서를 정리합니다.
    """
    messages = []
    messages.append({"role":"user", "content":content + "위 뉴스들을 간략하게 정리해줘."})

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    chat_response = completion.choices[0].message.content

    messages.append({"input_news":keyword, "body": chat_response})
    print(messages[1])



# 뉴스 title 모음
keyword = """
코로나19
"""
llm_request(keyword)