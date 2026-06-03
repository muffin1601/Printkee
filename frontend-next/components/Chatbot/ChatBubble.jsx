const ChatBubble = ({ from, text, options, onOption }) => (
  <div className={`pk-chat-row pk-${from}`}>
    {from === "bot" && (
      <img src="/agent-96.webp" alt="Sana" className="pk-chat-avatar"
        width={32} height={32} loading="lazy" decoding="async" />
    )}
    <div className={`pk-bubble pk-${from}`}>
      <p style={{ whiteSpace: "pre-line" }}>{text}</p>
      {options && (
        <div className="pk-options">
          {options.map((o) => (
            <button key={o} onClick={() => onOption(o)}>{o}</button>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default ChatBubble;
