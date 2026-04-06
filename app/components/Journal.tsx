"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Entry {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const PASSCODE = "0630";

export default function Journal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    const { data } = await supabase
      .from("journal")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode !== PASSCODE) {
      setError("비밀번호가 틀렸어!");
      return;
    }
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 입력해줘!");
      return;
    }

    const { error: insertError } = await supabase
      .from("journal")
      .insert([{ title: title.trim(), content: content.trim() }]);

    if (insertError) {
      setError("저장에 실패했어 ㅠㅠ");
      return;
    }

    setTitle("");
    setContent("");
    setPasscode("");
    setError("");
    setShowForm(false);
    fetchEntries();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const day = days[date.getDay()];
    return `${y}.${m}.${d} (${day})`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
      {/* 글쓰기 버튼 */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "linear-gradient(135deg, #ec4899, #f472b6)",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "0.8rem 2rem",
            fontSize: "0.95rem",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(236, 72, 153, 0.3)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            letterSpacing: "0.05em",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 25px rgba(236, 72, 153, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(236, 72, 153, 0.3)";
          }}
        >
          {showForm ? "닫기" : "+ 오늘의 일지 쓰기"}
        </button>
      </div>

      {/* 글쓰기 폼 */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "2rem",
            marginBottom: "2rem",
            border: "1px solid rgba(244, 114, 182, 0.2)",
            boxShadow: "0 8px 40px rgba(236, 72, 153, 0.1)",
          }}
          className="animate-fade-in-up"
        >
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "0.8rem 1rem",
              border: "1px solid rgba(244, 114, 182, 0.3)",
              borderRadius: "12px",
              fontSize: "1rem",
              marginBottom: "0.75rem",
              background: "rgba(255, 255, 255, 0.5)",
              outline: "none",
              color: "#4a3548",
              fontFamily: "Noto Sans KR, sans-serif",
            }}
          />
          <textarea
            placeholder="오늘 하루는 어땠어?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "0.8rem 1rem",
              border: "1px solid rgba(244, 114, 182, 0.3)",
              borderRadius: "12px",
              fontSize: "0.95rem",
              marginBottom: "0.75rem",
              background: "rgba(255, 255, 255, 0.5)",
              outline: "none",
              resize: "vertical",
              color: "#4a3548",
              fontFamily: "Noto Sans KR, sans-serif",
              lineHeight: "1.8",
            }}
          />
          <input
            type="password"
            placeholder="비밀번호 (4자리)"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            maxLength={4}
            style={{
              width: "100%",
              padding: "0.8rem 1rem",
              border: "1px solid rgba(244, 114, 182, 0.3)",
              borderRadius: "12px",
              fontSize: "1rem",
              marginBottom: "0.75rem",
              background: "rgba(255, 255, 255, 0.5)",
              outline: "none",
              color: "#4a3548",
              fontFamily: "Noto Sans KR, sans-serif",
            }}
          />
          {error && (
            <p style={{ color: "#ec4899", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #ec4899, #f472b6)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "0.8rem",
              fontSize: "0.95rem",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            저장하기
          </button>
        </form>
      )}

      {/* 일지 카드 목록 */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#b891b5" }}>불러오는 중...</p>
      ) : entries.length === 0 ? (
        <p style={{ textAlign: "center", color: "#b891b5", fontSize: "0.95rem" }}>
          아직 일지가 없어요. 첫 번째 일지를 작성해보세요!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${i * 0.08}s`,
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: "1.8rem 2rem",
                border: "1px solid rgba(244, 114, 182, 0.15)",
                boxShadow: "0 4px 20px rgba(236, 72, 153, 0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(236, 72, 153, 0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(236, 72, 153, 0.06)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    color: "#7c3f73",
                    margin: 0,
                  }}
                >
                  {entry.title}
                </h3>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#c9a6c6",
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                    marginLeft: "1rem",
                  }}
                >
                  {formatDate(entry.created_at)}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: "1.9",
                  color: "#6b4569",
                  fontWeight: "300",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
