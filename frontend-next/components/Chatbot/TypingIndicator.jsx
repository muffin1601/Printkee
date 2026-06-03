const TypingIndicator = () => (
  <div className="pk-chat-row pk-bot">
    <img src="/agent-96.webp" alt="Sana" className="pk-chat-avatar"
      width={32} height={32} loading="lazy" decoding="async" />
    <div className="pk-typing-bubble">
      <span /><span /><span />
    </div>
  </div>
);

export default TypingIndicator;
