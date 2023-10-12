import { Dancing_Script } from "next/font/google";
const fontDancingScript = Dancing_Script({ subsets: ["latin"] });
import { Raleway } from "next/font/google";
const fontRaleway = Raleway({ subsets: ["latin"] });
import { Merriweather } from "next/font/google";
const fontMerriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

import { Roboto } from "next/font/google";
const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});


export { fontDancingScript, fontRaleway, fontMerriweather, fontRoboto };