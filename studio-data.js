// ================= DỮ LIỆU PHÒNG PHỐI ĐỒ (studio-data.js) =================

const STUDIO_OUTFITS = [
    {
        id: 'nguthan',
        name: 'Áo ngũ thân',
        gender: 'cả hai',
        formality: 3,
        short: 'Trang phục cổ truyền chuẩn mực thời Nguyễn, tượng trưng tứ thân phụ mẫu và ngũ thường.',
        defaultColors: ['#C48C71', '#3B2A22', '#2A4B7C', '#F4E8D1', '#1A1A1A']
    },
    {
        id: 'aotac',
        name: 'Áo tấc (Ngũ thân tay thụng)',
        gender: 'cả hai',
        formality: 5,
        short: 'Lễ phục trang trọng thời Nguyễn với tay thụng rộng, toát lên phong thái uy nghiêm và thành kính.',
        defaultColors: ['#A93226', '#1F618D', '#B7950B', '#515A5A', '#E8D0C3']
    },
    {
        id: 'nhatbinh',
        name: 'Áo Nhật Bình',
        gender: 'nữ',
        formality: 5,
        short: 'Triều phục và lễ phục cao quý của bậc hậu phi, công chúa và mệnh phụ triều đình Huế.',
        defaultColors: ['#C0392B', '#E59866', '#8E44AD', '#D4AC0D', '#16A085']
    },
    {
        id: 'giaolinh',
        name: 'Áo Giao Lĩnh',
        gender: 'cả hai',
        formality: 4,
        short: 'Dạng áo cổ chéo vạt trái đè vạt phải lâu đời của người Việt, gắn liền với giới nho sinh và nghi lễ cổ.',
        defaultColors: ['#2C3E50', '#7F8C8D', '#D5DBDB', '#935116', '#196F3D']
    },
    {
        id: 'cachtan',
        name: 'Áo dài cách tân',
        gender: 'cả hai',
        formality: 2,
        short: 'Sự kế thừa từ áo ngũ thân kết hợp đường nét thanh thoát của phong trào mỹ thuật hiện đại.',
        defaultColors: ['#FADBD8', '#D4EFDF', '#E8F8F5', '#FCF3CF', '#EAECEE']
    },
    {
        id: 'tuthan',
        name: 'Áo tứ thân',
        gender: 'nữ',
        formality: 3,
        short: 'Trang phục mộc mạc duyên dáng của phụ nữ Bắc Bộ, mặc cùng yếm đào, váy đụp và nón quai thao.',
        defaultColors: ['#6E2C00', '#7D6608', '#212F3D', '#BA4A00', '#F5EEF8']
    }
];

