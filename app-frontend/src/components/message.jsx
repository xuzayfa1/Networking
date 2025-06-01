import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import api from '../utils/api';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [convoResponse, msgResponse] = await Promise.all([
          api.get('/messages/conversations'), // Adjust endpoint
          api.get('/messages'), // Adjust endpoint
        ]);
        setConversations(convoResponse.data);
        setMessages(msgResponse.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Messages</h2>
            <div>
              <Link to="/products" className="btn btn-outline-secondary">Back to Products</Link>
            </div>
          </div>

          <div className="row">
            {/* Conversations List */}
            <div className="col-4">
              <div className="card">
                <ul className="list-group list-group-flush">
                  {conversations.map((chat) => (
                    <li
                      key={chat.id}
                      className={`list-group-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                      onClick={() => handleSelectChat(chat)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6>{chat.name}</h6>
                          <p className="mb-0">{chat.lastMessage}</p>
                        </div>
                        <small>{chat.time}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Chat Window */}
            <div className="col-8">
              {selectedChat ? (
                <div className="card p-3">
                  <h5>{selectedChat.name}</h5>
                  <div className="chat-body" style={{ height: '300px', overflowY: 'auto' }}>
                    {messages
                      .filter((msg) => msg.chatId === selectedChat.id)
                      .map((msg, index) => (
                        <div
                          key={index}
                          className={`d-flex ${
                            msg.sender === 'You' ? 'justify-content-end' : 'justify-content-start'
                          } mb-2`}
                        >
                          <div
                            className={`p-2 rounded ${
                              msg.sender === 'You' ? 'bg-primary text-white' : 'bg-light'
                            }`}
                          >
                            <small>{msg.sender}: </small>
                            {msg.text}
                            <br />
                            <small>{msg.time}</small>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="mt-3">
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Type a message..."
                    ></textarea>
                    <button className="btn btn-primary mt-2">Send</button>
                  </div>
                </div>
              ) : (
                <div className="card p-3 text-center">
                  <p>Select a conversation to start chatting.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;