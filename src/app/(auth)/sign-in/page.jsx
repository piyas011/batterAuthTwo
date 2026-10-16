"use client";

import { signIn } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import React, { useState } from "react";

function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  //
  const onSubmit = async (e) => {
    //
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    //
    console.log("user Data ", data);

    const { data: resData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
      rememberMe: true,
    });

    console.log(resData, error);
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
      <div></div>
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
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField className="w-full max-w-70" name="password">
          <Label>Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full max-w-70"
              type={isVisible ? "text" : "password"}
            />
            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
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
