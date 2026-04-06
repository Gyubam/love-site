"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

interface Message {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
}

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameSet, setNicknameSet] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 불러오기
  useEffect(() => {
    if (!isOpen || !nicknameSet) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(100);
      if (data) setMessages(data);
    };

    fetchMessages();

    // 실시간 구독
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen, nicknameSet]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);

    const { error } = await supabase.from("messages").insert([
      {
        nickname,
        content: input.trim(),
      },
    ]);

    if (error) {
      console.error("메시지 전송 실패:", error);
      alert("메시지 전송에 실패했어 😢 : " + error.message);
    }

    setInput("");
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* 플로팅 채팅 버튼 */}
      <button
        className="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="채팅"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* 채팅 창 */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>💕 우리 채팅</span>
            {nicknameSet && (
              <span className="chat-nickname-badge">{nickname}</span>
            )}
          </div>

          {!nicknameSet ? (
            <div className="chat-nickname-form">
              <p>닉네임을 입력해줘!</p>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임"
                maxLength={10}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && nickname.trim()) {
                    setNicknameSet(true);
                  }
                }}
              />
              <button
                onClick={() => nickname.trim() && setNicknameSet(true)}
                disabled={!nickname.trim()}
              >
                입장하기
              </button>
            </div>
          ) : (
            <>
              <div className="chat-messages">
                {messages.length === 0 && (
                  <p className="chat-empty">아직 메시지가 없어요 💭</p>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-bubble ${
                      msg.nickname === nickname ? "mine" : "theirs"
                    }`}
                  >
                    {msg.nickname !== nickname && (
                      <span className="chat-sender">{msg.nickname}</span>
                    )}
                    <p>{msg.content}</p>
                    <span className="chat-time">{formatTime(msg.created_at)}</span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력해줘..."
                  maxLength={500}
                />
                <button onClick={handleSend} disabled={!input.trim() || loading}>
                  전송
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
