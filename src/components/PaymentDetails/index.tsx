import { TRANSACTION_TYPE } from "@/@types/TransactionType";
import { AppContext, AppContextType } from "@/context/AppContext";
import React, { useContext } from "react";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import classNames from "classnames";
import { Checkbox } from "../ui/checkbox";
import { NumericFormat } from "react-number-format";

const PaymentDetails = () => {
  const { data, setData } = useContext(AppContext) as AppContextType;

  return (
    <div className="flex flex-col space-y-2 bg-gray-800 p-2 rounded-md border border-gray-700">
      <div
        style={{ borderColor: data.color }}
        className="flex flex-col pb-2 bg-white   overflow-hidden rounded-md border-2 w-full"
      >
        <Tabs
          value={data.type}
          className="w-full flex flex-col"
          onValueChange={(value) =>
            setData({ ...data, type: value as TRANSACTION_TYPE })
          } 
        >
          <TabsList className="w-full grid h-20 md:h-10  gap-2 place-content-center py-6 justify-center grid-row-2 md:grid-row-1 grid-cols-2 md:grid-cols-4">
            <TabsTrigger value={TRANSACTION_TYPE.TILL_NUMBER}>TILL</TabsTrigger>
            <TabsTrigger className="" value={TRANSACTION_TYPE.PAYBILL}>
              PAYBILL
            </TabsTrigger>
            <TabsTrigger className="" value={TRANSACTION_TYPE.AGENT}>
              AGENT NO
            </TabsTrigger>
            <TabsTrigger className="" value={TRANSACTION_TYPE.SEND_MONEY}>
              SEND MONEY
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          style={{ background: data.color }}
          className="text-xl md:text-3xl  text-white py-1 text-center rounded-none border-none font-bold font-display placeholder:text-white"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, name: e.target.value.toUpperCase() });
          }}
          value={data.name ?? ""}
          placeholder="Enter Name Here"
        />

        <div className="flex flex-col h-full space-y-1 border-none bg-white">
        {data.type === TRANSACTION_TYPE.SEND_MONEY && (
            <>
              <p
                style={{ color: data.color }}
                className=" font-display text-center py-1  text-xl md:text-3xl"
              >
                PHONE NUMBER
              </p>
              <div className="flex mx-auto items-center space-x-4 flex-wrap w-full justify-center ">
                <NumericFormat
                  onValueChange={(value) => {
                    if (
                      value.floatValue != undefined &&
                      value.floatValue.toString().length <= 12
                    ) {
                      setData({ ...data, phoneNumber: value.value });
                    }
                  }}
                  inputMode="numeric"
                  value={data.phoneNumber}
                  customInput={Input}
                  allowNegative={false}
                  allowLeadingZeros={true}
                  placeholder="Enter Phone Number"
                  className=" py-2 md:py-4 tracking-widest mx-auto w-full border-none bg-transparent  text-center  font-display text-xl md:text-3xl   text-gray-900 rounded-none  "
                />
              </div>
            </>
          )}
          {data.type === TRANSACTION_TYPE.TILL_NUMBER && (
            <>
              <p
                style={{ color: data.color }}
                className=" font-display text-center py-1  text-xl md:text-3xl"
              >
                TILL NUMBER
              </p>
              <div className="flex mx-auto items-center space-x-4 flex-wrap w-full justify-center ">
                <NumericFormat
                  onValueChange={(value) => {
                    if (
                      value.floatValue != undefined &&
                      value.floatValue.toString().length <= 12
                    ) {
                      setData({ ...data, tillNumber: value.value });
                    }
                  }}
                  inputMode="numeric"
                  value={data.tillNumber}
                  customInput={Input}
                  allowNegative={false}
                  allowLeadingZeros={true}
                  placeholder="Enter Till Number"
                  className=" py-2 md:py-4 tracking-widest mx-auto w-full border-none bg-transparent  text-center  font-display text-xl md:text-3xl   text-gray-900 rounded-none  "
                />
              </div>
            </>
          )}
          {data.type === TRANSACTION_TYPE.PAYBILL && (
            <>
              <p
                style={{ color: data.color }}
                className=" font-display text-center  text-xl md:text-3xl"
              >
                PAYBILL NUMBER
              </p>
              <div className="flex mx-auto items-center space-x-4 flex-wrap w-full justify-center ">
                <NumericFormat
                  onValueChange={(value) => {
                    if (
                      value.floatValue != undefined &&
                      value.floatValue.toString().length <= 12
                    ) {
                      setData({ ...data, paybillNumber: value.value });
                    }
                  }}
                  inputMode="numeric"
                  value={data.paybillNumber}
                  customInput={Input}
                  allowNegative={false}
                  allowLeadingZeros={true}
                  placeholder="Enter Paybill Number"
                  className=" py-2 md:py-4 tracking-widest mx-auto w-full border-none bg-transparent  text-center  font-display text-xl md:text-3xl   text-gray-900 rounded-none  "
                />
              </div>
              <p className="text-green-600 font-display text-center text-xl md:text-3xl">
                ACCOUNT NUMBER
              </p>
              <Input
                onChange={(e) => {
                  setData({ ...data, accountNumber: e.target.value });
                }}
                value={data.accountNumber}
                placeholder="Enter Account Number"
                className="rounded-none py-2 md:py-4 tracking-widest mx-auto w-full border-none  text-center bg-white font-display text-xl md:text-3xl   text-gray-900  "
              />
            </>
          )}
          {data.type === TRANSACTION_TYPE.AGENT && (
            <>
              <p
                style={{ color: data.color }}
                className=" font-display text-center  text-xl md:text-3xl"
              >
                AGENT NUMBER
              </p>
              <div className="flex mx-auto items-center space-x-4 flex-wrap w-full justify-center ">
                <NumericFormat
                  onValueChange={(value) => {
                    if (
                      value.floatValue != undefined &&
                      value.floatValue.toString().length <= 12
                    ) {
                      setData({ ...data, agentNumber: value.value });
                    }
                  }}
                  inputMode="numeric"
                  value={data.agentNumber}
                  customInput={Input}
                  allowNegative={false}
                  allowLeadingZeros={true}
                  placeholder="Enter Agent Number"
                  className=" py-2 md:py-4 tracking-widest mx-auto w-full border-none bg-transparent  text-center  font-display text-xl md:text-3xl   text-gray-900 rounded-none  "
                />
              </div>
              <p
                style={{ color: data.color }}
                className=" font-display text-center text-xl md:text-3xl"
              >
                STORE NUMBER
              </p>
              <NumericFormat
                onValueChange={(value) => {
                  if (
                    value.floatValue != undefined &&
                    value.floatValue.toString().length <= 12
                  ) {
                    setData({ ...data, storeNumber: value.value });
                  }
                }}
                inputMode="numeric"
                value={data.storeNumber}
                customInput={Input}
                allowNegative={false}
                allowLeadingZeros={true}
                placeholder="Enter Store Number"
                className=" py-2 md:py-4 tracking-widest mx-auto w-full border-none bg-transparent  text-center  font-display text-xl md:text-3xl   text-gray-900 rounded-none  "
              />
            </>
          )}
          {data.type == TRANSACTION_TYPE.TILL_NUMBER && (
            <div className="flex items-center px-4 py-2  space-x-2">
              <Checkbox
                id="hideAmount"
                checked={data.hideAmount}
                onCheckedChange={(checked) =>
                  setData({ ...data, hideAmount: checked ? true : false })
                }
              />
              <label
                htmlFor="hideAmount"
                className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Hide amount
              </label>
            </div>
            )} 
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
