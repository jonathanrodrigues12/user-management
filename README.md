
# 🛠️ **User Management Dashboard**

## 📚 **Descrição do Projeto**
Este projeto é um painel de gerenciamento de usuários desenvolvido com **Next.js**, **TypeScript**, **TailwindCSS** e integrações com APIs protegidas por autenticação JWT. Ele inclui funcionalidades como:

- 📝 **Listagem de Usuários** com paginação dinâmica.
- 🛡️ **Autenticação JWT** para proteger rotas.
- ➕ **Criação de Usuários** com modal dinâmico.
- ✏️ **Edição de Usuários** com carregamento de dados.
- 🗑️ **Exclusão de Usuários** com confirmação.
- 📊 **Tabela Dinâmica Reutilizável**.

---

## 🚀 **Tecnologias Utilizadas**
- **Next.js**
- **TypeScript**
- **TailwindCSS**
- **React Hot Toast**
- **Heroicons**
- **Node.js (Backend API)**

---

## 🏗️ **Estrutura do Projeto**
```plaintext
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   ├── page.tsx
│   │   ├── UserModal.tsx
│   │   └── ProtectedLayout.tsx
├── components/
│   ├── DataTable.tsx
│   ├── UserModal.tsx
│   └── ProtectedLayout.tsx
├── config/
│   ├── api.ts
├── types/
│   ├── types.ts
├── public/
│   ├── logo.png
├── pages/
│   ├── dashboard.tsx
│   ├── user.tsx
```

---

## 📦 **Instalação e Execução**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**  
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   API_URL= http://localhost:3000
   ```

4. **Execute o projeto:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**  
   ```plaintext
   http://localhost:30001
   ```

---

## 🔑 **Autenticação**
- Ao realizar login, um token JWT será armazenado nos **cookies**.
- Rotas protegidas redirecionam automaticamente para o login caso o token expire.

---

## 🧩 **Principais Componentes**
### **1. UserModal**
- Reutilizável para **criação** e **edição** de usuários.
- Validação de **e-mail** e **senha forte**.

### **2. DataTable**
- Componente genérico para renderizar tabelas com paginação dinâmica.

### **3. ProtectedLayout**
- Define o layout das rotas protegidas com menu lateral e controle de acesso.

---

## 🐞 **Erros Comuns**
- **Token não encontrado:** Certifique-se de que o token JWT está armazenado corretamente.
- **API não responde:** Verifique se o servidor backend está rodando.

---
