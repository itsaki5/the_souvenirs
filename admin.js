document.querySelector(".btnLogin").addEventListener("click", function(e) {
    e.preventDefault();

    const username = document.getElementById("login-user").value.trim();
    const password = document.getElementById("login-password").value;

    const storedAdmins = JSON.parse(localStorage.getItem("adminAccount"));

    if (!storedAdmins || storedAdmins.length === 0) {
        alert("Chưa có tài khoản admin nào được thiết lập!");
        return;
    }

    const validAdmin = storedAdmins.find(admin => admin.username === username && admin.password === password);

    if (validAdmin) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("isLoggedIn", "true"); 
        window.location.href = "admin/admin.html";
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
});

document.getElementById("fp").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("box-fp").style.display = "block";
});

document.getElementById("btnPassword").addEventListener("click", function() {
	const username = document.getElementById("forgot-username").value.trim();
	const admins = JSON.parse(localStorage.getItem("adminAccount")) || [];

	const foundAdmin = admins.find(acc => acc.username === username);

	if (foundAdmin) {
		alert("Mật khẩu của tài khoản '" + username + "' là: " + foundAdmin.password);
	} else {
		alert("Không tìm thấy tài khoản này!");
	}
	
	// Ẩn lại form sau khi hiển thị alert
	document.getElementById("box-fp").style.display = "none";
	document.getElementById("forgot-username").value = "";
});
