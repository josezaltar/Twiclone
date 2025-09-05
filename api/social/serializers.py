from rest_framework import serializers
from .models import User, Tweet


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "display_name", "avatar_url", "banner_url"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "display_name",
            "bio",
            "location",
            "website",
            "avatar_url",
            "banner_url",
        ]


class TweetSerializer(serializers.ModelSerializer):
    author = UserMiniSerializer(read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    retweet_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tweet
        fields = ["id", "text", "created_at", "author", "like_count", "retweet_count"]


class ProfileViewSerializer(serializers.Serializer):
    user = UserSerializer()
    followers = serializers.IntegerField()
    following = serializers.IntegerField()
