import OrcamentoForm from "@/src/components/OrcamentoForm";
import OrcamentoItem from "@/src/components/OrcamentoItem";
import { supabase } from "@/src/lib/supabase";

export default async function OrcamentoPage() {
  const { data: orcamento, error } = await supabase
    .from("orcamentos")
    .select("*, clientes(nome)")
    .order("created_at", { ascending: false });

  const { data: clientes } = await supabase
    .from("clientes")
    .select("id, nome ")
    .order("nome");

  if (error) {
    return <p>{`Erro ao buscar orçamento: ${error.message}`}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2x1 font-bold mb-6">{"Orçamentos"}</h1>

      <OrcamentoForm clientes={clientes ?? []} />
      {orcamento.length === 0 ? (
        <p>{"Nenhum orçamento cadastrado ainda."}</p>
      ) : (
        <ul className="space-y-2">
          {orcamento.map((orcamento) => (
            <OrcamentoItem
              key={orcamento.id}
              orcamento={orcamento}
              clientes={clientes ?? []}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
