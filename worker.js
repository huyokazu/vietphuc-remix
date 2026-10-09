// ================= CLOUDFLARE WORKER PROXY (worker.js) =================

const ALLOWED_ORIGIN = "https://huyokazu.github.io";
const GEMINI_MODEL = "gemini-3.8-flash";

function corsHeaders(origin) {
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
    };
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const origin = request.headers.get("Origin");

        // Kiểm tra phương thức OPTIONS (CORS preflight)
        if (request.method === "OPTIONS") {
            if (origin !== ALLOWED_ORIGIN) {
                return new Response(JSON.stringify({ error: "Nguồn gốc yêu cầu không được cấp phép." }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" }
                });
            }
            return new Response(null, {
                status: 204,
                headers: corsHeaders(ALLOWED_ORIGIN)
            });
        }

        // Chỉ cho phép truy cập từ đúng origin GitHub Pages
        if (origin !== ALLOWED_ORIGIN) {
            return new Response(JSON.stringify({ error: "Truy cập bị từ chối (Sai Origin)." }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Chỉ chấp nhận POST tới endpoint /chat
        if (request.method !== "POST" || url.pathname !== "/chat") {
            return new Response(JSON.stringify({ error: "Yêu cầu không hợp lệ. Chỉ chấp nhận POST /chat." }), {
                status: 404,
                headers: {
                    ...corsHeaders(ALLOWED_ORIGIN),
                    "Content-Type": "application/json"
                }
            });
        }

        // Kiểm tra biến môi trường bí mật trên Cloudflare
        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: "Worker chưa cấu hình GEMINI_API_KEY." }), {
                status: 500,
                headers: {
                    ...corsHeaders(ALLOWED_ORIGIN),
                    "Content-Type": "application/json"
                }
            });
        }

        try {
            const body = await request.json();
            const { contents, systemInstruction } = body;

            if (!contents || !Array.isArray(contents) || contents.length === 0) {
                return new Response(JSON.stringify({ error: "Nội dung cuộc hội thoại không hợp lệ." }), {
                    status: 400,
                    headers: {
                        ...corsHeaders(ALLOWED_ORIGIN),
                        "Content-Type": "application/json"
                    }
                });
            }

            // Giới hạn tối đa 12 lượt tin nhắn gần nhất
            const safeContents = contents.slice(-12);

            // Giới hạn độ dài mỗi tin nhắn không vượt quá 2000 ký tự
            for (const item of safeContents) {
                if (item.parts && Array.isArray(item.parts)) {
                    for (const part of item.parts) {
                        if (typeof part.text === "string" && part.text.length > 2000) {
                            part.text = part.text.substring(0, 2000);
                        }
                    }
                }
            }

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

            const geminiResponse = await fetch(geminiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: safeContents,
                    systemInstruction: systemInstruction || undefined,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800
                    }
                })
            });

            if (!geminiResponse.ok) {
                const errData = await geminiResponse.json().catch(() => ({}));
                const status = geminiResponse.status;
                let message = "Lỗi phản hồi từ Google Gemini API.";

                if (status === 429) {
                    message = "Hạn mức API đã tạm thời hết (Rate limit). Vui lòng thử lại sau giây lát.";
                } else if (status === 400 || status === 403) {
                    message = "API key không hợp lệ hoặc không có quyền truy cập mô hình.";
                }

                return new Response(JSON.stringify({ error: message, details: errData }), {
                    status: status,
                    headers: {
                        ...corsHeaders(ALLOWED_ORIGIN),
                        "Content-Type": "application/json"
                    }
                });
            }

            const data = await geminiResponse.json();
            const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Không nhận được phản hồi từ AI.";

            return new Response(JSON.stringify({ text: replyText }), {
                status: 200,
                headers: {
                    ...corsHeaders(ALLOWED_ORIGIN),
                    "Content-Type": "application/json"
                }
            });
        } catch (err) {
            return new Response(JSON.stringify({ error: "Lỗi nội bộ worker: " + err.message }), {
                status: 500,
                headers: {
                    ...corsHeaders(ALLOWED_ORIGIN),
                    "Content-Type": "application/json"
                }
            });
        }
    }
};
