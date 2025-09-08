from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    MeView,
    TweetListCreate,
    ToggleLike,
    ToggleRetweet,
    ListTweetsByHandle,
    ProfileByHandle,
    FollowersByHandle,
    FollowingByHandle,
    ToggleFollowById,
    ToggleFollowByHandle,
    MyFollowingIds,
    UpdateMyProfile,
    UploadAvatar,
    UploadBanner,
)

urlpatterns = [
    # Auth
    path("auth/register/", RegisterView.as_view()),
    path("auth/login/", LoginView.as_view()),
    path("me/", MeView.as_view()),
    # Tweets
    path("tweets/", TweetListCreate.as_view()),
    path("tweets/<int:pk>/like/toggle/", ToggleLike.as_view()),
    path("tweets/<int:pk>/retweet/toggle/", ToggleRetweet.as_view()),
    path("profiles/<str:handle>/tweets/", ListTweetsByHandle.as_view()),
    # Perfil + follow
    path("profiles/<str:handle>/", ProfileByHandle.as_view()),
    path("profiles/<str:handle>/followers/", FollowersByHandle.as_view()),
    path("profiles/<str:handle>/following/", FollowingByHandle.as_view()),
    path("profiles/<str:handle>/follow/toggle/", ToggleFollowByHandle.as_view()),
    path("users/<int:user_id>/follow/toggle/", ToggleFollowById.as_view()),
    path("me/following/ids/", MyFollowingIds.as_view()),
    path("me/profile/", UpdateMyProfile.as_view()),
    path("me/avatar/", UploadAvatar.as_view()),
    path("me/banner/", UploadBanner.as_view()),
]
