"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabase";

type Cliente = {
  id: number;
  nome: string;
};

type Orcamento = {
  id: number;
  titulo: string;
  descricao: string | null;
  valor: number;
  status: string;
  cliente_id: number;
  clientes: { nome: string } | null;
};

type Props = {
  orcamento: Orcamento;
  clientes: Cliente[];
};

const statusOptions = ["rascunho", "enviado", "aprovado", "rejeitado"];

const statusColor: Record<string, string> = {
  rascunho: "text-gray-400",
  enviado: "text-blue-400",
  aprovado: "text-emerald-400",
  rejeitado: "text-red-400",
};

export default function OrcamentoItem({ orcamento }: Props) {
  const router = useRouter();
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(orcamento.titulo);
  const [valor, setValor] = useState(String(orcamento.valor));
  const [status, setStatus] = useState(orcamento.status);
  const [loading, setLoading] = useState(false);

  async function handleSalvar() {
    setLoading(true);

    const { error } = await supabase
      .from("orcamentos")
      .update({ titulo, valor: Number(valor), status })
      .eq("id", orcamento.id);

    setLoading(false);

    if (error) {
      alert("Erro ao atualizar: " + error.message);
      return;
    }

    setEditando(false);
    router.refresh();
  }

  async function handleDelete() {
    const confirmar = confirm(`Excluir o orçamento "${orcamento.titulo}"?`);
    if (!confirmar) return;

    const { error } = await supabase
      .from("orcamentos")
      .delete()
      .eq("id", orcamento.id);

    if (error) {
      alert("Erro ao excluir: " + error.message);
      return;
    }

    router.refresh();
  }

  if (editando) {
    return (
      <li className="border border-gray-700 rounded-md p-4 flex flex-col gap-2">
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-sm"
        />

        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-sm"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-sm"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleSalvar}
            disabled={loading}
            className="bg-emerald-500 text-black text-sm font-medium rounded-md px-3 py-1 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

          <button
            onClick={() => setEditando(false)}
            className="border border-gray-700 text-sm rounded-md px-3 py-1"
          >
            {"Cancelar"}
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="border border-gray-700 rounded-md p-4 flex items-center justify-between">
      <div>
        <p className="font-medium">{orcamento.titulo}</p>
        <p>
          {orcamento.clientes?.nome} · R$ {orcamento.valor.toFixed(2)}
        </p>
        <p className={` text-xs mt-1 ${statusColor[orcamento.status]}`}>
          {orcamento.status}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setEditando(true)}
          className="text-sm text-gray-400 hover:text-white"
        >
          {"Editar"}
        </button>

        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:text-red-400"
        >
          {"Excluir"}
        </button>
      </div>
    </li>
  );
}
