"use client";
import { useState } from "react";
import { PiCopy } from "react-icons/pi";
interface AccountCardProps {
  bankName: string;
  accountNumber: string;
}

export default function AccountCard({
  bankName,
  accountNumber,
}: AccountCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6 w-full sm:w-[325px]">
      <p className="text-xs text-gray-500">ACCOUNT DETAILS</p>
      <p className="text-xs font-normal text-black mt-1">{bankName}</p>

      <div className="flex items-center justify-between mt-2">
        <p className="text-2xl font-bold text-black">{accountNumber}</p>
        <button
          onClick={handleCopy}
          className="flex items-center text-sm gap-2 bg-purple-100 text-[#9F56D4] font-medium py-1 px-2 rounded-lg transition hover:bg-purple-200"
        >
          <span>
            <PiCopy size={20} />
          </span>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
