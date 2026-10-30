import { TbHeartHandshake, TbBrand4Chan } from "react-icons/tb";
import { IoBagHandle } from "react-icons/io5";
import { BiHappyHeartEyes } from "react-icons/bi";

const STATS = [
  { icon: TbHeartHandshake, value: "10K+", label: "Happy Customers" },
  { icon: IoBagHandle, value: "50K+", label: "Products Sold" },
  { icon: TbBrand4Chan, value: "15+", label: "Top Brands", className: "mr-10" },
  {
    icon: BiHappyHeartEyes,
    value: "100%",
    label: "Satisfaction",
    className: "mr-3",
  },
];

function Offers() {
  return (
    <div className="mx-5">
      <div className="h-40 md:h-25 md:pl-5 bg-[#EDF4EE] rounded-xl my-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({ icon: Icon, value, label, className = "" }) => (
          <div
            key={label}
            className={`flex items-center justify-center ${className}`}
          >
            <Icon className="text-[#5AA973] text-4xl" />
            <div className="flex flex-col items-start mx-3">
              <h3 className="font-semibold">{value}</h3>
              <p className="text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
