import Link from "next/link";
import React from "react";

type Props = {};

export default function BudgetItem({ budget }: any) {
  const calcProgress = () => {
    const perc = (budget?.totalSpend / budget?.amount) * 100;
    return perc.toFixed(2);
  };
  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="h-[170px] mb-3 border-black rounded-lg hover:shadow-lg hover:border-green-400 cursor-pointer border p-5 bg-cyan-800  ">
        <div className="flex justify-between">
          <div className="flex">
            <div className="text-3xl">{budget?.icon}</div>
            <div>
              <h2 className="font-bold">{budget?.name}</h2>
              <h2 className="text-sm"> {budget?.totalItem} Item</h2>
            </div>
          </div>
        
        <div className="font-bold text-blue-950">
          <h2>${budget?.amount}</h2>
        </div>
</div>
        <div className="mt-4">
          <div className="text-xs text-gray-950 flex justify-between">
            <h2>${budget?.totalSpend ? budget?.totalSpend : 0} Spend</h2>
            <h2>${budget?.amount - budget?.totalSpend} Remaining</h2>
          </div>
          <div className="bg-gray-400 rounded-full w-full h-2">
            <div
              className="bg-blue-700 h-2 max-w-[100%]"
              style={{ width: `${calcProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
