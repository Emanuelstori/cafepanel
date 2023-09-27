"use client";

import { Checkbox } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [showPw, setShowPw] = useState(false);
  const onSubmit = async (data: any) => {
    toast.loading("Autenticando...");
    if (!data.email && data.password) {
      return;
    }
    const res = await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      callbackUrl: "/dashboard",
    });
    if (res?.error) {
      toast.error("Erro na autenticação.");
    }
    console.log(res);
    if (res) {
      toast.success("Autenticado com sucesso!");
    }
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
            <div className="relative">
              <input
                className="bg-[rgba(255,255,255,0.05)] w-full rounded py-2 px-2 pr-10" // Adicione `pr-10` para espaço à direita para o ícone
                placeholder="Password"
                type={showPw ? "text" : "password"}
                required
                {...register("password")}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-30"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? (
                  <AiFillEyeInvisible className="text-gray-400" />
                ) : (
                  <AiFillEye className="text-gray-400" />
                )}
              </div>
            </div>
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
        <div>
          <p className="text-xs hover:cursor-pointer">
            Desenvolvido por <strong>Emanuelstor</strong> ☕
          </p>
        </div>
      </div>
    </main>
  );
}
