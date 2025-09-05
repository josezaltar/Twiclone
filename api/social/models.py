from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # username será o "handle"
    display_name = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    avatar_url = models.URLField(blank=True)
    banner_url = models.URLField(blank=True)

    # seguindo: m2m simples (sem through)
    following = models.ManyToManyField(
        "self",
        symmetrical=False,
        related_name="followers",
        blank=True,
    )

    def __str__(self):
        return self.username


class Tweet(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    likes = models.ManyToManyField(User, related_name="liked_tweets", blank=True)
    retweets = models.ManyToManyField(User, related_name="retweeted_tweets", blank=True)

    class Meta:
        ordering = ["-created_at"]

    @property
    def like_count(self) -> int:
        return self.likes.count()

    @property
    def retweet_count(self) -> int:
        return self.retweets.count()

    def __str__(self):
        return f"{self.author.username}: {self.text[:30]}"
