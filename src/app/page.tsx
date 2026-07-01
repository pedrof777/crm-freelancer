"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  console.log("Home renderizou");
  const [totais, setTotais] = useState({ clientes: 0, orcamento: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTotais() {
      try {
        const { count: clientes, error: errorCliente } = await supabase
          .from("clientes")
          .select("*", { count: "exact", head: true });

        const { count: orcamentos, error: errorOrcamento } = await supabase
          .from("orcamentos")
          .select("*", { count: "exact", head: true });

        if (errorCliente || errorOrcamento) {
          console.error("Erro ao buscar: ", errorCliente || errorOrcamento);
          return;
        }

        setTotais({
          clientes: clientes ?? 0,
          orcamento: orcamentos ?? 0,
        });
      } catch (error) {
        console.error("Erro inesperado:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTotais();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-zinc-400">{"Carregando dados..."}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{"Dashboard"}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-800 p4 rounded border border-zinc-700">
          <p className="text-sm text-zinc-400">{"Total de clientes"}</p>
          <p className="text-3xl font-bold text-white">{totais.clientes}</p>
        </div>
        <div className="bg-zinc-800 p4 rounded border border-zinc-700">
          <p className="text-sm text-zinc-400">{"Total de orçamentos"}</p>
          <p className="text-3xl font-bold text-white">{totais.orcamento}</p>
        </div>
      </div>
    </div>
  );
}
