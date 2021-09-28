# Hướng dẫn sử dụng

**CẤU TRÚC PROJECT:**  
>**Folder DAO**: chứa các hàm gọi thẳng tới CSDL  
>**Folder Services**: xử lý API gọi tới, xử lý request gửi lên, gọi hàm trong DAO tương ứng  
>**index.js**: cấu hình và mapping các api với hàm trong `Services` tương ứng   
>**Utils**: chứa các file tiện ích (cấu trúc dữ liệu trả về, các hàm dùng chung, v.v)  
----

**NOTE:**
Chú ý phiên bản DB và file *postman_collection1* để import lại!
----

**Lần đầu cài đặt (chưa có thư mực node_modules & pictures):**  
1. Mở CMD, cd vào folder chứa code và chạy lệnh
`npm install`  
2. paste folder pictures vào folder chính  
3. Tạo database tên **hue_hoai** sau đó import file .sql vào

**Start server:**
>C1: Nếu chưa có nodemon: `node index.js`  
>C2: Nếu đã cài đặt nodemon: `nodemon index.js`  
   > ** Cách cài nodemon (CMD với quyền administrator) `npm install -g nodemon`

**List API:**
1. >Mở Postman
2. >Import file **hue_hoai.postman_collection**
3. >Trong phần Collection sẽ có API và request tương ứng
