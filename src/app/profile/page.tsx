'use client'

import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProfilePage = () => {
  const [show, setShow] = useState(false)
  const { data: session } = authClient.useSession();
  const user = session?.user;


  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUserData = Object.fromEntries(formData.entries());

    await authClient.updateUser({
      ...newUserData
    })
  }

  const handleShowForm = () => {
    setShow(!show)
  }

  return (
    <div className="mt-5">
      <Link href="/profile">
        <div className="flex flex-col items-center gap-2">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
              <Image
                alt="User Avatar"
                src={user?.image || "/default-avatar.png"}
                width={30}
                height={30}
              />
            </div>
          </div>

          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <button className="btn" onClick={handleShowForm}>Edit Profile</button>
        </div>
      </Link>
      {show && <Form className="flex w-96 flex-col gap-4" onSubmit={handleUpdateProfile}>
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>নাম</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="image"
        >
          <Label>ImageURL</Label>
          <Input type="url" placeholder="Image URL" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">

            Update Profile
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>}
    </div>
  );
};

export default ProfilePage;