import Header from "../../../components/Shared/Header";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch("partners.json")
      .then((res) => res.json())
      .then((data) => setPartners(data));
  }, []);

  return (
    <div>
      <Header
        title={"Partnering for Excellence"}
        description={
          "Driving innovation and success with our trusted alliances"
        }
      />

      <Marquee>
        {partners.map((partner) => (
          <img
            key={partner.id}
            className="h-32 px-10"
            src={partner.image}
            alt={partner.name}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Partners;
