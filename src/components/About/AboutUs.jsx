import React from "react";
import "./AboutAssociation.css"; // your custom CSS file
import { useLanguage } from "../../context/LanguageContext";
import about from "../../assets/about.png";
import Slider from "../Slider/Slider";
import Clients from "../Clients/Clients";

export default function AboutUs() {
  const { language } = useLanguage();

  const translations = {
    1: {
      title: "O Nama",
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
      boardTitle: "Udruženje kompozitora Srbije",
      president: "Rade Radivojević, predsednik",
      vicePresident: "Svetlana Savić, potpredsednik",
      executiveBoard: "Članovi Upravnog odbora:",
      executiveMembers: [
        "Ana Gnjatović",
        "Vladimir Korać",
        "Svetlana Savić",
        "Tatjana Milošević Mijanović",
        "Aleksandar Filipović",
        "Dragoljub Ilić",
        "Nevenka Leković",
        "Rade Radivojević",
        "Biljana Leković",
        "Ivana Miladinović Prica",
        "Ivana Petković Lozo",
      ],
      supervisoryBoard: "Članovi Nadzornog odbora:",
      supervisoryMembers: [
        "Milorad Marinković",
        "Damjan Jovičin",
        "Vladan Vučković Paja",
      ],
      statusCommittee: "Statusna komisija:",
      statusMembers: [
        "Rade Radivojević",
        "Miroslav-Miša Savić",
        "Katarina Lazarević",
        "Vladan Vučković Paja",
        "Dragomir Milenković",
      ],
      coordinator: "Predstavnik UKS-a u Koordinacionom odboru umetničkih udruženja je Dragomir Milenković.",
    },
    2: {
      title: "About Us",
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
      boardTitle: "Association of Composers of Serbia",
      president: "Rade Radivojević, President",
      vicePresident: "Svetlana Savić, Vice President",
      executiveBoard: "Executive Board Members:",
      executiveMembers: [
        "Ana Gnjatović",
        "Vladimir Korać",
        "Svetlana Savić",
        "Tatjana Milošević Mijanović",
        "Aleksandar Filipović",
        "Dragoljub Ilić",
        "Nevenka Leković",
        "Rade Radivojević",
        "Biljana Leković",
        "Ivana Miladinović Prica",
        "Ivana Petković Lozo",
      ],
      supervisoryBoard: "Supervisory Board Members:",
      supervisoryMembers: [
        "Milorad Marinković",
        "Damjan Jovičin",
        "Vladan Vučković Paja",
      ],
      statusCommittee: "Status Committee:",
      statusMembers: [
        "Rade Radivojević",
        "Miroslav-Miša Savić",
        "Katarina Lazarević",
        "Vladan Vučković Paja",
        "Dragomir Milenković",
      ],
      coordinator: "The UKS representative in the Coordination Board of Artistic Associations is Dragomir Milenković.",
    },
  };

  const t = translations[language];

  return (
    <div>
      <Clients />
      <Slider />
      <div className="width-90 my-5">
        <div className="">
          <h1 className="text-start title-primary">{t.title}</h1>
          <p className="text-start border-bottom pb-3 title-primary font-weight-light">
            {t.subtitle}
          </p>
        </div>

        <div className="my-5 primary-color fs-12">
          <h2 className="mb-4">{t.boardTitle}</h2>
          <p>
            <strong>{t.president}</strong>
          </p>
          <p>
            <strong>{t.vicePresident}</strong>
          </p>
          <p>
            <strong>{t.executiveBoard}</strong>
          </p>
          <ul>
            {t.executiveMembers.map((member, index) => (
              <li className="fs-12 primary-color" key={index}>{member}</li>
            ))}
          </ul>
          <p>
            <strong>{t.supervisoryBoard}</strong>
          </p>
          <ul>
            {t.supervisoryMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <p>
            <strong>{t.statusCommittee}</strong>
          </p>
          <ul>
            {t.statusMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <p>
            {t.coordinator}
          </p>
        </div>
      </div>
    </div>
  );
}
