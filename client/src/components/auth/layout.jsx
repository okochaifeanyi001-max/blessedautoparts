import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <div className="mb-6">
            <img
              src="/src/assets/emable.jpeg"
              alt="EMABLEPARTS Logo"
              className="w-32 h-32 mx-auto rounded-full shadow-lg object-cover"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to EMABLEPARTS
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