const STUDIO_EVENTS = [
    {
        id: 'tet',
        name: 'Tết Nguyên Đán',
        icon: '🧧',
        formality: 4,
        recommendedOutfits: ['aotac', 'nguthan', 'cachtan', 'nhatbinh', 'tuthan'],
        recommendedColors: ['#B22222', '#D4AF37', '#E88E77', '#2E8B57'],
        avoidColors: ['#000000', '#FFFFFF'],
        tip: 'Ưu tiên các gam màu tươi sáng, ấm áp tượng trưng cho may mắn, tài lộc và sự khởi đầu viên mãn.'
    },
    {
        id: 'cuoi_hoi',
        name: 'Lễ cưới / Ăn hỏi',
        icon: '💍',
        formality: 5,
        recommendedOutfits: ['nhatbinh', 'aotac', 'nguthan'],
        recommendedColors: ['#B22222', '#D4AF37', '#E88E77', '#D2B48C'],
        avoidColors: ['#000000', '#3B2A22'],
        tip: 'Áo tấc và Nhật Bình là lựa chọn hàng đầu cho cô dâu chú rể; khách mời nên chọn ngũ thân thanh lịch.'
    },
    {
        id: 'le_hoi',
        name: 'Lễ hội truyền thống',
        icon: '🏮',
        formality: 4,
        recommendedOutfits: ['tuthan', 'aotac', 'giaolinh', 'nguthan'],
        recommendedColors: ['#B22222', '#2E8B57', '#E0A96D', '#2B5B84'],
        avoidColors: ['#000000'],
        tip: 'Không khí lễ hội rất hợp với áo tứ thân duyên dáng ở hội làng hoặc áo tấc uy nghiêm khi trẩy hội lớn.'
    },
    {
        id: 'di_chua',
        name: 'Đi chùa / Lễ đình',
        icon: '🪷',
        formality: 4,
        recommendedOutfits: ['nguthan', 'aotac', 'giaolinh'],
        recommendedColors: ['#5C3A21', '#1F3A3D', '#EFEBD9', '#2F4F4F'],
        avoidColors: ['#B22222', '#E88E77'],
        tip: 'Cần sự thanh tịnh, trang nghiêm; ưu tiên các màu nền nã như nâu sồng, chàm, trắng ngà hoặc lam nhạt.'
    },
    {
        id: 'ky_yeu',
        name: 'Chụp ảnh kỷ yếu',
        icon: '🎓',
        formality: 3,
        recommendedOutfits: ['nguthan', 'aotac', 'cachtan', 'nhatbinh'],
        recommendedColors: ['#D2B48C', '#50C878', '#E88E77', '#EFEBD9', '#2B5B84'],
        avoidColors: ['#000000'],
        tip: 'Các bạn học sinh, sinh viên diện áo tấc hoặc ngũ thân tay chẽn sẽ mang lại vẻ đĩnh đạc và đậm dấu ấn tri thức.'
    },
    {
        id: 'ngay_hoi_truong',
        name: 'Ngày hội văn hoá trường học',
        icon: '🏛️',
        formality: 3,
        recommendedOutfits: ['cachtan', 'nguthan', 'tuthan', 'giaolinh'],
        recommendedColors: ['#E0A96D', '#50C878', '#B22222', '#D2B48C'],
        avoidColors: [],
        tip: 'Tự do thể hiện cá tính bằng cách phối phụ kiện trẻ trung nhưng cần tôn trọng nguyên tắc cổ phục.'
    },
    {
        id: 'dao_pho',
        name: 'Dạo phố / Cà phê',
        icon: '☕',
        formality: 1,
        recommendedOutfits: ['cachtan', 'nguthan'],
        recommendedColors: ['#D2B48C', '#EFEBD9', '#50C878', '#A26999'],
        avoidColors: ['#FFD700'],
        tip: 'Nên chọn áo ngũ thân tay chẽn bằng chất liệu lanh, xô nhẹ hoặc áo cách tân thoải mái vận động.'
    },
    {
        id: 'le_tang',
        name: 'Lễ tang / Giỗ chạp',
        icon: '🕯️',
        formality: 5,
        recommendedOutfits: ['nguthan', 'aotac'],
        recommendedColors: ['#000000', '#EFEBD9', '#5C3A21', '#1F3A3D'],
        avoidColors: ['#B22222', '#FFD700', '#E88E77', '#50C878'],
        tip: 'Bắt buộc dùng các tông màu tối, trầm mặc, tránh tuyệt đối các sắc màu sặc sỡ và hoa văn rực rỡ.'
    }
];

const STUDIO_REGIONS = [
    {
        id: 'bac_bo',
        name: 'Bắc Bộ',
        outfits: ['tuthan', 'giaolinh', 'nguthan'],
        note: 'Gắn liền với hình ảnh áo tứ thân mộc mạc vùng Kinh Bắc, yếm đào, nón quai thao và khăn mỏ quạ nghiêng che nụ cười.'
    },
    {
        id: 'trung_bo',
        name: 'Trung Bộ (Cố đô Huế)',
        outfits: ['nhatbinh', 'aotac', 'nguthan'],
        note: 'Chiếc nôi lễ nghi triều Nguyễn với chuẩn mực áo ngũ thân lập lĩnh, áo Nhật Bình lộng lẫy và nón bài thơ tao nhã.'
    },
    {
        id: 'nam_bo',
        name: 'Nam Bộ',
        outfits: ['nguthan', 'cachtan'],
        note: 'Phong thái khoáng đạt của phương Nam, ưa chuộng sự giản tiện, gắn liền với biến thể ngũ thân mát nhẹ và khăn rằn mộc mạc.'
    }
];

