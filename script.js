// Dữ liệu trang phục (theo yêu cầu)
const outfits = [
    {
        id: "nguthan",
        name: "Áo ngũ thân",
        subtitle: "Trang phục thường nhật",
        origin: "Hình thành ở Đàng Trong giữa thế kỷ 18, dưới thời chúa Nguyễn Phúc Khoát (khoảng 1744); đến thời vua Minh Mạng được ban lệnh phổ biến cho cả nam và nữ. Là tiền thân của áo dài hiện đại.",
        features: "5 thân áo ráp dọc — 2 thân trước, 2 thân sau nối bằng đường sống áo chính giữa, và 1 'thân con' giấu dưới vạt trước bên phải. Cài khuy bên vai phải (thường 5 khuy). Không chiết eo, tà xòe.",
        usage: "Dạng áo phổ biến nhất thời Nguyễn, từ hoàng tộc, quý tộc đến dân thường. Mặc hằng ngày, dịp Tết, lễ hội, tiếp khách.",
        accessories: ["Khăn vấn", "Quạt", "Guốc mộc", "Túi gấm"],
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M 60 40 L 140 40 L 170 180 L 100 180 L 100 60 L 100 180 L 30 180 Z" fill="#D5A992"/>
                <path d="M 100 40 L 100 180" stroke="#fff" stroke-width="2" opacity="0.5"/>
                <circle cx="115" cy="50" r="3" fill="#3B2A22"/>
                <circle cx="120" cy="70" r="3" fill="#3B2A22"/>
                <circle cx="120" cy="90" r="3" fill="#3B2A22"/>
                <rect x="85" y="25" width="30" height="15" fill="#3B2A22" rx="2"/>
              </svg>`
    },
    {
        id: "aotac",
        name: "Áo tấc",
        subtitle: "Lễ phục trang trọng",
        origin: "Một biến thể của áo ngũ thân, còn gọi là 'áo ngũ thân tay thụng'; thịnh hành thời Nguyễn (đã có dạng áo tấc từ thời Lê).",
        features: "Cấu trúc ngũ thân nhưng tay áo rộng, thụng; 'tấc' là đơn vị đo xưa (khoảng 10 cm), gắn với độ rộng của tay áo. Thường may bằng lụa, gấm.",
        usage: "Lễ phục trang trọng — dùng trong lễ tế, cưới hỏi, Tết, các dịp lễ lạt; ngày nay được giới trẻ mặc chụp ảnh Tết, lễ hội.",
        accessories: ["Khăn xếp", "Guốc mộc", "Quạt"],
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M 70 40 L 130 40 L 150 180 L 50 180 Z" fill="#C49378"/>
                <path d="M 70 40 L 20 50 L 20 120 L 60 120 Z" fill="#C49378" opacity="0.8"/>
                <path d="M 130 40 L 180 50 L 180 120 L 140 120 Z" fill="#C49378" opacity="0.8"/>
                <path d="M 100 40 L 100 180" stroke="#fff" stroke-width="2" opacity="0.4"/>
                <rect x="85" y="25" width="30" height="15" fill="#3B2A22" rx="2"/>
              </svg>`
    },
    {
        id: "nhatbinh",
        name: "Áo Nhật Bình",
        subtitle: "Trang phục hoàng tộc",
        origin: "Xuất hiện từ thời các chúa Nguyễn; năm 1807 dưới thời vua Gia Long được quy định chính thức là trang phục triều đình. Có ảnh hưởng họa tiết thời Thanh.",
        features: "Tên gọi đến từ phần cổ áo (lãnh) có hoa văn tạo thành hình chữ nhật/vuông trước ngực; thêu tay tinh xảo các đồ án. Màu sắc rực rỡ.",
        usage: "Áo thường triều của Hoàng thái hậu, Hoàng hậu, Công chúa; áo đại triều của phi tần; dùng dịp lễ lớn.",
        accessories: ["Khăn vành", "Trâm cài", "Hài thêu"],
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 40 L 150 40 L 180 180 L 20 180 Z" fill="#B35A42"/>
                <rect x="75" y="40" width="50" height="70" fill="#EBD2B5"/>
                <circle cx="100" cy="75" r="15" fill="#B35A42"/>
                <path d="M 75 40 L 100 65 L 125 40" stroke="#C49378" stroke-width="4" fill="none"/>
              </svg>`
    }
];

// Biến lưu trạng thái toàn cục
let currentItem = null;
let selectedAccessories = [];
let currentTab = 'origin';

// Trạng thái cho bộ lọc
let currentFilterCategory = 'all';
let currentSearchQuery = '';

// 1. Hàm chuyển màn hình (Navigation)
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// 2. Render danh sách sản phẩm ở màn Collections kết hợp Lọc
function renderCollections() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    
    // Lọc theo Danh mục và Từ khoá tìm kiếm
    const filteredOutfits = outfits.filter(item => {
        const matchCategory = currentFilterCategory === 'all' || item.id === currentFilterCategory;
        const matchSearch = item.name.toLowerCase().includes(currentSearchQuery) || 
                            item.subtitle.toLowerCase().includes(currentSearchQuery);
        return matchCategory && matchSearch;
    });

    // Thông báo nếu không tìm thấy
    if (filteredOutfits.length === 0) {
        list.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); font-size: 14px; padding: 20px;">Không tìm thấy trang phục phù hợp.</p>';
        return;
    }

    // Render HTML
    filteredOutfits.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openDetail(item.id);
        
        card.innerHTML = `
            <div class="product-img">
                ${item.svg}
            </div>
            <div class="product-info">
                <h4>${item.name}</h4>
                <p>${item.subtitle}</p>
            </div>
            <button class="add-btn">+</button>
        `;
        list.appendChild(card);
    });
}

// 3. Logic Bộ lọc danh mục
function setCategory(catId) {
    currentFilterCategory = catId;
    
    // Cập nhật UI nút active
    document.querySelectorAll('.category').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById('cat-' + catId).classList.add('active');
    
    renderCollections();
}

// 4. Logic Ô tìm kiếm
function handleSearch(query) {
    currentSearchQuery = query.toLowerCase().trim();
    renderCollections();
}

// 5. Mở màn hình Detail và nạp dữ liệu
function openDetail(id) {
    currentItem = outfits.find(o => o.id === id);
    selectedAccessories = []; // Reset phụ kiện
    currentTab = 'origin'; // Reset tab
    
    // Đổ dữ liệu tĩnh
    document.getElementById('detail-image').innerHTML = currentItem.svg;
    document.getElementById('detail-title').innerText = currentItem.name;
    
    // Render Phụ kiện (Pills)
    const accContainer = document.getElementById('detail-accessories');
    accContainer.innerHTML = '';
    currentItem.accessories.forEach(acc => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        pill.innerText = acc;
        pill.onclick = () => toggleAccessory(pill, acc);
        accContainer.appendChild(pill);
    });

    // Cập nhật Tab nội dung
    updateTabUI();
    
    // Chuyển màn hình
    navigateTo('detail-screen');
}

// 6. Logic chọn phụ kiện
function toggleAccessory(element, accessoryName) {
    if (selectedAccessories.includes(accessoryName)) {
        selectedAccessories = selectedAccessories.filter(a => a !== accessoryName);
        element.classList.remove('active');
    } else {
        selectedAccessories.push(accessoryName);
        element.classList.add('active');
    }
}

// 7. Chuyển đổi Tabs mô tả (Nguồn gốc / Đặc điểm / Sử dụng)
function switchTab(tabId) {
    currentTab = tabId;
    updateTabUI();
}

function updateTabUI() {
    // UI active classes
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    let content = "";
    if (currentTab === 'origin') {
        tabs[0].classList.add('active');
        content = currentItem.origin;
    } else if (currentTab === 'features') {
        tabs[1].classList.add('active');
        content = currentItem.features;
    } else {
        tabs[2].classList.add('active');
        content = currentItem.usage;
    }
    
    // Thêm animation nhẹ khi đổi text
    const descEl = document.getElementById('detail-description');
    descEl.style.opacity = 0;
    setTimeout(() => {
        descEl.innerText = content;
        descEl.style.opacity = 1;
    }, 150);
}

// 8. Logic "Xem kết quả phối đồ" (Modal)
function showMixResult() {
    const textEl = document.getElementById('mix-result-text');
    if (selectedAccessories.length === 0) {
        textEl.innerText = `Bạn đang chọn trang phục gốc: ${currentItem.name}, chưa kết hợp thêm phụ kiện nào. Hãy thử chọn thêm để bộ đồ nổi bật hơn nhé!`;
    } else {
        textEl.innerText = `Tuyệt vời! Bạn đã chọn phối ${currentItem.name} cùng với: ${selectedAccessories.join(', ')}. Một sự kết hợp mang đậm dấu ấn cá nhân và tôn vinh văn hóa!`;
    }
    document.getElementById('mix-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('mix-modal').classList.remove('active');
}

// Khởi tạo app
document.addEventListener('DOMContentLoaded', () => {
    renderCollections();
});
