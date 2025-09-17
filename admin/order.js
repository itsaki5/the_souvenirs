document.addEventListener("DOMContentLoaded", function() {
    const tbody = document.querySelector("tbody");
    const modal = document.getElementById("orderModal");
    const modalContent = document.getElementById("orderDetail");
    const closeBtn = document.querySelector(".close");
    const completeBtn = document.getElementById("btnComplete");
    let currentOrderIndex = null;



    function renderOrders() {
		
		modal.style.display = "none";

        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        if (orders.length > 0) {
            tbody.innerHTML = "";

            orders.forEach((order, index) => {
				let orderCode = "DH" + (index + 1).toString().padStart(3, "0");

				let newRow = document.createElement("tr");
				newRow.className = "order-row"; // thêm class
				newRow.setAttribute("data-status", order.status || "pending"); // thêm data-status

				newRow.innerHTML = `
					<td>${orderCode}</td>
					<td>${order.customer.name}</td>
					<td>${Number(order.total).toLocaleString("vi-VN")} VND</td>
					<td>
						<span class="status ${order.status === 'done' ? 'status-done' : 'status-pending'}">
							${order.status === 'done' ? 'Hoàn thành' : 'Đang xử lý'}
						</span>
					</td>
					<td>
						<button class="btn-detail" data-index="${index}">Chi tiết</button>
						<button class="btn-delete" data-index="${index}"><i class="fas fa-trash"></i></button>
					</td>
				`;

				tbody.appendChild(newRow);
			});
        } else {
            tbody.innerHTML = `<tr><td colspan="5">Chưa có đơn hàng</td></tr>`;
        }
    }

    renderOrders();

    // Mở modal xem chi tiết
    tbody.addEventListener("click", function(e) {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        if (e.target.classList.contains("btn-detail")) {
            const index = e.target.dataset.index;
            const order = orders[index];
            currentOrderIndex = index; // lưu index để xử lý nút hoàn tất

            let detail = `
              <p><b>Mã đơn:</b> DH${(parseInt(index) + 1).toString().padStart(3, "0")}</p>
              <p><b>Khách hàng:</b> ${order.customer.name}</p>
              <p><b>SĐT:</b> ${order.customer.phone}</p>
              <p><b>Địa chỉ:</b> ${order.customer.address}, ${order.customer.commune}, ${order.customer.province}</p>
              <p><b>Thời gian đặt hàng:</b> ${order.time}</p>
              <p><b>Tổng tiền:</b> ${Number(order.total).toLocaleString("vi-VN")} VND</p>
              <p><b>Sản phẩm:</b></p>
              <ul>
                ${order.products.map(p => `<li>${p.name.trim()} x${p.quantity} : ${Number(p.total).toLocaleString("vi-VN")} VND</li>`).join("")}
              </ul>
            `;

            modalContent.innerHTML = detail;
            modal.style.display = "block";
        }

        // Xoá đơn
        if (e.target.closest(".btn-delete")) {
			if (confirm("Xoá đơn hàng này?")) {
				const index = e.target.closest(".btn-delete").dataset.index;
				let orders = JSON.parse(localStorage.getItem("orders")) || [];
				orders.splice(index, 1);
				localStorage.setItem("orders", JSON.stringify(orders));
				renderOrders();
			}
		}
    });

    // Đóng modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }

    // Hoàn tất đơn trong modal
    completeBtn.onclick = function() {
        if (currentOrderIndex !== null) {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders[currentOrderIndex].status = "done";
            localStorage.setItem("orders", JSON.stringify(orders));
            renderOrders();
            modal.style.display = "none";
        }
    }
});