const STUDIO_STYLES = [
    {
        id: 'chuan_muc',
        name: 'Truyền thống chuẩn mực',
        description: 'Tôn trọng triệt để kết cấu, màu sắc, phom dáng và cách phối phụ kiện theo đúng tư liệu khảo cứu lịch sử.'
    },
    {
        id: 'co_phong',
        name: 'Cổ phong thanh nhã',
        description: 'Lấy cảm hứng từ thẩm mỹ cổ xưa, thiên về sự nhẹ nhàng, thơ mộng phù hợp chụp ảnh phong cảnh và lễ hội.'
    },
    {
        id: 'cach_tan',
        name: 'Cách tân hiện đại',
        description: 'Ứng dụng chất liệu tân thời, phom dáng tinh gọn giúp bạn trẻ dễ dàng hòa mình vào nhịp sống thường nhật.'
    },
    {
        id: 'toi_gian',
        name: 'Tối giản thuần túy',
        description: 'Lược bỏ bớt chi tiết cầu kỳ, tập trung vào vẻ đẹp hình khối, đường may sống áo và sắc thái màu nguyên bản.'
    },
    {
        id: 'pha_cach',
        name: 'Phá cách tôn trọng',
        description: 'Sáng tạo trong cách kết hợp phụ kiện đương đại nhưng giữ trọn phom áo gốc, không làm biến dạng giá trị cốt lõi.'
    }
];

const STUDIO_WEATHER = [
    {
        id: 'nang_nong',
        name: 'Nắng nóng',
        icon: '☀️',
        suggestion: 'Nên ưu tiên áo phom rộng rãi, tránh mặc quá nhiều lớp hoặc vải pha sợi tổng hợp gây bí bách.',
        fabrics: 'Tơ tằm tự nhiên, lụa Nha Xá, đũi mát, lanh, tơ sen'
    },
    {
        id: 'mat_me',
        name: 'Mát mẻ',
        icon: '🍃',
        suggestion: 'Thời tiết lý tưởng nhất để diện đầy đủ các lớp áo, từ áo lót trong đến áo thụng ngoài.',
        fabrics: 'Lụa Vạn Phúc, lụa Mã Châu, sa, the mỏng'
    },
    {
        id: 'se_lanh',
        name: 'Se lạnh',
        icon: '🧣',
        suggestion: 'Thích hợp diện các chất liệu dệt dày dặn, đứng phom để giữ ấm và tôn dáng uy nghi.',
        fabrics: 'Gấm cung đình, nhung then, dạ mỏng, lụa hai da'
    },
    {
        id: 'mua',
        name: 'Mưa ẩm',
        icon: '🌧️',
        suggestion: 'Hạn chế chọn tà áo quá dài hoặc tay thụng rộng quét đất; nên đi guốc mộc cao đế.',
        fabrics: 'Vải dệt sợi tự nhiên mau khô, vải nhuộm củ nâu, chàm bền màu'
    }
];

const STUDIO_COLORS = [
    { id: 'do_son', name: 'Đỏ son', hex: '#B22222', hue: 0, meaning: 'Tượng trưng cho sự thịnh vượng, quyền uy và may mắn ngập tràn.' },
    { id: 'vang_nghe', name: 'Vàng nghệ', hex: '#E0A96D', hue: 35, meaning: 'Sắc thái dân dã, ấm no, gần gũi với hồn quê và mùa màng bội thu.' },
    { id: 'xanh_luc', name: 'Xanh lục', hex: '#2E8B57', hue: 146, meaning: 'Đại diện cho sức sống non trẻ, sự sinh sôi nảy nở của cỏ cây non nước.' },
    { id: 'xanh_cham', name: 'Xanh chàm', hex: '#1F3A3D', hue: 185, meaning: 'Biểu tượng của đức tính cần cù, sự tĩnh tại và chiều sâu tâm tưởng.' },
    { id: 'nau_song', name: 'Nâu sồng / Nâu đất', hex: '#5C3A21', hue: 26, meaning: 'Gắn liền với đức tính cần lao, mộc mạc và sự thanh bần thuần hậu.' },
    { id: 'trang_nga', name: 'Trắng ngà', hex: '#EFEBD9', hue: 48, meaning: 'Sự thuần khiết, thanh cao và tao nhã của người quân tử.' },
    { id: 'den_tuyen', name: 'Đen tuyền', hex: '#000000', hue: 0, meaning: 'Sắc thái trang trọng, kiên định và uy nghiêm trong lễ tiết.' },
    { id: 'hong_dao', name: 'Hồng đào', hex: '#E88E77', hue: 12, meaning: 'Vẻ đẹp dịu dàng, e ấp và thanh xuân của người phụ nữ Việt.' },
    { id: 'xanh_ngoc', name: 'Xanh ngọc', hex: '#50C878', hue: 140, meaning: 'Mang phong thái quý phái, thanh khiết và vương giả tri thức.' },
    { id: 'tim_hoa_ca', name: 'Tím hoa cà', hex: '#A26999', hue: 310, meaning: 'Sắc màu hoài cổ xứ Huế, gợi nhớ nét đẹp kín đáo, thủy chung.' },
    { id: 'vang_hoang_bao', name: 'Vàng hoàng bào', hex: '#FFD700', hue: 51, meaning: 'Màu sắc tối thượng của hoàng quyền, chỉ dùng trong cung đình xưa.' },
    { id: 'be_lua', name: 'Be lụa', hex: '#D2B48C', hue: 34, meaning: 'Sắc màu trung tính sang trọng, tôn vinh độ bóng mượt tự nhiên của tơ tằm.' }
];

