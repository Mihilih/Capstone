from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import CASCADE

class User(AbstractUser):
    id=models.AutoField(primary_key=True)
    points=models.IntegerField(default=0)
    editor=models.BooleanField(default=False)
    pass

class Category(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=100, blank = False)
    def __str__(self):
        return (f"{self.name}")

class Article(models.Model):
    id=models.AutoField(primary_key=True)
    title=models.CharField(max_length=100, blank = False)
    content=models.CharField(max_length=100000,blank = False)
    creator=models.ForeignKey(User, on_delete=models.SET_NULL, blank = True, null=True)
    def __str__(self):
        return (f"{self.title} - {self.creator}")

class Resource(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=1000, blank = False)
    link=models.URLField(blank = False)
    category=models.ForeignKey(Category, on_delete=models.CASCADE, null= True,blank=True)

class Comment(models.Model):
    id=models.AutoField(primary_key=True)
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="commenter")
    content=models.TextField(max_length=1000, blank = False)

class Post(models.Model):
    id=models.AutoField(primary_key=True)
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="user", blank=False)
    content=models.TextField(max_length=1000, blank = False)
    comments=models.ManyToManyField(Comment, default=None, blank= True)

class Video(models.Model):
    id=models.AutoField(primary_key=True)
    code=models.TextField(max_length=10000, blank=False, default="hi")
    name=models.TextField(max_length=10000, blank=False)