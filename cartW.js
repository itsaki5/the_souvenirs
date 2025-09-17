//------------------------------------TỪ NGOÀI DETAIL------------------------------------//
$(document).ready(function () {
    var orderArray = JSON.parse(localStorage.getItem("orderDetails") || "[]");
    var count = orderArray.length;

    // Cập nhật số lượng giỏ hàng
    $("#cart").html('<img id="cart-photo" src="https://i.imgur.com/1WhvuDO.png"/> Giỏ hàng (' + count + ')');

    $(".btnAdd").click(function () {
        var product = $(this).closest(".product");
        var imgSrc = product.find(".product-photo").attr("src");
        var name = product.find(".product-name").text();
        var salePrice = product.find(".product-sale").text();
        var oldPrice = product.find(".product-price").text();

        // Đổ dữ liệu vào modal
        $("#preview-image").attr("src", imgSrc);
        $("#preview-name").text(name);
        $("#preview-sale").text(salePrice);
        $("#preview-price").text(oldPrice);
        $("#preview-num").val(1); // reset số lượng về 1

        // Hiện modal
        $("#product-preview").fadeIn();
    });

    // Ẩn modal khi bấm nút đóng
    $(".close").click(function () {
        $("#product-preview").fadeOut();
    });

    // Xác nhận thêm vào giỏ
    $("#confirm-add").click(function () {
			var name = $("#preview-name").text();
			var price = parseInt($("#preview-sale").text().replace(/\./g, ""));
			var photo = $("#preview-image").attr("src");
			var quantity = parseInt($("#preview-num").val());
			var total = price * quantity;

			var order = {
				name: name,
				price: price,
				photo: photo,
				quantity: quantity,
				total: total
				};

			orderArray.push(order);
			localStorage.setItem("orderDetails", JSON.stringify(orderArray));

			count = orderArray.length;
			$("#cart").html('<img id="cart-photo" src="https://i.imgur.com/1WhvuDO.png"/> Giỏ hàng (' + count + ')');
			$("#product-preview").fadeOut();

			alert("Ting! Ting! Đã thêm vô giỏ hàng!");
		});

});

//------------------------------------DETAIL------------------------------------//
$(document).ready(function(){
	$(".detail-btnAdd").click(function () {
		var name = $(".detail-name").text();
		var price = parseInt($(".detail-sale").text().replace(/\./g, ""));
		var photo = $(".detail-img").attr("src");
		var quantity = parseInt($("#quantity").val());

		if (isNaN(quantity) || quantity <= 0) {
			alert("Số lượng không hợp lệ!");
			return;
		}

		var total = price * quantity;

		var order = {
			name: name,
			price: price,
			photo: photo,
			quantity: quantity,
			total: total
		};

		var orderArray = JSON.parse(localStorage.getItem("orderDetails") || "[]");

		// Thêm vào mảng
		orderArray.push(order);
		localStorage.setItem("orderDetails", JSON.stringify(orderArray));

		// Cập nhật số lượng giỏ hàng
		var count = orderArray.length;
		$("#cart").html('<img id="cart-photo" src="https://i.imgur.com/1WhvuDO.png"/> Giỏ hàng (' + count + ')');

		alert("Đã thêm vào giỏ hàng!");
	});

});