const STUDIO_ACCESSORIES = [
    { name: 'Khăn vấn', outfits: ['nguthan', 'cachtan', 'aotac'], note: 'Phổ biến cho nữ giới tạo nét thanh thoát đoan trang.' },
    { name: 'Khăn vành', outfits: ['nhatbinh'], note: 'Phụ kiện cung đình Huế chỉ đội kèm áo Nhật Bình.' },
    { name: 'Khăn xếp', outfits: ['nguthan', 'aotac'], note: 'Khăn quấn sẵn dùng cho nam giới thể hiện nét đĩnh đạc.' },
    { name: 'Khăn mỏ quạ', outfits: ['tuthan'], note: 'Cách thắt khăn đặc trưng hình mỏ quạ của thiếu nữ Kinh Bắc.' },
    { name: 'Nón lá', outfits: ['nguthan', 'cachtan', 'aotac', 'tuthan'], note: 'Vật dụng thân thuộc che nghiêng nét duyên truyền thống.' },
    { name: 'Nón quai thao', outfits: ['tuthan'], note: 'Chiếc nón tròn lớn kết hợp áo tứ thân trẩy hội mùa xuân.' },
    { name: 'Quạt xếp', outfits: ['nguthan', 'aotac', 'nhatbinh', 'giaolinh', 'cachtan'], note: 'Vừa tạo điểm nhấn tay cầm, vừa làm duyên khi giao tiếp.' },
    { name: 'Guốc mộc', outfits: ['nguthan', 'aotac', 'tuthan', 'cachtan', 'giaolinh'], note: 'Âm thanh gõ nhịp quen thuộc trên thềm đá cổ kính.' },
    { name: 'Hài thêu', outfits: ['nhatbinh', 'aotac'], note: 'Hài mũi cong thêu hoa văn tinh xảo dành cho dịp trọng thể.' },
    { name: 'Túi gấm', outfits: ['nguthan', 'aotac', 'nhatbinh', 'cachtan'], note: 'Túi thơm thêu tay nhỏ gọn mang bên hông tà áo.' },
    { name: 'Trâm cài', outfits: ['nhatbinh', 'tuthan', 'nguthan'], note: 'Điểm xuyết trên búi tóc giữ nét đài các, yêu kiều.' },
    { name: 'Kiềng cổ', outfits: ['cachtan', 'tuthan', 'nguthan'], note: 'Kiềng bạc hoặc vàng tôn đường nét cổ cao thanh tú.' },
    { name: 'Ngọc bội', outfits: ['aotac', 'giaolinh', 'nhatbinh'], note: 'Biểu tượng phẩm hạnh của người quân tử và mệnh phụ.' },
    { name: 'Yếm lót', outfits: ['tuthan'], note: 'Nội y truyền thống mặc lót bên trong áo tứ thân.' },
    { name: 'Thắt lưng bao', outfits: ['tuthan'], note: 'Dải lụa mềm buộc ngang eo buông rủ hai đầu tà áo.' }
];

