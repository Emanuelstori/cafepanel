"use client";

import { Checkbox } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    if (!data.email && data.password) {
      return;
    }
    signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirect: false,
    }).then((response) => {
      if (response?.error) {
        // show notification for user
        console.log(response.error);
        console.log("ERROR");
      } else {
        // redirect to destination page
        redirect("/dashboard");
      }
    });
  };
  return (
    <main className="w-screen h-screen bg-[#1d243d] flex items-center justify-center">
      <div className="bg-[rgb(33,41,66)] flex text-center gap-8 rounded-lg w-[400px] h-[500px] border-t-8 border-t-[#79a6fe] border-b-8 border-b-[#8BD17C] shadow-[1px_1px_108.8px_19.2px_rgb(25,31,53)] flex-col">
        <div className="flex flex-col py-12">
          <h4>AdminDashboard</h4>
          <h5>Logue em sua conta.</h5>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full items-center"
        >
          <div className="flex flex-col gap-4 w-11/12">
            <input
              className="bg-[rgba(255,255,255,0.05)] w-full rounded py-2 px-2"
              placeholder="Email"
              required
              {...register("email")}
            />
            <input
              className="bg-[rgba(255,255,255,0.05)] w-full rounded py-2 px-2"
              placeholder="Password"
              required
              {...register("password")}
            />
            <div className="w-full flex justify-between">
              <Checkbox className="group">
                <p className="text-sm group-hover:opacity-40 transition-all">
                  Lembrar
                </p>
              </Checkbox>
              <button className="hover:opacity-40 transition-all">
                Esqueceu sua senha?
              </button>
            </div>
          </div>
          <div className="flex flex-col flex-1 w-11/12 items-center justify-end h-max">
            <button
              type="submit"
              className="rounded-full bg-[#7f5feb] py-3 w-full hover:bg-opacity-80 transition-all mt-6"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
