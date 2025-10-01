import os
import django

# Configura o Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "twiclone.settings")
django.setup()

from social.models import User, Tweet
from django.db import transaction
import random

# Lista de dados falsos
FIRST_NAMES = [
    "João", "Maria", "Pedro", "Ana", "Carlos", "Julia", "Lucas", "Beatriz",
    "Felipe", "Mariana", "Rafael", "Camila", "Gabriel", "Larissa", "Bruno",
    "Amanda", "Matheus", "Isabela", "Thiago", "Fernanda"
]

LAST_NAMES = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
    "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho"
]

TWEETS_TEMPLATES = [
    "Bom dia! ☀️",
    "Que dia lindo hoje!",
    "Alguém mais está ansioso para o fim de semana?",
    "Acabei de assistir um filme incrível",
    "Preciso de recomendações de séries",
    "Quem mais ama pizza? 🍕",
    "Trabalhando duro hoje",
    "Finalmente férias!",
    "Café é vida ☕",
    "Programando até tarde 💻",
    "Que calor absurdo!",
    "Chovendo muito por aqui",
    "Música boa + café = produtividade",
    "Mais alguém está com sono?",
    "Sexta-feira chegou! 🎉",
    "Segunda-feira de novo...",
    "Treino feito ✅",
    "Lendo um livro muito bom",
    "Viagem marcada! ✈️",
    "Saudade da praia 🏖️"
]

@transaction.atomic
def create_fake_users(count=10):
    """Cria usuários falsos"""
    users = []
    print(f"\n📝 Criando {count} usuários falsos...")
    
    for i in range(count):
        first = random.choice(FIRST_NAMES)
        last = random.choice(LAST_NAMES)
        username = f"{first.lower()}{last.lower()}{random.randint(1, 999)}"
        
        # Evita duplicatas
        if User.objects.filter(username=username).exists():
            continue
            
        user = User.objects.create_user(
            username=username,
            display_name=f"{first} {last}",
            password="senha123",
            bio=f"Olá! Sou {first} e adoro compartilhar momentos aqui.",
            location=random.choice(["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Brasília, DF"])
        )
        users.append(user)
        print(f"✅ Criado: @{username} ({user.display_name})")
    
    return users

@transaction.atomic
def create_fake_tweets(users, tweets_per_user=5):
    """Cria tweets falsos"""
    print(f"\n💬 Criando tweets falsos...")
    total = 0
    
    for user in users:
        for _ in range(random.randint(2, tweets_per_user)):
            text = random.choice(TWEETS_TEMPLATES)
            Tweet.objects.create(author=user, text=text)
            total += 1
    
    print(f"✅ {total} tweets criados!")

@transaction.atomic
def create_follows(users):
    """Cria relacionamentos de seguir"""
    print(f"\n👥 Criando relacionamentos...")
    
    for user in users:
        # Cada usuário segue de 2 a 5 pessoas aleatórias
        num_follows = random.randint(2, min(5, len(users) - 1))
        possible_follows = [u for u in users if u != user]
        to_follow = random.sample(possible_follows, num_follows)
        
        for follow_user in to_follow:
            user.following.add(follow_user)
    
    print(f"✅ Relacionamentos criados!")

@transaction.atomic
def create_likes_and_retweets(users):
    """Adiciona likes e retweets aleatórios"""
    print(f"\n❤️ Adicionando likes e retweets...")
    
    all_tweets = Tweet.objects.all()
    
    for user in users:
        # Cada usuário curte alguns tweets
        tweets_to_like = random.sample(list(all_tweets), min(10, len(all_tweets)))
        for tweet in tweets_to_like:
            if tweet.author != user:  # Não curtir próprios tweets
                tweet.likes.add(user)
        
        # Alguns retweets
        tweets_to_rt = random.sample(list(all_tweets), min(3, len(all_tweets)))
        for tweet in tweets_to_rt:
            if tweet.author != user:
                tweet.retweets.add(user)
    
    print(f"✅ Likes e retweets adicionados!")

def main():
    print("=" * 50)
    print("🚀 Populando banco de dados com dados falsos")
    print("=" * 50)
    
    # Pergunta quantos usuários criar
    try:
        count = int(input("\nQuantos usuários deseja criar? (padrão: 10): ") or "10")
    except ValueError:
        count = 10
    
    # Cria dados
    users = create_fake_users(count)
    
    if users:
        create_fake_tweets(users, tweets_per_user=5)
        create_follows(users)
        create_likes_and_retweets(users)
        
        print("\n" + "=" * 50)
        print("✅ Dados falsos criados com sucesso!")
        print("=" * 50)
        print(f"\n📊 Resumo:")
        print(f"   Usuários: {User.objects.count()}")
        print(f"   Tweets: {Tweet.objects.count()}")
        print(f"\n🔑 Senha de todos os usuários: senha123")
        print(f"\nVocê pode fazer login com qualquer @username criado")
    else:
        print("\n❌ Nenhum usuário foi criado")

if __name__ == "__main__":
    main()