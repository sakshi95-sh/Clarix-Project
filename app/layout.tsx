
import './globals.css';
import { Toaster } from "react-hot-toast";
import { Plus_Jakarta_Sans, Mogra, Fraunces } from 'next/font/google';
import ModalProvider from './components/ModalProvider';
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});
const fraunces = Fraunces({
  subsets: ["latin"],
   weight: ["400", "600", "700"],
  variable: "--font-fraunces",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${fraunces.variable}`}>
      <body  >
        <Toaster position="top-center"
         toastOptions={{
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #4F46E5, #6D5DF6)",
            color: "white",
            fontSize: "14px",
            padding: "12px 16px",
          },
         }}
         />
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}