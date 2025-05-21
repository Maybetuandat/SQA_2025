async function SavePermission(permissionsLength) {
    var permissionArray = [];

    for (var i = 0; i < permissionsLength; i++) {
        permissionArray[i] = [];
    }
    var checkbox = document.querySelectorAll('input[name="permissions"]');

    checkbox.forEach(function (checkbox) {
        var isChecked = checkbox.checked;
        var rowIndex = checkbox.closest('tr').rowIndex - 1;
        var colIndex = checkbox.closest('td').cellIndex - 1;
        permissionArray[colIndex][rowIndex] = isChecked;
    });

    showLoading();

    const backendURL = '/admin/permission/save-permission';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(permissionArray)
    };

    try {
        const response = await fetch(backendURL, options);
        if (!response.ok) {
            throw new Error('Có lỗi xảy ra khi gửi yêu cầu: ' + response.status);
        }
        hideLoading();
        window.location.href = "/admin/permission";
        showAlert("Cập nhật quyền thành công !!!")
    } catch (error) {
        showAlert('Đã xảy ra lỗi !!!')
        console.error(error);
    }
}

function SaveEditAdmin(id) {
    var details = document.getElementById(id);


    var formData = {
        UserName: document.getElementById('edit-username').value,
        Password: document.getElementById('edit-password-admin').value,
        Role: document.getElementById('edit-role').value
    };
    // //console.log(formData);
    if (!formData.UserName || !formData.Password || !formData.Role) {
        showAlert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    showLoading();

    var url = '/admin/permission/update-admin'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.statusCode === 200) {
                hideLoading();
                showAlert('Cập nhật thành công')
            }
            window.location.href = "/admin/permission";
            return response.json();
        })
        .then(data => {

            //console.log(data);
        })
        .catch(error => {
            showAlert("Đã xảy ra lỗi khi cập nhật tài khoản!")
            console.error(error);
        });

    details.style.display = 'none';

}

function getAdminData(id, username) {
    var details = document.getElementById(id);
    details.style.display = 'block';
    var url = '/admin/permission/get-admin/' + username;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var admin = data.data;
            // //console.log("a", admin);
            document.getElementById('edit-username').value = admin.UserName
            document.getElementById('edit-password-admin').value = ""
            document.getElementById('edit-role').value = admin.Role_id

            // //console.log(data.data[0]);
        })
        .catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });
}

function closeAdminPopup(id) {
    var details = document.getElementById(id);

    document.getElementById('edit-username').value = ""
    document.getElementById('edit-password-admin').value = ""
    document.getElementById('edit-role').value = ""

    details.style.display = 'none';
}