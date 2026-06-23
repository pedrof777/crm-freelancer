# CRM Freelancer

- Sistema de gestão de clientes e orçamentos para uso pessoal como freelancer.
- CRUD completo de clientes (nome, email, telefone, empresa).
- CRUD completo de orçamentos, vinculados a um cliente (título, descrição, valor, status).
- Relação entre clientes e orçamentos via foreign key, com exclusão em cascata.
- Status de orçamento controlável (rascunho, enviado, aprovado, rejeitado).
- Edição inline diretamente na lista, sem necessidade de página separada.
- Navegação com indicação de página ativa.

## Tecnologias

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + API + autenticação gerenciada)
- Vercel (deploy)

## Como rodar

Pré-requisitos

- Node.js 18+
- Conta no Supabase com projeto configurado

Passos

```bash
git clone https://github.com/pedrof777/crm-freelancer.git
cd crm-freelancer
npm install
```

Cria um arquivo `.env.local` na raiz com:
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui

NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui

```bash
npm run dev
```

Acesse em `http://localhost:3000`

---

🔗 **Site no ar:** [crm-freelancer-lemon.vercel.app](https://crm-freelancer-lemon.vercel.app/)
💼 **LinkedIn:** [linkedin.com/in/pedro-ferreira-developer-java](https://www.linkedin.com/in/pedro-ferreira-developer-java)
