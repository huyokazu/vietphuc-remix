// ================= TRỢ LÝ AI VIỆT PHỤC (ai.js) =================

// Thay thế URL Worker thực tế của bạn đã deploy trên Cloudflare
const AI_PROXY_URL = "https://vietphuc-ai.ongtraudo.workers.dev/chat";

const aiConversationHistory = [];

const SYSTEM_INSTRUCTION = {
    parts: [{
        text: "Bạn là chuyên gia tư vấn trang phục truyền thống Việt Nam (Việt phục), phục vụ đối tượng học sinh và sinh viên. " +
              "Phong cách trò chuyện: thân thiện, gần gũi, khích lệ tình yêu di sản, chuẩn xác về mặt lịch sử - văn hóa. " +
              "Câu trả lời cần ngắn gọn, súc tích, thực tế (dưới 200 từ nếu không cần giải thích sâu). " +
              "Nếu thông tin chưa rõ hoặc có nhiều quan điểm lịch sử, hãy nói rõ thay vì khẳng định tuyệt đối. Không bịa đặt nguồn gốc."
    }]
};

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatAiText(text) {
    const escaped = escapeHtml(text);
    return escaped
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br>");
}

function appendMessage(sender, text, isHtml = false) {
    const container = document.getElementById("ai-messages");
    if (!container) return;

    const row = document.createElement("div");
    row.style.cssText = `display: flex; justify-content: ${sender === "user" ? "flex-end" : "flex-start"}; margin-bottom: 10px;`;

    const bubble = document.createElement("div");
    bubble.style.cssText = `
        max-width: 82%;
        padding: 10px 14px;
        border-radius: 16px;
        font-size: 13px;
        line-height: 1.5;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        background: ${sender === "user" ? "var(--primary-color, #C48C71)" : "#FFFFFF"};
        color: ${sender === "user" ? "#FFFFFF" : "var(--text-dark, #3B2A22)"};
        border-bottom-${sender === "user" ? "right" : "left"}-radius: 4px;
    `;

    if (isHtml) {
        bubble.innerHTML = text;
    } else {
        bubble.innerHTML = formatAiText(text);
    }

    row.appendChild(bubble);
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
}

function openAiModal() {
    const modal = document.getElementById("ai-modal");
    if (!modal) return;
    modal.classList.add("active");

    const container = document.getElementById("ai-messages");
    if (container && container.children.length === 0) {
        appendMessage("model", "Xin chào! Mình là trợ lý ảo Việt phục. Bạn muốn tìm hiểu lịch sử, bối cảnh mặc hay gợi ý phối đồ cho sự kiện nào?");
    }
}

function closeAiModal() {
    const modal = document.getElementById("ai-modal");
    if (modal) modal.classList.remove("active");
}

async function callGemini(userText) {
    aiConversationHistory.push({
        role: "user",
        parts: [{ text: userText }]
    });

    while (aiConversationHistory.length > 12) {
        aiConversationHistory.shift();
    }

    appendMessage("user", userText);

    const loadingId = "ai-loading-" + Date.now();
    const container = document.getElementById("ai-messages");
    if (container) {
        const loadingRow = document.createElement("div");
        loadingRow.id = loadingId;
        loadingRow.style.cssText = "display: flex; justify-content: flex-start; margin-bottom: 10px;";
        loadingRow.innerHTML = `
            <div style="padding: 8px 14px; border-radius: 16px; background: #FFF; color: var(--text-muted, #8E7D73); font-size: 12px; font-style: italic;">
                Đang suy nghĩ...
            </div>
        `;
        container.appendChild(loadingRow);
        container.scrollTop = container.scrollHeight;
    }

    try {
        const response = await fetch(AI_PROXY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                systemInstruction: SYSTEM_INSTRUCTION,
                contents: aiConversationHistory
            })
        });

        const loadingElem = document.getElementById(loadingId);
        if (loadingElem) loadingElem.remove();

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            let errorMsg = data.error || `Lỗi máy chủ (${response.status}).`;
            if (response.status === 403) {
                errorMsg = "Không có quyền truy cập (Chỉ hỗ trợ từ domain được cấp phép).";
            } else if (response.status === 429) {
                errorMsg = "Hệ thống đang bận hoặc vượt quá giới hạn yêu cầu. Vui lòng thử lại sau giây lát.";
            } else if (response.status >= 500) {
                errorMsg = "Máy chủ proxy AI gặp sự cố kỹ thuật. Vui lòng kiểm tra lại cấu hình.";
            }

            appendMessage("model", `⚠️ ${errorMsg}`);
            aiConversationHistory.pop();
            return;
        }

        const replyText = data.text || "Không nhận được phản hồi từ AI.";

        aiConversationHistory.push({
            role: "model",
            parts: [{ text: replyText }]
        });

        appendMessage("model", replyText);
    } catch (err) {
        const loadingElem = document.getElementById(loadingId);
        if (loadingElem) loadingElem.remove();
        appendMessage("model", "⚠️ Không thể kết nối với máy chủ proxy AI. Vui lòng kiểm tra kết nối mạng hoặc cấu hình Worker.");
        aiConversationHistory.pop();
    }
}

