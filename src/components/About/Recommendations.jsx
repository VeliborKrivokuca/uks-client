import React from "react";
import "./AboutAssociation.css"; // your custom CSS file
import { useLanguage } from "../../context/LanguageContext";
import Slider from "../Slider/Slider";
import Clients from "../Clients/Clients";

export default function Recommendations() {
  const { language } = useLanguage();

  const translations = {
    1: {
      title: "Preporuke",
      subtitle: "Preporuka minimalne vrednosti narudžbine seriozne muzike",
      description:
        "Priložena tabela o minimalnoj vrednosti narudžbina seriozne muzike stoji kao zvanična preporuka Udruženja kompozitora Srbije i pruža validan kompas o vrednosti svake narudžbine, kao i količini znanja, iskustva, truda, rada i vremena koje neimnovno biva uloženo u stvaranje svake kompozicije. Tabela prikazuje minimalnu odgovarajuću naknadu, dok složenost dela, stručnost i reputacija kompozitora, potrebna hitnost ili posebni zahtevi narudžbine mogu rezultirati većim honorarom. Vrednosti su predstavljene kroz procente u odnosu na minimalnu zaradu u Republici Srbiji, te se podrazumeva da je važno ažuriranje pri svakoj upotrebi. Etička obaveza svih aktera u narudžbini je da se unapred, otvoreno predstave svi navedeni, dodatni i propratni troškovi, koji su uslovljeni stvaranjem jednog zvučnog umetničkog dela, pre dogovaranja svakog vida saradnje.",
      links: [
        {
          text: "UKS Obrazac za narudžbinu",
          href: "#",
        },
        {
          text: "UKS Narudžbine",
          href: "#",
        },
      ],
    },
    2: {
      title: "Recommendations",
      subtitle: "Recommended minimum order value for serious music",
      description:
        "The attached table on the minimum value of orders for serious music stands as an official recommendation of the Association of Composers of Serbia and provides a valid compass on the value of each order, as well as the amount of knowledge, experience, effort, work and time invested in the creation of each composition. The table shows the minimum applicable fee, while the complexity of the work, the expertise and reputation of the composer, the urgency required or the special requirements of the order may result in a higher fee. The values ​​are presented as percentages in relation to the minimum wage in the Republic of Serbia, so it is understood that it is important to update each time you use them. The ethical obligation of all actors in the order is to openly present in advance all the listed, additional and accompanying costs, which are conditioned by the creation of a sound work of art, before agreeing on any kind of cooperation.",
      links: [
        {
          text: "UKS Order form",
          href: "#",
        },
        {
          text: "UKS Orders",
          href: "#",
        },
      ],
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
          <p className="text-start border-bottom title-primary font-weight-light">
            {t.subtitle}
          </p>
        </div>
        <div class="my-5 mt-3 primary-color">
          <ul>
            {t.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none primary-color text-decoration-underline"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
          <p>
            <p>{t.description}</p>
          </p>
        </div>
      </div>
    </div>
  );
}
