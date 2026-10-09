// ================= MODULE LOOKBOOK & SO SÁNH (lookbook.js) =================

function getLookbookKey() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    return 'vr_lookbook_' + (user ? user.username : 'guest');
}

function getStoredLooks() {
    return JSON.parse(localStorage.getItem(getLookbookKey())) || [];
}

function setStoredLooks(looks) {
    localStorage.setItem(getLookbookKey(), JSON.stringify(looks));
}

function showToastMsg(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    } else {
        alert(msg);
    }
}

// 1. Lưu bộ trang phục
function saveLook() {
    if (typeof getCurrentLook !== 'function') return;
    const look = getCurrentLook();
    const looks = getStoredLooks();

    const harmonyEl = document.getElementById('studio-harmony');
    let score = 70;
    if (harmonyEl) {
        const match = harmonyEl.innerText.match(/(\d+)\/100/);
        if (match) score = parseInt(match[1], 10);
    }

    const warningsEl = document.getElementById('studio-warnings');
    let warningsCount = 0;
    if (warningsEl) {
        warningsCount = (warningsEl.innerText.match(/⚠️/g) || []).length;
    }

    const item = {
        id: 'look_' + Date.now(),
        createdAt: new Date().toLocaleDateString('vi-VN'),
        ...look,
        score,
        warningsCount
    };

    looks.unshift(item);
    setStoredLooks(looks);
    showToastMsg('Đã lưu vào Lookbook!');
}

