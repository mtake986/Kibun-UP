import { Dancing_Script } from "next/font/google";
import { Raleway } from "next/font/google";
import { Merriweather } from "next/font/google";
import { Roboto } from "next/font/google";

const fontDancingScript = Dancing_Script({ subsets: ["latin"] });

const fontRaleway = Raleway({ subsets: ["latin"] });

const fontMerriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export { fontDancingScript, fontRaleway, fontMerriweather, fontRoboto };
