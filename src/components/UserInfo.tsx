"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;


  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <Link href="/profile">
            <div className="flex flex-col items-center gap-2">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                  <img
                    alt="User Avatar"
                    src={user.image || "/default-avatar.png"}
                  />
                </div>
              </div>

              <h2>{user.name}</h2>
            </div>
          </Link>

          <button
            onClick={handleSignOut}
            className="btn btn-error"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/sign-in">
            <button className="btn hover:text-red-600">
              সাইন ইন
            </button>
          </Link>

          <Link href="/sign-up">
            <button className="btn bg-red-700 text-white">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;