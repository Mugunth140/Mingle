import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { FiLoader } from "react-icons/fi";
import "../sass/components/sidebar.scss";

const SideBar = () => {
  const { users, isUserLoading, getUsers, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading)
    return (
      <>
        <div
          className="user-loader"
          style={{ "--icon-color": "var(--neutral)" }}
        >
          <FiLoader
            size={20}
            style={{ color: "var(--icon-color)" }}
            className="spinner"
          />
          <span>loading...</span>
        </div>
      </>
    );

  return (
    <aside className="sidebar-container">
      {users.map((user) => (
        <button
          key={user._id}
          className={`sidebar-item ${
            selectedUser?._id === user._id ? "selected" : ""
          }`}
          onClick={() => setSelectedUser(user)}
        >
          <img src={user.profilepic || "/avatar.png"} alt={user.username} loading="lazy"/>
          <div className="sidebar-item-info">
            <h3>{user.username}</h3>
            <span style={{ color: onlineUsers.includes(user._id) ? "green" : "grey" }}>
            {onlineUsers.includes(user._id) ? "Online" : "Offline"}
            </span>
          </div>
        </button>
      ))}
    </aside>
  );
};

export default SideBar;
