import { useState } from "react";
import bgimage from "./assets/bgimage.avif";
import { useTranslation } from 'react-i18next';


export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t, i18n } = useTranslation();


  async function saveSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent page reload
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      alert("Account created successfully!");
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      // Navigate to the MarketDashboard after successful signup
      window.location.href = '/MarketDashboard'; // Redirect to MarketDashboard
    } catch (error) {
      console.error("Sign-up failed:", error);
      const errorMessage = typeof error === 'object' && error !== null && 'message' in error ? (error as { message: string }).message : '';
      alert("Login failed. Try with correct credentials." + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-screen h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
    <img src={bgimage} alt="Marketpulse Logo" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />
      <div className="w-full h-full flex flex-col items-center justify-center z-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">{t("marketPulseSignup")}</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" onSubmit={saveSignup}>

      <input
        type="text"
        placeholder={t("username") || "Username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <br />

      <input
        type="password"
        placeholder={t("password") || "Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <br />

      <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4">
        {loading ? t("creating...") : t("submit")}
      </button>

      <p>
        {t("alreadyHaveAnAccount")} <a href="/Login">{t('login')}</a>
      </p>
    </form>
    </div>
    </div>
  );
}
