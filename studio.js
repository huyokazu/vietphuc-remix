// ================= PHÒNG PHỐI ĐỒ (studio.js) =================

// Đính chính nội dung quy tắc giao lĩnh
(function fixCultureRule() {
    if (typeof CULTURE_RULES !== 'undefined') {
        const rule = CULTURE_RULES.find(r => r.id === 'rule_giao_linh_vat_ao');
        if (rule) {
            rule.message = 'Áo Giao Lĩnh Việt Nam mặc vạt trái đè vạt phải. Điểm đặc trưng phân biệt nằm ở dáng áo, cấu trúc cổ, khăn đội, phụ kiện đi kèm và ngữ cảnh sử dụng cổ truyền.';
        }
    }
})();

const CHARACTERS = [
    { id: 'nu', name: 'Nữ', icon: '👩' },
    { id: 'nam', name: 'Nam', icon: '👨' }
];

let studioState = {
    outfit: 'nguthan',
    event: 'tet',
    region: 'trung_bo',
    style: 'chuan_muc',
    weather: 'mat_me',
    character: 'nu',
    colors: ['#B22222', '#D2B48C'],
    accessories: []
};

function renderChips(containerId, items, stateKey, onChange) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    items.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `pill anim-btn ${studioState[stateKey] === item.id ? 'active' : ''}`;
        btn.innerText = (item.icon ? item.icon + ' ' : '') + item.name;
        btn.onclick = () => {
            studioState[stateKey] = item.id;
            renderChips(containerId, items, stateKey, onChange);
            if (onChange) onChange(item.id);
            updateStudio();
        };
        el.appendChild(btn);
    });
}

function renderColorOptions() {
    const el = document.getElementById('studio-color-options');
    if (!el || typeof STUDIO_COLORS === 'undefined') return;
    el.innerHTML = '';
    STUDIO_COLORS.forEach(c => {
        const btn = document.createElement('button');
        btn.type = 'button';
        const isSelected = studioState.colors.includes(c.hex);
        const idx = studioState.colors.indexOf(c.hex);
        btn.className = `color-chip anim-btn ${isSelected ? 'active' : ''}`;
        btn.style.cssText = `background-color:${c.hex}; width:32px; height:32px; border-radius:50%; border:2px solid ${isSelected ? '#3B2A22' : 'transparent'}; position:relative; cursor:pointer; margin:4px;`;
        btn.title = c.name;
        if (isSelected) {
            btn.innerHTML = `<span style="color:#fff; font-size:11px; text-shadow:0 0 2px #000; font-weight:700;">${idx === 0 ? '1' : '2'}</span>`;
        }
        btn.onclick = () => {
            if (isSelected) {
                studioState.colors = studioState.colors.filter(hex => hex !== c.hex);
            } else {
                if (studioState.colors.length >= 2) studioState.colors.shift();
                studioState.colors.push(c.hex);
            }
            renderColorOptions();
            updateStudio();
        };
        el.appendChild(btn);
    });
}

function renderAccessoryOptions() {
    const el = document.getElementById('studio-accessory-options');
    if (!el || typeof STUDIO_ACCESSORIES === 'undefined') return;
    el.innerHTML = '';
    const filtered = STUDIO_ACCESSORIES.filter(a => a.outfits.includes(studioState.outfit));
    studioState.accessories = studioState.accessories.filter(name => filtered.some(f => f.name === name));

    filtered.forEach(acc => {
        const btn = document.createElement('button');
        btn.type = 'button';
        const isSelected = studioState.accessories.includes(acc.name);
        btn.className = `pill anim-btn ${isSelected ? 'active' : ''}`;
        btn.innerText = acc.name;
        btn.onclick = () => {
            if (isSelected) {
                studioState.accessories = studioState.accessories.filter(a => a !== acc.name);
            } else {
                studioState.accessories.push(acc.name);
            }
            renderAccessoryOptions();
            updateStudio();
        };
        el.appendChild(btn);
    });
}

