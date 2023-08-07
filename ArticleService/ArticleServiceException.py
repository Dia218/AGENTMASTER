class ExceptionMessageFormat:
    def __init__(
            self, 
            context: str = "",
            problem: str = "",
            solution: str = "") -> dict:
        self.msg_format = { "context": context, "problem": problem, "solution": solution }

    def __str__(self):
        return "context:" + self.msg_format['context'] + "\n" \
               "problem:" + self.msg_format['problem'] + "\n" \
               "solution: " + self.msg_format['solution'] + "\n" \
               "This message appears when a problem occured in article-related service. Contact admin. \n" \
               "Admin should share this message to ai department immediately. \n" \
               "Additional information for debudding: \n "
    
class ArticleServiceException(Exception):
    def __init__(
            self, 
            msg_format: ExceptionMessageFormat = ExceptionMessageFormat("", "", "")):
        super().__init__(msg_format)