from django.shortcuts import render

# Create your views here.
from django.contrib.auth import authenticate
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Tweet
from .serializers import (
    UserSerializer,
    TweetSerializer,
    ProfileViewSerializer,
    UserMiniSerializer,
)


# ---------- Helpers ----------
def issue_token_for(user: User) -> str:
    """Gera apenas o access token (como seu front espera em login)."""
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)


# ---------- Auth ----------
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        handle = request.data.get("handle", "").strip()
        display = request.data.get("display_name", "").strip()
        password = request.data.get("password", "").strip()

        if not handle or not password:
            return Response({"detail": "Informe handle e password."}, status=400)

        if User.objects.filter(username__iexact=handle).exists():
            return Response({"detail": "Handle já existe."}, status=400)

        user = User.objects.create_user(
            username=handle,
            display_name=display,
            password=password,
        )
        return Response(UserSerializer(user).data, status=201)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        handle = request.data.get("handle", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=handle, password=password)
        if not user:
            return Response({"detail": "Credenciais inválidas."}, status=400)

        token = issue_token_for(user)
        return Response({"token": token})


class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)


# ---------- Tweets ----------
class TweetListCreate(APIView):
    def get(self, request):
        scope = request.query_params.get("scope", "all")
        qs = Tweet.objects.all()
        if scope == "following":
            ids = list(request.user.following.values_list("id", flat=True)) + [
                request.user.id
            ]
            qs = qs.filter(author_id__in=ids)
        ser = TweetSerializer(qs, many=True)
        return Response(ser.data)

    def post(self, request):
        text = (request.data.get("text") or "").strip()
        if not text:
            return Response({"detail": "Texto vazio."}, status=400)
        t = Tweet.objects.create(author=request.user, text=text)
        return Response(TweetSerializer(t).data, status=201)


class ToggleLike(APIView):
    def post(self, request, pk: int):
        tweet = get_object_or_404(Tweet, pk=pk)
        user = request.user
        liked = False
        if tweet.likes.filter(id=user.id).exists():
            tweet.likes.remove(user)
        else:
            tweet.likes.add(user)
            liked = True
        return Response({"liked": liked, "like_count": tweet.like_count})


class ToggleRetweet(APIView):
    def post(self, request, pk: int):
        tweet = get_object_or_404(Tweet, pk=pk)
        user = request.user
        retweeted = False
        if tweet.retweets.filter(id=user.id).exists():
            tweet.retweets.remove(user)
        else:
            tweet.retweets.add(user)
            retweeted = True
        return Response({"retweeted": retweeted, "retweet_count": tweet.retweet_count})


class ListTweetsByHandle(APIView):
    permission_classes = [permissions.AllowAny]  # perfil público

    def get(self, request, handle: str):
        user = get_object_or_404(User, username__iexact=handle)
        qs = Tweet.objects.filter(author=user)
        return Response(TweetSerializer(qs, many=True).data)


# ---------- Perfil / Follow ----------
class ProfileByHandle(APIView):
    permission_classes = [permissions.AllowAny]  # perfil público

    def get(self, request, handle: str):
        u = get_object_or_404(User, username__iexact=handle)
        payload = {
            "user": UserSerializer(u).data,
            "followers": u.followers.count(),
            "following": u.following.count(),
        }
        return Response(ProfileViewSerializer(payload).data)


class FollowersByHandle(APIView):
    def get(self, request, handle: str):
        target = get_object_or_404(User, username__iexact=handle)
        data = []
        me = request.user
        for u in target.followers.all():
            data.append(
                {
                    "user": UserMiniSerializer(u).data,
                    "isFollowing": me.following.filter(id=u.id).exists(),
                }
            )
        return Response(data)


class FollowingByHandle(APIView):
    def get(self, request, handle: str):
        target = get_object_or_404(User, username__iexact=handle)
        data = []
        me = request.user
        for u in target.following.all():
            data.append(
                {
                    "user": UserMiniSerializer(u).data,
                    "isFollowing": me.following.filter(id=u.id).exists(),
                }
            )
        return Response(data)


class ToggleFollowById(APIView):
    def post(self, request, user_id: int):
        target = get_object_or_404(User, pk=user_id)
        me = request.user
        following = False
        if me.following.filter(id=target.id).exists():
            me.following.remove(target)
        else:
            me.following.add(target)
            following = True
        return Response({"following": following})


class ToggleFollowByHandle(APIView):
    def post(self, request, handle: str):
        target = get_object_or_404(User, username__iexact=handle)
        me = request.user
        following = False
        if me.following.filter(id=target.id).exists():
            me.following.remove(target)
        else:
            me.following.add(target)
            following = True
        return Response({"following": following})


class MyFollowingIds(APIView):
    def get(self, request):
        ids = list(request.user.following.values_list("id", flat=True))
        return Response(ids)


class UpdateMyProfile(APIView):
    def patch(self, request):
        u: User = request.user
        for field in ["display_name", "bio", "location", "website"]:
            if field in request.data:
                setattr(u, field, (request.data.get(field) or "").strip())
        u.save()
        return Response(UserSerializer(u).data)


# Upload de avatar/banner (retorna { url })
class UploadAvatar(APIView):
    def post(self, request):
        file = request.FILES.get("avatar")
        if not file:
            return Response(
                {"detail": "Envie o arquivo no campo 'avatar'."}, status=400
            )
        path = default_storage.save(
            f"avatars/{request.user.id}_{file.name}", ContentFile(file.read())
        )
        url = request.build_absolute_uri(f"/media/{path}")
        request.user.avatar_url = url
        request.user.save(update_fields=["avatar_url"])
        return Response({"url": url})


class UploadBanner(APIView):
    def post(self, request):
        file = request.FILES.get("banner")
        if not file:
            return Response(
                {"detail": "Envie o arquivo no campo 'banner'."}, status=400
            )
        path = default_storage.save(
            f"banners/{request.user.id}_{file.name}", ContentFile(file.read())
        )
        url = request.build_absolute_uri(f"/media/{path}")
        request.user.banner_url = url
        request.user.save(update_fields=["banner_url"])
        return Response({"url": url})
