document.addEventListener("DOMContentLoaded", function() {
    const tbody = document.querySelector("tbody");

    // Lấy mảng orders từ localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length > 0) {
        tbody.innerHTML = ""; // Xoá trống tbody cũ

        orders.forEach((order, index) => {
            let orderCode = "DH" + (index + 1).toString().padStart(3, "0");

            let statusClass = "";
            let statusText = "";

            switch (order.status) {
                case "done":
                    statusClass = "status-done";
                    statusText = "Hoàn thành";
                    break;
                case "cancel":
                    statusClass = "status-cancel";
                    statusText = "Đã huỷ";
                    break;
                default:
                    statusClass = "status-pending";
                    statusText = "Đang xử lý";
            }

            let newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td>${orderCode}</td>
                <td>${order.customer.name}</td>
                <td>${Number(order.total).toLocaleString("vi-VN")} VND</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
            `;

            tbody.appendChild(newRow);
        });
    } else {
        tbody.innerHTML = `<tr><td colspan="4">Chưa có đơn hàng</td></tr>`;
    }
	
	// Hiển thị doanh thu
    let totalRevenue = 0;

    orders.forEach(order => {
        if (order.status === "done") {
            totalRevenue += Number(order.total);
        }
    });

    document.querySelector(".revenue").textContent = totalRevenue.toLocaleString("vi-VN") + " VND";
	
	// Cập nhật só lượng đơn hàng đang xử lý
	updatePendingCount();	
});


function updatePendingCount(orders) {
  const pendingCount = orders.filter(order => order.status === "pending").length;
  document.querySelector(".count").textContent = pendingCount;
}


