import React, { Suspense } from "react";
import ResetPasswordFrom from "./resetPasswordFrom";

const ResetPassword = () => {
  return (
    <div>
      <h1>ResetPassword</h1>
      <Suspense fallback="Loading...">
        <ResetPasswordFrom />
      </Suspense>
    </div>
  );
};

export default ResetPassword;
