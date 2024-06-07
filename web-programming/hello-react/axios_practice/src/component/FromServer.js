import axios from "axios";
import { REQUEST_URL } from "../config";
import UserTable from "./UserTable";
import { useState, useEffect } from "react";
import CampanyInfo from "./CompanyInfo";
export default function FromeServer() {
  const [clickedUserId, setClickedUserId] = useState();
  const [users, setUsers] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(REQUEST_URL.USERS);
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const getPost = async () => {
    try {
      const { data } = await axios.get(REQUEST_URL.POSTS);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await axios.get(REQUEST_URL.USERS);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const createUser = async () => {
    try {
      const requestData = {
        title: "title",
        body: "new post",
        userId: 1,
      };
      const { data } = await axios.post(REQUEST_URL.POSTS, requestData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={getPost}>게시글요청</button>
      <button onClick={getUser}>사용자요청</button>
      <button onClick={createUser}>게시글생성</button>
      {users ? (
        <UserTable users={users} setClickedUserId={setClickedUserId} />
      ) : null}
      {clickedUserId ? (
        <CampanyInfo
          company={users.find((u) => u.id === clickedUserId).company}
        ></CampanyInfo>
      ) : null}
    </div>
  );
}
