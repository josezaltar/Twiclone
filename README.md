Twiclone

Um clone completo do Twitter/X desenvolvido com React + TypeScript no frontend e Django REST Framework no backend.

Sobre o Projeto
Twiclone é uma rede social inspirada no Twitter, permitindo que usuários postem tweets, curtam, retweetem, comentem, sigam outros usuários e personalizem seus perfis com fotos e capas.
Links:

Demo Live: https://twiiclone.netlify.app
API Backend: https://josezaltar.pythonanywhere.com/api


Funcionalidades
Autenticação

Registro de usuários
Login com JWT
Alteração de senha

Posts (Tweets)

Criar tweets
Curtir e descurtir
Retweet e desfazer retweet
Comentar em tweets (com aninhamento até 3 níveis)
Feed personalizado (Todos / Seguindo)

Perfil

Editar perfil (nome, bio, localização, website)
Upload de foto de perfil
Upload de foto de capa
Visualizar tweets do usuário
Ver seguidores e seguindo

Relacionamentos

Seguir e deixar de seguir usuários
Botão de seguir direto nos tweets
Lista de seguidores e seguindo com cards visuais

Interface

Tema claro e escuro
Design responsivo
Animações suaves


Tecnologias Utilizadas
Frontend

React 19 com TypeScript
React Router para navegação
TanStack Query para gerenciamento de estado server
Zustand para estado global
Styled Components para estilização
Axios para requisições HTTP
Netlify para deploy

Backend

Django 4.2 com Python 3.11
Django REST Framework para API
JWT para autenticação
CORS Headers para cross-origin
Pillow para processamento de imagens
WhiteNoise para arquivos estáticos
PythonAnywhere para hospedagem


Como Executar Localmente
Pré-requisitos

Node.js 18+ e npm
Python 3.11+
Git

Backend (Django)
bash# Clone o repositório
git clone https://github.com/josezaltar/Twiclone.git
cd Twiclone/api

# Crie o ambiente virtual
python -m venv .venv

# Ative o ambiente virtual
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Execute as migrações
python manage.py migrate

# Crie um superusuário (opcional)
python manage.py createsuperuser

# Popule com dados fake (opcional)
python populate_fake_data.py

# Inicie o servidor
python manage.py runserver
O backend estará rodando em http://127.0.0.1:8000
Frontend (React)
bash# Em outro terminal, navegue para o frontend
cd twiclone-web

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
O frontend estará rodando em http://localhost:3000

Deploy
Backend (PythonAnywhere)

