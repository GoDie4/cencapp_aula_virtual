"use client";
import React, { useState, FormEvent } from "react";
import { BsFillSendFill } from "react-icons/bs";
interface Comment {
  id: number;
  username: string;
  text: string;
  time: string;
  replies?: Comment[];
}

const CommentComponent = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newComment: Comment = {
      id: Date.now(),
      username: "Usuario",
      text: input,
      time: new Date().toLocaleTimeString(),
      replies: [],
    };

    setComments([newComment, ...comments]);
    setInput("");
  };


  return (
    <div className="max-w-lg mx-auto bg-secondary-50 py-6 px-3 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <div className="w-full relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un comentario..."
            className="w-full p-2 border pr-8 border-gray-300 focus:border-primary-main rounded-md focus:outline-none "
          />
          <button
            type="submit"
            className="absolute top-0 right-2 text-primary-main h-full text-white  py-2 rounded-md "
          >
            <BsFillSendFill />
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="p-4 rounded-lg shadow bg-white-main">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">
                {comment.username}
              </span>
              <span className="text-xs text-black-500">{comment.time}</span>
            </div>
            <p className="mt-2 text-black-800 text-sm">{comment.text}</p>
            <button className="text-primary-main text-sm font-semibold mt-2 hover:underline">
              Responder
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentComponent;
