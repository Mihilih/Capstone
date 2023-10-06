from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newarticle", views.newarticle, name="newarticle"),
    path("articles", views.articles, name="articles"),
    path("article/<int:id>", views.article, name="article"),
    path("resources/", views.resources, name="resources"),
    path("newresources/", views.newresources, name="newresources"),
    path("community/", views.community, name="community"),
    path("edit/<str:post_id>", views.edit, name="edit"),
    path("comment/<str:post_id>", views.comment, name="comment"),
    path("error/<str:message>", views.error, name="error"),
    path("video/", views.video, name="video"),
    path("newvideo/", views.newvideo, name="newvideo"),
    path("profile/", views.profile, name="profile"),
    path("video_code/", views.code, name="code"),
    path("activities/", views.activities, name="activities"),
    path("activity1/", views.activity1, name="activity1"),
    path("activity2/", views.activity2, name="activity2"),
    path("activity3/", views.activity3, name="activity3"),
    path("points/<str:user_id>", views.points, name="points"),
]