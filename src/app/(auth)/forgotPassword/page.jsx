"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";

const ForgotPassword = () => {
  //
  const handelForgotPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // Convert FormData to plain object

    const resData = await requestPasswordReset({
      email: data.email,
      redirectTo: "/ResetPassword",
    });

    toast.success("Send Email your Email Address");
    console.log("resData", resData);
  };

  return (
    <div>
      <h1 className="text-center text-3xl mt-5">Forgot PassWord</h1>
      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={handelForgotPassword}
      >
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
    </div>
  );
};

export default ForgotPassword;
