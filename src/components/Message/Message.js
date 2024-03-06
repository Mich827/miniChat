import { useMemo } from "react";
import styles from "./Message.module.css";

export default function Message({ message, isOwnMessage }) {
  const sentAt = useMemo(() => new Date(message.sentAt), [message.sentAt]);
  const randomAvatar = useMemo(() => {
    const index = Math.floor(Math.random() * 7 + 1);
    return `/avatar${index}.png`;
  }, []);
  return (
    <div
      className={`${styles.message} ${
        isOwnMessage ? styles.self : styles.other
      }`}
    >
      <img
        src={message?.user.photoURL || randomAvatar}
        alt={message?.user.displayName || ""}
        className={styles.avatar}
      />
      <div>
        <h6>{message.text}</h6>
        <p>
          {String(sentAt.getHours())}h
          {String(sentAt.getMinutes()).padStart(2, 0)}
        </p>
      </div>
    </div>
  );
}
