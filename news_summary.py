# 뉴스 요약 기능 -> 뉴스 순서
import openai

openai_key = ""

def llm_request(content):
    """
    LLM모델을 호출하고, 사용자가 보고자하는 이슈(키워드)에 대해서 요약해줍니다.

    Args:
        content (str): 사용자가 보고자하는 이슈가 담긴 param입니다. (키워드)
    """
    messages = []
    messages.append({"role":"user", "content":content, "라는 이슈에 대해서 간략하게 요약해줘."})

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    chat_response = completion.choices[0].message.content
    print(f'ChatGPT: {chat_response}')
    messages.append({"role":"assistant", "content": chat_response})
        
keyword = '코로나19'
llm_request(keyword)