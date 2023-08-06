class InvalidLinkException(Exception):
     def __str__(self): return self.msg

class InvalidBaseException(InvalidLinkException):
    def __init__(self): 
        self.msg = "context: assemble_link() has invoked. \n" \
               "problem: assemble_link() has given invalid base. \n" \
               "solution: assemble_link() must given valid base. This method is unable to use for user point. Contact admin. \n"
class InvalidParameterValuePairException(InvalidLinkException):
    def __init__(self):
        self.msg = "context: assemble_link() has invoked. \n" \
                "problem: assemble_link() has given invalid parameters and values pair. \n" \
                "solution: assemble_link() must given valid parameters and values pair. This method is unable to use for user point. Contact admin. \n"
class InvalidParameterException(InvalidLinkException):
    def __init__(self): 
        self.msg = "context: assemble_link() has invoked. \n" \
                "problem: assemble_link() has given invalid parameters. \n" \
                "solution: assemble_link() must given valid parameters that all elements are 'str'. This method is unable to use for user point. Contact admin. \n"
class InvalidValueException(InvalidLinkException):
    def __init__(self): 
        self.msg = "context: assemble_link() has invoked. \n" \
                "problem: assemble_link() has given invalid values. \n" \
                "solution: assemble_link() must given valid values that all elements are either 'str' or 'None'. This method is unable to use for user point. Contact admin. \n"
class DuplicatedParameterException(InvalidLinkException):
    def __init__(self):
        self.msg = "context: assemble_link() has invoked. \n" \
                "problem: assemble_link() has given duplicate paramter. \n" \
                "solution: assemble_link() must given unique parameters. This method is unable to use for user point. Contact admin. \n"

def _has_duplicated_elements(l: list):
    keys = dict()
    for e in l:
        if str(e) in keys: return True
        keys[str(e)] = None
    
    return False

def assemble_link(
    base: str = None, 
    keys: list = list(),
    values: list = None) -> str:
    """
        assemble_link
            A function generates a link, assembles base, parameters, and values.

        parameters
            base('str')
                The address of end point url. 
            keys('list' of 'str')
                The name of parameters. 
            values('list' of 'str' or 'None')
                The values of parameters. 
        returns
            'str' of link assembled. 

            Example:
                (base='www.example.com', 
                parameters=['query', 'user'],
                values=['How to make a good function', None])
                = 'www.example.com?query=How to make a good function?user='

    """
    # When invalid url has given.
        # 1) base addr has not given.
        # 2) parameters has not given but values are given. 
    if not base or type(base) != str: raise InvalidBaseException()
    if not keys and values: InvalidParameterValuePairException()

    # When the number of keys and values are not matching up.
    if not values: values = list()
    if len(keys) != len(values): raise InvalidParameterValuePairException()

    # When some elements in keys are not 'str'.
    if list(filter(lambda p: (type(p) != str), keys)): raise InvalidParameterException()

    # When some elements in values are not 'str' or 'None'.
    if list(filter(lambda v: (type(v) == str) or v is None , values)) != values: raise InvalidValueException()

    # When the elements in keys is duplicated.
    if _has_duplicated_elements(keys): raise DuplicatedParameterException()

    # Assemble the given link. 
    assembledPV = list(param + "=" + (val if val else "") for param, val in zip(keys, values))
    query = '&'.join(assembledPV)
    return base + ("" if query == "" else "?") + query 

test = {
    "base": "www.testing.com",
    "PV": [
        { "P": [], "V": [] },
        { "P": ["foo", "bar"], "V": ["1", "2"] },
        { "P": ["foo", "bar"], "V": [None, None] },
        { "P": ["foo", "bar"], "V": [None] },
        { "P": ["foo", "bar"], "V": ["1", None] },
        { "P": [132, 312], "V": ["11", "11"] },
        { "P": ["foo", "bar"], "V": [11, 11]}, 
        { "P": ["foo", "foo"], "V": ["11", "11"] },
        { "P": ["foo", "bar", "baz"], "V": ["1", 2, "3"] }
    ]
}

for itc, tc in enumerate(test['PV']):
    b = test['base']

    try:
        l = assemble_link(base=b, parameters=tc["P"], values=tc["V"])
        print(f"{itc+1:2} / {len(test['PV'])}", l)
    except InvalidLinkException as e:
        print(f"{itc+1:2} / {len(test['PV'])} ERROR", e)