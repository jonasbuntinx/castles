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

// Helpers
const printCondition = (condition: Condition): string => {
  switch (condition) {
    case Condition.Ruins:
      return "Ruins";
    case Condition.Reconstructed:
      return "Reconstructed";
    case Condition.Original:
      return "Original";
  }
};

// Static Data
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
      'Matsumoto Castle (松本城, Matsumoto-jō), originally known as Fukashi Castle, is one of Japan\'s premier historic castles, along with Himeji and Kumamoto. The building is also known as the "Crow Castle" (烏城, Karasu-jō) due to its black exterior.',
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
  {
    id: 4,
    name: "Himeji Castle",
    location: new MapboxGL.LngLat(134.6917107, 34.8394534),
    visited: dayjs("2013-04-20").toDate(),
    condition: Condition.Original,
    description:
      'Himeji Castle (姫路城, Himeji-jō) is a hilltop Japanese castle complex situated in the city of Himeji which is located in the Hyōgo Prefecture of Japan. The castle is regarded as the finest surviving example of prototypical Japanese castle architecture, comprising a network of 83 rooms with advanced defensive systems from the feudal period. The castle is frequently known as Hakuro-jō or Shirasagi-jō ("White Egret Castle" or "White Heron Castle") because of its brilliant white exterior and supposed resemblance to a bird taking flight.',
  },
  {
    id: 5,
    name: "Oshi Castle",
    location: new MapboxGL.LngLat(139.4526793, 36.1375827),
    visited: dayjs("2020-09-17").toDate(),
    condition: Condition.Reconstructed,
    description:
      'Oshi Castle (忍城, Oshi-jō) is a Japanese castle located in Gyōda, Saitama Prefecture, Japan. During the Edo period, Oshi Castle was the center of the 100,000 koku Oshi Domain, but the castle is far better known for its association with the Siege of Oshi during the late Sengoku period. The castle was also known as "Kama-jō" (亀城, Turtle Castle) or "Oshi-no-uki-jō" (忍の浮き城, the Floating Castle of Oshi). It was regarded as one of the seven main strongholds of the Kantō region.',
  },
  {
    id: 5,
    name: "Kawagoe Castle",
    location: new MapboxGL.LngLat(139.4904141, 35.9250114),
    visited: dayjs("2020-09-23").toDate(),
    condition: Condition.Ruins,
    description:
      "Kawagoe Castle (川越城, Kawagoe-jō) is a flatland Japanese castle in the city of Kawagoe, in Japan's Saitama Prefecture. It is the closest castle to Tokyo to be accessible to visitors, as Edo castle is now the Imperial palace, and largely inaccessible.",
  },
];

export { Castle, Condition, printCondition, castles };
