import FMSLogo from "~/Components/FMSLogo";
import TextBoxField from "./Components/TextBoxField";
import PrimaryButton from "~/Components/PrimayButton";

const Login = () => {
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="flex-1 flex items-center bg-gray-50 justify-end">
        <div className="flex-col bg-white rounded-xl shadow-xl">
          <div className="p-20">
            <div className="py-10">
              <FMSLogo />
            </div>
            <TextBoxField
              label="Username"
              placeholder="Enter your username"
            />
            <TextBoxField
              label="Password"
              placeholder="Enter your password"
            />
            <div className="pt-5">
              <PrimaryButton
                title="Login"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 flex-[0.7]">
      </div>
    </div>
  )
}

export default Login;
