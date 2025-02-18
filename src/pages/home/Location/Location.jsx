import { Map, Marker, ZoomControl } from "pigeon-maps";
import Header from "../../../components/Shared/Header";

export function Location() {
  return (
    <div>
      <Header
        title={"Where to Find Us"}
        description={"Locate our headquarters and connect with our expert team"}
      />

      <Map height={400} defaultCenter={[25.6221, 88.6438]} defaultZoom={15}>
        <ZoomControl />
        <Marker width={50} anchor={[25.6221, 88.6438]} />
      </Map>
    </div>
  );
}
