import { useEffect } from "react";
import menuJson from "../json/menu.json";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("Ja");
    const menu: any[] = JSON.parse(localStorage.getItem("menu"));
    
    (!menu || !menu.length) && localStorage.setItem("menu", JSON.stringify(menuJson));
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
