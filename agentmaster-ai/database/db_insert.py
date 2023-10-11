import pymysql as mysql

# MySQL DB 연결을 한다
db = mysql.connect(host='localhost', user='root', password='a12345', db='DB', charset='utf8')

# Connection 으로부터 Cursor 생성
curs = db.cursor()

# SQL문 실행
sql = "INSERT INTO table1(name, university) VALUES (%s,%s)"

# 방법 1
curs.execute(sql, ('Lee Seo Jun','Kyonggi'))
curs.execute(sql, ('Lee Da Hyun','Yonsei'))
# 방법 2
# data = (
#    ('Lee Dong Woo','Seoul'),
#    ('S3','Seoul'),
# )

sql = "INSERT INTO table1(name, university) VALUES (%s,%s)"
curs.executemany(sql,data)

db.commit()
db.close