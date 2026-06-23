"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

type Cliente = {
  id: number;
  nome: string;
};

type Props = {
  clientes: Cliente[];
};

export default function OrcamentoForm({ clientes }: Props) {
  const router = useRouter();
  const [clienteId, setClienteId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault;
    setLoading(true);

    const { error } = await supabase.from("orcamentos").insert({
      cliente_id: Number(clienteId),
      titulo,
      descricao,
      valor: Number(valor),
    });

    setLoading(false);

    if (error) {
      alert("Erro ao salvar orçamento: " + error.message);
      return;
    }

    setClienteId("");
    setTitulo("");
    setDescricao("");
    setValor("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8 max-w-md">
      <select
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
        required
        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
      >
        <option value="">{"Selecione um cliente"}</option>
        {clientes.map((c) => (
          <option value={c.id} key={c.id}>
            {c.nome}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Título do orçamento"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
      />

      <textarea
        placeholder="Descrição(opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
        rows={3}
      />

      <input
        type="number"
        step="0.01"
        placeholder="Valor (R$)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-500 text-black font-medium rounded-md px-4 py-2 text-sm disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Adicionar orçamento"}
      </button>
    </form>
  );
}
