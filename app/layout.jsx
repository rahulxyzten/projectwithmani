import Adsence from "@/components/Adsence";
import "./globals.css";
import Provider from "@/components/Provider";
import SmoothScroll from "@/components/SmoothScroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Project With Mani",
  description: "Project With Mani",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Adsence pId="ca-pub-7740201598554600"/>
      </head>
      <body className="dark min-h-screen bg-black-100 font-poppins">
        <Provider>
          <SmoothScroll>
            {children}
            <ToastContainer/>
          </SmoothScroll>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
