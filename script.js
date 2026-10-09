// Cấu trúc nội dung chi tiết theo từng loại
const categoryDetails = {
    nhatbinh: {
        origin: 'Năm 1807 vua Gia Long quy định thành trang phục triều đình; là lễ phục của hoàng hậu, công chúa, mệnh phụ triều Nguyễn.',
        features: 'Cổ áo lớn hình chữ nhật trước ngực, thêu phượng, sen, mây; màu sắc theo phẩm cấp; đi kèm khăn vành.',
        usage: 'Sử dụng trong các dịp lễ lớn, tế giao, triều hội.',
        meaning: 'Đại diện cho phẩm hạnh và địa vị cao quý. Lời khuyên chung cho Gen Z: hiểu ý nghĩa để mặc đúng dịp, phối phụ kiện (khăn vấn, khăn vành, quạt, guốc mộc, túi gấm) giữ bản sắc nhưng vẫn cá tính.',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M 50 40 L 150 40 L 180 180 L 20 180 Z" fill="#B35A42"/><rect x="75" y="40" width="50" height="70" fill="#EBD2B5"/><circle cx="100" cy="75" r="15" fill="#B35A42"/><path d="M 75 40 L 100 65 L 125 40" stroke="#C49378" stroke-width="4" fill="none"/></svg>`
    },
    aotac: {
        origin: 'Biến thể của áo ngũ thân (áo ngũ thân lập lĩnh tay thụng), thịnh hành thời Nguyễn.',
        features: 'Áo năm thân, cổ đứng, tay rộng thụng.',
        usage: 'Lễ phục trang trọng trong lễ tế, cưới hỏi, Tết, mừng thọ; ngày nay hợp lễ tốt nghiệp, khai giảng.',
        meaning: 'Thể hiện sự thành kính, nghiêm cẩn. Lời khuyên chung cho Gen Z: hiểu ý nghĩa để mặc đúng dịp, phối phụ kiện (khăn vấn, khăn vành, quạt, guốc mộc, túi gấm) giữ bản sắc nhưng vẫn cá tính.',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M 70 40 L 130 40 L 150 180 L 50 180 Z" fill="#C49378"/><path d="M 70 40 L 20 50 L 20 120 L 60 120 Z" fill="#C49378" opacity="0.8"/><path d="M 130 40 L 180 50 L 180 120 L 140 120 Z" fill="#C49378" opacity="0.8"/><path d="M 100 40 L 100 180" stroke="#fff" stroke-width="2" opacity="0.4"/><rect x="85" y="25" width="30" height="15" fill="#3B2A22" rx="2"/></svg>`
    },
    nguthan: {
        origin: 'Trang phục phổ biến nhất thời Nguyễn, tiền thân của áo dài hiện đại ngày nay.',
        features: 'Cổ đứng, cài khuy vai phải, áo có 5 thân (4 thân ngoài, 1 thân con ẩn trong).',
        usage: 'Mặc hằng ngày, dịp Tết, lễ hội, tiếp khách, các hoạt động văn hóa.',
        meaning: 'Bốn thân tượng trưng tứ thân phụ mẫu, thân thứ năm là người mặc; năm khuy là ngũ thường Nhân – Lễ – Nghĩa – Trí – Tín. Lời khuyên chung cho Gen Z: hiểu ý nghĩa để mặc đúng dịp, phối phụ kiện (khăn vấn, khăn vành, quạt, guốc mộc, túi gấm) giữ bản sắc nhưng vẫn cá tính.',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M 60 40 L 140 40 L 170 180 L 100 180 L 100 60 L 100 180 L 30 180 Z" fill="#D5A992"/><path d="M 100 40 L 100 180" stroke="#fff" stroke-width="2" opacity="0.5"/><circle cx="115" cy="50" r="3" fill="#3B2A22"/><circle cx="120" cy="70" r="3" fill="#3B2A22"/><circle cx="120" cy="90" r="3" fill="#3B2A22"/><rect x="85" y="25" width="30" height="15" fill="#3B2A22" rx="2"/></svg>`
    },
    giaolinh: {
        origin: 'Tồn tại lâu đời trong lịch sử Việt, có từ trước khi áo ngũ thân ra đời.',
        features: 'Áo cổ chéo, vạt trái đè lên vạt phải.',
        usage: 'Gắn với sĩ tử, thư sinh, dùng trong lễ vinh quy hoặc lễ nghi truyền thống.',
        meaning: 'Thể hiện tính học thuật, khiêm nhường. Lời khuyên chung cho Gen Z: hiểu ý nghĩa để mặc đúng dịp, phối phụ kiện (khăn vấn, khăn vành, quạt, guốc mộc, túi gấm) giữ bản sắc nhưng vẫn cá tính.',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#E6C8B8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#3B2A22">Giao Lĩnh</text></svg>`
    },
    cachtan: {
        origin: 'Phát triển từ áo ngũ thân vào thập niên 1930 (phong trào Lemur, Lê Phổ).',
        features: 'Dáng ôm thanh mảnh, thiết kế tối giản, chất liệu hiện đại đa dạng.',
        usage: 'Trang phục của học sinh, sinh viên trong lễ khai giảng, tốt nghiệp, Tết, dạo phố.',
        meaning: 'Giao thoa giữa nét đẹp truyền thống và phong cách hiện đại. Lời khuyên chung cho Gen Z: hiểu ý nghĩa để mặc đúng dịp, phối phụ kiện (khăn vấn, khăn vành, quạt, guốc mộc, túi gấm) giữ bản sắc nhưng vẫn cá tính.',
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#E6C8B8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#3B2A22">Cách Tân</text></svg>`
    }
};

