"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { redirect } from "next/navigation";


const SignUpPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // : Record<string, string>
    const { data, error } = await authClient.signUp.email({
      name: user.name as string,
      email: user.email as string,
      password: user.password as string,
      image: user.image as string,
      callbackURL: "/",
    });
    if (data) {
      console.log(data);
      redirect("/")
    }
    if (error) {
      console.log(error)
    }
    console.log(data, error, 'xxxxxxxxxxxxx')

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
    <div className="mt-5">
      <h2 className="flex justify-center items-center font-bold text-2xl text-red-700">সাইন আপ</h2>
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
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

        <TextField
          isRequired
          name="email"
          type="email"
        >
          <Label>ইমেইল</Label>
          <Input
            name="email"
            type="email"
            placeholder="john@example.com"
          />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>
            পাসওয়ার্ড</Label>
          <Input placeholder="Enter your password" />
          <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">

            সাইন আপ করুন
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

export default SignUpPage;