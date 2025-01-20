import os
import uuid
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models
from django.utils import timezone

class CustomUserManager(UserManager):
    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")
        
        email = self.normalize_email(email)
        user  = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, email, password, **extra_fields)
    
    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email         = models.EmailField(unique=True)
    name          = models.CharField(max_length=255, blank=True,null=True, default='')
    avatar        = models.ImageField(upload_to='avatars', blank=True, null=True)

    is_active    = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff     = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login  = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD  = 'email'
    EMAIL_FIELD     = 'email'
    REQUIRED_FIELDS = []

    def get_avatar(self):
        if self.avatar:
            return settings.WEBSITE_URL + self.avatar.url
        else:
            return 'https://picsum.photos/200/200'
        
    def delete(self, *args, **kwargs):
        if self.avatar and os.path.isfile(self.avatar.path):
            os.remove(self.avatar.path)
        super().delete(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        if not self.avatar:
            try:
                old_user = User.objects.get(pk=self.pk)
                old_avatar = old_user.avatar
                if old_avatar and os.path.isfile(old_avatar.path):
                    os.remove(old_avatar.path)
            except User.DoesNotExist:
                pass
        super().save(*args, **kwargs)