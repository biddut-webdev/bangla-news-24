
"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { toast } from "react-toastify";

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const toastId = toast.loading("সাইন ইন হচ্ছে...");

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email as string,
        password: user.password as string,
        callbackURL: "/",
      });

      if (error) {
        toast.update(toastId, {
          render: error.message || "সাইন ইন ব্যর্থ হয়েছে!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      if (data) {
        toast.update(toastId, {
          render: "সাইন ইন সফল হয়েছে!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        window.location.href = "/";
      } else {
        toast.update(toastId, {
          render: "সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch {
      toast.update(toastId, {
        render: "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch {
      toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  return (
    <div className="mt-3 flex flex-col items-center gap-4 px-4">
      <h2 className="text-2xl font-bold text-red-700">
        সাইন ইন
      </h2>

      <Form
        className="flex w-full max-w-sm flex-col gap-4"
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>ইমেইল</Label>
          <Input
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
        >
          <Label>পাসওয়ার্ড</Label>
          <Input
            type="password"
            placeholder="Enter your password"
          />
          <Description>
            পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।
          </Description>
          <FieldError />
        </TextField>

        <div className="flex w-full gap-2">
          <Button type="submit">
            সাইন ইন করুন
          </Button>

          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <Button
          type="button"
          variant="secondary"
          onPress={handleGoogleSignIn}
        >
          Sign In with Google
        </Button>

        <Button
          type="button"
          variant="secondary"
          onPress={handleGitHubSignIn}
        >
          Sign In with GitHub
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
