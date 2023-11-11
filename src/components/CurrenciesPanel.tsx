import Axios from "axios";
import { useEffect, useState } from "react";
import LoadingText from "./progress-indicators/LoadingText";
import Label from "./select/Label";

type IResult = {
  CNY: number
  EUR: number
  JPY: number
  KZT: number
  RUB: number
  USD: number
  UZS: number
}

type IBaseCurrency = {
  base: string,
  ms: number,
  results: IResult,
  updated: string
}

export default function CurrenciesPanel() {
  const currencies = ['USD', 'RUB', 'EUR', 'UZS', 'CNY', 'JPY', 'KZT']
  // THE EWAS A BUT TO PUT API KEY TO ENV FILE I KNOW THAT PUTTING APIKEY TO LIKE THIS PLACE IS WRONG BUT I DIDNT HAVE TO TO FIX, I AM WORKING ON IT
  const apiKey = 'a62a066e36-47e7933cbf-s3x2te';
  const [select, setSelected] = useState<string>(currencies[0]);
  const [loading, setLoading] = useState<boolean>(false)

  const [baseCurrencyList, setBaseCurrencyList] = useState<IBaseCurrency | null>(null)

  const fetchList = async () => {
    try {
      setLoading(true)
      const res = await Axios.get(`https://api.fastforex.io/fetch-multi?from=${select}&to=USD,RUB,EUR,UZS,CNY,JPY,KZT,TJS&api_key=${apiKey}`)
      setBaseCurrencyList(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [select])

  return (
    <div className="p-4 border rounded-md">

      <div className="flex flex-row w-full mb-4 space-x-4">
        <div className="flex flex-col w-full">
          <Label>
            Counter currency
          </Label>
          <select
            onChange={(e) => setSelected(e.target.value)}
            id="countries" className="p-2 font-medium border rounded-md ">
            {currencies?.map((item, index) => (
              <option className="font-medium " key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="grid grid-flow-row grid-cols-1 gap-4 list-none sm:grid-cols-2">
        {!loading && Object.entries(baseCurrencyList?.results ?? {}).map(([currency, rate], index) => (
          <li
            key={index}
            className="p-2 text-sm font-semibold bg-gray-100 border rounded-md"
          >
            <span>1.00 {baseCurrencyList?.base} =</span>
            <span>&nbsp; {rate} {currency}</span>
          </li>
        ))}
      </ul>

      {(!loading && baseCurrencyList !== null) && (
        <div className="pt-4 mt-4 text-sm font-medium text-gray-400 border-t">
          Using the data available as of {baseCurrencyList?.updated}
        </div>
      )}

      {loading && <LoadingText />}
    </div>
  );
}