// 1. NÂNG CẤP PHÒNG THAY ĐỒ: HIỂN THỊ MOCKUP ẢNH THẬT HOÀN CHỈNH (FULL-LOOK)
function renderPreview() {
    const container = document.getElementById('studio-preview');
    if (!container) return;

    // Tìm một mẫu ảnh thật hoàn chỉnh từ kho dữ liệu outfits khớp với loại áo đang chọn
    let matchedItem = null;
    if (typeof outfits !== 'undefined' && outfits.length > 0) {
        matchedItem = outfits.find(o => o.categoryId === studioState.outfit);
        if (!matchedItem && studioState.outfit === 'tuthan') {
            matchedItem = outfits.find(o => o.categoryId === 'nguthan');
        }
    }

    const curOutfitInfo = typeof STUDIO_OUTFITS !== 'undefined' ? STUDIO_OUTFITS.find(o => o.id === studioState.outfit) : null;
    const outfitDisplayName = curOutfitInfo ? curOutfitInfo.name : 'Trang phục';
    const c1 = studioState.colors[0] || '#C48C71';
    const c2 = studioState.colors[1] || c1;

    const accTags = studioState.accessories.length > 0 
        ? studioState.accessories.map(a => `<span class="pill" style="font-size:11px; padding:3px 8px; background:#fff;">${a}</span>`).join(' ')
        : '<span style="font-size:11px; color:var(--text-muted);">Chưa chọn phụ kiện</span>';

    container.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
            <div style="position:relative; width:180px; aspect-ratio:3/4; border-radius:var(--border-radius-md); overflow:hidden; box-shadow:0 10px 24px rgba(59,42,34,0.15); background:var(--bg-color); display:flex; justify-content:center; align-items:center;">
                <div id="studio-real-photo-box" style="width:100%; height:100%;"></div>
                
                <!-- Huy hiệu bảng màu đang phối -->
                <div style="position:absolute; bottom:8px; right:8px; display:flex; gap:4px; background:rgba(255,255,255,0.85); padding:3px 6px; border-radius:12px; backdrop-filter:blur(4px);">
                    <span style="width:14px; height:14px; border-radius:50%; background:${c1}; border:1px solid #fff; display:inline-block;"></span>
                    <span style="width:14px; height:14px; border-radius:50%; background:${c2}; border:1px solid #fff; display:inline-block;"></span>
                </div>
            </div>

            <div style="margin-top:12px; text-align:center;">
                <strong style="font-size:14px; color:var(--text-dark);">${outfitDisplayName}</strong>
                <p style="margin:2px 0 8px 0; font-size:11px; color:var(--text-muted);">${matchedItem ? matchedItem.name : 'Mockup chuẩn truyền thống'}</p>
                <div style="display:flex; gap:4px; flex-wrap:wrap; justify-content:center;">
                    ${accTags}
                </div>
            </div>
        </div>
    `;

    const photoBox = document.getElementById('studio-real-photo-box');
    if (photoBox) {
        if (matchedItem && matchedItem.img) {
            const imgEl = document.createElement('img');
            imgEl.src = matchedItem.img;
            imgEl.alt = matchedItem.name;
            imgEl.className = 'real-img';
            imgEl.style.cssText = 'width:100%; height:100%; object-fit:cover;';
            imgEl.addEventListener('error', () => {
                photoBox.innerHTML = matchedItem.svg || (curOutfitInfo ? curOutfitInfo.svg : '');
            });
            photoBox.appendChild(imgEl);
        } else if (matchedItem && matchedItem.svg) {
            photoBox.innerHTML = matchedItem.svg;
        } else {
            photoBox.innerHTML = `<svg viewBox="0 0 200 240" style="width:100%; height:100%;" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="240" fill="${c1}"/><text x="50%" y="50%" fill="#fff" dominant-baseline="middle" text-anchor="middle" font-size="16">${outfitDisplayName}</text></svg>`;
        }
    }
}

function calcHarmony() {
    const el = document.getElementById('studio-harmony');
    if (!el || typeof STUDIO_COLORS === 'undefined') return;
    const cHex1 = studioState.colors[0];
    const cHex2 = studioState.colors[1];
    let score = 70;
    let label = 'Hài hoà';
    let comment = 'Bản phối màu an toàn và giữ nét nền nã truyền thống.';

    if (cHex1 && cHex2) {
        const col1 = STUDIO_COLORS.find(c => c.hex === cHex1);
        const col2 = STUDIO_COLORS.find(c => c.hex === cHex2);
        if (col1 && col2) {
            const diff = Math.abs(col1.hue - col2.hue);
            const isNeutral = ['#EFEBD9', '#000000', '#D2B48C', '#5C3A21'].includes(cHex1) || ['#EFEBD9', '#000000', '#D2B48C', '#5C3A21'].includes(cHex2);
            if (isNeutral) {
                score = 92;
                comment = 'Sử dụng sắc màu trung tính làm nền giúp tôn vinh màu áo chủ đạo, đạt chuẩn mực trang nhã.';
            } else if (diff <= 35) {
                score = 88;
                comment = 'Phối màu tương đồng nhẹ nhàng, toát lên phong thái tao nhã.';
            } else if (diff >= 150 && diff <= 210) {
                score = 84;
                comment = 'Cặp màu tương phản nổi bật, gợi nhắc mỹ thuật lễ hội cung đình truyền thống.';
            }
        }
    }

    const curEvent = typeof STUDIO_EVENTS !== 'undefined' ? STUDIO_EVENTS.find(e => e.id === studioState.event) : null;
    if (curEvent) {
        if (curEvent.recommendedColors.some(hex => studioState.colors.includes(hex))) score = Math.min(100, score + 8);
        if (curEvent.avoidColors.some(hex => studioState.colors.includes(hex))) {
            score = Math.max(30, score - 25);
            label = 'Chưa phù hợp';
            comment = `Gam màu chọn chưa tương thích với không khí của ${curEvent.name}.`;
        }
    }
    if (score >= 85) label = 'Rất hài hoà';
    else if (score < 60) label = 'Cần cân nhắc';

    el.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong>Điểm phối sắc: ${score}/100</strong>
            <span class="pill" style="padding:2px 10px; font-size:11px;">${label}</span>
        </div>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">${comment}</p>
    `;
}

