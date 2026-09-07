import React, { useEffect, useState } from "react";
import { TbHeartHandshake } from "react-icons/tb";
import { IoBagHandle } from "react-icons/io5";
import { TbBrand4Chan } from "react-icons/tb";
import { BiHappyHeartEyes } from "react-icons/bi";

function Offers() {
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?title=Pink%20Sneakers")
      .then((res) => res.json())
      .then((data) => setShoe(data[0]));
  }, []);
  return (
    <div className="mx-5">
      <div className="h-40 md:h-25 md:pl-5 bg-[#EDF4EE] rounded-xl my-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center justify-center">
          <TbHeartHandshake className="text-[#5AA973] text-4xl" />
          <div className="flex flex-col items-start mx-3">
            <h3 className="font-semibold">10K+</h3>
            <p className="text-sm">Happy Customers</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <IoBagHandle className="text-[#5AA973] text-4xl" />
          <div className="flex flex-col items-start mx-3">
            <h3 className="font-semibold">50K+</h3>
            <p className="text-sm">Products Sold</p>
          </div>
        </div>
        <div className="flex items-center justify-center mr-10">
          <TbBrand4Chan className="text-[#5AA973] text-4xl" />
          <div className="flex flex-col items-start mx-3">
            <h3 className="font-semibold">15+</h3>
            <p className="text-sm">Top Brands</p>
          </div>
        </div>
        <div className="flex items-center justify-center mr-3">
          <BiHappyHeartEyes className="text-[#5AA973] text-4xl" />
          <div className="flex flex-col items-start mx-3">
            <h3 className="font-semibold">100%</h3>
            <p className="text-sm">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
