"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user, "FORM DATA");

    const { data, error } = await authClient.signIn.email({
      email: user.email as string,
      password: user.password as string,
      callbackURL: "/",
    });

    if (data) {
      toast.success("sign in success")
      console.log(data);
      redirect("/");
    }

    if (error) {
      toast.error(error.message)
      console.log(error);
    }
  };
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  }
  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github"
    })
  }

  return (
    <div className="mt-3">
      <h2 className="flex justify-center items-center font-bold text-2xl text-red-700">সাইন ইন</h2>
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>ইমেইল</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
        >
          <Label>পাসওয়ার্ড</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">

            সাইন ইন করুন
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
      <button onClick={handleGoogleSignIn} className="btn mt-3">Sign In with Google</button>
      <button onClick={handleGitHubSignIn} className="btn mt-3">Sign In with GitHub</button>
    </div>
  );
};

export default SignInPage;