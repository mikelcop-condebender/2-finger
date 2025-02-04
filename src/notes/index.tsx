import React from "react";

const headerContent = "HEADER CONTENT";

const Button = ({ label }: { label: string }) => {
  return (
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {label}
    </button>
  );
};

function HeaderContent() {
  return (
    <div
      className="flex justify-center items-center font-bold text-lg border border-red-800 h-20 "
      id="header"
    >
      {headerContent}
    </div>
  );
}

function Label({ label }: any) {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
  );
}

function InputComponent({ type, id, placeholder, required = false }: any) {
  return (
    <input
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required={required}
    />
  );
}

function FormComponent() {
  return (
    <form className="max-w-sm mx-auto items-center">
      <div className="mb-5">
        <Label label="Your Email" />
        <InputComponent
          type="email"
          id="email"
          placeholder="Ex: sample@mail.com"
          required={true}
        />
      </div>
      <div className="mb-5">
        <Label label="Your Password" />
        <InputComponent
          type="password"
          id="password"
          placeholder="********"
          required={true}
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <InputComponent type="checkbox" id="remember" />
        </div>
        <Label label="Remember me" />
      </div>
      <Button label="Submit" />
    </form>
  );
}

function BodyContent() {
  return (
    <div className="relative flex realtive justify-center items-center bg-[#101111] h-[80%]">
      <FormComponent />
    </div>
  );
}

function FooterContent() {
  return (
    <div
      className="bottom-2 flex w-full p-4 text-sm text-white justify-center items-center h-6 border-t-2"
      id="footer"
    >
      Footer content
    </div>
  );
}

export const Notes = () => {
  return (
    <div className="bg-blue-300 h-screen">
      <HeaderContent />
      <BodyContent />
      {/* <FormComponent /> */}
      <FooterContent />
    </div>
  );
};
