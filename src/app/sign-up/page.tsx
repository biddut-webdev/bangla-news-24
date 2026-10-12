
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

const SignUpPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const toastId = toast.loading("সাইন আপ হচ্ছে...");

    try {
      const { data, error } = await authClient.signUp.email({
        name: user.name as string,
        email: user.email as string,
        password: user.password as string,
        image: (user.image as string) || undefined,
        callbackURL: "/",
      });

      if (error) {
        toast.update(toastId, {
          render: error.message || "সাইন আপ ব্যর্থ হয়েছে!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      if (data) {
        toast.update(toastId, {
          render: "সাইন আপ সফল হয়েছে!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        window.location.href = "/";
      } else {
        toast.update(toastId, {
          render: "সাইন আপ সম্পন্ন হয়নি। আবার চেষ্টা করুন।",
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
    <div className="mt-5 flex flex-col items-center gap-4 px-4">
      <h2 className="text-2xl font-bold text-red-700">সাইন আপ</h2>

      <Form
        className="flex w-full max-w-sm flex-col gap-4"
        onSubmit={onSubmit}
      >
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

        <TextField isRequired name="image" type="url">
          <Label>Image URL</Label>
          <Input placeholder="https://example.com/image.jpg" />
          <FieldError />
        </TextField>

        <TextField isRequired name="email" type="email">
          <Label>ইমেইল</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="password"
          type="password"
          minLength={8}
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
          <Label>পাসওয়ার্ড</Label>
          <Input placeholder="Enter your password" />
          <Description>
            কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা থাকতে হবে।
          </Description>
          <FieldError />
        </TextField>

        <div className="flex w-full gap-2">
          <Button type="submit">সাইন আপ করুন</Button>
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
          Sign Up with Google
        </Button>

        <Button
          type="button"
          variant="secondary"
          onPress={handleGitHubSignIn}
        >
          Sign Up with GitHub
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