const CULTURE_RULES = [
    {
        id: 'rule_nhatbinh_dao_pho',
        level: 'warning',
        when: { outfits: ['nhatbinh'], events: ['dao_pho'] },
        message: 'Áo Nhật Bình là đại lễ phục cung đình trang nghiêm, không phù hợp để mặc đi dạo phố hay la cà cà phê thường nhật.'
    },
    {
        id: 'rule_hoang_bao',
        level: 'warning',
        when: { colors: ['#FFD700'] },
        message: 'Màu vàng hoàng bào thời Nguyễn là sắc màu tối thượng thuộc về hoàng quyền, không nên lạm dụng tùy tiện trong trang phục thường dân.'
    },
    {
        id: 'rule_le_tang_mau_ruc',
        level: 'warning',
        when: { events: ['le_tang'], colors: ['#B22222', '#FFD700', '#E88E77', '#50C878'] },
        message: 'Tuyệt đối tránh sử dụng các gam màu rực rỡ như đỏ son, vàng chói khi tham gia lễ tang hoặc việc hiếu giỗ chạp.'
    },
    {
        id: 'rule_di_chua_kin_dao',
        level: 'warning',
        when: { events: ['di_chua'], colors: ['#B22222'] },
        message: 'Chốn tự viện thanh tịnh cần trang phục nền nã, kín đáo; tránh phối các sắc màu quá chói lọi hoặc lòe loẹt.'
    },
    {
        id: 'rule_khan_vanh_nhatbinh',
        level: 'warning',
        when: { accessories: ['Khăn vành'], outfits: ['nguthan', 'cachtan', 'tuthan'] },
        message: 'Khăn vành chỉ đi đồng bộ với áo Nhật Bình triều Nguyễn, không nên phối tùy tiện với áo ngũ thân thường nhật hay áo tứ thân.'
    },
    {
        id: 'rule_giao_linh_vat_ao',
        level: 'info',
        when: { outfits: ['giaolinh'] },
        message: 'Áo Giao Lĩnh cổ truyền Việt Nam mặc vạt trái đè vạt phải. Điểm phân biệt nằm ở dáng thụng đặc trưng, nếp cổ viền, khăn đội, phụ kiện và bối cảnh sử dụng thuần Việt.'
    },
    {
        id: 'rule_nham_lan_co_phuc',
        level: 'info',
        when: { outfits: ['nhatbinh', 'giaolinh'] },
        message: 'Cổ phục Việt có kết cấu lập lĩnh, lãnh áo chữ nhật và đường may sống áo đặc trưng; hãy tìm hiểu kỹ để phân biệt rạch ròi với Hanbok, Kimono hay Hán phục.'
    },
    {
        id: 'rule_yem_mac_ngoai',
        level: 'warning',
        when: { accessories: ['Yếm lót'], events: ['di_chua', 'le_tang'] },
        message: 'Yếm là y phục mặc lót bên trong của áo tứ thân; tuyệt đối không mặc yếm trần thiếu áo khoác ngoài khi đến nơi tôn nghiêm thờ phụng.'
    },
    {
        id: 'rule_khan_xep_nam',
        level: 'info',
        when: { accessories: ['Khăn xếp'], outfits: ['nhatbinh'] },
        message: 'Khăn xếp là phụ kiện đầu của nam giới khi diện áo ngũ thân hoặc áo tấc, không dùng chung với áo Nhật Bình nữ giới.'
    }
];

// Chuẩn hoá màu của STUDIO_EVENTS theo danh mục STUDIO_COLORS sẵn có
(function normalizeEventColors() {
    function hexToRgb(hex) {
        let clean = hex.replace('#', '');
        if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
        const num = parseInt(clean, 16);
        return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }

    function findClosestColor(targetHex) {
        const [r1, g1, b1] = hexToRgb(targetHex);
        let closestHex = STUDIO_COLORS[0].hex;
        let minDistance = Infinity;

        STUDIO_COLORS.forEach(c => {
            const [r2, g2, b2] = hexToRgb(c.hex);
            const dist = Math.hypot(r1 - r2, g1 - g2, b1 - b2);
            if (dist < minDistance) {
                minDistance = dist;
                closestHex = c.hex;
            }
        });
        return closestHex;
    }

    STUDIO_EVENTS.forEach(ev => {
        if (ev.recommendedColors) {
            ev.recommendedColors = [...new Set(ev.recommendedColors.map(findClosestColor))];
        }
        if (ev.avoidColors) {
            ev.avoidColors = [...new Set(ev.avoidColors.map(findClosestColor))];
        }
    });
})();
