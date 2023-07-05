import { ToggleTheme } from "./ToggleTheme";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
      <h1 className=" text-3xl font-bold text-slate-800 dark:text-white">
        Mi<span className=" text-green-500">Bio</span>
      </h1>
      <ToggleTheme />
    </nav>
  );
};

export default NavBar;
