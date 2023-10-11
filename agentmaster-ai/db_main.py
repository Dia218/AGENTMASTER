from DatabaseHandler import DatabaseHandler

class ServicePreparer(DatabaseHandler):
    def __init__(self):
        super().__init__()
        
    def articles_without_summary(self):
        query = "SELECT article_id, body" \
                "FROM \"AGENTMASTER\".\"Article\"" \
                "WHERE article_id NOT IN (SELECT DISTINCT article_id FROM \"AGENTMASTER\".\"Article_summary\");"
        
        try: 
            results = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)
        return results
    
    def add_article_summary(self, article_summary: str):
        query = f'INSERT INTO "AGENTMASTER"."Article_summary"(article_id, article_summary) \
                VALUES (%s); '
        attributes = tuple([article_summary])

        try:
            self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

    def change_article_summary(self, old_article_summary: str, new_article_summary: str):
        query = f'UPDATE "AGENTMASTER"."Article_summary" \
                  SET article_summary = %s \
                  WHERE article_summary = %s; '
        attributes = tuple([new_article_summary, old_article_summary])

        try: 
            self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)
        
    def add_issue_keywords(self, new_keywords: str):
        query = f'INSERT INTO "AGENTMASTER"."Issue_summary" \
                VALUES (%s);'
        attributes = tuple([new_keywords])

        try:
            self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

    def change_issue_keywords(self, old_issue_keyword: str, new_issue_keyword: str): 
        query = f'UPDATE "AGENTMASTER"."Issue_summary" \
                    SET issue_keyword = {new_issue_keyword} \
                  WHERE issue_keyword = {old_issue_keyword}; '
        attributes = tuple([new_issue_keyword, old_issue_keyword])
        
        try:
            self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

    def find_article_body_with_issue_keywords(self, issue_keyword: str) -> tuple:
        query = f'SELECT "AGENTMASTER"."Article".body, "AGENTMASTER"."Issue_summary".issue_summary_id \
                  FROM "AGENTMASTER"."Issue_summary" \
                  INNER JOIN "AGENTMASTER"."Article" \
                  ON "AGENTMASTER"."Issue_summary".issue_summary_id = "AGENTMASTER"."Article".issue_summary_id \
                  WHERE "AGENTMASTER"."Issue_summary".issue_keyword = %s;'
        attributes = tuple([issue_keyword])

        try: 
            results = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)
        return results

    def change_issue_summary(self, issue_summary_id: int, issue_summary: str):
        query = f'UPDATE "AGENTMASTER"."Issue_summary" \
                  SET issue_summary = %s \
                  WHERE issue_summary_id = %s;'
        attributes = tuple([issue_summary, issue_summary_id])

        try:
            self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)
