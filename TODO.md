# TODO - ConnectingBr App

## ✅ Concluído

### Página de Login
- [x] Centralização do conteúdo sem usar toolbar
- [x] Imagem posicionada no topo da caixa de input
- [x] Ajuste da largura da imagem para corresponder à caixa (300px)
- [x] Layout responsivo com flexbox
- [x] Tema claro aplicado no global.scss
- [x] Estilos modernos com bordas arredondadas e sombras
- [x] Botões com estilo consistente (LOGIN/REGISTER)
- [x] Campos de input com placeholders em inglês
- [x] Dimensões compactas (max-width: 300px)
- [x] Validação de formulário em tempo real
- [x] Estados de loading com spinner
- [x] Mensagens de erro e sucesso com toast
- [x] Autenticação real com Observable e RxJS
- [x] Storage de token e sessão no localStorage
- [x] Validação de email e senha
- [x] Botões de teste para desenvolvimento

### Sistema de Autenticação
- [x] Serviço AuthService completo com Observable/RxJS
- [x] Validação de token JWT mock
- [x] Gerenciamento de sessão com localStorage
- [x] Métodos de login, logout e verificação de autenticação
- [x] Mock database com usuários de teste
- [x] Validação de email e senha
- [x] Limpeza automática de sessões expiradas
- [x] Debug logging para desenvolvimento

### Estrutura do Projeto
- [x] Organização das páginas em /pages
- [x] Serviços de autenticação completos
- [x] Rotas configuradas (corrigidas duplicatas)
- [x] Componentes standalone
- [x] Correções de navegação e redirecionamento

## 🚧 Próximas Tarefas

### Funcionalidades Pendentes
- [x] Implementar lógica de autenticação real
- [ ] Criar sistema de registro de usuários
- [ ] Desenvolver página de perfil
- [ ] Implementar busca de serviços
- [ ] Criar sistema de categorias
- [ ] Adicionar CRUD de serviços
- [ ] Implementar sistema de avaliações
- [ ] Adicionar geolocalização

### Melhorias de UI/UX
- [ ] Criar loading states
- [ ] Implementar toast notifications
- [ ] Adicionar animações de transição
- [ ] Criar componentes reutilizáveis
- [ ] Implementar modo escuro (opcional)
- [ ] Adicionar temas personalizados por categoria

### Próxima Tarefa Escolhida
🎯 **Criar sistema de registro de usuários na página register**

## 📱 Funcionalidades Principais

### Core Features
- Autenticação (Login/Register)
- Busca de serviços
- Categorização de serviços
- Perfil do usuário
- Adicionar/Editar serviços
- Sistema de avaliações

### Categorias de Serviços
- Beleza
- Saúde
- Educação
- Tecnologia
- Outros

## 🎨 Design System
- Cores primárias: Azul (#4A90E2), Rosa (#F39C9C), Verde menta (#7ED6C7)
- Tema claro com gradientes suaves
- Bordas arredondadas (16px)
- Sombras sutis para profundidade
- Tipografia clean e legível 