import avatar1 from "@/assets/images/avatars/img-1.jpg";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LuLogOut } from "react-icons/lu";
import { profileMenuItems } from "./data";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-with-header"
        type="button"
        className="hs-dropdown-toggle inline-flex flex-shrink-0 items-center justify-center gap-2 align-middle text-xs font-medium transition-all"
      >
        <Image
          alt="avatar"
          className="inline-block size-9 rounded-full"
          src={avatar1}
        />
        <div className="hidden text-start lg:block">
          <p className="text-sm font-bold text-white">
            {user?.firstName + " " + user?.lastName}
          </p>
          <p className="mt-1 text-xs font-semibold text-zinc-400">
            {user?.email}
          </p>
        </div>
      </button>
      <div className="hs-dropdown-menu duration mt-2 hidden min-w-[12rem] rounded-lg border border-default-200 bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
        {profileMenuItems.map((item, idx) => (
          <Link
            key={item.name + idx}
            className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-default-800 transition-all hover:bg-default-100"
            href={item.link}
          >
            <item.icon className="size-4" />
            {item.name}
          </Link>
        ))}
        <hr className="-mx-2 my-2 border-default-200" />
        <button
          type="button"
          className="flex w-full items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-all"
          onClick={handleLogOut}
        >
          <LuLogOut className="size-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
