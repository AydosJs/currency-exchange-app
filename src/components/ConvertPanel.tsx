import { useEffect, useState } from "react";
import Axios from "axios";

type IInfo = {
  [key: string]: number;
};

export default function ConvertPanel() {
  const [info, setInfo] = useState<IInfo[]>([]);
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("uzs");
  const [input, setInput] = useState<number>(1);
  const [date, setDate] = useState<string>('');

  const [options, setOptions] = useState<string[]>([]);
  const [output, setOutput] = useState<number>(0);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
      setDate(res.data.date)
      setOptions(Object.keys(info));
    });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  const convert = () => {
    setOutput(Number(input) * Number(info[to as keyof typeof info]));
  };

  const flip = () => {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="p-4 border rounded-md">
      <div className="flex flex-col mb-6 space-y-2">
        <div className="p-4 mb-4 border rounded-md">
          <p className="text-xl font-medium ">
            {input + " " + from + " = " + output.toFixed(2) + " " + to}
          </p>
        </div>

        <div className="flex flex-col w-full space-y-4 sm:space-x-4 sm:items-end sm:flex-row">

          <div className="flex flex-col w-full">
            <label htmlFor="countries" className="font-medium text-gray-400 ">
              From
            </label>
            {Boolean(options?.length) && (
              <select
                id="countries"
                className="p-2 font-medium border rounded-md "
                onChange={(e) => {
                  setFrom(e.target.value);
                }}
                value={from}
              >
                {options?.map((item, index) => (
                  <option key={index} value={item} className="font-medium ">
                    {item}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={() => flip()}
            className="p-2 bg-gray-100 border rounded-md hover:bg-gray-200 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>

          <div className="flex flex-col w-full">
            <label htmlFor="countries" className="font-medium text-gray-400 ">
              To
            </label>
            {Boolean(options?.length) && (
              <select
                onChange={(e) => {
                  setTo(e.target.value);
                }}
                value={to}
                id="countries"
                className="p-2 font-medium border rounded-md "
              >
                {options?.map((item, index) => (
                  <option key={index} value={item} className="font-medium ">
                    {item}
                  </option>
                ))}
              </select>
            )}
          </div>

        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="countries" className="font-medium text-gray-400">
            Amount
          </label>
          <input
            min={1}
            placeholder="Enter the amount"
            onChange={(e) => {
              setInput(Number(e.target.value));
            }}
            type="number"
            className="p-2 font-medium border rounded-md "
          />
        </div>
      </div>

      <button
        onClick={() => convert()}
        className="bg-gray-100 rounded-md hover:bg-gray-200 border w-full p-2.5 font-medium text-sm"
      >
        CONVERT
      </button>

      <div className="pt-4 mt-4 text-sm font-medium text-gray-400 border-t">
        Using the data available as of {date}
      </div>


    </div>
  );
}
