import { Outlet } from "@remix-run/react";

export default function Component() {
  return (
    <div className="w-full p-10">
      <Outlet />
    </div>
  );
}
