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
                "solution: assemble_link() must given valid parameters. This method is unable to use for user point. Contact admin. \n"

def assemble_link(
    base: str = None, 
    parameters: list = list(),
    values: list = None) -> str:
    """
        assemble_link
            A function generates a link, assembles base, parameters, and values.

        parameters
            base('str')
                The address of end point url. 
            parameters('list' of 'str')
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
    if len(parameters) == 0 and values: InvalidParameterValuePairException()

    # When the number of parameters and values are not matching up.
    if not values: values = list()
    if len(parameters) != len(values): raise InvalidParameterValuePairException()

    # When some elements in parameters are not 'str'.
    if ...: raise InvalidParameterException()

    # When some elements in values are not 'str' or 'None'.
    if ...: raise InvalidValueException()

    # When the elements in parameters is duplicated.
    if ...: raise DuplicatedParameterException()

    # Assemble the link. 
    query = '&'.join([param + "=" + (val if val else "") for param, val in zip(parameters, values)])
    return base + ("" if query == "" else "?") + query 

print(assemble_link(base="www.naver.com"))

print(assemble_link(base="www.based.com",
                    parameters=[],
                    values=[]))

print(assemble_link(base="www.naver.com",
                    parameters=["sep", "ple"],
                    values=["1", "2"]))

print(assemble_link(base="www.naver.com",
                    parameters=["sep", "ple"],
                    values=[None, None]))

print(assemble_link(base=321,
                    parameters=["sep", "ple"],
                    values=[None]))

