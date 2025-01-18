import React from "react";
import Clients from "../components/Clients/Clients";
import Awards from "../components/Awards/Awards";

const AwardsPage = () => {
  return (
    <div className="page">
      <Clients></Clients>
      <div className="w-75 mx-auto">
        <h1 className="text-start">Nagrade</h1>
        <p className="text-start">
          Pratite najvažnije aktuelnosti, događaje, koncerte i dešavanja koji
          oblikuju svet srpske muzike i kompozitorske umetnosti.
        </p>
        <hr />
      </div>
      <Awards></Awards>
    </div>
  );
};

export default AwardsPage;
