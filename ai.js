// ================= TRỢ LÝ AI VIỆT PHỤC (ai.js) =================

const GEMINI_API_KEY = ""; // Dán API key của bạn vào đây (hoặc nhập trên giao diện)
const GEMINI_MODEL = "gemini-3.8-flash";

const AI_STORAGE_KEY = "vr_gemini_key";
const aiConversationHistory = [];

const SYSTEM_INSTRUCTION = {
    parts: [{
        text: "Bạn là chuyên gia tư vấn trang phục truyền thống Việt Nam (Việt phục), phục vụ đối tượng học sinh và sinh viên. " +
              "Phong cách trò chuyện: thân thiện, gần gũi, khích lệ tình yêu di sản, chuẩn xác về mặt lịch sử - văn hóa. " +
              "Câu trả lời cần ngắn gọn, súc tích, thực tế (dưới 200 từ nếu không cần giải thích sâu). " +
              "Nếu thông tin chưa rõ hoặc có nhiều quan điểm lịch sử, hãy nói rõ thay vì khẳng định tuyệt đối. Không bịa đặt nguồn gốc."
    }]
};

function getApiKey() {
    if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "") {
        return GEMINI_API_KEY.trim();
    }
    return (localStorage.getItem(AI_STORAGE_KEY) || "").trim();
}

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

    const keyInput = document.getElementById("ai-key-input");
    if (keyInput) {
        keyInput.value = localStorage.getItem(AI_STORAGE_KEY) || "";
    }

    const container = document.getElementById("ai-messages");
    if (container && container.children.length === 0) {
        appendMessage("model", "Xin chào! Mình là trợ lý ảo Việt phục. Bạn muốn tìm hiểu hay phối đồ cho dịp nào hôm nay?");
    }
}

function closeAiModal() {
    const modal = document.getElementById("ai-modal");
    if (modal) modal.classList.remove("active");
}

async function callGemini(userText) {
    const apiKey = getApiKey();
    if (!apiKey) {
        appendMessage(
            "model",
            "⚠️ <strong>Chưa có API key</strong>.<br>" +
            "Vui lòng lấy key miễn phí tại <a href='https://aistudio.google.com/' target='_blank' style='color: var(--primary-color, #C48C71); text-decoration: underline;'>Google AI Studio</a> " +
            "rồi nhập vào ô phía trên và bấm <em>Lưu</em>.",
            true
        );
        return;
    }

    aiConversationHistory.push({
        role: "user",
        parts: [{ text: userText }]
    });

    while (aiConversationHistory.length > 10) {
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

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey
            },
            body: JSON.stringify({
                systemInstruction: SYSTEM_INSTRUCTION,
                contents: aiConversationHistory,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 800
                }
            })
        });

        const loadingElem = document.getElementById(loadingId);
        if (loadingElem) loadingElem.remove();

        if (!response.ok) {
            let errorMsg = `Lỗi máy chủ (${response.status}).`;
            if (response.status === 400 || response.status === 403) {
                errorMsg = "API key không hợp lệ hoặc không có quyền truy cập model. Vui lòng kiểm tra lại.";
            } else if (response.status === 429) {
                errorMsg = "Đã vượt quá hạn mức sử dụng (Rate limit). Vui lòng chờ giây lát rồi thử lại.";
            }
            appendMessage("model", `⚠️ ${errorMsg}`);
            aiConversationHistory.pop();
            return;
        }

        const data = await response.json();
        const candidate = data.candidates && data.candidates[0];
        const replyText = candidate?.content?.parts?.[0]?.text || "Không nhận được phản hồi từ AI.";

        aiConversationHistory.push({
            role: "model",
            parts: [{ text: replyText }]
        });

        appendMessage("model", replyText);
    } catch (err) {
        const loadingElem = document.getElementById(loadingId);
        if (loadingElem) loadingElem.remove();
        appendMessage("model", "⚠️ Không thể kết nối với mạng hoặc máy chủ Google AI. Vui lòng thử lại.");
        aiConversationHistory.pop();
    }
}

window.aiReviewLook = function (look) {
    if (!look) return;
    openAiModal();
    const accStr = look.accessories && look.accessories.length > 0 ? look.accessories.join(", ") : "Không có";
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

    const saveKeyBtn = document.getElementById("ai-key-save");
    const clearKeyBtn = document.getElementById("ai-key-clear");
    const keyInput = document.getElementById("ai-key-input");

    if (saveKeyBtn && keyInput) {
        saveKeyBtn.addEventListener("click", () => {
            const val = keyInput.value.trim();
            if (val) {
                localStorage.setItem(AI_STORAGE_KEY, val);
                alert("Đã lưu API key thành công!");
            }
        });
    }

    if (clearKeyBtn && keyInput) {
        clearKeyBtn.addEventListener("click", () => {
            localStorage.removeItem(AI_STORAGE_KEY);
            keyInput.value = "";
            alert("Đã xóa API key.");
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
