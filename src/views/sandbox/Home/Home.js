import React from "react";
import axios from "axios";
import { Button } from "antd";

const ajax = () => {
  // 取数据
  // axios.get("http://localhost:8000/posts").then((res) => {
  //   console.log(res.data);
  // });
  // 增
  // axios.post("http://localhost:8000/posts", {
  //   id: 3,
  //   title: "test",
  //   author: "test",
  // });
  // 改     put
  // axios.put('http://localhost:8000/posts/3',{
  //   title: "test-111111",
  // })
  // 改     patch
  // axios.patch("http://localhost:8000/posts/3", {
  //   title: "Kimura-Takuya",
  // });
  // 删
  // axios.patch("http://localhost:8000/posts/1")
  // 向下关联 _embed
  //   axios.get("http://localhost:8000/posts?_embed=comments").then((res) => {
  //     console.log(res.data);
  //   });
  // 向上关联  _expand
  // axios.get("http://localhost:8000/comments").then((res) => {
  //   console.log(res.data);
  // });

    axios.get("http://localhost:8000/comments?_expand=post").then((res) => {
      console.log(res.data);
    });
};

function Home() {
  return (
    <div>
      <Button tyoe="primary" onClick={ajax}>
        Button
      </Button>
    </div>
  );
}

export default Home;
