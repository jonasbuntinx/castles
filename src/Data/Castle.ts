import dayjs = require("dayjs");
import * as MapboxGL from "mapbox-gl";

// Types
type Castle = {
  id: number;
  name: string;
  location: MapboxGL.LngLat;
  visited: Date;
  condition: Condition;
  description: string;
};

enum Condition {
  Ruins = "RUINS",
  Reconstructed = "RECONSTRUCTED",
  Original = "ORIGINAL",
}

// Data
const castles = [
  {
    id: 0,
    name: "Edo Castle",
    location: new MapboxGL.LngLat(139.752496, 35.6877513),
    visited: dayjs("2011-08-08").toDate(),
    condition: Condition.Ruins,
    description:
      "Edo Castle (江戸城, Edo-jō), also known as Chiyoda Castle (千代田城, Chiyoda-jō), is a flatland castle that was built in 1457 by Ōta Dōkan. It is today part of the Tokyo Imperial Palace and is in Chiyoda, Tokyo (then known as Edo), Toshima District, Musashi Province.",
  },
  {
    id: 1,
    name: "Matsumoto Castle",
    location: new MapboxGL.LngLat(137.9666734, 36.2386573),
    visited: dayjs("2016-08-24").toDate(),
    condition: Condition.Original,
    description:
      "Matsumoto Castle (松本城, Matsumoto-jō), originally known as Fukashi Castle, is one of Japan's premier historic castles, along with Himeji and Kumamoto. The building is also known as the Crow Castle (烏城, Karasu-jō) due to its black exterior.",
  },
  {
    id: 2,
    name: "Osaka Castle",
    location: new MapboxGL.LngLat(135.5237615, 34.6873377),
    visited: dayjs("2012-03-12").toDate(),
    condition: Condition.Reconstructed,
    description:
      "Osaka Castle (大坂城 or 大阪城, Ōsaka-jō) is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan's most famous landmarks and it played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.",
  },
  {
    id: 3,
    name: "Nijō Castle",
    location: new MapboxGL.LngLat(135.746024, 35.0142343),
    visited: dayjs("2011-07-04").toDate(),
    condition: Condition.Original,
    description:
      "Nijō Castle (二条城, Nijō-jō) is a flatland castle in Kyoto, Japan. The castle consists of two concentric rings (Kuruwa) of fortifications, the Ninomaru Palace, the ruins of the Honmaru Palace, various support buildings and several gardens. The surface area of the castle is 275,000 square metres (27.5 ha; 68 acres), of which 8,000 square metres (86,000 sq ft) is occupied by buildings.",
  },
];

export { Castle, Condition, castles };
