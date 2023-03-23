import pymysql

# STEP 2: MySQL Connection 연결
con = pymysql.connect(host='localhost', user='root', password='0000', db='signup', charset='utf8')
 
# STEP 3: Connection 으로부터 Cursor 생성
cur = con.cursor()
 
# STEP 4: SQL문 실행 및 Fetch
# sql = "INSERT INTO userInfo(id, PW, question, answer, dogName, dogGender) VALUES('jin', '123123', '1', 'daejeon', 'uno','1')"

sql = """
    SELECT * FROM korea;
    """


cur.execute(sql)

# DB에 Complete 하기
con.commit()
# 데이타 Fetch
rows = cur.fetchall()
print(rows)     # 전체 rows

# STEP 5: DB 연결 종료
con.close()