"use client";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import React from "react";

import { FloppyDisk } from "@gravity-ui/icons";

const onSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData.entries());

  console.log("Update Profile ", userData);
  // Convert FormData to plain object

  const resData = await updateUser({
    name: userData.name,
  });

  console.log("after Submit userData", resData);
};

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return (
    <div>
      <Form className="w-full max-w-96" onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend>Profile Settings</Fieldset.Legend>
          <Description>Update your profile information.</Description>
          <FieldGroup>
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
          </FieldGroup>
          <Fieldset.Actions>
            <Button type="submit">
              <FloppyDisk />
              Save changes
            </Button>
            <Button type="reset" variant="secondary">
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>

      <h1>{session?.user?.name}</h1>
      <h2>{session?.user?.email}</h2>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default ProfilePage;
