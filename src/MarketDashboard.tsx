import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default function MarketDashboard() {
  const symbolsToTrack=["HCLTECH.NSE", "HDFCBANK.NSE","RELIANCE.NSE","TCS.NSE","INFY.NSE","HINDUNILVR.NSE", "ITC.NSE", "MARUTI.NSE", "LT.NSE", "AXISBANK.NSE", "BAJFINANCE.NSE", "HDFCLIFE.NSE", "KOTAKBANK.NSE", "SBIN.NSE", "ADANIGREEN.NSE", "TATAMOTORS.NSE", "ULTRACEMCO.NSE"];
  const [prices, setPrices] = useState<Record<string, { price: string; currency: string }>>({});
  const [searchText, setSearchText] = useState("");
  const [favourites, setFavourites] = useState<string[]>([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();



  const fetchPrices = async () => {
    const results: Record<string, { price: string; currency: string }> = {};
    try {
      const responses = await Promise.all(
        symbolsToTrack.map(symbol =>
          fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=8a6664cf88a64f89b51131b5157939a0`)
        )
      );
      const data = await Promise.all(responses.map(res => res.json()));
      symbolsToTrack.forEach((symbol, idx) => {
        if (data[idx] && data[idx].price) {
          results[symbol] = {
            price: data[idx].price,
            currency: data[idx].currency || "N/A"
          };
        } else {
          results[symbol] = {
            price: "N/A",
            currency: "N/A"
          };
        }
      });
      setPrices(results);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };


  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 5 * 60 * 1000); // refresh every 5 minutes
    return () => clearInterval(interval);
  }, [symbolsToTrack]);

  const sortedSymbols = [...symbolsToTrack].sort();
  const filteredSymbols = sortedSymbols.filter(symbol =>
    symbol.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-screen h-screen flex flex-col items-center justify-start bg-gray-100 py-8">
      <div className="flex justify-between items-center w-4/5 mb-6">
        <h1 className="text-4xl font-bold text-blue-600">{t('marketPulseDashboard')}</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={()=>{navigate('/Login')}}>{t('logout')}</button>
      </div>
      <div className="w-4/5 mb-6">
        <input
          type="text"
          placeholder={t("searchStocks")}
          value={searchText}
          onChange={(e)=>{setSearchText(e.target.value)}}
          className="text-lg text-gray-700 pl-4 pr-10 h-10 w-full rounded border border-gray-300"
        />
      </div>
      <div className="w-4/5 grid grid-cols-4 gap-8 items-center p-4 bg-white shadow mb-2 rounded">
        <span className="text-lg font-medium text-center">{t('stockSymbol')}</span>
        <span className="text-lg font-medium text-center">{t('stockPrice')}</span>
        <span className="text-lg font-medium text-center">{t('stockCurrency')}</span>
        <span className="text-lg font-medium text-center">{t('favourite')}</span>
      </div>
      <ul className="w-4/5 space-y-4">
        {filteredSymbols.map(symbol => (
          <li key={symbol} className="grid grid-cols-4 gap-8 items-center p-4 bg-white shadow rounded w-full">
            <span className="text-lg font-medium text-center">{symbol}</span>
            <span className="text-lg text-blue-500 text-center">{prices[symbol]?.price || "Loading..."}</span>
            <span className="text-lg text-blue-500 text-center">{"INR"}</span>
            <button
              className={`px-3 py-1 rounded ${favourites.includes(symbol) ? 'bg-yellow-400' : 'bg-gray-200'}`}
              onClick={() => {
                setFavourites(favourites =>
                  favourites.includes(symbol)
                    ? favourites.filter(fav => fav !== symbol)
                    : [...favourites, symbol]
                );
              }}
            >
              {favourites.includes(symbol) ? '★' : '☆'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}