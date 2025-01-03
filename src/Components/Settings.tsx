"use client"
import React, { useState } from "react";

const Settings: React.FC = () => {
  const [slippage, setSlippage] = useState("0.1%");
  const [customSlippage, setCustomSlippage] = useState("");
  const [transactionDeadline, setTransactionDeadline] = useState("");

  return (
    <div className="w-[97%] bg-black flex justify-center items-center p-4">
      <div className="w-full  bg-gray-900 text-white rounded-xl p-6 space-y-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Settings</h1>
          <button
            className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
            aria-label="Back"
          >
            Back
          </button>
        </div>

        {/* Slippage Tolerance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Slippage Tolerance</label>
            <span className="text-gray-400 text-sm">
              <span className="tooltip">
                ℹ️
                <span className="tooltip-text bg-gray-700 p-2 rounded text-xs">
                  Your transaction will be cancelled if the price changes
                  unfavorably with more than this percentage.
                </span>
              </span>
            </span>
          </div>
          <div className="flex space-x-2">
            {["0.1%", "0.5%", "1%"].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg ${
                  slippage === option
                    ? "bg-pink-500 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => setSlippage(option)}
              >
                {option}
              </button>
            ))}
            <input
              type="text"
              placeholder="Custom % (type here)"
              value={customSlippage}
              onChange={(e) => {
                setSlippage("Custom");
                setCustomSlippage(e.target.value);
              }}
              className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Transaction Deadline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Transaction Deadline</label>
            <span className="text-gray-400 text-sm">
              <span className="tooltip">
                ℹ️
                <span className="tooltip-text bg-gray-700 p-2 rounded text-xs">
                  Your transaction will be cancelled if it is pending for more
                  than this time.
                </span>
              </span>
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here (in minutes)"
            value={transactionDeadline}
            onChange={(e) => setTransactionDeadline(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none text-gray-200 placeholder-gray-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center space-x-4">
          <button className="w-full py-3 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-600">
            Discard
          </button>
          <button className="w-full py-3 bg-pink-500 rounded-lg text-white hover:bg-pink-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
