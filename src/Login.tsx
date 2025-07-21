import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import bgimage from "./assets/bgimage.avif";
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (

    <div  className="w-screen h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      <img src={bgimage} alt="Marketpulse Logo" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />
      
      <div className="absolute top-12 right-20 flex gap-3 z-20">
      <button
        type="button"
        onClick={() => {i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');}}
        className={`absolute top-3  right-14 w-20 h-10 rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
      >
        {i18n.language === 'en' ? 'AR' : 'EN'}
      </button>
    </div>

      <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full h-full flex flex-col items-center justify-center z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="text-2xl font-bold text-blue-500 mb-4">Loading...</span>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-blue-900 mb-6">{t('logInMarketpulse') || ''}</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
              <input
                type="text"
                id="username"
                value={username}
                placeholder={t("username") || "Username"}
                onChange={(e) => { setUsername(e.target.value) }}
                required
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                id="password"
                value={password}
                placeholder={t("password") || "Password"}
                onChange={(e) => { setPassword(e.target.value) }}
                required
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                onClick={() => { onClickLogin() }}
                className="w-full bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4"
              >
                {t('login') || 'Login'}
              </button>
              <h2 className="text-lg font-semibold mb-2">{t('dontHaveAccount')}</h2>
              <button
                type="button"
                onClick={() => {
                  navigate('/Signup');
                }}
                className="w-full bg-blue-900 text-white px-4 py-2 rounded border border-black hover:bg-blue-600 transition-colors"
              >
                {t('signup') || 'Signup'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>

  );

  async function onClickLogin() {
    setLoading(true);
    if (!username || !password) {
      setLoading(false);
      alert("Please fill in all fields.");
      return;
    }
    try {
      // Simulate loading for 2 seconds
      if (localStorage.getItem("username")?.toLowerCase() === username.toLowerCase() && localStorage.getItem("password")?.toLowerCase() === password.toLowerCase()) {
        setTimeout(() => {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          setLoading(false);
          navigate('/MarketDashboard');
        }, 1000);
      }
      else {
        setLoading(false);
        alert("Login failed. Try with correct credentials.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      const errorMessage = typeof error === 'object' && error !== null && 'message' in error ? (error as { message: string }).message : '';
      alert("Login failed. Try with correct credentials." + errorMessage);
    }
  }
}