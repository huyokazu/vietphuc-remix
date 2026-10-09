// Dữ liệu loại trang phục
const types = [
    { 
        id: 'nguthan', name: 'Áo Ngũ Thân', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Femme_annamite_coiffure_tonkin.jpg',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M 60 40 L 140 40 L 170 180 L 100 180 L 100 60 L 100 180 L 30 180 Z" fill="#D5A992"/><path d="M 100 40 L 100 180" stroke="#fff" stroke-width="2" opacity="0.5"/><circle cx="115" cy="50" r="3" fill="#3B2A22"/><circle cx="120" cy="70" r="3" fill="#3B2A22"/><circle cx="120" cy="90" r="3" fill="#3B2A22"/><rect x="85" y="25" width="30" height="15" fill="#3B2A22" rx="2"/></svg>`
    },
    { 
        id: 'aotac', name: 'Áo Tấc', img: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Rio_m%C3%A3_ch%C3%A2u_%C3%A1o_t%E1%BA%A5c.jpg',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M 70 40 L 130 40 L 150 180 L 50 180 Z" fill="#C49378"/><path d="M 70 40 L 20 50 L 20 120 L 60 120 Z" fill="#C49378" opacity="0.8"/><path d="M 130 40 L 180 50 L 180 120 L 140 120 Z" fill="#C49378" opacity="0.8"/><path d="M 100 40 L 100 180" stroke="#fff" stroke-width="2" opacity="0.4"/><rect x="85" y="25" width="30" height="15" fill="#3B2A22" rx="2"/></svg>`
    },
    { 
        id: 'nhatbinh', name: 'Nhật Bình', img: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Nam_Ph%C6%B0%C6%A1ng_empress_of_Vietnam.jpg',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M 50 40 L 150 40 L 180 180 L 20 180 Z" fill="#B35A42"/><rect x="75" y="40" width="50" height="70" fill="#EBD2B5"/><circle cx="100" cy="75" r="15" fill="#B35A42"/><path d="M 75 40 L 100 65 L 125 40" stroke="#C49378" stroke-width="4" fill="none"/></svg>`
    },
    { 
        id: 'giaolinh', name: 'Áo Giao Lĩnh', img: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/%C3%81o_giao_l%C4%A9nh_postcard.jpg',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#E6C8B8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#3B2A22">Giao Lĩnh</text></svg>`
    },
    { 
        id: 'vienlinh', name: 'Áo Viên Lĩnh', img: null,
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#E6C8B8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#3B2A22">Viên Lĩnh</text></svg>`
    }
];

// Hàm tự động sinh 100+ dữ liệu trang phục
function generateMockData() {
    const colors = ['Đỏ', 'Xanh', 'Be', 'Vàng', 'Trắng', 'Đen'];
    const events = ['Cưới hỏi', 'Lễ hội', 'Dạo phố', 'Chụp ảnh kỷ yếu', 'Sự kiện văn hóa'];
    const accessoriesData = ['Khăn vấn', 'Quạt', 'Guốc mộc', 'Túi gấm', 'Khăn xếp', 'Trâm cài', 'Hài thêu', 'Kiềng cổ', 'Nón lá', 'Ngọc bội'];

    const mockData = [];
    
    for (let i = 1; i <= 100; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const event = events[Math.floor(Math.random() * events.length)];
        
        // Random 3 - 5 phụ kiện cho mỗi áo
        const shuffledAcc = accessoriesData.sort(() => 0.5 - Math.random());
        const itemAcc = shuffledAcc.slice(0, Math.floor(Math.random() * 3) + 3);

        mockData.push({
            id: 'item_' + i,
            categoryId: type.id,
            name: `${type.name} màu ${color}`,
            subtitle: `Dịp: ${event}`,
            origin: `Dòng trang phục ${type.name} mang đậm dấu ấn lịch sử, được phục dựng tinh xảo. Màu ${color} mang lại cảm giác giao giao thoa giữa truyền thống và hiện đại.`,
            features: `Thiết kế chuẩn form dáng truyền thống, tối giản hóa các chi tiết rườm rà. Chất liệu lụa/tơ mềm mại, màu sắc ${color} thanh lịch và tôn da.`,
            usage: `Rất phù hợp và được đề xuất cho các dịp: ${event}. Dễ dàng phối hợp với các phụ kiện đi kèm để tạo cá tính riêng.`,
            meaning: `Trang phục không chỉ là áo quần, mà còn mang ý nghĩa tiếp nối các giá trị văn hóa cốt lõi, giáo dục đạo lý làm người. Đặc biệt tôn vinh nét đẹp sinh viên trong các sự kiện ${event}.`,
            accessories: itemAcc,
            img: type.img,
            svg: type.svg
        });
    }
    
    // Đảm bảo đưa các áo truyền thống chính xác lên đầu danh sách
    mockData.unshift(
        {
            id: 'nguthan_goc', categoryId: 'nguthan', name: "Áo ngũ thân truyền thống", subtitle: "Trang phục thường nhật",
            origin: "Hình thành ở Đàng Trong giữa thế kỷ 18, dưới thời chúa Nguyễn Phúc Khoát. Là tiền thân của áo dài hiện đại.",
            features: "5 thân áo ráp dọc, cài khuy bên vai phải (thường 5 khuy). Không chiết eo, tà xòe.",
            usage: "Mặc hằng ngày, dịp Tết, lễ hội, tiếp khách.",
            meaning: "Bốn thân áo tượng trưng cho tứ thân phụ mẫu, thân thứ năm tượng trưng cho người mặc – nhắc nhở đạo hiếu.",
            accessories: ["Khăn vấn", "Quạt", "Guốc mộc", "Túi gấm"], img: types[0].img, svg: types[0].svg
        },
        {
            id: 'aotac_goc', categoryId: 'aotac', name: "Áo tấc Mã Châu", subtitle: "Lễ phục trang trọng",
            origin: "Biến thể của áo ngũ thân, còn gọi là 'áo ngũ thân tay thụng'; thịnh hành thời Nguyễn.",
            features: "Cấu trúc ngũ thân nhưng tay áo rộng, thụng. Thường may bằng lụa, gấm.",
            usage: "Dùng trong lễ tế, cưới hỏi, Tết, các dịp lễ lạt.",
            meaning: "Lễ phục trang trọng thời Nguyễn. Lựa chọn tuyệt vời cho các bạn trẻ trong lễ tốt nghiệp, khai giảng.",
            accessories: ["Khăn xếp", "Guốc mộc", "Quạt"], img: types[1].img, svg: types[1].svg
        }
    );

    return mockData;
}

