import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContent from "../src/components/MainContent";
import DetailsPage from "./pages/DetailsPage";
import { create } from "../src/redux/AuthSlice";
import { getToken } from "../src/components/utils";
import LikesPage from "./pages/Like";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchToken = async () => {
      const authData = await getToken();
      if (authData) {
        dispatch(create(authData));
      }
    };
    fetchToken();
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainContent token={token} />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/likes" element={<LikesPage />} />
      </Routes>
    </div>
  );
};
export default App;
