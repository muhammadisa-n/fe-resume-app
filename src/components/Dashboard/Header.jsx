import { Link } from "react-router";

const Header = () => {
  const user = { name: " Muhammad Isa" };
  return (
    <div className="shadow bg-violet-300">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800 transition-all">
        {/* Logo */}
        <Link to={"/"}>
          <h2 className="text-xl text-indigo-700 font-bold">Resume Builder</h2>
        </Link>
        {/* Logout */}
        <div className="flex items-center gap-4 ">
          <p className="max-sm:hidden ">{user.name}</p>
          <button className="bg-red-400 hover:bg-red-600 border border-gray-300 px-7 py-2 rounded-full active:scale-95 transition-all">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