window.aiReviewLook = function (look) {
    if (!look) return;
    openAiModal();
    const accStr = look.accessories && look.accessories.length > 0 ? look.accessories.join(", ") : "Nguyên bản";
    const colorsStr = look.colors && look.colors.length > 0 ? look.colors.join(", ") : "Chưa chọn";
    const prompt = `Nhận xét giúp mình bộ trang phục này:
- Loại áo: ${look.outfitName || "Chưa rõ"}
- Dịp mặc: ${look.eventName || "Chưa rõ"}
- Vùng miền: ${look.regionName || "Chưa rõ"}
- Phong cách: ${look.styleName || "Chưa rõ"}
- Màu sắc: ${colorsStr}
- Phụ kiện: ${accStr}

Hãy đánh giá: (1) Tính hài hòa màu sắc, (2) Mức độ phù hợp với văn hóa/bối cảnh sự kiện, (3) Cho 2-3 gợi ý chỉnh sửa ngắn gọn.`;
    callGemini(prompt);
};

window.aiAskAboutOutfit = function () {
    if (typeof currentItem === "undefined" || !currentItem) {
        alert("Vui lòng chọn một trang phục cụ thể trước.");
        return;
    }
    openAiModal();
    const prompt = `Hãy tóm tắt ngắn gọn ý nghĩa lịch sử và gợi ý 1 hoàn cảnh mặc đẹp nhất cho trang phục: ${currentItem.name}.`;
    callGemini(prompt);
};

document.addEventListener("DOMContentLoaded", () => {
    const fab = document.getElementById("ai-fab");
    if (fab) {
        fab.addEventListener("click", openAiModal);
    }

    document.querySelectorAll('.modal-close[data-close="ai-modal"]').forEach(btn => {
        btn.addEventListener("click", closeAiModal);
    });

    const form = document.getElementById("ai-form");
    const input = document.getElementById("ai-input");
    if (form && input) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;
            input.value = "";
            callGemini(text);
        });
    }

    const quickChips = [
        "Gợi ý trang phục đi chùa",
        "Ý nghĩa áo Nhật Bình",
        "Phân biệt áo tấc và áo ngũ thân",
        "Phối áo tứ thân đi hội Lim"
    ];
    const quickContainer = document.getElementById("ai-quick");
    if (quickContainer) {
        quickContainer.innerHTML = "";
        quickChips.forEach(chipText => {
            const chipBtn = document.createElement("button");
            chipBtn.type = "button";
            chipBtn.className = "pill anim-btn";
            chipBtn.style.cssText = "font-size: 11px; padding: 4px 10px; margin: 2px;";
            chipBtn.innerText = chipText;
            chipBtn.onclick = () => callGemini(chipText);
            quickContainer.appendChild(chipBtn);
        });
    }

    const detailAiBtn = document.getElementById("detail-ai-btn");
    if (detailAiBtn) {
        detailAiBtn.addEventListener("click", window.aiAskAboutOutfit);
    }
});
