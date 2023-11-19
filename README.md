# et_flag_vs
Projecto backend Flag


O projecto final de curso apresenta uma aplicação denominada Expense Tracker, representando um gestor de despesas multi-utilizador, que permite o rasteamento das despesas criadas por um utilizador ou em dívida para com outros utilizadores. As seguintes funcionalidades foram desenvolvidas:
- Dashboard - Neste ecrã conseguimos ter uam visão geral das despesas do utilizador num determinado período temporal. É possível ver o total de despesas, o total em dívida e o total a receber. No acordeão é possível visualizar as despesas organizadas por categoria. Mais abaixo o ecrã apresenta duas tabelas que permitem ver o detalhe dos montantes em dívida e para que utilizador e os montantes a receber de cada utilizador.
- New Expense - Ecrã para registo de uma nova despesa. É possível categorizar a despesa, adicionar notas e optar pela divisão da despesa. As despesas podem ser divididas com qualquer utilizador da plataforma e o seu estado definido
- History - Ecrã com o histórico das transacções, quer de despesas criadas pelo próprio, quer de despesas a dever a outros. Se a despesa for devida existe uma acçao para realizar o pagamento. Se a despesa foi criada é possível editar os detalhes da despesa.
- User Profile - Permite ao utilizador gerir os detalhes da sua conta e realizar a alteração da password.
Funcionalidades Admin
- User Management - Permite ao utilizador admin fazer reset da password a 123, inactivar ou activar um user ou atribuir-lhe privilegios admin
- Category Management - Permite criar, editar ou inactivar categorias que ficam disponíveis a todos os utilizadores.


##Setup projecto##

1) Os seguintes ficheiros serão enviados por email: 
  - .env
  - password de ligação à bd
2) Para realizar o setup da base de dados aceder à pasta db e importar o ficheiro db.sql
3) Realizar o npm install para instalação das dependências
4) Aceder ao url http://localhost:3000/admin/register para criar um utilizador admin.
5) Desfrutar da aplicação

##Reflexão do projecto##

Quando foi permitido realizar um projecto à escolha pensei logo neste tema, uma vez que é uma questão que em casa perdemos muito tempo a gerir.
Uma das principais dificuldades foi limitar os requisitos necessários para conseguir entregar o projecto no prazo previsto, pois, como até se pode ver no modelo de dados, havia muitas mais funcionalidades a implementar.

O segundo ponto difícil foi decidir se realizaria a parte de cliente em React ou EJS. Inicialmente tinha começado por desenvolver as rotas do projecto como uma API, tal e qual os exemplos realizados em aula e a maioria dos exemplos de tutoriais na net. Após perceber a limitação do tempo que tinha optei por EJS e uma abordagem mais simplista.

o terceiro ponto que me trouxe dificuldades foi a realização das queries que, para o modelo de dados criado, se tornaram complexas. Na query do histórico e algumas queries do dashboard tive que pedir ajuda a uma amiga que percebe de sql e que me tentou dar pistas de como realizar.

No geral foi um projecto desafiante mas que me deu gozo criar.