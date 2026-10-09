// Dữ liệu trang phục cập nhật (Thêm ảnh thật & Ý nghĩa cho sinh viên)
const outfits = [
    {
        id: "nguthan",
        name: "Áo ngũ thân",
        subtitle: "Trang phục thường nhật",
        origin: "Hình thành ở Đàng Trong giữa thế kỷ 18, dưới thời chúa Nguyễn Phúc Khoát (khoảng 1744); đến thời vua Minh Mạng được ban lệnh phổ biến cho cả nam và nữ. Là tiền thân của áo dài hiện đại.",
        features: "5 thân áo ráp dọc — 2 thân trước, 2 thân sau nối bằng đường sống áo chính giữa, và 1 'thân con' giấu dưới vạt trước bên phải. Cài khuy bên vai phải (thường 5 khuy). Không chiết eo, tà xòe.",
        usage: "Dạng áo phổ biến nhất thời Nguyễn, từ hoàng tộc, quý tộc đến dân thường. Mặc hằng ngày, dịp Tết, lễ hội, tiếp khách.",
        meaning: "Bốn thân áo ở vạt trước và vạt sau tượng trưng cho tứ thân phụ mẫu, thân thứ năm nằm bên trong tượng trưng cho người mặc – nhắc nhở về đạo hiếu. Năm khuy là ngũ thường Nhân – Lễ – Nghĩa – Trí – Tín. Rất phù hợp cho học sinh, sinh viên mặc dịp Tết, lễ hội, hoặc chụp ảnh kỷ yếu.",
        accessories: ["Khăn vấn", "Quạt", "Guốc mộc", "Túi gấm"],
        img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Femme_annamite_coiffure_tonkin.jpg",
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
        meaning: "Còn gọi là áo ngũ thân lập lĩnh tay thụng (áo năm thân, cổ đứng, tay rộng). Đây là lễ phục trang trọng thời Nguyễn. Lựa chọn tuyệt vời cho các bạn trẻ trong lễ tốt nghiệp, khai giảng, Tết, hoặc các ngày hội Việt phục.",
        accessories: ["Khăn xếp", "Guốc mộc", "Quạt"],
        img: "https://upload.wikimedia.org/wikipedia/commons/6/62/Rio_m%C3%A3_ch%C3%A2u_%C3%A1o_t%E1%BA%A5c.jpg",
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
        meaning: "Tên gọi xuất phát từ phần cổ áo hình chữ nhật trước ngực. Năm 1807 được quy định là trang phục triều đình; màu sắc và hoa văn (phượng, sen, mây) phân theo phẩm cấp. Đi kèm khăn vành. Thích hợp cho lễ hội, chụp ảnh, và tìm hiểu mỹ thuật cung đình Huế.",
        accessories: ["Khăn vành", "Trâm cài", "Hài thêu"],
        img: "https://upload.wikimedia.org/wikipedia/commons/9/95/Nam_Ph%C6%B0%C6%A1ng_empress_of_Vietnam.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 40 L 150 40 L 180 180 L 20 180 Z" fill="#B35A42"/>
                <rect x="75" y="40" width="50" height="70" fill="#EBD2B5"/>
                <circle cx="100" cy="75" r="15" fill="#B35A42"/>
                <path d="M 75 40 L 100 65 L 125 40" stroke="#C49378" stroke-width="4" fill="none"/>
              </svg>`
    }
];

// Biến lưu trạng thái
let currentItem = null;
let selectedAccessories = [];
let currentTab = 'origin';
let currentFilterCategory = 'all';
let currentSearchQuery = '';

// 1. Navigation
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// 2. Render danh sách sản phẩm (có Fallback SVG)
function renderCollections() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    
    const filteredOutfits = outfits.filter(item => {
        const matchCategory = currentFilterCategory === 'all' || item.id === currentFilterCategory;
        const matchSearch = item.name.toLowerCase().includes(currentSearchQuery) || 
                            item.subtitle.toLowerCase().includes(currentSearchQuery);
        return matchCategory && matchSearch;
    });

    if (filteredOutfits.length === 0) {
        list.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); font-size: 14px; padding: 20px;">Không tìm thấy trang phục phù hợp.</p>';
        return;
    }

    filteredOutfits.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openDetail(item.id);
        
        // Truyền thẳng SVG làm fallback qua innerHTML nếu ảnh lỗi
        const fallbackAction = `this.onerror=null; this.parentElement.innerHTML = outfits.find(o=>o.id==='${item.id}').svg;`;
        
        card.innerHTML = `
            <div class="product-img">
                <img src="${item.img}" alt="${item.name}" loading="lazy" class="real-img" onerror="${fallbackAction}">
            </div>
            <div class="product-info">
                <h4>${item.name}</h4>
                <p>${item.subtitle}</p>
            </div>
            <button class="add-btn anim-btn">+</button>
        `;
        list.appendChild(card);
    });
}

// 3. Logic Bộ lọc
function setCategory(catId) {
    currentFilterCategory = catId;
    document.querySelectorAll('.category').forEach(el => el.classList.remove('active'));
    document.getElementById('cat-' + catId).classList.add('active');
    renderCollections();
}

// 4. Tìm kiếm
function handleSearch(query) {
    currentSearchQuery = query.toLowerCase().trim();
    renderCollections();
}

// 5. Mở màn hình Detail
function openDetail(id) {
    currentItem = outfits.find(o => o.id === id);
    selectedAccessories = [];
    currentTab = 'origin'; 
    
    // Đổ hình ảnh thật vào màn Detail
    const fallbackDetail = `this.onerror=null; this.parentElement.innerHTML = currentItem.svg;`;
    const detailImgHTML = `
        <div class="detail-image-wrapper">
            <img src="${currentItem.img}" alt="${currentItem.name}" class="real-img" onerror="${fallbackDetail}">
        </div>
        <div class="img-caption">Ảnh: Wikimedia Commons</div>
    `;
    document.getElementById('detail-image').innerHTML = detailImgHTML;
    document.getElementById('detail-title').innerText = currentItem.name;
    
    // Render Phụ kiện
    const accContainer = document.getElementById('detail-accessories');
    accContainer.innerHTML = '';
    currentItem.accessories.forEach(acc => {
        const pill = document.createElement('div');
        pill.className = 'pill anim-btn';
        pill.innerText = acc;
        pill.onclick = () => toggleAccessory(pill, acc);
        accContainer.appendChild(pill);
    });

    updateTabUI();
    navigateTo('detail-screen');
}

// 6. Chọn phụ kiện
function toggleAccessory(element, accessoryName) {
    if (selectedAccessories.includes(accessoryName)) {
        selectedAccessories = selectedAccessories.filter(a => a !== accessoryName);
        element.classList.remove('active');
    } else {
        selectedAccessories.push(accessoryName);
        element.classList.add('active');
    }
}

// 7. Chuyển đổi Tabs & Animation
function switchTab(tabId) {
    currentTab = tabId;
    updateTabUI();
}

function updateTabUI() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    let content = "";
    if (currentTab === 'origin') {
        tabs[0].classList.add('active');
        content = currentItem.origin;
    } else if (currentTab === 'features') {
        tabs[1].classList.add('active');
        content = currentItem.features;
    } else if (currentTab === 'usage') {
        tabs[2].classList.add('active');
        content = currentItem.usage;
    } else {
        tabs[3].classList.add('active');
        content = currentItem.meaning;
    }
    
    // Kích hoạt hiệu ứng Fade-in-up mượt mà
    const descEl = document.getElementById('detail-description');
    
    // Reset animation bằng cách gỡ class, ép reflow, rồi gắn lại
    descEl.classList.remove('fade-in-up');
    void descEl.offsetWidth; 
    
    descEl.innerText = content;
    descEl.classList.add('fade-in-up');
}

// 8. Logic Kết quả phối đồ (Modal)
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
