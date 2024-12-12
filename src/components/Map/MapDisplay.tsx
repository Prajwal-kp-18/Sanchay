"use client";

import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Feature, Geometry } from "geojson";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

const policeStations = [
  { name: "TT Nagar Police Station", lat: 23.23725, long: 77.39984 },
  { name: "Kamla Nagar Police Station", lat: 23.21554, long: 77.39552 },
  { name: "Shyamla Hills Police Station", lat: 23.2457, long: 77.4107 },
  { name: "Habibganj Police Station", lat: 23.2295, long: 77.4381 },
  { name: "Piplani Police Station", lat: 23.2289, long: 77.4718 },
  { name: "Govindpura Police Station", lat: 23.2587, long: 77.4935 },
  { name: "Ashoka Garden Police Station", lat: 23.2494, long: 77.4631 },
  { name: "MP Nagar Police Station", lat: 23.2332, long: 77.4272 },
  { name: "Bhopal Kotwali Police Station", lat: 23.2689, long: 77.4012 },
  { name: "Hanumanganj Police Station", lat: 23.2812, long: 77.4135 },
  { name: "Chhola Mandir Police Station", lat: 23.2856, long: 77.4343 },
  { name: "Shahpura Police Station", lat: 23.1945, long: 77.4423 },
  { name: "Misrod Police Station", lat: 23.1734, long: 77.4802 },
  { name: "Kolar Police Station", lat: 23.1678, long: 77.4187 },
  { name: "Jahangirabad Police Station", lat: 23.2635, long: 77.4273 },
  { name: "Mangalwara Police Station", lat: 23.2721, long: 77.4224 },
  { name: "Talaiya Police Station", lat: 23.2685, long: 77.4152 },
  { name: "Ayodhya Nagar Police Station", lat: 23.2467, long: 77.4823 },
  { name: "Bagh Sewania Police Station", lat: 23.2118, long: 77.4756 },
  { name: "Khajuri Sadak Police Station", lat: 23.1245, long: 77.5712 },
  { name: "Ratibad Police Station", lat: 23.1101, long: 77.3865 },
  { name: "Berasia Police Station", lat: 23.6352, long: 77.4323 },
];

const categories = [
  "COMMUNICATION_DEVICES",
  "COMPUTER_AND_IT_EQUIPMENT",
  "NETWORKING_EQUIPMENT",
  "SURVEILLANCE_AND_TRACKING",
  "VEHICLE_AND_ACCESSORIES",
  "PROTECTIVE_GEAR",
  "FIREARMS",
  "FORENSIC",
  "MEDICAL_FIRST_AID",
  "OFFICE_SUPPLIES",
];

