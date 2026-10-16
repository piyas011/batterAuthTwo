"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import React from "react";

function SignInPage() {
  //
  const onSubmit = async (e) => {
    //
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign-up failed:", error.message);
    }
  };
  const handelGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
  };

  const handelDiscordSignIn = async () => {
    const data = await signIn.social({
      provider: "discord",
    });
  };

  const handelGitHubSignIn = async () => {
    const data = await signIn.social({
      provider: "github",
    });
  };
  const handelFacebookSignIn = async () => {
    const data = await signIn.social({
      provider: "facebook",
    });
  };

  return (
    <div>
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
          <Label>Name</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>
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
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
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
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
      <div className="mt-5">
        <Button onClick={handelGoogleSignIn}>Connect With Google</Button>
        <Button onClick={handelDiscordSignIn}>Connect With Discord</Button>
        <Button onClick={handelGitHubSignIn}>Connect With GitHub</Button>
        <Button onClick={handelFacebookSignIn}>Connect With Facebook</Button>
      </div>
    </div>
  );
}
export default SignInPage;
