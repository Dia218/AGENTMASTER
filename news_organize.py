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
방역당국 “코로나 전환 시점 결정시 유행상황 고려”
코로나 '2급→4급 하향' 늦춰질까…"유행상황 고려해 결정"
'유퀴즈' 화제성 코로나19 이전과 이후로 갈린다
코로나에 데인 뒤… 美·佛 보건 안보 강화
폭염에도 독감에 코로나19까지 유행
경북지역 코로나19 급증세…경주시 선제 대응 나서
[제주소식] 코로나19 대응 간호직 공무원 읍·면·동에 재배치
백신 접종률 낮은데 변이까지… “코로나19 고령층 대책 시급”
"""
llm_request(keyword)
