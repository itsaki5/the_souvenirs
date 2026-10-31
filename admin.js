
document.querySelector(".btnLogin").addEventListener("click", function(e) {
    e.preventDefault();

    const username = document.getElementById("login-user").value.trim();
    const password = document.getElementById("login-password").value;

    // Kiểm tra dữ liệu rỗng
    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
        return;
    }

    // Kiểm tra maxlength
    if (username.length > 250) {
        alert("Tên đăng nhập không được vượt quá 250 ký tự!");
        return;
    }

    if (password.length > 250) {
        alert("Mật khẩu không được vượt quá 250 ký tự!");
        return;
    }

    // Lấy danh sách tài khoản
    const storedAdmins = JSON.parse(localStorage.getItem("adminAccount")) || [];

    if (storedAdmins.length === 0) {
        alert("Chưa có tài khoản admin nào được thiết lập!");
        return;
    }

    // Kiểm tra đăng nhập
    const validAdmin = storedAdmins.find(admin =>
        admin.username === username &&
        admin.password === password
    );

    if (validAdmin) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "admin/admin.html";
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
});

// Hiển thị form quên mật khẩu
document.getElementById("fp").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("box-fp").style.display = "block";
});

// Xử lý quên mật khẩu
document.getElementById("btnPassword").addEventListener("click", function() {
    const username = document.getElementById("forgot-username").value.trim();

    if (!username) {
        alert("Vui lòng nhập tên đăng nhập!");
        return;
    }

    if (username.length > 250) {
        alert("Tên đăng nhập không được vượt quá 250 ký tự!");
        return;
    }

    const admins = JSON.parse(localStorage.getItem("adminAccount")) || [];
    const foundAdmin = admins.find(acc => acc.username === username);

    if (foundAdmin) {
        // Chỉ phù hợp với ứng dụng mô phỏng, không dùng trong thực tế
        alert("Mật khẩu của tài khoản '" + username + "' là: " + foundAdmin.password);
    } else {
        alert("Không tìm thấy tài khoản này!");
    }

    document.getElementById("box-fp").style.display = "none";
    document.getElementById("forgot-username").value = "";
});
