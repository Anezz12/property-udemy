import { FaShare } from "react-icons/fa";

export default function ShareButton() {
  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaShare className="fas fa-share mr-2"></FaShare> Share Property
    </button>
  );
}