function checkCulture() {
    const el = document.getElementById('studio-warnings');
    if (!el || typeof CULTURE_RULES === 'undefined') return;
    el.innerHTML = '';
    const warnings = [];

    const curOutfit = typeof STUDIO_OUTFITS !== 'undefined' ? STUDIO_OUTFITS.find(o => o.id === studioState.outfit) : null;
    const curEvent = typeof STUDIO_EVENTS !== 'undefined' ? STUDIO_EVENTS.find(e => e.id === studioState.event) : null;

    if (curOutfit && curEvent && Math.abs(curOutfit.formality - curEvent.formality) >= 2) {
        warnings.push({ level: 'warning', message: `Độ trang trọng của ${curOutfit.name} chênh lệch so với bối cảnh ${curEvent.name}.` });
    }

    CULTURE_RULES.forEach(rule => {
        const w = rule.when;
        let match = true;
        if (w.outfits && !w.outfits.includes(studioState.outfit)) match = false;
        if (w.events && !w.events.includes(studioState.event)) match = false;
        if (w.colors && !w.colors.some(c => studioState.colors.includes(c))) match = false;
        if (w.accessories && !w.accessories.some(a => studioState.accessories.includes(a))) match = false;
        if (match) warnings.push(rule);
    });

    if (warnings.length === 0) {
        el.innerHTML = '<div style="font-size:12px; color:#2E8B57;">✓ Bản phối chuẩn mực văn hoá, không ghi nhận lưu ý xung đột.</div>';
    } else {
        warnings.forEach(w => {
            const div = document.createElement('div');
            div.style.cssText = `font-size:12px; margin-bottom:6px; padding:6px 10px; border-radius:8px; background:${w.level === 'warning' ? '#FDEDEC' : '#EBF5FB'}; color:${w.level === 'warning' ? '#C0392B' : '#2980B9'};`;
            div.innerText = (w.level === 'warning' ? '⚠️ ' : 'ℹ️ ') + w.message;
            el.appendChild(div);
        });
    }
}

function renderResultCard() {
    const el = document.getElementById('studio-result-card');
    if (!el) return;
    const curEvent = typeof STUDIO_EVENTS !== 'undefined' ? STUDIO_EVENTS.find(e => e.id === studioState.event) : null;
    const curWeather = typeof STUDIO_WEATHER !== 'undefined' ? STUDIO_WEATHER.find(w => w.id === studioState.weather) : null;
    const curRegion = typeof STUDIO_REGIONS !== 'undefined' ? STUDIO_REGIONS.find(r => r.id === studioState.region) : null;

    el.innerHTML = `
        <div style="font-size:13px; line-height:1.5;">
            ${curEvent ? `<div style="margin-bottom:4px;">💡 <strong>Bối cảnh:</strong> ${curEvent.tip}</div>` : ''}
            ${curWeather ? `<div style="margin-bottom:4px;">🌤️ <strong>Thời tiết (${curWeather.name}):</strong> ${curWeather.suggestion} (Vải: ${curWeather.fabrics}).</div>` : ''}
            ${curRegion ? `<div>📍 <strong>Vùng miền (${curRegion.name}):</strong> ${curRegion.note}</div>` : ''}
        </div>
    `;
}