const accessoriesPool = ['Khăn vấn', 'Quạt', 'Guốc mộc', 'Túi gấm', 'Khăn xếp', 'Trâm cài', 'Hài thêu', 'Kiềng cổ', 'Nón lá', 'Ngọc bội'];

// Dữ liệu 30 URL cố định
const rawItems = [
    { id: 1, categoryId: 'nhatbinh', name: 'Hoàng hậu Nam Phương mặc áo Nhật Bình, khăn vành', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Nam_Ph%C6%B0%C6%A1ng_empress_of_Vietnam.jpg/960px-Nam_Ph%C6%B0%C6%A1ng_empress_of_Vietnam.jpg' },
    { id: 2, categoryId: 'nhatbinh', name: 'Áo vua, áo hoàng hậu và áo phi tần thời Nguyễn (hiện vật trưng bày)', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/%C3%81o_vua.jpg/960px-%C3%81o_vua.jpg' },
    { id: 3, categoryId: 'nhatbinh', name: 'Vua Bảo Đại và Hoàng hậu Nam Phương trong lễ phục', img: 'https://upload.wikimedia.org/wikipedia/commons/6/64/B%E1%BA%A3o_%C4%90%E1%BA%A1i_%26_Nam_Ph%C6%B0%C6%A1ng.jpg' },
    { id: 4, categoryId: 'nhatbinh', name: 'Phu nhân quan lại (bà Võ Chuẩn) trong lễ phục mệnh phụ', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/PF0016699_Epouse_d%27un_mandarin_annamite.jpg/960px-PF0016699_Epouse_d%27un_mandarin_annamite.jpg' },
    { id: 5, categoryId: 'aotac', name: 'Triều phục quan lại triều Nguyễn', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Quanphuc.JPG/960px-Quanphuc.JPG' },
    { id: 6, categoryId: 'aotac', name: 'Áo tấc may bằng lụa Mã Châu (Quảng Nam)', img: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Rio_m%C3%A3_ch%C3%A2u_%C3%A1o_t%E1%BA%A5c.jpg' },
    { id: 7, categoryId: 'aotac', name: 'Hoàng thân Nguyễn Phúc Bửu Thạch và đại thần Phạm Gia Thụy mặc lễ phục', img: 'https://upload.wikimedia.org/wikipedia/commons/5/59/%C3%81o_t%E1%BA%A5c_b%C3%A1t_b%E1%BA%A3o_m%C3%A3ng_b%C3%A0o.jpeg' },
    { id: 8, categoryId: 'aotac', name: 'Thượng thư Tôn Thất Đàn trong đại lễ phục', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Mandarins_annamites_en_costume_de_c%C3%A9r%C3%A9monie.jpg/960px-Mandarins_annamites_en_costume_de_c%C3%A9r%C3%A9monie.jpg' },
    { id: 9, categoryId: 'aotac', name: 'Quan lại triều đình Huế', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Hu%C3%A9._Les_mandarins_de_la_Cour_d%27Annam.jpg/960px-Hu%C3%A9._Les_mandarins_de_la_Cour_d%27Annam.jpg' },
    { id: 10, categoryId: 'aotac', name: 'Quan lại Huế trong lễ phục (ảnh 1884–1885)', img: 'https://upload.wikimedia.org/wikipedia/commons/4/47/FR_ANOM_49Fi8-172_Mandarin_annamite_de_Hu%C3%AA_en_costume_de_c%C3%A9r%C3%A9monie.jpg' },
    { id: 11, categoryId: 'aotac', name: 'Cụ bà trong trang phục mừng thượng thọ', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/C%E1%BB%A5_b%C3%A0_trong_trang_ph%E1%BB%A5c_th%C6%B0%E1%BB%A3ng_th%E1%BB%8D_2.jpg/960px-C%E1%BB%A5_b%C3%A0_trong_trang_ph%E1%BB%A5c_th%C6%B0%E1%BB%A3ng_th%E1%BB%8D_2.jpg' },
    { id: 12, categoryId: 'aotac', name: 'Cụ ông trong trang phục mừng thượng thọ', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/C%E1%BB%A5_%C3%B4ng_trong_trang_ph%E1%BB%A5c_th%C6%B0%E1%BB%A3ng_th%E1%BB%8D.jpg/960px-C%E1%BB%A5_%C3%B4ng_trong_trang_ph%E1%BB%A5c_th%C6%B0%E1%BB%A3ng_th%E1%BB%8D.jpg' },
    { id: 13, categoryId: 'nguthan', name: 'Phụ nữ Bắc Kỳ mặc áo ngũ thân (ảnh thế kỷ 19)', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Femme_annamite_coiffure_tonkin.jpg' },
    { id: 14, categoryId: 'nguthan', name: 'Chân dung quan Vi Văn Định mặc áo ngũ thân', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Portrait_of_Mandarin_Vi_V%C4%83n_%C4%90%E1%BB%8Bnh.jpg' },
    { id: 15, categoryId: 'nguthan', name: 'Ông Nguyễn Văn Huyên và bà Vi Kim Ngọc trong đám cưới năm 1936', img: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/C%E1%BB%91_b%E1%BB%99_tr%C6%B0%E1%BB%9Fng_Nguy%E1%BB%85n_V%C4%83n_Huy%C3%AAn_v%C3%A0_v%E1%BB%A3.jpg' },
    { id: 16, categoryId: 'nguthan', name: 'Phụ nữ Nam Kỳ trong trang phục thường ngày (ảnh Émile Gsell)', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Annam%2C_Cochinchine._Femme_Annamite_-_costume_ordinaire_-_%28photogr._Emile_Gsell%29_%3B_%28photogr._reprod._par_Molt%C3%A9ni_pour_la_conf%C3%A9rence_donn%C3%A9e_par%29_Tran_Nguon_Han_-_btv1b5968077b.jpg/960px-thumbnail.jpg' },
    { id: 17, categoryId: 'nguthan', name: 'Phụ nữ khá giả ở Hà Nội (ảnh màu autochrome)', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Une_femme_de_classe_ais%C3%A9e_-_A5207.jpg/960px-Une_femme_de_classe_ais%C3%A9e_-_A5207.jpg' },
    { id: 18, categoryId: 'nguthan', name: 'Thiếu nữ khá giả ở Hà Nội (ảnh màu autochrome)', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Une_jeune_femme_de_classe_ais%C3%A9e_-_A6657.jpg/960px-Une_jeune_femme_de_classe_ais%C3%A9e_-_A6657.jpg' },
    { id: 19, categoryId: 'nguthan', name: 'Phụ nữ Sài Gòn xưa (Bảo tàng Metropolitan)', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Femme_Annamite%2C_Sa%C3%AFgon%2C_Cochinchine_MET_DP151624.jpg/960px-Femme_Annamite%2C_Sa%C3%AFgon%2C_Cochinchine_MET_DP151624.jpg' },
    { id: 20, categoryId: 'nguthan', name: 'Vi Văn Định lúc 17 tuổi (1896)', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Vi_V%C4%83n_%C4%90%E1%BB%8Bnh_l%C3%BAc_17_tu%E1%BB%95i.jpg/960px-Vi_V%C4%83n_%C4%90%E1%BB%8Bnh_l%C3%BAc_17_tu%E1%BB%95i.jpg' },
    { id: 21, categoryId: 'giaolinh', name: 'Các tân tú tài mặc áo giao lĩnh trong lễ vinh quy', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/%C3%81o_giao_l%C4%A9nh_postcard.jpg/960px-%C3%81o_giao_l%C4%A9nh_postcard.jpg' },
    { id: 22, categoryId: 'giaolinh', name: 'Áo giao lĩnh (áo giao lãnh) tái hiện', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Z1979333419734_16c12c5a51e6493d59e81f619aad2aee.jpg' },
    { id: 23, categoryId: 'giaolinh', name: 'Cổ phục Việt tại Thăng Long cổ trấn (1)', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/PQ_2022%2C_Th%C4%83ng_Long_c%E1%BB%95_tr%E1%BA%A5n_%28c%E1%BB%95_ph%E1%BB%A5c_Vi%E1%BB%87t%29_%281%29.jpg/960px-PQ_2022%2C_Th%C4%83ng_Long_c%E1%BB%95_tr%E1%BA%A5n_%28c%E1%BB%95_ph%E1%BB%A5c_Vi%E1%BB%87t%29_%281%29.jpg' },
    { id: 24, categoryId: 'giaolinh', name: 'Cổ phục Việt tại Thăng Long cổ trấn (2)', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/PQ_2022%2C_Th%C4%83ng_Long_c%E1%BB%95_tr%E1%BA%A5n_%28c%E1%BB%95_ph%E1%BB%A5c_Vi%E1%BB%87t%29_%282%29.jpg/960px-PQ_2022%2C_Th%C4%83ng_Long_c%E1%BB%95_tr%E1%BA%A5n_%28c%E1%BB%95_ph%E1%BB%A5c_Vi%E1%BB%87t%29_%282%29.jpg' },
    { id: 25, categoryId: 'giaolinh', name: 'Cổ phục Việt nữ tại Thăng Long cổ trấn', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/PQ_2022%2C_Th%C4%83ng_Long_c%E1%BB%95_tr%E1%BA%A5n_%28h%C3%B3a_trang_c%E1%BB%95_ph%E1%BB%A5c_Vi%E1%BB%87t_n%E1%BB%AF%29_%282%29.jpg/960px-PQ_2022%2C_Th%C4%83ng_Long_c%E1%BB%95_tr%E1%BA%A5n_%28h%C3%B3a_trang_c%E1%BB%95_ph%E1%BB%A5c_Vi%E1%BB%87t_n%E1%BB%AF%29_%282%29.jpg' },
    { id: 26, categoryId: 'giaolinh', name: 'Trang phục thư sinh tại Thăng Long cổ trấn', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/PQ_2022%2C_Th%C4%83ng_Long_c%E1%BB%95_tr%E1%BA%A5n_%28h%C3%B3a_trang_th%C6%B0_sinh%29.jpg/960px-PQ_2022%2C_Th%C4%83ng_Long_c%E1%BB%95_tr%E1%BA%A5n_%28h%C3%B3a_trang_th%C6%B0_sinh%29.jpg' },
    { id: 27, categoryId: 'cachtan', name: 'Áo dài và khăn vấn', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/%C3%81o_d%C3%A0i_%26_kh%C4%83n_v%E1%BA%A5n_2.jpg/960px-%C3%81o_d%C3%A0i_%26_kh%C4%83n_v%E1%BA%A5n_2.jpg' },
    { id: 28, categoryId: 'cachtan', name: 'Sinh viên Đại học Bách khoa Hà Nội mặc áo dài', img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/HUT_students_in_ao_dai.jpg' },
    { id: 29, categoryId: 'cachtan', name: 'Học sinh tái hiện không khí Tết cổ truyền', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Hansers_tim_hieu_Tet_Nguyen_Dan_16-02-2026_1771376448448.jpg/960px-Hansers_tim_hieu_Tet_Nguyen_Dan_16-02-2026_1771376448448.jpg' },
    { id: 30, categoryId: 'cachtan', name: 'Áo dài tại Văn Miếu – Quốc Tử Giám', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Temple_of_Literature_-_Ao_Dai_%28cropped%29.jpg/960px-Temple_of_Literature_-_Ao_Dai_%28cropped%29.jpg' }
];

// Tạo danh sách outfits bằng cách merge thông tin chung với dữ liệu thô
const outfits = rawItems.map(item => {
    const details = categoryDetails[item.categoryId];
    // Random 3 - 5 phụ kiện cho mỗi áo
    const shuffledAcc = accessoriesPool.slice().sort(() => 0.5 - Math.random());
    const itemAcc = shuffledAcc.slice(0, Math.floor(Math.random() * 3) + 3);
    
    let subtitle = '';
    switch(item.categoryId) {
        case 'nhatbinh': subtitle = 'Lễ phục Hoàng tộc'; break;
        case 'aotac': subtitle = 'Lễ phục trang trọng'; break;
        case 'nguthan': subtitle = 'Trang phục thường nhật'; break;
        case 'giaolinh': subtitle = 'Trang phục cổ phong'; break;
        case 'cachtan': subtitle = 'Giao thoa truyền thống'; break;
    }

    return {
        ...item,
        subtitle: subtitle,
        origin: details.origin,
        features: details.features,
        usage: details.usage,
        meaning: details.meaning,
        svg: details.svg,
        accessories: itemAcc
    };
});

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
