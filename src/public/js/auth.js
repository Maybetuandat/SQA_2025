document.addEventListener("DOMContentLoaded", function () {
    const login = document.getElementById("login");
    const inputs = document.querySelectorAll(".form-login");


    login.addEventListener("click", function () {
        let formData = new FormData();
        inputs.forEach((input) => {
            formData.append(input.id, input.value);
        });
        fetch("/login/:role", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Lấy token từ response
                const token = data.token;

                // Kiểm tra xem token có tồn tại không trước khi lưu vào localStorage
                if (token) {
                    localStorage.setItem("token-access", token.accessToken);
                    console.log("Token đã được lưu vào localStorage.");
                    window.location.href = "/admin/result";
                } else {
                    console.log("Không nhận được token từ server.");
                }
            })
            .catch((error) => {
                console.error("Error500", error);
            });
    });
});
