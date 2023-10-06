from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.db.models.fields import NullBooleanField
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.core.paginator import Paginator
from django.http import JsonResponse
import os
from os import path
import json
import markdown2
from .models import *


def index(request):
    #renders the index page
    return render(request, "final/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "final/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "final/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "final/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "final/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "final/register.html")

#blog
@csrf_exempt
@login_required(login_url='login')
def newarticle(request):
    #create a new article
    if request.method=="GET":
        return render(request, "final/newarticle.html")
    else:
        newarticle = Article()
        newarticle.title=request.POST["title"]
        newarticle.content=request.POST["content"]
        newarticle.creator=request.user
        newarticle.save()
        return redirect("articles")
    
def articles(request):
    #renders the page with all articles
    articles = Article.objects.all
    return render (request, "final/articles.html", {
        "articles": articles
    })

def article(request, id):
    #renders an article
    article = Article.objects.get(id=id)

    #convert MD content into HTML
    content=markdown2.markdown(article.content)
    return render (request, "final/article.html", {
        "article": article,
        "content": content
    })

#resources
def resources(request):
    #renders teh page with all resources
    resources=Resource.objects.all()
    return render (request, "final/resources.html",{
        "resources":resources
    })

@csrf_exempt
@login_required(login_url='login')
def newresources(request):
    if request.method=="GET":
        return render (request, "final/newresources.html")
    else:
        #allows user to add more resources
        resource=Resource()
        resource.name=request.POST["name"]
        resource.link=request.POST["link"]

        #decide the category
        if request.POST["category"]=="teachers":
            resource.category=Category.objects.get(id=1)
        elif request.POST["category"]=="students":
            resource.category=Category.objects.get(id=2)
        elif request.POST["category"]=="parents":
            resource.category=Category.objects.get(id=3)
        else:
            return redirect('error',"Please select a category")
        resource.save()
        return redirect ('resources')

#community
def community(request):
    if request.method=="GET":
        #renders the page with all community posts
        postlist=Post.objects.all().order_by('-id')
        posts=[]
        for post1 in postlist:
            posts.append(post1)

        #pagination
        paginator = Paginator(posts, 10)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        comments=Comment.objects.all()

        return render(request, "final/community.html", {
            'page_obj': page_obj,
            'comments':comments
        })
    else:

        #posts a user post
        post=Post()
        post.content = request.POST["post"]
        post.user = User.objects.get(id=request.user.id)
        post.save()

        return redirect('community')

@csrf_exempt
@login_required(login_url='login')
def edit(request, post_id):

    #edit a post
    post = Post.objects.get(id=post_id)

    if request.method == "PUT":
        data = json.loads(request.body)
        if data.get("post") is not None:
            post.content = data["post"]
        post.save()
        return HttpResponse(status=204)

@csrf_exempt
@login_required(login_url='login')
def comment(request, post_id):

    #comments under a post
    comment=Comment()
    if request.method == "PUT":
        data = json.loads(request.body)
        if data.get("post") is not None:    
            comment.content = data["post"]
            comment.user = request.user
            comment.save()
            post = Post.objects.get(id=post_id)
            post.comments.add(comment)
            post.save
        return JsonResponse({'user': request.user.username, 'content': data["post"], "status": 201})

#video
def video(request):
    #renders the page with all videos
    videolist=Video.objects.all()
    return render (request, "final/video.html",{
        "videos":videolist
    })

@csrf_exempt
@login_required(login_url='login')
def newvideo(request):
    if request.method=="GET":
        return render (request, "final/newvideo.html" )
    else:
        #allows user to add new videos
        name=request.POST["name"]
        video=Video.objects.filter(name=name)
        if len(video)!=0:
            return redirect('error', "A video with this name already exists on the website. Please choose a different name")
        else:
            video1=Video()
            video1.name=name
            video1.code=request.POST["code"]
            video1.save()
            return redirect('video')

@csrf_exempt
def code(request):
    #renders the embed code of a video
    data = json.loads(request.body)

    video=Video.objects.get(id=data["id"])

    return JsonResponse({'code': video.code, "status": 201})

#profile
@csrf_exempt
@login_required(login_url='login')
def profile(request):
    #renders the profile page of a user
    user=User.objects.get(id=request.user.id)
    return render (request, "final/profile.html",{
        "user":user
    })

#activities
@csrf_exempt
@login_required(login_url='login')
def activity1(request):
    return render (request, "final/activity1.html")

@csrf_exempt
@login_required(login_url='login')
def activity2(request):
    return render (request, "final/activity2.html")

@csrf_exempt
@login_required(login_url='login')
def activity3(request):
    return render (request, "final/activity3.html")

def activities(request):
    return render (request, "final/activitylist.html")

@csrf_exempt
@login_required(login_url='login')
def points(request, user_id):
    #make changes to user points
    user = User.objects.get(id=user_id)

    if request.method == "PUT":
        data = json.loads(request.body)
        old=0
        new=0
        if data.get("points") is not None:
            old=user.points
            new= data["points"] + user.points
            user.points = new
            
        user.save()
        return JsonResponse({'old': old, 'new': new, "status": 201})
        
#error
def error(request, message):
    return render (request, "final/error.html",{
        "message":message
    })