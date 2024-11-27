import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const SearchInput = ({ isSearchClicked, setIsSearchClicked }) => {
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const { setSelectedConversation } = useConversation();

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/v1/users/", {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.success) {
        setConversations(response.data.users);
      }
    })();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearchClicked((c) => !c);
    if (!search) return;
    if (search.length < 3) return toast.error("Atleast 3 characters required");
    const conversation = conversations.find((c) =>
      c.fullname.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    setSearch("");
    if (conversation) {
      setSelectedConversation(conversation);
    } else return toast.error("No converation found");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="transition-all duration-500 ease-in-out flex items-center gap-2"
    >
      <input
        type="text"
        value={search}
        placeholder="search"
        className={`${
          isSearchClicked ? "flex" : "hidden"
        } rounded-full input input-bordered w-full h-10`}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="text-center" type="submit">
        <IoSearch size={"1.5em"} color="#00c245" />
      </button>
    </form>
  );
};

export default SearchInput;
