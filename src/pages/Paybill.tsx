// src/Pages/PayBill.tsx
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { HiOutlineDownload, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { TRANSACTION_TYPE } from "@/@types/TransactionType";
import QrSvg from "@wojtekmaj/react-qr-svg";
import { generateQRCode } from "@/utils/helpers";
import toast from "react-hot-toast";
import NumPad from "@/components/NumPad";
import { HiOutlineCreditCard } from "react-icons/hi"; // Import payment icon

const PaybillPage = () => {
  const { data, setData } = useContext(AppContext) as AppContextType;
  const [showQRCode, setShowQRCode] = useState(true);
  const [qrColor, setQrColor] = useState("#000000");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleQRCodeDownload = () => {
    const svgElement = document.querySelector(".qr-code-svg");
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      toast.error("Error generating QR code");
      return;
    }

    canvas.width = svgRect.width;
    canvas.height = svgRect.height;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `paybill_${data.paybillNumber}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    };
    img.src = url;
  };

  const handlePay = async () => {
    if (
      !phoneNumber.trim() ||
      !data.paybillNumber?.trim() ||
      !data.accountNumber?.trim() ||
      !data.amount ||
      isNaN(Number(data.amount)) || Number(data.amount) <= 0
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }
  
    try {
      const response = await fetch("/api/stk_api/paybill_stk_api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber.trim(),
          amount: data.amount.toString(),
          accountnumber: data.accountNumber.trim(),
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        toast.success("Payment initiated successfully! Please emter your M-pesa PIN on your phone when prompted shortly");
      } else {
        toast.error(result?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Network error: Unable to initiate payment.");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4 text-center">Paybill Payment</h1>
      <div className="w-full border-t-2 border-gray-300 my-4"></div>  {/* Added Divider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Left Column: Paybill Number, Account Number, NumPad */}
        <div className="space-y-4">
          <p className="text-xl text-center text-green-600">PAYBILL NUMBER</p>
          <NumericFormat
            onValueChange={(value) => {
              if (value.floatValue && value.floatValue.toString().length <= 12) {
                setData({ ...data, paybillNumber: value.value, type: TRANSACTION_TYPE.PAYBILL });
              }
            }}
            inputMode="numeric"
            value={data.paybillNumber ?? ""}
            customInput={Input}
            allowNegative={false}
            allowLeadingZeros={true}
            placeholder="Enter Paybill Number"
            className="w-full text-center text-xl py-2 border rounded-lg"
          />

          <p className="text-xl text-center text-green-600">ACCOUNT NUMBER</p>
          <Input
            onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
            value={data.accountNumber ?? ""}
            placeholder="Enter Account Number"
            className="w-full text-center text-xl py-2 border rounded-lg"
          />

          <NumPad className="w-full" />
        </div>

        {/* Right Column: Hide QR, Color Picker, QR Code, Phone Number, Pay Button */}
        <div className="flex flex-col items-center space-y-4 pt-[50px] bg-white">
        <p className="text-xl text-center">Scan Qr Code to pay with Mpesa App</p>
          {/* Hide QR Code Button */}
          <Button
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
            onClick={() => setShowQRCode(!showQRCode)}
          >
            {showQRCode ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            <span>{showQRCode ? "Hide QR Code" : "Show QR Code"}</span>
          </Button>

          {/* QR Code Display */}
          {showQRCode && (
            <div className="p-3 border-4 border-black bg-white rounded-md">
              <QrSvg
                value={generateQRCode(data) ?? ""}
                className="qr-code-svg w-32 h-32 md:w-40 md:h-40"
                style={{ color: qrColor }}
              />
            </div>
          )}

          {/* Download Qr */}
          <Button
            onClick={handleQRCodeDownload}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-all"
          >
            <HiOutlineDownload />
            <span>Download Qr</span>
          </Button>
          
          <div className="w-full border-t-2 border-gray-300 my-4"></div>  {/* Added Divider */}
          {/* Phone Number Input */}
          <p className="text-xl text-center">Enter Phone Number to pay directly</p>
          <Input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber ?? ""}
            placeholder="Enter Phone Number"
            className="w-full text-center text-xl py-2 border rounded-lg"
          />

          {/* Pay Button */}
          <Button
            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-all"
            onClick={handlePay}
          >
            <HiOutlineCreditCard className="text-xl" /> {/* Payment Icon */}
            <span>Pay Now</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};
export default PaybillPage;