import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/AxiosWithAuth";
import ColorList from "./ColorList";
import Bubbles from "./Bubbles";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        console.log("display test:", res);
        setColorList(res.data);
        console.log(setColorList);
      })
      .catch(err => console.error(err.response));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;