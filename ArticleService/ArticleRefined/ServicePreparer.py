
from Article import Article

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
    
    def add_article_summary(self, article_id: int, article_summary: str):
        query = f'INSERT INTO "AGENTMASTER"."Article_summary"(article_id, article_summary) \
                VALUES (%s, %s); '
        attributes = tuple([article_id, article_summary])

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

    def add_fetched_article(self, article: Article, field: str):
        """
        
        """
        if type(article) is not Article:
            raise Exception(f'Parameter "article" must be a type of Article. {type(article)} is not allowed.')
        query = 'INSERT INTO "AGENTMASTER"."Article" '
        '(article_link, company, reporter, title, first_pub, last_pub, body, field) ' 
        'VALUES (%d, %d, %d, %d, %d, %d, %d, %d);'

        using_attr = [attr for attr in article.attributes if attr not in article.post_work_attributes]

        attributes = tuple(
            [getattr(article, attr) for attr in using_attr] + [field]
        )

        try:
            self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)
        ...

    def article_without_body(self):
        """
        
        """
        query = 'SELECT * FROM "AGENTMASTER"."Article" WHERE body IS NULL;'
        
        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result

    def article_by_id(self, id: int):
        """
        
        """
        query = f'SELECT * FROM "AGENTMASTER"."Article" WHERE id = {id};'
        
        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result

    def article_by_keywords(self, criteria: str, keywords: list):
        """
        
        """
        query = f'SELECT * FROM "AGENTMASTER"."Article" WHERE to_tsquery({criteria}) @@ to_tsvector({keywords});'
        
        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)
        return result

    def add_relating_keywords(self, keywords: list):
        """
        
        """
        query = 'INSERT INTO "AGENTMASTER"."Article_gruop" '
        '(group_name) VALUES (%d);'

        attributes = tuple()

        try:
            self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)