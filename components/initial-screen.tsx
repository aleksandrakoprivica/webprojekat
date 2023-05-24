"use client";

import React, { FC, useEffect, useState } from "react";
import AdminView from "@/components/admin-view";
import UserView from "@/components/user-view";

interface InitialScreenProps {
  session: any;
}

const InitialScreen: FC<InitialScreenProps> = ({ session }) => {
  const [userByEmail, setUserByEmail] = useState<any>(null);

  useEffect(() => {
    getUserByEmail();
  }, []);

  const getUserByEmail = () => {
    fetch(`api/user/${session.user.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const user = await res.json();
      setUserByEmail(user);
    });
  };

  if (!userByEmail)
    return (
      <div>
        <h1 className={"text-amber-50"}>Loading...</h1>
      </div>
    );

  if (userByEmail?.role === "ADMIN") {
    return <AdminView currentUser={userByEmail} />;
  }

  return <UserView currentUser={userByEmail}/>;
};

export default InitialScreen;
