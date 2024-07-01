"use client";
import { Menu, PiggyBank, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  budgetList: any;
};

export default function CardInfo({ budgetList }: Props) {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [totalSpend, setTotalSpend] = useState<number>(0);

  const CalculateCardInfo = () => {
    let tBudget = 0;
    let tSpend = 0;
    budgetList.forEach((element) => {
      tBudget = tBudget + Number(element.amount);
      tSpend = tSpend + element.totalSpend;
    });
    setTotalBudget(tBudget);
    setTotalSpend(tSpend);
  };
  useEffect(() => {
    budgetList && CalculateCardInfo();
  }, [budgetList]);

  const menuList = [
    {
      title: "Total Budget",
      value: totalBudget,
      icon: <PiggyBank />,
    },
    {
      title: "Total Spend",
      value: totalSpend,
      icon: <Menu />,
    },
    {
      title: "No. of Budgets",
      value: budgetList?.length,
      icon: <Wallet />,
    },
  ];
  return budgetList?.length > 0 ? (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuList.map((item, index) => {
        return (
          <div key={index} className="p-3">
            <div className="flex bg-gray-700 text-white justify-between items-center gap-3 border border-black rounded-lg p-3 ">
              <div>
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <h2 className="text-xl">
                  {`${item.title != "No. of Budgets" ? "$" : ""}`}
                  {item.value}
                </h2>
              </div>
              <div className="bg-blue-400 text-black rounded-full p-3 border border-black">
                {item.icon}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((item, index) => {
        return (
          <div
            key={index}
            className="h-[110px] w-full bg-slate-700 animate-pulse rounded-lg"
          ></div>
        );
      })}
    </div>
  );
}
