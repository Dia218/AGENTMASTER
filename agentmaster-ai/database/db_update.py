#-*- coding: utf-8 -*-

import pymysql as mysql

# MySQL DB 연결을 한다
db = mysql.connect(host='localhost', user='root', password='a12345', db='DB', charset='utf8')

# Connection 으로부터 Cursor 생성
curs = db.cursor()

# UPDATE SQL 문
# sql = "UPDATE table_test SET name = 'Lee Seo Jun' where name='S3'"
# sql = "UPDATE table_test SET name = 'Lee Dahyun' where id='8'"
# curs.execute(sql)

# 삭제 SQL문
sql = "DELETE FROM table_test WHERE id = %s"
curs.execute(sql, 12)

db.commit() 
db.close()