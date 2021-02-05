# face-detection
## giao diện ở dạng sơ sài ##
I. Setup:
  1.setup database --- trong file config/mysql-db.js
  2. npm i
II. Sử dụng: npm start
1. upload 10 ảnh cho mỗi người với tên cụ thể
http://localhost:3000/upload
2. param name để train cho tên có ảnh đã được upload
http://localhost:3000/traindata?name=<name>
3. kết quả
http://localhost:3000/index
4. query chấm công:
http://localhost:3000/query-data-checkin
