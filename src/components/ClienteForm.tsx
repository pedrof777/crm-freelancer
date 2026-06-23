"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ClienteForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("clientes").insert({
      nome,
      email,
      telefone: telefone || null,
      empresa: empresa || null,
    });

    setLoading(false);

    if (error) {
      alert("Erro ao salvar cliente: " + error.message);
      return;
    }

    setNome("");
    setEmail("");
    setTelefone("");
    setEmpresa("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8 max-w-md">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm "
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
      />

      <input
        type="text"
        name="telefone"
        placeholder="Telefone(opcional)"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
      />

      <input
        type="text"
        name="empresa"
        placeholder="Empresa(opcional)"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-500 text-black font-medium rounded-md px-4 py-2 text-sm disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Adicionar cliente"}
      </button>
    </form>
  );
}
