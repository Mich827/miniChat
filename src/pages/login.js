import { RaisedButton } from "@/components";
import { FirebaseContext } from "@/context/FirebaseContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
export default function Login() {
  const { user, signin } = useContext(FirebaseContext);

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/chat");
  }, [user]);
  return (
    <div className="login container">
      <h1
        style={{
          color: "#ffffff",
          textAlign: "center",
          fontSize: "45px",
          textShadow: "3px 3px 4px black",
        }}
      >
        Say Something
      </h1>
      <RaisedButton size="large" onClick={() => signin("google")}>
        GOOGLE LOGIN
      </RaisedButton>
      <RaisedButton size="large" onClick={() => signin("facebook")}>
        FACEBOOK LOGIN
      </RaisedButton>
    </div>
  );
}
