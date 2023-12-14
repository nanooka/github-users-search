import { useState, useEffect } from "react";
import "./app.css";
import { ReactComponent as Logo } from "./logo.svg";

export default function App() {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (username === "") return;

    async function getUsers() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        console.log(data);

        setUserImage(data.avatar_url);
        setOutput(data.login);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }

    getUsers();
  }, [username]);

  return (
    <div className="container">
      <div className="logo">
        <Logo />
      </div>
      <input
        type="text"
        placeholder="Enter username..."
        onChange={(e) => setUsername(e.target.value)}
      />
      {output ? (
        <div className="userInfo">
          <img
            src={userImage}
            alt={username + "'s avatar"}
            className="avatar"
          />
          <span>{output}</span>
        </div>
      ) : null}
    </div>
  );
}
