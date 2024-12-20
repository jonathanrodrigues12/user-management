"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "@/store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </Provider>
      </body>
    </html>
  );
}
