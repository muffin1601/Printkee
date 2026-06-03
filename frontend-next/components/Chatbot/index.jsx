"use client";
import { useEffect, useState, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { chatSteps } from "./chatFlow";
import { submitLead } from "../../utils/submitLead";
import { validators } from "../../utils/validators";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import ChatLauncher from "./ChatLauncher";

const Chatbot = () => {
  const [open, setOpen]         = useState(false);
  const [step, setStep]         = useState(0);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({});
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const chatEndRef               = useRef(null);

  /* Auto-open once after 6s */
  useEffect(() => {
    if (!localStorage.getItem("pk_chatOpened")) {
      const t = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("pk_chatOpened", "yes");
      }, 6000);
      return () => clearTimeout(t);
    }
  }, []);

  /* Initial message */
  useEffect(() => {
    if (open && messages.length === 0) botReply(chatSteps[0]);
  }, [open]);

  /* Scroll to bottom */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const botReply = (stepData) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: typeof stepData.text === "function" ? stepData.text(formData) : stepData.text,
          options: stepData.options || null,
        },
      ]);
    }, 900);
  };

  const send = async (value = input) => {
    const val = (value || "").trim();
    if (!val || typing) return;

    setMessages((prev) => [...prev, { from: "user", text: val }]);
    setInput("");

    const current = chatSteps[step];

    if (validators[current.key] && !validators[current.key](val)) {
      return botReply({
        text:
          current.key === "email"
            ? "That email doesn't look right. Could you recheck? 📧"
            : "Please enter a valid 10-digit mobile number. 📱",
      });
    }

    const updatedData = { ...formData, [current.key]: val };
    setFormData(updatedData);

    if (step === chatSteps.length - 1) {
      await submitLead({ ...updatedData, source: "Chatbot" });
      return botReply({ text: "🎉 Thanks! Our team will contact you shortly." });
    }

    setStep((s) => s + 1);
    botReply(chatSteps[step + 1]);
  };

  return (
    <>
      <ChatLauncher isOpen={open} onClick={() => setOpen(true)} />

      {open && (
        <div className="pk-chat-window">
          {/* Header */}
          <div className="pk-chat-header">
            <div className="pk-chat-title">
              <img src="/agent-96.webp" alt="Sana" className="pk-agent-avatar"
                width={36} height={36} loading="eager" decoding="async" />
              <div className="pk-agent-info">
                <span className="pk-agent-name">Sana · Printkee</span>
                <span className="pk-agent-status">● Online</span>
              </div>
            </div>
            <button className="pk-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="pk-chat-body">
            {messages.map((m, i) => (
              <ChatBubble key={i} {...m} onOption={send} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="pk-chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              disabled={typing}
              aria-label="Chat message"
            />
            <button onClick={() => send()} disabled={typing} aria-label="Send">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
