"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  empresa: string | null;
};

type Props = {
  cliente: Cliente;
};

export default function ClienteItem({ cliente }: Props) {
  const router = useRouter();
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(cliente.nome);
  const [email, setEmail] = useState(cliente.email);
  const [loading, setLoading] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  async function handleSave() {
    setLoading(true);

    const { error } = await supabase
      .from("clientes")
      .update({ nome, email })
      .eq("id", cliente.id);

    setLoading(false);

    if (error) {
      alert("Erro ao atualizar: " + error.message);
      return;
    }

    setEditando(false);
    router.refresh();
  }

  async function handleDelete() {
    const confirmar = confirm(
      ` Excluir o cliente "${cliente.nome}"? Essa ação não pode ser desfeita.`,
    );
    if (!confirmar) return;

    setExcluindo(true);

    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", cliente.id);

    if (error) {
      setExcluindo(false);
      alert("Erro ao excluir: " + error.message);
      return;
    }

    router.refresh();
  }

  if (editando) {
    return (
      <li className="border border-gray-700 rounded-md p-4 flex flex-col gap-2">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-sm"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-sm"
        />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-emerald-500 text-black text-sm font-medium rounded-md px-3 py-1 disabled: opacity-50"
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
    <li
      className={`border border-gray-700 rounded-md p-4 flex items-center justify-between transition-opacity ${
        excluindo ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      <div>
        <p className="font-medium">{cliente.nome}</p>
        <p className="text-sm text-gray-400">{cliente.email}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setEditando(true)}
          disabled={excluindo}
          className="text-sm text-gray-400 hover:text-white"
        >
          {"Editar"}
        </button>

        <button
          onClick={handleDelete}
          disabled={excluindo}
          className="text-sm text-red-500 hover:text-red-400 disabled:opacity-50"
        >
          {excluindo ? "Excluindo..." : "Excluir"}
        </button>
      </div>
    </li>
  );
}
