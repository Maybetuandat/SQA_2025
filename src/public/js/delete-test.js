async function deleteTest(id) {
    try {
        const response = await fetch(`/api/delete-test/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.status === 200) {
            window.location.href = "/admin/test";
        } else {
            alert('Xóa không thành công!');
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu xóa:', error);
        alert('Đã xảy ra lỗi khi xóa bài thi!');
    }
}

function confirmDelete(itemId) {
    var confirmed = confirm("Bạn có chắc chắn muốn xóa bài thi này không?");
    if (confirmed) {
        deleteTest(itemId);
    }
}
