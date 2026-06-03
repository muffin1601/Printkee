import { MessageCircle } from "lucide-react";

const ChatLauncher = ({ onClick, isOpen }) => (
  <div className="pk-launcher-wrap" onClick={onClick}>
    <div className={`pk-launcher-bubble ${isOpen ? "pk-bubble-hidden" : "pk-bubble-visible"}`}>
      <span className="pk-launcher-text">Hi 👋 Need help with corporate gifting?</span>
    </div>
    <button className="pk-launcher" aria-label="Open chat support">
      <img src="/agent-96.webp" alt="Sana – Support Agent"
        className="pk-launcher-avatar" width={54} height={54}
        loading="lazy" decoding="async" />
      <span className="pk-launcher-icon">
        <MessageCircle size={13} strokeWidth={2} />
      </span>
    </button>
  </div>
);

export default ChatLauncher;
