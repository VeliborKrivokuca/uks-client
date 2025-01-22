import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/Homepage";
import { getAllPages } from "./services/apiService";
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
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store/store";
import MemberProfilePage from "./components/Members/MemberProfile";
import NotFoundPage from "./components/NotFound/NotFound";

const App = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await getAllPages();
        setPages(data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, []);

  const formatRoute = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <Provider store={store}>
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
          <Route
            path="/pravilnik-o-prijemu"
            element={<AdmissionRegulations />}
          />
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
    </Provider>
  );
};

export default App;