const madhyaPradeshGeoJSON: Feature<Geometry> = {
  type: "Feature",
  properties: {},
  geometry: {
    coordinates: [
      [78.24622965816889, 26.874407146994344],
      [78.92825903491456, 26.699128591712892],
      [79.0876828080352, 26.29676586261421],
      [78.9230685615342, 25.923825232011012],
      [78.71669997259261, 25.64535804575131],
      [78.83199600604752, 25.28796985804898],
      [79.23916202750331, 25.194415528659192],
      [79.35665268130884, 25.286446221822928],
      [79.4714764573556, 25.114204719191193],
      [79.7781146434603, 25.138933010569147],
      [80.25120630229429, 25.387121568989926],
      [80.4672095350366, 25.173320697325636],
      [80.34757177021527, 25.068520700985104],
      [80.85013801469677, 25.169478162388316],
      [80.88901218651796, 24.95697427134327],
      [81.15473624384214, 24.953631065147405],
      [81.39915735104631, 25.189415319640645],
      [81.66615141584242, 25.145785000151733],
      [81.94379555092013, 24.955008130145686],
      [82.17801011583151, 24.79094675191692],
      [82.36960860710593, 24.68049778844393],
      [82.77588888310004, 24.618147903253686],
      [82.8087809993936, 24.296603078657057],
      [82.83074061552855, 24.068900873814513],
      [82.59246556510288, 23.84392136277303],
      [82.06468904279257, 23.852386802237916],
      [81.60445505702637, 23.858138492586107],
      [81.62383486346505, 23.618190492993932],
      [81.86299991939995, 23.49525556572368],
      [82.14446059843175, 23.250860948179366],
      [81.72415227030177, 22.675477550554987],
      [81.3100961134034, 22.45953144474737],
      [80.94075119930312, 22.181169382349623],
      [80.72364215978808, 21.799144968934115],
      [80.70133632503371, 21.43446554555139],
      [80.5287979495937, 21.31342626798103],
      [80.20588131854237, 21.558034755042883],
      [79.83954578785489, 21.618593603242033],
      [79.4081846694956, 21.697630343857284],
      [79.21329183672583, 21.695160259476864],
      [78.63009942455926, 21.586431717626994],
      [77.69853359490446, 21.302673762974692],
      [77.43581608345892, 21.438477894303546],
      [77.32374034391023, 21.740781356649308],
      [76.68982503070879, 21.476237083901964],
      [76.47108898605279, 21.30446346130185],
      [76.20661695334093, 21.21187283076104],
      [74.90313935884583, 21.521279382377273],
      [74.41413316568736, 22.030631851696555],
      [74.01262367329917, 22.399550447527105],
      [74.3896932659762, 22.91010008436561],
      [74.65095161146155, 23.349638148553765],
      [74.79975897735778, 23.680673117266835],
      [74.89960116460134, 24.069621073494986],
      [74.74178277132347, 24.530149371288303],
      [74.83730621065774, 24.959009708649006],
      [75.29410689613925, 25.053552027860633],
      [75.285307741846, 24.72979599161137],
      [75.71863664595332, 24.742194302050706],
      [75.8658229715495, 24.44390315690545],
      [75.65148656483933, 24.175488725073507],
      [75.50118016503808, 23.928607077800436],
      [75.86318974175668, 23.919995418236596],
      [76.10140748578135, 24.228901588312056],
      [76.50514833569645, 24.239483412076083],
      [76.93009229983875, 24.209337317672905],
      [76.7879578301708, 24.527011407479165],
      [76.9659887992974, 24.550839464783948],
      [76.82534773386271, 24.788522236819546],
      [76.81765719702912, 25.04916498257603],
      [77.35135994206632, 25.179030874136316],
      [77.21057748337125, 25.41734922814362],
      [76.71757742101994, 25.368517685498887],
      [76.43348836401748, 25.72530578536191],
      [76.67751363518005, 25.87079133026782],
      [77.05225950956515, 26.15887465593981],
      [77.58723883736616, 26.387520673464422],
      [78.07461574109232, 26.715151359618602],
      [78.29677632103727, 26.858321281178036],
      [78.83916885603139, 26.74063765696404],
    ],
    type: "LineString",
  },
};

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [stationData, setStationData] = useState<
    { location: string; quantity: number }[]
  >([]);

  useEffect(() => {
    initializeMap();
    fetchStationData();
  }, [selectedCategory]);

  const initializeMap = () => {
    if (!mapRef.current) {
      const map = L.map("map").setView([23.23725, 77.39984], 10);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
    }
  };

  const fetchStationData = async () => {
    try {
      const response = await fetch(
        `/api/items-by-category?category=${selectedCategory}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const aggregatedData = aggregateData(data.data); // Aggregate the quantity
      setStationData(aggregatedData);
      updateMapMarkers(aggregatedData);
    } catch (error) {
      console.error("Error fetching station data:", error);
    }
  };

  // Aggregate quantities for locations
  const aggregateData = (
    data: { quantity: number; location: string }[],
  ): { location: string; quantity: number }[] => {
    const aggregated: Record<string, number> = {};
    data.forEach((item) => {
      aggregated[item.location] =
        (aggregated[item.location] || 0) + item.quantity;
    });

    return Object.entries(aggregated).map(([location, quantity]) => ({
      location,
      quantity,
    }));
  };

  const updateMapMarkers = (data: { location: string; quantity: number }[]) => {
    if (!mapRef.current) return;

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        mapRef.current!.removeLayer(layer);
      }
    });

    data.forEach((item) => {
      const station = policeStations.find((ps) => ps.name === item.location);
      if (!station) return;

      const circleColor = item.quantity > 10 ? "blue" : "red";

      const marker = L.marker([station.lat, station.long])
        .addTo(mapRef.current!)
        .on("click", () => {
          // Redirect to a dynamic page based on the location
          window.location.href = `/station/${item.location}`;
        });

      const popup = L.popup({
        autoClose: false,
        closeOnClick: false,
      }).setContent(`<b>${item.location}</b><br>Quantity: ${item.quantity}`);

      marker.bindPopup(popup).openPopup();

      L.circle([station.lat, station.long], {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 0.5,
        radius: 200,
      }).addTo(mapRef.current!);
    });
  };

  const handleSearch = () => {
    if (!mapRef.current) return;

    const station = policeStations.find((station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (station) {
      mapRef.current.setView([station.lat, station.long], 14);
    } else {
      alert("Station not found");
    }
  };

  return (
    <div className="relative ">
      <div className=" mx-auto mb-6 max-w-4xl rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-lg dark:bg-boxdark-2 ">
        <div className=" mb-4 flex items-center ">
          <select
            className="mr-4 rounded-lg border px-4 py-2 text-sm focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            className="w-3/4 rounded-lg border px-4 py-2 text-sm placeholder-gray-400 focus:outline-none"
            type="text"
            placeholder="Search for a station..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-4 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      <div
        id="map"
        className="flex h-[calc(100vh-4rem)] w-full rounded-lg bg-gray-100"
      ></div>
    </div>
  );
};

export default MapComponent;