// 2. Mở và render Lookbook
function openLookbook() {
    const modal = document.getElementById('lookbook-modal');
    const container = document.getElementById('lookbook-content');
    if (!modal || !container) return;

    const looks = getStoredLooks();
    container.innerHTML = '';

    if (looks.length === 0) {
        container.innerHTML = '<div class="empty-msg">Chưa có bộ phối nào trong Lookbook.</div>';
    } else {
        looks.forEach(item => {
            const card = document.createElement('div');
            card.className = 'list-item';
            card.style.cssText = 'flex-direction:column; align-items:stretch; gap:10px; margin-bottom:12px; cursor:default;';

            const colorsHtml = item.colors.map(c => 
                `<span style="display:inline-block; width:18px; height:18px; border-radius:50%; background:${c}; border:1px solid #fff; box-shadow:0 0 2px rgba(0,0,0,0.2);"></span>`
            ).join(' ');

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <h4 style="margin:0 0 4px 0;">${item.outfitName} • ${item.eventName}</h4>
                        <div style="display:flex; align-items:center; gap:6px;">
                            ${colorsHtml}
                            <span style="font-size:11px; color:var(--text-muted); margin-left:4px;">${item.regionName} | ${item.styleName}</span>
                        </div>
                    </div>
                    <label style="font-size:12px; display:flex; align-items:center; gap:4px; cursor:pointer;">
                        <input type="checkbox" class="compare-checkbox" value="${item.id}"> So sánh
                    </label>
                </div>
                <div style="font-size:12px; color:var(--text-muted);">
                    Phụ kiện: ${item.accessories.length > 0 ? item.accessories.join(', ') : 'Không có'}<br>
                    Điểm phối: <strong>${item.score}/100</strong> • Cảnh báo: ${item.warningsCount}
                </div>
                <div style="display:flex; gap:8px; justify-content:flex-end;">
                    <button class="pill anim-btn" style="padding:4px 10px; font-size:11px;" onclick="shareLook('${item.id}')">Chia sẻ</button>
                    <button class="pill anim-btn" style="padding:4px 10px; font-size:11px;" onclick="downloadLookCard('${item.id}')">Tải ảnh</button>
                    <button class="pill anim-btn" style="padding:4px 10px; font-size:11px; color:#c0392b;" onclick="deleteLook('${item.id}')">Xoá</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    modal.classList.add('active');
}

// 3. Xoá bộ phối
function deleteLook(id) {
    let looks = getStoredLooks();
    looks = looks.filter(item => item.id !== id);
    setStoredLooks(looks);
    openLookbook();
}

// 4. So sánh đúng 2 bộ
function compareLooks() {
    const checked = Array.from(document.querySelectorAll('.compare-checkbox:checked')).map(cb => cb.value);
    if (checked.length !== 2) {
        showToastMsg('Vui lòng chọn đúng 2 bộ để so sánh!');
        return;
    }

    const looks = getStoredLooks();
    const l1 = looks.find(l => l.id === checked[0]);
    const l2 = looks.find(l => l.id === checked[1]);
    if (!l1 || !l2) return;

    const modal = document.getElementById('compare-modal');
    const container = document.getElementById('compare-content');
    if (!modal || !container) return;

    const s1 = l1.score >= l2.score ? `<strong>${l1.score}/100</strong>` : `${l1.score}/100`;
    const s2 = l2.score >= l1.score ? `<strong>${l2.score}/100</strong>` : `${l2.score}/100`;

    container.innerHTML = `
        <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">
            <thead>
                <tr style="border-bottom:2px solid var(--primary-light);">
                    <th style="padding:8px 4px;">Tiêu chí</th>
                    <th style="padding:8px 4px;">Bộ 1</th>
                    <th style="padding:8px 4px;">Bộ 2</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom:1px solid #eee;"><td style="padding:6px 4px; color:var(--text-muted);">Trang phục</td><td style="padding:6px 4px;">${l1.outfitName}</td><td style="padding:6px 4px;">${l2.outfitName}</td></tr>
                <tr style="border-bottom:1px solid #eee;"><td style="padding:6px 4px; color:var(--text-muted);">Sự kiện</td><td style="padding:6px 4px;">${l1.eventName}</td><td style="padding:6px 4px;">${l2.eventName}</td></tr>
                <tr style="border-bottom:1px solid #eee;"><td style="padding:6px 4px; color:var(--text-muted);">Vùng miền</td><td style="padding:6px 4px;">${l1.regionName}</td><td style="padding:6px 4px;">${l2.regionName}</td></tr>
                <tr style="border-bottom:1px solid #eee;"><td style="padding:6px 4px; color:var(--text-muted);">Phong cách</td><td style="padding:6px 4px;">${l1.styleName}</td><td style="padding:6px 4px;">${l2.styleName}</td></tr>
                <tr style="border-bottom:1px solid #eee;"><td style="padding:6px 4px; color:var(--text-muted);">Màu sắc</td><td style="padding:6px 4px;">${l1.colors.join(', ')}</td><td style="padding:6px 4px;">${l2.colors.join(', ')}</td></tr>
                <tr style="border-bottom:1px solid #eee;"><td style="padding:6px 4px; color:var(--text-muted);">Phụ kiện</td><td style="padding:6px 4px;">${l1.accessories.join(', ') || 'Không'}</td><td style="padding:6px 4px;">${l2.accessories.join(', ') || 'Không'}</td></tr>
                <tr style="border-bottom:1px solid #eee;"><td style="padding:6px 4px; color:var(--text-muted);">Điểm phối</td><td style="padding:6px 4px;">${s1}</td><td style="padding:6px 4px;">${s2}</td></tr>
                <tr><td style="padding:6px 4px; color:var(--text-muted);">Cảnh báo</td><td style="padding:6px 4px;">${l1.warningsCount}</td><td style="padding:6px 4px;">${l2.warningsCount}</td></tr>
            </tbody>
        </table>
    `;

    modal.classList.add('active');
}

// 5. Chia sẻ
function shareLook(id) {
    const item = getStoredLooks().find(l => l.id === id);
    if (!item) return;

    const text = `Lookbook Việt phục Remix:\nTrang phục: ${item.outfitName}\nSự kiện: ${item.eventName}\nVùng miền: ${item.regionName}\nĐiểm hài hoà: ${item.score}/100`;

    if (navigator.share) {
        navigator.share({ title: 'Lookbook Cổ phục', text }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => showToastMsg('Đã sao chép vào bộ nhớ tạm!'));
    }
}

// 6. Vẽ Canvas và tải ảnh
function downloadLookCard(id) {
    const item = getStoredLooks().find(l => l.id === id);
    if (!item) return;
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Nền be
    ctx.fillStyle = '#FDF4EC';
    ctx.fillRect(0, 0, 600, 800);

    // Khung viền trang trí
    ctx.strokeStyle = '#C48C71';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 552, 752);

    // Tiêu đề
    ctx.fillStyle = '#3B2A22';
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Lookbook Việt phục', 300, 90);

    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#8E7D73';
    ctx.fillText('Người phối: ' + (user ? user.name : 'Người Yêu Cổ Phục'), 300, 125);

    // Thông tin chính
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#3B2A22';
    ctx.fillText(item.outfitName, 300, 200);

    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#C48C71';
    ctx.fillText(item.eventName + ' • ' + item.regionName, 300, 235);

    // Khối màu
    ctx.fillStyle = item.colors[0] || '#C48C71';
    ctx.fillRect(190, 280, 100, 100);
    ctx.fillStyle = item.colors[1] || item.colors[0] || '#EFEBD9';
    ctx.fillRect(310, 280, 100, 100);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(190, 280, 100, 100);
    ctx.strokeRect(310, 280, 100, 100);

    // Chi tiết phụ kiện & điểm
    ctx.textAlign = 'center';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#3B2A22';
    ctx.fillText('Phong cách: ' + item.styleName, 300, 440);

    const accText = item.accessories.length ? item.accessories.join(', ') : 'Không phụ kiện';
    ctx.fillText('Phụ kiện: ' + accText, 300, 480);

    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#C48C71';
    ctx.fillText(`Điểm hài hoà: ${item.score}/100`, 300, 560);

    // Chân trang
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#8E7D73';
    ctx.fillText('Việt phục Remix — Di sản Cổ phục Việt', 300, 720);

    const a = document.createElement('a');
    a.download = `lookbook_${item.id}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
}

// 7. Quản lý Modal & Khởi tạo
function closeStudioModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

window.saveLook = saveLook;
window.openLookbook = openLookbook;
window.compareLooks = compareLooks;
window.shareLook = shareLook;
window.downloadLookCard = downloadLookCard;
window.deleteLook = deleteLook;
window.closeStudioModal = closeStudioModal;

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('studio-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', saveLook);

    const lookbookBtn = document.getElementById('studio-lookbook-btn');
    if (lookbookBtn) lookbookBtn.addEventListener('click', openLookbook);

    const compareBtn = document.getElementById('compare-btn');
    if (compareBtn) compareBtn.addEventListener('click', compareLooks);

    document.querySelectorAll('.modal-close[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-close');
            if (targetId) closeStudioModal(targetId);
        });
    });
});
