import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Home = ({ url }) => {
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [posts, setPosts] = useState([]);
  let history = useHistory();
  const handleProfile = async () => {
    // e.preventDefault()
    try {
      const response = await fetch(`${url}/users/me`, {
        // method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      localStorage.setItem("authorid", data.data._id);
      localStorage.getItem("authorid");
      setUserName(data.data.username);
      setMessages(data.data.messages);
      setPosts(data.data.posts);
      // console.log(data.data.posts);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogin = () => {
    history.push("/");
  };
  const handleMarketPlace = () => {
    history.push("/posts");
  };
  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <>
      <div className="homeHeader">
        <h1>Welcome to Stranger's Things!</h1>
        {localStorage.getItem("token") && <h3>Logged in as: {userName}</h3>}
        {localStorage.getItem("token") ? (
          <button className="inputBtn" onClick={handleMarketPlace}>
            View Marketplace
          </button>
        ) : (
          <button className="inputBtn" onClick={handleLogin}>
            Log In
          </button>
        )}
        {localStorage.getItem('token') ? <h1>Sent Messages</h1> : <h1>Please Login to Continue</h1>}
        <hr></hr>
        <hr></hr>
      </div>
      <div>
        {messages.map((message, i) => {
          return (
            <div key={i} className="postContainer msgContainer">
              <div className="postDetails msgDetails">
                <h4>
                  {i}. Post title:- {message.post.title}
                </h4>
                <p>- Your Message: {message.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