Crie uma conta no PythonAnywhere (https://www.pythonanywhere.com)
Clone o repositório no console Bash
Configure o ambiente virtual e instale dependências
Configure o WSGI file apontando para twiclone.wsgi.application
Configure static files (/static/ → /home/seu-usuario/Twiclone/api/staticfiles)
Configure media files (/media/ → /home/seu-usuario/Twiclone/api/media)
Configure o virtualenv path: /home/seu-usuario/Twiclone/api/.venv
Reload da aplicação

Frontend (Netlify)

Conecte seu repositório GitHub ao Netlify (https://www.netlify.com)
Configure:

Base directory: twiclone-web
Build command: npm run build
Publish directory: twiclone-web/build


Adicione a variável de ambiente:

REACT_APP_API_URL = https://seu-usuario.pythonanywhere.com/api


Deploy automático a cada push


Estrutura do Projeto
Twiclone/
├── api/                          # Backend Django
│   ├── social/                   # App principal
│   │   ├── models.py            # Modelos User, Tweet
│   │   ├── serializers.py       # Serializers DRF
│   │   ├── views.py             # ViewSets e APIViews
│   │   └── urls.py              # Rotas da API
│   ├── twiclone/
│   │   ├── settings.py          # Configurações Django
│   │   ├── urls.py              # URLs principais
│   │   └── wsgi.py              # Configuração WSGI
│   ├── requirements.txt         # Dependências Python
│   ├── manage.py                # CLI do Django
│   └── populate_fake_data.py    # Script para dados fake
│
└── twiclone-web/                # Frontend React
    ├── public/                  # Arquivos públicos
    ├── src/
    │   ├── components/          # Componentes reutilizáveis
    │   │   ├── TweetCard/       # Card de tweet
    │   │   ├── Compose/         # Composer de tweet
    │   │   ├── Layout/          # Layout principal
    │   │   └── ...
    │   ├── pages/               # Páginas/rotas
    │   │   ├── Feed/            # Feed principal
    │   │   ├── Profile/         # Perfil de usuário
    │   │   ├── Login/           # Login e registro
    │   │   └── ...
    │   ├── lib/                 # Utilitários
    │   │   ├── http.ts          # Cliente Axios
    │   │   └── realApi.ts       # Funções de API
    │   ├── store/               # Estado global (Zustand)
    │   │   ├── auth.ts          # Autenticação
    │   │   └── ui.ts            # UI (tema, busca)
    │   ├── styles/              # Estilos globais
    │   │   ├── global.ts        # Reset e global styles
    │   │   └── theme.ts         # Temas claro/escuro
    │   └── types/               # Tipos TypeScript
    ├── package.json
    ├── tsconfig.json
    └── netlify.toml

API Endpoints
Autenticação

POST /api/register/ - Registrar novo usuário
POST /api/login/ - Login
GET /api/me/ - Obter usuário atual
PATCH /api/me/profile/ - Atualizar perfil
POST /api/me/change-password/ - Alterar senha
POST /api/me/upload-avatar/ - Upload de avatar
POST /api/me/upload-banner/ - Upload de banner

Tweets

GET /api/tweets/ - Listar tweets (aceita ?scope=all|following)
POST /api/tweets/ - Criar tweet
GET /api/tweets/{id}/replies/ - Listar respostas
POST /api/tweets/{id}/reply/ - Responder tweet
POST /api/tweets/{id}/like/ - Curtir/descurtir
POST /api/tweets/{id}/retweet/ - Retweet/desfazer

Usuários

GET /api/users/{handle}/ - Perfil do usuário
GET /api/users/{handle}/tweets/ - Tweets do usuário
GET /api/users/{handle}/followers/ - Seguidores
GET /api/users/{handle}/following/ - Seguindo
POST /api/follow/by-handle/{handle}/ - Seguir/deixar de seguir


Variáveis de Ambiente
Backend (.env)
SECRET_KEY=sua-chave-secreta
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,seu-dominio.pythonanywhere.com
Frontend (.env)
REACT_APP_API_URL=http://127.0.0.1:8000/api
Para produção, altere para a URL do seu backend em produção.

Scripts Úteis
Popular banco com dados fake
bashcd api
python populate_fake_data.py
Isso criará usuários, tweets e relacionamentos para testes. Todos os usuários terão senha senha123.
Limpar migrações
bashcd api
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
rm db.sqlite3
python manage.py makemigrations
python manage.py migrate

Solução de Problemas
CORS Error no Frontend
Certifique-se que o domínio do Netlify está em CORS_ALLOWED_ORIGINS no settings.py:
pythonCORS_ALLOWED_ORIGINS = [
    "https://seu-site.netlify.app",
]
405 Method Not Allowed
Verifique se está usando o método HTTP correto. Por exemplo, /api/me/profile/ usa PATCH, não POST.
Imagens não aparecem
Verifique se a pasta media/ está configurada corretamente no PythonAnywhere:

URL: /media/
Path: /home/seu-usuario/Twiclone/api/media


Próximas Melhorias

Sistema de notificações em tempo real
Mensagens diretas
Busca avançada de usuários e tweets
Hashtags e trending topics
Upload de mídia (imagens/vídeos) nos tweets
Sistema de verificação de conta
Modo privado/protegido
Rate limiting e throttling
Paginação dos tweets
Infinite scroll


Contribuindo
Contribuições são bem-vindas! Para contribuir:

Faça fork do projeto
Crie uma branch para sua feature (git checkout -b feature/MinhaFeature)
Commit suas mudanças (git commit -m 'Adiciona MinhaFeature')
Push para a branch (git push origin feature/MinhaFeature)
Abra um Pull Request

Por favor, certifique-se de:

Seguir o estilo de código existente
Adicionar testes para novas funcionalidades
Atualizar a documentação quando necessário


Licença
Este projeto é de código aberto e está disponível sob a Licença MIT.

Autor
José Zaltar
GitHub: @josezaltar

Agradecimentos

Inspirado no design do Twitter/X
Avatares gerados por Dicebear API
Hospedagem gratuita: Netlify e PythonAnywhere
Comunidade open source


Se este projeto foi útil para você, considere dar uma estrela no repositório!
