import ClienteForm from "@/src/components/ClienteForm";
import ClienteItem from "@/src/components/ClienteItem";
import { supabase } from "@/src/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ClientePages() {
  const { data: clientes, error } = await supabase.from("clientes").select("*");

  if (error) {
    return (
      <p className="p-8 text-red-500">
        Erro ao buscar clientes: {error.message}
      </p>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2x1 font-bold mb-6">{"Clientes"}</h1>

      <ClienteForm />

      {clientes.length === 0 ? (
        <p className="text-gray-500">{"Nenhum cliente cadastrado ainda."}</p>
      ) : (
        <ul className="space-y-2">
          {clientes.map((cliente) => (
            <ClienteItem key={cliente.id} cliente={cliente} />
          ))}
        </ul>
      )}
    </div>
  );
}
