import React, { useEffect } from "react";
import Axios from "axios";
import Button from "./form-elements/Button";
import { Option } from "./form-elements/Option";
import TextField from "./form-elements/TextField";
import Label from "./select/Label";

type IInfo = {
  [key: string]: number;
};

export default function ConvertPanel() {
  const [info, setInfo] = React.useState<IInfo[]>([]);

  const [from, setFrom] = React.useState<string>("usd");
  const [to, setTo] = React.useState<string>("uzs");
  const [input, setInput] = React.useState<number>(1);

  const [options, setOptions] = React.useState<string[]>([]);
  const [output, setOutput] = React.useState<number>(0);
  const [date, setDate] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      );
      setInfo(response.data[from]);
      setDate(response.data.date);
      setOptions(Object.keys(response.data[from]));
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const convert = () => {
    setOutput(Number(input) * Number(info[to as keyof typeof info]));
  };

  const flip = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    convert();
  };

  useEffect(() => {
    fetchData();
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  useEffect(() => {
    convert()
  }, [from, to]);

  return (
    <div className="p-4 border rounded-md">
      <div className="p-4 mb-4 border rounded-md">
        <p className="text-xl font-medium ">
          {input.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " " + from + " = " + output.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " " + to}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 pt-1 mb-6 space-y-2 border rounded-md"
      >
        <div className="flex flex-col w-full space-y-4 sm:space-x-4 sm:items-end sm:flex-row">
          <div className="flex flex-col w-full">
            <Label>From</Label>
            <select
              disabled={isLoading}
              id="countries"
              className="p-2 font-medium border rounded-md "
              onChange={(e) => {
                setFrom(e.target.value);
              }}
              value={from}
            >
              {!isLoading &&
                options?.map((item, index) => (
                  <Option key={`${index * 100}`} value={item}>
                    {item}
                  </Option>
                ))}
            </select>
          </div>

          <Button
            type="button"
            onClick={() => flip()}
            className="sm:w-fit h-[41px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </Button>

          <div className="flex flex-col w-full">
            <Label>To</Label>

            <select
              disabled={isLoading}
              onChange={(e) => {
                setTo(e.target.value);
              }}
              value={to}
              id="countries"
              className="p-2 font-medium border rounded-md "
            >
              {!isLoading &&
                options?.map((item, index) => (
                  <Option key={`${index * 100}`} value={item}>
                    {item}
                  </Option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <Label>Amount</Label>

          <TextField
            placeholder="Enter the amount"
            onChange={(e) => {
              setInput(Number(e.target.value));
            }}
            type="number"
            min={1}
          />
        </div>
      </form>

      <Button type="submit" onClick={() => convert()}>
        CONVERT
      </Button>

      <div className="pt-4 mt-4 text-sm font-medium text-gray-400 border-t">
        Using the data available as of {date}
      </div>
    </div>
  );
}
