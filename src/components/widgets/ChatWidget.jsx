import { useEffect } from "react";
import {
  Widget,
  addResponseMessage,
  toggleMsgLoader,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "~/assets/styles/chat-widget.css";

const BRAND_PRIMARY = "#7b4a2b";
const INITIAL_MESSAGE =
  "Hi there! Ask about emergency service times, pricing, or what we recommend for the trees on your lot.";
let hasWelcomed = false;

export default function ChatWidget() {
  useEffect(() => {
    if (!hasWelcomed) {
      addResponseMessage(INITIAL_MESSAGE);
      hasWelcomed = true;
    }
  }, []);

  const handleNewUserMessage = async (message) => {
    toggleMsgLoader();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const data = await response.json().catch(() => ({}));
      const reply = data?.reply?.trim() || "I’m still thinking about that.";
      addResponseMessage(reply);
    } catch {
      addResponseMessage("Sorry, I’m having trouble responding right now.");
    } finally {
      toggleMsgLoader();
    }
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Timberfell Assistant"
      subtitle="Typically replies in a few seconds"
      senderPlaceHolder="Ask us about service hours..."
      launcherOpenLabel="Open chat"
      launcherCloseLabel="Close chat"
      showCloseButton
      primaryColor={BRAND_PRIMARY}
    />
  );
}
