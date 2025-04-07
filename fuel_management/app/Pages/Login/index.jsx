import React, { useState } from "react";
import { useNavigate } from "react-router";
import FMSLogo from "~/Components/FMSLogo";
import TextBoxField from "./Components/TextBoxField";
import PrimaryButton from "~/Components/PrimayButton";
import StringRoutes from "~/Constants/StringRoutes";
import { Form } from '@heroui/react';
import useLoginMutation from "~/Hooks/Auth/useLoginMutation";
import useAuth from "~/Hooks/Auth/useAuth";
import { addToast } from "@heroui/react";

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const showError = (error) => {
    addToast({
      title: "Error",
      description: "Login failed: " + error.response?.data?.message || error.message,
      color: "danger"
    });
  };

  /**
   * Handles form submission.
   * @param {Event} e - Form submit event.
   */
  const onManageLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    loginMutation.mutate(form, {
      onError: (error) => {
        console.log(error);
        console.error("Login failed:", error.response?.data?.message || error.message);
        showError(error);
        setIsLoading(false);
      },
      onSettled: (response) => {
        if (response.data.success) {
          setIsLoading(false);
          const token = response.data.body.token;
          //store user dtails in local storage
          auth.onSetUserDetails(response.data.body, response.data.body.token)
          navigate(StringRoutes.dashboard);
        }
      }
    });
  };

  /**
   * Handles input field changes.
   * Updates the specific field in the form state.
   * @param {string} key - Field name (e.g., "username", "password").
   * @param {string} value - New value for the field.
   */
  const onChange = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value, // Dynamically update the form field based on the key
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-row">
      {/* Left section: Form */}
      <div className="flex-1 flex items-center bg-gray-50 justify-end">
        <div className="flex-col bg-white rounded-[1.5rem] shadow-xl p-20">
          <div className="py-10">
            <FMSLogo />
          </div>
          <Form onSubmit={onManageLogin} className="flex flex-col flex-1 items-stretch">
            <TextBoxField
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => onChange("username", e.target.value)} // Pass 'key' and value to onChange
            />
            <TextBoxField
              label="Password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => onChange("password", e.target.value)} // Pass 'key' and value to onChange
            />
            <div className="pt-5">
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                title="Login"
              />
            </div>
          </Form>
        </div>
      </div>

      {/* Right section: Placeholder design */}
      <div className="bg-blue-50 flex-[0.7]" />
    </div>
  );
};

export default Login;
