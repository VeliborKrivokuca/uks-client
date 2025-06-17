import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";

import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AboutAssociation from "./components/About/AboutAssociation";
import AboutUs from "./components/About/AboutUs";
import AdmissionRegulations from "./components/About/AdmissionRegulations";
import AktuelnostiDetails from "./components/Aktuelnosti/AktuelnostiDetails";
import AktuelnostiPreview from "./components/Aktuelnosti/AktuelnostiPreview";
import Awards from "./components/Awards/Awards";
import AwardsPage from "./pages/AwardsPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/Homepage";
import LegalDocuments from "./components/About/LegalDocuments";
import MemberProfilePage from "./components/Members/MemberProfile";
import MembersPage from "./components/Members/Members";
import NotFoundPage from "./components/NotFound/NotFound";
import RazgovoriDetail from "./components/Razgovori/RazgovoriDetails";
import RazgovoriPreview from "./components/Razgovori/RazgovoriPreview";
import Recommendations from "./components/About/Recommendations";
import Rimus from "./components/Tribine/Rimus";
import TribinaKompozitora from "./components/Tribine/TribinaKompozitora";
import TribineDetail from "./components/Tribine/TribineDetail";
import TribineList from "./components/Tribine/Tribine";
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
        <Route path="/nagrade/:id" element={<AwardsPage />} />{" "}
        {/* Dynamic route */}
        <Route path="/clanovi" element={<MembersPage />} />
        <Route path="/clanovi/:id" element={<MemberProfilePage />} />
        <Route path="/o-udruženju" element={<AboutAssociation />} />
        <Route path="/o-nama" element={<AboutUs />} />
        <Route path="/pravni-dokumenti" element={<LegalDocuments />} />
        <Route path="/pravilnik-o-prijemu" element={<AdmissionRegulations />} />
        <Route path="/preporuke" element={<Recommendations />} />
        <Route path="/blog/:id" element={<AktuelnostiDetails />} />
        <Route path="/tribina-kompozitora" element={<TribinaKompozitora />} />
        <Route path="/rimus" element={<Rimus />} />
        <Route path="/festivali" element={<TribineList />} />
        <Route path="/festivali/:id" element={<TribineDetail />} />
        <Route path="/razgovori" element={<RazgovoriPreview />} />
        <Route path="/razgovori/:id" element={<RazgovoriDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
