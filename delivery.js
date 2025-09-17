document.addEventListener("DOMContentLoaded", function () {
	const orderContainer = document.getElementById("confirm-order");
	const cartData = JSON.parse(localStorage.getItem("orderDetails")) || [];

	orderContainer.innerHTML = "";

	// Tính tổng sản phẩm
	let totalQuantity = 0;
	let totalBill = 0;
	cartData.forEach(item => {
		totalQuantity += item.quantity;
		totalBill += item.total;
	});

	// Hiển thị số lượng
	const quantityEl = document.createElement("div");
	quantityEl.className = "order-count";
	quantityEl.textContent = `Số lượng sản phẩm: ${totalQuantity}`;
	orderContainer.appendChild(quantityEl);

	// Hiển thị từng sản phẩm
	cartData.forEach(item => {
		const productItem = document.createElement("div");
		productItem.className = "product-item";

		const productImg = document.createElement("img");
		productImg.src = item.photo;
		productImg.alt = item.name;

		const infoBox = document.createElement("div");
		infoBox.className = "product-info";
		infoBox.innerHTML = `
			<span>${item.name}</span>
			<span>${item.quantity}</span>
			<span>${item.total.toLocaleString()} VND</span>
		`;

		productItem.appendChild(productImg);
		productItem.appendChild(infoBox);
		orderContainer.appendChild(productItem);
	});

	// Tổng hóa đơn
	const billEl = document.createElement("div");
	billEl.className = "total-bill";
	billEl.textContent = `Tổng: ${totalBill.toLocaleString()} VND`;
	orderContainer.appendChild(billEl);

	// Xử lý xác nhận đặt hàng
	const confirmBtn = document.getElementById("btnConfirm-order");


	confirmBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const receiver = document.getElementById("receiver").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const commune = document.getElementById("commune").value;
        const province = document.getElementById("province").value;

        if (!receiver || !phone || !address || commune === "null" || province === "null") {
            alert("Điền đầy đủ thông tin giao hàng đi tr!!!");
            return;
        }

        const order = {
            products: cartData,
            customer: { name: receiver, phone, address, commune, province },
            total: totalBill,
            time: new Date().toLocaleString()
        };

        // Lưu vào localStorage
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Xóa orderDetails
        localStorage.removeItem("orderDetails");

        // Cập nhật giao diện nút giỏ hàng
        const cartIcon = document.getElementById("cart");
        if (cartIcon) {
            cartIcon.innerHTML = '<img id="cart-photo" src="cart.png"/> Giỏ hàng (0)';
        }

        const imgEl = document.getElementById("order-image");
        if (imgEl) imgEl.src = "";
        const qtyEl = document.getElementById("order-quantity");
        if (qtyEl) qtyEl.innerHTML = "";
        const totalEl = document.getElementById("order-total");
        if (totalEl) totalEl.innerHTML = "";
        const billTotal = document.getElementById("total-bill");
        if (billTotal) billTotal.innerHTML = "";

        const form = document.getElementById("login-data");
        if (form) form.reset();

        alert("Đặt hàng thành công! Thankiu bbi <3");
        window.location.href = "index.html";
    });
});
