import pymysql as mysql

# MySQL DB 연결을 한다
db = mysql.connect(host='localhost', user='root', password='a12345', db='DB', charset='utf8')

# Connection 으로부터 Cursor 생성
curs = db.cursor()

# SQL문 실행
sql = "SELECT * FROM table_test"
curs.execute(sql)

# 데이터 Fetch
rows = curs.fetchall()
print(rows)

db.close()

