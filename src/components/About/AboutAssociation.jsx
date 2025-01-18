import React from "react";
import "./AboutAssociation.css"; // your custom CSS file
import { useLanguage } from "../../context/LanguageContext";
import about from "../../assets/about.png";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";

export default function AboutAssociation() {
  const { language } = useLanguage();

  const translations = {
    1: {
      title: "O Udruženju",
      subtitle: "Udruženje kompozitora Srbije",
      description1:
        "Udruženje kompozitora Srbije predstavlja reprezentativno i plodno udruženje koje, od svog osnivanja –1945. godine, do sada, predano radi na negovanju i očuvanju srpske kulturne baštine i promociji savremenog muzičkog stvaralaštva, kako u domenu umetničke muzike, tako i u oblasti popularnog žanra.",
      members:
        "Udruženje kompozitora Srbije ima 330 članova podeljenih u tri sekcije: Kompozitori ozbiljne muzike, Kompozitori džeza i popularne muzike, Muzički pisci (muzikolozi i etnomuzikolozi). Udruženje kompozitora Srbije ulaže veliku energiju da srpsku muziku učini:",
      visible: "VIDLJIVOM",
      accessible: "DOSTUPNOM",
      present: "PRISUTNOM",
      visibleDesc:
        "tako što promoviše dela svojih članova, organizuje muzičke događaje na kojima se daje značaj i izvodi muzika svojih istaknutih članova...",
      accessibleDesc: "tako što objavljuje partiture, CDove...",
      presentDesc:
        "tako što čini sve da dela kompozitora, članova Udruženja budu na repertoaru simfonijskih orkestara...",
      conclusion:
        "da njihova muzika živi na koncertnom podijumu, da bude snimljena i emitovana na radiju i televiziji, da podstakne pisanje komentara u stručnim časopisima, novinama i na portalima posvećenim muzici...",
    },
    2: {
      title: "About the Association",
      subtitle: "Association of Composers of Serbia",
      description1:
        "The Association of Composers of Serbia represents a prominent and productive organization that, since its founding in 1945, has been dedicated to fostering and preserving Serbian cultural heritage and promoting contemporary musical creativity, both in the realm of classical music and popular genres.",
      members:
        "The Association of Composers of Serbia has 330 members divided into three sections: Composers of Classical Music, Composers of Jazz and Popular Music, and Music Writers (musicologists and ethnomusicologists). The Association of Composers of Serbia invests significant effort to make Serbian music:",
      visible: "VISIBLE",
      accessible: "ACCESSIBLE",
      present: "PRESENT",
      visibleDesc:
        "by promoting the works of its members, organizing musical events that highlight and perform the music of its distinguished members...",
      accessibleDesc: "by publishing scores, CDs...",
      presentDesc:
        "by ensuring the works of its composer members are included in the repertoires of symphony orchestras...",
      conclusion:
        "so that their music lives on concert stages, is recorded and broadcast on radio and television, and inspires reviews in professional journals, newspapers, and on music-dedicated portals...",
    },
  };

  const t = translations[language];

  return (
    <div className="">
      <Clients></Clients>
      <Slider></Slider>
      <div className="width-90 my-5 primary-color">
        <div className="">
          <h2 className="mb-4 primary-color">{t.title}</h2>
          <div className="row mb-4">
            <div className="col-md-3">
              <img
                src={about}
                alt={t.subtitle}
                className="img-fluid rounded shadow pe-4 py-3"
              />
            </div>

            <div className="col-md-9">
              <h3 className="primary-color mb-3">{t.subtitle}</h3>
              <p>{t.description1}</p>
            </div>
          </div>

          <p>{t.members}</p>

          <ul>
            <li>
              <strong>{t.visible}</strong>, {t.visibleDesc}
            </li>
            <li>
              <strong>{t.accessible}</strong>, {t.accessibleDesc}
            </li>
            <li>
              <strong>{t.present}</strong>, {t.presentDesc}
            </li>
          </ul>

          <p>{t.conclusion}</p>
        </div>
      </div>
    </div>
  );
}
