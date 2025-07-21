import { useEffect, useState } from "react";
import axios from "axios";

type Stock = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  country: string;
  type: string;
  price: number;
};

export default function NasdaqStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState('NSE');
  // API key and URL for Twelve Data
  const API_KEY = "8a6664cf88a64f89b51131b5157939a0"; // Twelve Data key
  const API_URL = `https://api.twelvedata.com/stocks?exchange=${selectedValue}&apikey=${API_KEY}`;

   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data && response.data.data) {
          setStocks(response.data.data);
        } else {
          setError("Invalid data structure");
        }
      } catch (err) {
        setError("Failed to fetch stock data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [selectedValue]);

  if (loading) return <div>Loading stocks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10 bg-gray-50 rounded shadow-md">
      <label className="flex-row  mb-2 text-lg font-semibold mr-4">Select Exchange</label>
         <select
        value={selectedValue}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="NSE">NSE</option>
        <option value="BSE">BSE</option>
        <option value="NASDAQ">NASDAQ</option>
        <option value="NYSE">NYSE</option>
      </select>
      <br/>
      <div className="flex flex-row items-center justify-between mb-4">
      <p className="mb-4">Total stocks: {stocks.length}</p>
      <p className="mb-4">Currency: {stocks[0]?.currency || 'N/A'}</p>
      <p className="mb-4">Country: {stocks[0]?.country || 'N/A'}</p>
     </div>
      <ul className="space-y-2 max-h-[600px] max-w-[900px] overflow-y-scroll">
        {stocks.slice(0, 100).map((stock) => (
          <li key={stock.symbol} className="p-2 border rounded shadow-sm cursor-default" >
            <div className="font-bold">{stock.name}</div>
            <div className="text-sm text-gray-600">{stock.symbol} </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
