from django.contrib import admin
from .models import User, Tweet


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "display_name")


@admin.register(Tweet)
class TweetAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "text", "created_at")
