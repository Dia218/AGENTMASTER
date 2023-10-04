# 작성 정보
- 20230816
- 김준우

# 개요
DbService 디렉토리에 포함된 파이썬 객체는 모두 DB를 연동(연결)하고 쿼리를 수행하기 위해 만들어진 객체입니다.

## 연동
파이썬 프로그램을 DB에 연동하고싶다면 
1. host, port, user, password, dbname이 key로 정의된 json 파일에 값을 작성하십시오.
    - json 파일에서 key로 작성되지 않은 정보는 파이썬 내부에서는 None으로써 취급됩니다. 이는 DB 연동에서 오류의 원인이 될 수 있습니다.
    - json 파일에서 value가 null로 작성된 정보는 파이썬 내부에서는 None으로써 취급됩니다. 이는 DB 연동에서 오류의 원인이 될 수 있습니다.
2. DbConnector 객체로 연결을 생성하세요.
    - DbConnector 객체의 생성자는 경로를 지정하는 문자열을 매개변수로 받습니다.
    - 기본적으로 DbConnector.py의 파일이 위치한 디렉토리에서 connector_config.json 파일을 찾으려 합니다.
    - path_config 매개변수로 사용자 지정 매개변수 설정이 가능합니다.
3. DbHandler를 생성하되, DbHandler 생성자의 connector 매개변수로 DbConnector.connect() 함수를 호출하세요.
    - DbConnector은 json에서 db 연동에 필요한 정보를 불러와 커넥터 객체를 생성합니다. 이는 db를 연동하는데 있어 사용되는 정보는 예민하므로
    - 로컬에 정보를 저장하기 위해 고안된 클래스입니다. 
    - DbConnector 객체의 .connect() 함수는 커넥터 객체를 반환하므로, 이를 DbHandler 생성자의 매개변수로 전달하면
    - 항구적으로 커넥터 객체를 저장, 유지하면서 쿼리를 수행할 수 있습니다.
4. 현재 DbHandler의 함수에는 insert만 가능합니다. (230816)
    - insert() 함수는 일반적으로 설계되었습니다. attributes와 values 튜플을 잘 넘기면 거의 모든 테이블에 사용할 수 있습니다. 