const outfits = generateMockData();

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

// 2. Render danh sách sản phẩm (An toàn qua DOM)
function renderCollections() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    
    const filteredOutfits = outfits.filter(item => {
        const matchCategory = currentFilterCategory === 'all' || item.categoryId === currentFilterCategory;
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
        
        // Khởi tạo thẻ bên trong, để trống phần chứa ảnh
        card.innerHTML = `
            <div class="product-img" id="img-container-${item.id}"></div>
            <div class="product-info">
                <h4>${item.name}</h4>
                <p>${item.subtitle}</p>
            </div>
            <button class="add-btn anim-btn">+</button>
        `;
        list.appendChild(card);

        // Chèn ảnh thông qua CreateElement để bắt lỗi sạch sẽ
        const imgContainer = card.querySelector('.product-img');
        if (item.img) {
            const imgEl = document.createElement('img');
            imgEl.src = item.img;
            imgEl.alt = item.name;
            imgEl.loading = 'lazy';
            imgEl.className = 'real-img';
            imgEl.addEventListener('error', function() {
                imgContainer.innerHTML = item.svg;
            });
            imgContainer.appendChild(imgEl);
        } else {
            imgContainer.innerHTML = item.svg;
        }
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

// 5. Mở màn hình Detail (An toàn qua DOM)
function openDetail(id) {
    currentItem = outfits.find(o => o.id === id);
    selectedAccessories = [];
    currentTab = 'origin'; 
    
    const detailImgContainer = document.getElementById('detail-image');
    detailImgContainer.innerHTML = ''; // Xóa ảnh cũ
    
    if (currentItem.img) {
        const wrapper = document.createElement('div');
        wrapper.className = 'detail-image-wrapper';
        
        const imgEl = document.createElement('img');
        imgEl.src = currentItem.img;
        imgEl.alt = currentItem.name;
        imgEl.className = 'real-img';
        imgEl.addEventListener('error', function() {
            wrapper.innerHTML = currentItem.svg;
        });
        
        wrapper.appendChild(imgEl);
        detailImgContainer.appendChild(wrapper);
        
        const caption = document.createElement('div');
        caption.className = 'img-caption';
        caption.innerText = 'Ảnh: Wikimedia Commons';
        detailImgContainer.appendChild(caption);
    } else {
        detailImgContainer.innerHTML = `
            <div class="detail-image-wrapper">
                ${currentItem.svg}
            </div>
            <div class="img-caption">Ảnh minh họa (Đang cập nhật)</div>
        `;
    }
    
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
    
    const descEl = document.getElementById('detail-description');
    descEl.classList.remove('fade-in-up');
    void descEl.offsetWidth; 
    descEl.innerText = content;
    descEl.classList.add('fade-in-up');
}

// 8. Logic Kết quả phối đồ (Modal)
function showMixResult() {
    const textEl = document.getElementById('mix-result-text');
    if (selectedAccessories.length === 0) {
        textEl.innerText = `Bạn đang chọn trang phục: ${currentItem.name}, chưa kết hợp thêm phụ kiện nào. Hãy thử chọn thêm để bộ đồ nổi bật hơn nhé!`;
    } else {
        textEl.innerText = `Tuyệt vời! Bạn đã chọn phối ${currentItem.name} cùng với: ${selectedAccessories.join(', ')}. Một sự kết hợp mang đậm dấu ấn cá nhân và tôn vinh văn hóa!`;
    }
    document.getElementById('mix-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('mix-modal').classList.remove('active');
}

// Khởi tạo render danh sách khi load trang
document.addEventListener('DOMContentLoaded', () => {
    renderCollections();
});
