import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { FiLoader } from "react-icons/fi";
import "../sass/components/sidebar.scss";

const SideBar = () => {
  const { users, isUserLoading, getUsers, setSelectedUser, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

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

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
          <img src={user.profilepic || "/avatar.png"} alt={user.username} />
          <div className="sidebar-item-info">
            <h3>{user.username}</h3>
            <span style={{ color: onlineUsers ? "green" : "grey" }}>
              {onlineUsers ? "online" : "offline"}
            </span>
          </div>
        </button>
      ))}
    </aside>
  );
};

export default SideBar;
