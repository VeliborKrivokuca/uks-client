import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import HomePage from "./pages/Homepage";
import Footer from "./components/Footer/Footer";
import AwardsPage from "./pages/AwardsPage";
import MembersPage from "./components/Members/Members";
import AboutAssociation from "./components/About/AboutAssociation";
import AboutUs from "./components/About/AboutUs";
import AktuelnostiDetails from "./components/Aktuelnosti/AktuelnostiDetails";
import TribineList from "./components/Tribine/Tribine";
import TribineDetail from "./components/Tribine/TribineDetail";
import AktuelnostiPreview from "./components/Aktuelnosti/AktuelnostiPreview";
import RazgovoriPreview from "./components/Razgovori/RazgovoriPreview";
import RazgovoriDetail from "./components/Razgovori/RazgovoriDetails";
import LegalDocuments from "./components/About/LegalDocuments";
import AdmissionRegulations from "./components/About/AdmissionRegulations";
import Recommendations from "./components/About/Recommendations";
import MemberProfilePage from "./components/Members/MemberProfile";
import NotFoundPage from "./components/NotFound/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store/store";

import { fetchAllPages } from "./store/slices/pagesSlice";

const App = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.pages);

  useEffect(() => {
    dispatch(fetchAllPages());
  }, [dispatch]);

  const formatRoute = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <Router>
      <Header pages={pages} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aktuelnosti" element={<AktuelnostiPreview />} />
        <Route path="/nagrade" element={<AwardsPage />} />
        <Route path="/clanovi" element={<MembersPage />} />
        <Route path="/clanovi/:id" element={<MemberProfilePage />} />
        <Route path="/o-udruženju" element={<AboutAssociation />} />
        <Route path="/o-nama" element={<AboutUs />} />
        <Route path="/pravni-dokumenti" element={<LegalDocuments />} />
        <Route path="/pravilnik-o-prijemu" element={<AdmissionRegulations />} />
        <Route path="/preporuke" element={<Recommendations />} />
        <Route path="/blog/:id" element={<AktuelnostiDetails />} />
        <Route path="/tribine" element={<TribineList />} />
        <Route path="/tribine/:id" element={<TribineDetail />} />
        <Route path="/razgovori" element={<RazgovoriPreview />} />
        <Route path="/razgovori/:id" element={<RazgovoriDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
