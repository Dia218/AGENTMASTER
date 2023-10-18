
from Article import Article

from DatabaseHandler import DatabaseHandler

class ServicePreparer(DatabaseHandler):
    def __init__(self, config_path: str = 'connector_config.json'):
        super().__init__(config_path)
        
    def articles_without_summary(self):
        query = """SELECT article_id, body 
        FROM "AGENTMASTER"."Article" 
        WHERE article_id NOT IN (SELECT DISTINCT article_id FROM "AGENTMASTER"."Article_summary");"""
        
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
                    SET issue_keyword = %s \
                  WHERE issue_keyword = %s; '
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

    def add_link(self, link: str):
        assert type(link) is str, 'Parameter link must be a str.'

        query = """INSERT INTO "AGENTMASTER"."Article_link"
        (link) VALUES (%s)
        returning article_link_id;"""

        attributes = tuple([link])

        try:
            result = self.request(query, attributes)
        except Exception as e:
            print('213An Error has occured! The database has returned following error: ')
            print(e)
        return result

    def get_unfetched_link(self):
        query = """SELECT al.link
        FROM "AGENTMASTER"."Article_link" as al
        LEFT JOIN "AGENTMASTER"."Article" as ac
        ON al.article_link_id = ac.article_link_id
        WHERE ac.article_id IsNULL;"""

        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result

    def get_field_id(self, field_name: str):
        assert type(field_name) is str, 'Parameter link must be a str.'
        if field_name not in ('Energy', 'Materials', 'Industrials', 'Utilities', 'Healthcare', 'Financials', 'Consumer', 'Staples', 'ICT', 'RealEstate'):
            field_name = 'Consumer'

        query = """SELECT field_id FROM "AGENTMASTER"."Field"
        WHERE field_name = (%s);"""

        attributes = tuple([field_name])

        try:
            result = self.request(query, attributes)
            print('result', result)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result

    def get_link_id(self, link: str):
        assert type(link) is str

        query = f"""SELECT article_link_id FROM "AGENTMASTER"."Article_link"
        WHERE link = (%s);"""
        
        attributes = tuple([link])

        try:
            result = self.request(query, attributes)
            print('result', result)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result

    def add_fetched_article(self, article: Article, field_id: str, link_id: str):
        """
        
        """
        assert type(article) is Article, f'Parameter "article" must be a type of Article.'
        assert type(field_id) is str
        assert type(link_id) is str

        query = """INSERT INTO "AGENTMASTER"."Article"
        (title, company, body, reporter, first_pub, last_pub, article_link_id, field_id) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        returning article_link_id;"""


        using_attr = [attr for attr in article.attributes if (attr not in article.post_work_attributes) and (attr not in article.essential_attributes)] 

        attributes = tuple(
            [getattr(article, attr) for attr in using_attr] + [link_id, field_id]
        )

        try:
            self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

    def article_without_body(self):
        """
        
        """
        query = 'SELECT * FROM "AGENTMASTER"."Article" WHERE body IsNULL;'
        
        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result

    def unrelated_articles(self):
        """
        
        """
        query = f"""SELECT article_id, body
        FROM "AGENTMASTER"."Article" 
        WHERE article_group_id isNULL;"""

        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result


    def article_by_id(self, id: int):
        """
        
        """
        query = f'SELECT body FROM "AGENTMASTER"."Article" WHERE article_id = {id};'
        
        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result

    def articles_by_keywords(self, id: str, keywords: list):
        """

        """
        print('keywords_making_id:', id, keywords)


        finder_assembled = ['body LIKE \'%' + w +'%\'' for w in (keywords if len(keywords) < 7 else keywords[:7])]
        finder_assembled = ' OR '.join(finder_assembled)

        if id == '48': 
            print('finder_assemdble(48)', finder_assembled, 'dsd', keywords if len(keywords) < 7 else keywords[7:])

        query = f"""SELECT article_id, body 
        FROM "AGENTMASTER"."Article" 
        WHERE ({finder_assembled}) AND article_id <> {id};"""
        
        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)
        return result

    def add_relating_keywords(self, target_id: str, keywords: str):
        """

        """

        query = f"""WITH new_group AS (
          -- 입력하려는 group_name을 사용하여 존재하는 행을 찾습니다.
          SELECT article_group_id
          FROM "AGENTMASTER"."Article_group"
          WHERE group_name = '{keywords}'
        ),
        insert_new_group AS (
          -- 존재하지 않는 경우, 새로운 행을 삽입합니다.
          INSERT INTO "AGENTMASTER"."Article_group" (group_name)
          SELECT '{keywords}'
          WHERE NOT EXISTS (SELECT 1 FROM new_group)
          RETURNING article_group_id
        )
        -- 결과 반환: 이미 존재하는 경우, 새로운 경우 모두 article_group_id를 반환합니다.
        SELECT article_group_id
        FROM new_group
        UNION ALL
        SELECT article_group_id
        FROM insert_new_group;
        """

        attributes = tuple([keywords])

        try:
            res = self.request(query, attributes)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        print('res', res)

        query = f"""UPDATE "AGENTMASTER"."Article"
        SET
            article_group_id = {res[0][0]}
        WHERE
            article_id = {target_id};"""
        
        try:
            self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

    def get_random_N(self, N: int):

        """
        
        """
        assert type(N) is int

        query = f"""SELECT article_id, body FROM "AGENTMASTER"."Article" ORDER BY RANDOM() LIMIT {N}"""

        
        try:
            result = self.request(query)
        except Exception as e:
            print('An Error has occured! The database has returned following error: ')
            print(e)

        return result