import { Poppins, Inter } from "next/font/google";
import AuthProvider from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "../components/layout/Navbar";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "DevCollab - Where developers collab together",
//   description: "A platform where developers can come and collab together on projects that they are working",
// };
export const metadata = {
  title: 'DevCollab - Find Developer Collaborators',
  description: 'Connect with developers to build projects together',
  openGraph: {
    title: 'DevCollab',
    description: 'Find collaborators for your projects',
    // images: ['/og-image.png']
  }
};

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col">
//         <AuthProvider>
//           <Navbar />
//           <main className="flex-1">
//             {children}
//           </main>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-inter" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main>
              {children}
            </main>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}