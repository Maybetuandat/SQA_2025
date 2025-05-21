// document.addEventListener("DOMContentLoaded", function () {
//     var loading = document.getElementById('loading');
//     loading.style.display = 'block';
// });

// window.addEventListener("load", function () {
//     var loading = document.getElementById('loading');
//     loading.style.display = 'none';
// });

// window.onload = function () {
//     var loading = document.getElementById('loading');
//     loading.style.display = 'none'; // Ẩn trạng thái loading sau khi trang đã tải xong
// };

window.addEventListener('beforeunload', function () {
    var loading = document.getElementById('loading');
    loading.style.display = 'block'; // Hiển thị trạng thái loading trước khi chuyển hướng trang
});
// Hiển thị trạng thái loading khi bắt đầu yêu cầu
function showLoading() {
    console.log('mở')
    var loading = document.getElementById('loading');
    loading.style.display = 'block';
}

// Ẩn trạng thái loading khi kết thúc yêu cầu
function hideLoading() {
    console.log('đóng')
    var loading = document.getElementById('loading');
    loading.style.display = 'none';
}