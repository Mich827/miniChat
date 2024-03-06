import { RaisedButton, Message } from "@/components";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "@/context/FirebaseContext";

export default function Chat() {
  const router = useRouter();
  const [messageText, setMessageText] = useState("");
  const { user, signout, sendMessage, messages } = useContext(FirebaseContext);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(messageText);
    setMessageText("");
  };

  if (!user) return null;

  return (
    <div className="chat container">
      <div className="sider">
        {user && (
          <div>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="sider-avatar"
            />
            <h2>{user.displayName}</h2>
            <h3>{user.email}</h3>
          </div>
        )}
        <RaisedButton onClick={signout}>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
          {messages.map((message) => {
            return (
              <Message
                message={message}
                isOwnMessage={message.user.uid === user.uid}
              />
            );
          })}
        </div>
        <form className="input-container" onSubmit={handleSubmit}>
          <input
            placeholder="Enter your message here"
            value={messageText}
            onChange={handleChange}
          />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
