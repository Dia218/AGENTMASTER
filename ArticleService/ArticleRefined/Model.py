import json
from itertools import chain

import openai

class ChatGPT:
    def __init__(self):
        self.config_key = ('service_name', 'website', 'api_key')

        self.load_model_config()

        openai.api_key = self.api_key
        
    def load_model_config(self, path='chatgpt.json'):
        with open(path, mode='r', encoding='utf-8') as conf:
            config = json.load(conf)

            for key in self.config_key:
                try:
                    file_value = config[key]
                    setattr(self, key, file_value)
                except KeyError:
                    continue

    def ask(self,
               message_log: list,
               what: str,
               model = 'gpt-3.5-turbo',
               creativity: float = 0.0) -> str:
        
        # messgae_log는 list여야 함. 
        if type(message_log) is not list:
            raise Exception('Parameter "message_log" must be a list.')
        
        # message_log에는 dict 형만 포함해야 함. 
        if lf := list(filter(lambda x: type(x) is not dict, message_log)):
            raise Exception(f'Parameter "message_log" must not include {type(lf[0])}. And must include only "dict".')
        
        # message_log의 dict는 role 혹은 origin만 있어야 함. 
        if list(filter(lambda k: k != 'role' and k != 'content', aa := list(chain(*[list(m.keys()) for m in message_log])))):
            raise Exception(f'Parameter "message_log" and its element dict must only have a key of "role" or "content".')
        
        # role은 system, user, assistant 셋 중 하나여야 함. 
        if list(filter(lambda x: x['role'] not in ('system', 'user', 'assistant'), message_log)):
            raise Exception(f'Parameter "message_log" and its element dict must be only "system", "user", or "assistant".')
        
        # role은 system* user-assitant가 번갈아 나타나야함. 
        role = [x[1] for x in list(chain(*[list(m.items())[::2] for m in message_log]))]       
        crit = 0 if 'system' not in role else 1
        change = lambda i: 'user' if (i % 2 == 0) else 'assistant'
        if list(filter(lambda e: change(e[0]) != e[1], enumerate(role[crit:]))):
            raise Exception(f'Parameter "message_log" and its element dict\'s key "role" must be user-assitant pair.')
        
        # message_log의 딕트 안의 모든 키와 밸류는 str이여야 함.
        if list(filter(lambda e: (type(e[0]) is not str) or (type(e[1]) is not str), list(chain(*[list(m.items()) for m in message_log])) )):
            raise Exception(f'Parameter "message_log" and its elements dict\'s key and value must be a str.')

        if type(what) is not str:
            raise Exception(f'Parameter "what" must be a str. {type(what)} is not allowed.')
        
        # Constraint
        creativity = self._creativity_constraint(creativity)

        prompt_messages = message_log[:]
        prompt_messages.append({'role': 'user', 'content': what})

        responses = openai.ChatCompletion.create(
            model = model,
            messages = prompt_messages,
            temperature = creativity,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        return responses.choices[0].message['content']
        
    def _creativity_constraint(self, crt: float) -> float:
        constraint = lambda x: 0.0 if x < 0.0 else (2.0 if x > 2.0 else x)
        return constraint(crt)

"""
chat_log = [
    { 'role': 'system', 'content': '0' },
    { 'role': 'user', 'content': '1' }, 
    { 'role': 'assistant', 'content': '2' }, 
    { 'role': 'user', 'content': '1' }, 
    { 'role': 'assistant', 'content': '2' }, 
]

gpt = ChatGPT()
a = gpt.ask(message_log = chat_log, what = 'dodo')

print(a)
"""