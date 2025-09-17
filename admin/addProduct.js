document.addEventListener("DOMContentLoaded", function () {
    loadProducts(); // Gọi hàm để hiển thị sản phẩm

    const tbody = document.getElementById('product-table-body');

    // Xóa
    tbody.addEventListener("click", function (e) {
        if (e.target.closest(".btn-delete")) {
            if (confirm("Xoá sản phẩm này?")) {
                const index = e.target.closest(".btn-delete").dataset.index;
                let products = JSON.parse(localStorage.getItem("products")) || [];
                products.splice(index, 1);
                localStorage.setItem("products", JSON.stringify(products));
                loadProducts(); // Cập nhật lại bảng sau khi xóa
            }
        }
    });
});

// Hàm load sản phẩm
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tbody = document.getElementById('product-table-body');
    tbody.innerHTML = '';

	window.onload = function() {
    let savedImage = localStorage.getItem("savedImage");
    if (savedImage) {
        let imagePreview = document.getElementById("image-preview");
        imagePreview.src = savedImage;
        imagePreview.style.display = "block";
    }
};
    products.forEach((product, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" style="width: 60px;"></td>
            <td>
                <button class="btn-detail" onclick="openInfoModal('${product.id}')">Chi tiết</button>
				<button class="btn-edit" onclick="openEditModal('${product.id}')">Sửa</button>
                <button class="btn-delete" data-index="${index}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}


//--------------------------- MODAL THÊM SP -------------------------------
document.addEventListener("DOMContentLoaded", function () {
	const btnAdd = document.querySelector(".btn-add");
	const modal = document.getElementById("product-modal");
	const form = document.getElementById("product-form");
	const imagePreview = document.getElementById("image-preview");
	const modalTitle = document.getElementById("modal-title");

	btnAdd.addEventListener("click", function () {
		modal.classList.add("show");
		form.reset();
		imagePreview.style.display = "none";
		modalTitle.innerText = "Thêm sản phẩm";
	});
});


function closeModal() {
	const modal = document.getElementById('product-modal');
	modal.classList.remove('show');
}

document.addEventListener("DOMContentLoaded", function () {
	const descriptionInput = document.getElementById("product-description");
	if (descriptionInput) {
		descriptionInput.addEventListener("focus", function () {
			openInfoModal();
		});
	}
});

//----------------------------- MODAL CHI TIẾT -----------------------------
function openInfoModal(productId = null) {
	const infoModal = document.getElementById('info-modal');
	infoModal.style.display = 'block';

	const detailInputs = document.querySelectorAll('#detail input.detail');
	const customDescription = document.getElementById('custom-description');

	// Reset các ô input
	detailInputs.forEach(input => input.value = '');
	customDescription.value = '';

	const infoTitles = [
		'Tên hàng hóa', 'Thành phần', 'Thông số kỹ thuật', 'Hướng dẫn sử dụng',
		'Thông tin cảnh báo', 'Hướng dẫn bảo quản', 'Năm sản xuất', 'Hạn sử dụng'
	];

	let lines = [];

	if (productId) {
		// Trường hợp xem chi tiết sản phẩm có sẵn
		const products = JSON.parse(localStorage.getItem("products")) || [];
		const product = products.find(p => p.id === productId);
		if (!product) return;

		lines = product.description.split('\n');

	} else {
		// Trường hợp đang thêm mới
		const productName = document.getElementById('product-name').value;
		document.getElementById('detail-name').value = productName;

		const descriptionContent = document.getElementById('product-description').value;
		lines = descriptionContent.split('\n');
	}

	let isNote = false;

	lines.forEach(line => {
		if (line.trim() === '') return;

		const [key, ...valueParts] = line.split(':');
		if (key && valueParts.length) {
			const value = valueParts.join(':').trim();
			const index = infoTitles.indexOf(key.trim());

			if (index !== -1) {
				detailInputs[index].value = value;
			}

			if (key.trim() === 'Ghi chú') {
				customDescription.value = value;
				isNote = true;
			} else {
				isNote = false;
			}
		}
		// Nếu là dòng tiếp theo sau "Ghi chú"
		else if (isNote) {
			customDescription.value += '\n' + line.trim();
		}
	});
}


//////////////////////////
function openEditModal(productId) {
    const products = JSON.parse(localStorage.getItem("products")) || [];  
	const product = products.find(p => p.id === productId);
	//openInfoModal(productId)

    const modal = document.getElementById("product-modal");
    const form = document.getElementById("product-form");
    const imagePreview = document.getElementById("image-preview");
    const modalTitle = document.getElementById("modal-title");

    // Gán dữ liệu vào form
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-category").value = product.category;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-description").value = product.description;

    if (product.image) {
        imagePreview.src = product.image;
        imagePreview.style.display = "block";
    } else {
        imagePreview.style.display = "none";
    }

    // Mở modal
    modal.classList.add("show");
    modalTitle.innerText = "Sửa sản phẩm";

    // Ghi lại id sản phẩm đang sửa
    modal.dataset.editingId = productId;
}

//////////////////////////
function closeInfoModal() {
	const infoModal = document.getElementById('info-modal');
	infoModal.style.display = 'none';

	const detailInputs = document.querySelectorAll('#detail input.detail');
	let descriptionContent = '';

	const infoTitles = [
		'Tên hàng hóa', 'Thành phần', 'Thông số kỹ thuật', 'Hướng dẫn sử dụng',
		'Thông tin cảnh báo', 'Hướng dẫn bảo quản', 'Năm sản xuất', 'Hạn sử dụng'
	];

	detailInputs.forEach((input, index) => {
		if (input.value.trim() !== '') {
			descriptionContent += `${infoTitles[index]}: ${input.value.trim()}\n`;
		}
	});

	const customDescription = document.getElementById('custom-description').value.trim();
	if (customDescription !== '') {
		descriptionContent += `\nGhi chú: ${customDescription}`;
	}

	document.getElementById('product-description').value = descriptionContent;
}

//--------------------------- LƯU SẢN PHẨM -------------------------------
function saveProduct() {
    const name = document.getElementById("product-name").value.trim();
    const category = document.getElementById("product-category").value;
    const price = document.getElementById("product-price").value;
    const description = document.getElementById("product-description").value.trim();
    const imageInput = document.getElementById("product-image");
    const modal = document.getElementById("product-modal");

    if (name === "" || price === "") {
        alert("Vui lòng nhập đầy đủ tên và giá sản phẩm!");
        return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const isEditing = modal.dataset.editingId;

    function saveProductToLocal(imageSrc) {
        if (isEditing) {
            // Sửa sản phẩm
            const index = products.findIndex(p => p.id === isEditing);
            products[index] = {
                ...products[index],
                name,
                category,
                price,
                description,
                image: imageSrc || products[index].image
            };
        } else {
            // Thêm mới
            const id = "SP" + (products.length + 1).toString().padStart(3, "0");
            const newProduct = {
                id,
                name,
                category,
                price,
                description,
                image: imageSrc || "default-image.jpg"
            };
            products.push(newProduct);
        }

        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
        closeModal();
        form.reset();
        imagePreview.style.display = "none";

        alert(isEditing ? "Đã cập nhật sản phẩm!" : "Đã thêm sản phẩm!");
        delete modal.dataset.editingId; // Xóa cờ edit
    }

    // Xử lý ảnh nếu có
    if (imageInput.files && imageInput.files[0]) {
        let file = imageInput.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            saveProductToLocal(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveProductToLocal(null);
    }
}



// Gán sự kiện cho nút Lưu
document.addEventListener("DOMContentLoaded", function () {
	const btnSave = document.querySelector(".btn-save");
	btnSave.addEventListener("click", function (e) {
		e.preventDefault();
		saveProduct();
	});
});

