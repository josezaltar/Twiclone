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
    ChangePassword,
    UploadAvatar,
    UploadBanner,
    TweetReplies,
    CreateReply,
)

urlpatterns = [
    # auth
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),
    # tweets
    path("tweets/", TweetListCreate.as_view()),
    path("tweets/<int:pk>/like/", ToggleLike.as_view()),
    path("tweets/<int:pk>/retweet/", ToggleRetweet.as_view()),
    path("tweets/<int:pk>/replies/", TweetReplies.as_view()),
    path("tweets/<int:pk>/reply/", CreateReply.as_view()),
    path("users/<str:handle>/tweets/", ListTweetsByHandle.as_view()),
    # perfis / follow
    path("users/<str:handle>/", ProfileByHandle.as_view()),
    path("users/<str:handle>/followers/", FollowersByHandle.as_view()),
    path("users/<str:handle>/following/", FollowingByHandle.as_view()),
    path("follow/<int:user_id>/", ToggleFollowById.as_view()),
    path("follow/by-handle/<str:handle>/", ToggleFollowByHandle.as_view()),
    path("me/following/ids/", MyFollowingIds.as_view()),
    path("me/profile/", UpdateMyProfile.as_view()),
    path("me/change-password/", ChangePassword.as_view()),
    # uploads
    path("me/upload-avatar/", UploadAvatar.as_view()),
    path("me/upload-banner/", UploadBanner.as_view()),
]