function updateStudio() {
    renderPreview();
    calcHarmony();
    checkCulture();
    renderResultCard();
}

function suggestLook() {
    const ev = typeof STUDIO_EVENTS !== 'undefined' ? STUDIO_EVENTS.find(e => e.id === studioState.event) : null;
    if (ev) {
        if (ev.recommendedOutfits && ev.recommendedOutfits.length > 0) {
            studioState.outfit = ev.recommendedOutfits[0];
        }
        if (ev.recommendedColors && ev.recommendedColors.length > 0) {
            studioState.colors = [ev.recommendedColors[0], ev.recommendedColors[1] || '#EFEBD9'];
        }
    }
    renderChips('studio-outfit-options', typeof STUDIO_OUTFITS !== 'undefined' ? STUDIO_OUTFITS : [], 'outfit', () => renderAccessoryOptions());
    renderColorOptions();
    renderAccessoryOptions();
    updateStudio();
}

function getCurrentLook() {
    const o = typeof STUDIO_OUTFITS !== 'undefined' ? STUDIO_OUTFITS.find(i => i.id === studioState.outfit) : null;
    const e = typeof STUDIO_EVENTS !== 'undefined' ? STUDIO_EVENTS.find(i => i.id === studioState.event) : null;
    const r = typeof STUDIO_REGIONS !== 'undefined' ? STUDIO_REGIONS.find(i => i.id === studioState.region) : null;
    const s = typeof STUDIO_STYLES !== 'undefined' ? STUDIO_STYLES.find(i => i.id === studioState.style) : null;
    return {
        outfitName: o ? o.name : studioState.outfit,
        eventName: e ? e.name : studioState.event,
        regionName: r ? r.name : studioState.region,
        styleName: s ? s.name : studioState.style,
        colors: [...studioState.colors],
        accessories: [...studioState.accessories]
    };
}

function openStudio(outfitId) {
    if (outfitId) studioState.outfit = outfitId;
    if (typeof window.navigateTo === 'function') window.navigateTo('studio-screen');
    renderChips('studio-outfit-options', typeof STUDIO_OUTFITS !== 'undefined' ? STUDIO_OUTFITS : [], 'outfit', () => renderAccessoryOptions());
    renderAccessoryOptions();
    updateStudio();
}

window.openStudio = openStudio;
window.getCurrentLook = getCurrentLook;

document.addEventListener('DOMContentLoaded', () => {
    renderChips('studio-character-options', CHARACTERS, 'character');
    renderChips('studio-outfit-options', typeof STUDIO_OUTFITS !== 'undefined' ? STUDIO_OUTFITS : [], 'outfit', () => renderAccessoryOptions());
    renderChips('studio-event-options', typeof STUDIO_EVENTS !== 'undefined' ? STUDIO_EVENTS : [], 'event');
    renderChips('studio-region-options', typeof STUDIO_REGIONS !== 'undefined' ? STUDIO_REGIONS : [], 'region');
    renderChips('studio-style-options', typeof STUDIO_STYLES !== 'undefined' ? STUDIO_STYLES : [], 'style');
    renderChips('studio-weather-options', typeof STUDIO_WEATHER !== 'undefined' ? STUDIO_WEATHER : [], 'weather');
    renderColorOptions();
    renderAccessoryOptions();

    const suggestBtn = document.getElementById('studio-suggest-btn');
    if (suggestBtn) suggestBtn.addEventListener('click', suggestLook);

    const aiBtn = document.getElementById('studio-ai-btn');
    if (aiBtn) {
        aiBtn.addEventListener('click', () => {
            if (typeof window.aiReviewLook === 'function') {
                window.aiReviewLook(getCurrentLook());
            } else {
                alert('Trợ lý ảo AI đang được nạp hoặc chưa sẵn sàng.');
            }
        });
    }

    updateStudio();
});
