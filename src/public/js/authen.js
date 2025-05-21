// document.addEventListener("DOMContentLoaded", async function () {
//     // Lấy token từ localStorage
//     const token = localStorage.getItem("token-access") 

//     // Lấy URL hiện tại
//     const currentUrl = window.location.href;

//     // Tạo một đối tượng URL từ URL hiện tại
//     const urlObject = new URL(currentUrl);

//     // Lấy phần đuôi (pathname) của URL
//     const pathname = urlObject.pathname;

//     //console.log(pathname); // In ra "/admin/login"

//     if (token) {
//         // Thêm token vào header Authorization của mỗi yêu cầu gửi từ client tới máy chủ
//         await fetch('/', {
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "x-access-token": token // Gắn token vào header x-access-token
//             }
//         })
//         .then((response) => {
//             if(response.status == 401) {
//                 window.location.href = "/login/admin";
//             }
//         })
//         .then((data) => {
            
//         })
//         .catch((error) => {
//             console.error("Lỗi khi gửi yêu cầu đến máy chủ", error);
//         });
//     } else {
//         console.error("Không tìm thấy token trong localStorage.");
//         window.location.href = "/login/admin";
//     }
// });
