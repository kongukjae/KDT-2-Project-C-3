from http.client import HTTPConnection

host = 'www.naver.com'
conn = HTTPConnection(host)
conn.request('GET', '/')
r1 = conn.getresponse()
print(r1.status, r1.reason)

data1 = r1.read()

conn.request('GET','/')
r2 = conn.getresponse()
print(r2.status, r2.reason)

data2 = r2.read()
print(data2.decode())

conn.close()