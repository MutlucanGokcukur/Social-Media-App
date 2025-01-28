from pathlib import Path
import os
from datetime import timedelta
from .host import IP_ADDRESS, FRONTEND_PORT, REDIS_PORT
BASE_DIR   = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-jg#%2^4_k%h1^k4(=nw55$wschv0!=k-#*ci0&zl$8yy62e1z_'
DEBUG      = True

ALLOWED_HOSTS        = [f'{IP_ADDRESS}']
CORS_ALLOWED_ORIGINS = [f'http://{IP_ADDRESS}:{FRONTEND_PORT}']
CSRF_TRUSTED_ORIGINS = [f'http://{IP_ADDRESS}:{FRONTEND_PORT}',]

AUTH_USER_MODEL = 'account.User'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=180),
    'ROTATE_REFRESH_TOKENS': False,
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'import_export',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'channels',
    'apps.account',
    'apps.post',
    'apps.search',
]

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware', 
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'social_media_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'social_media_backend.wsgi.application'
ASGI_APPLICATION = "social_media_backend.asgi.application"

# CHANNEL_LAYERS = {
#     'default': {
#         'BACKEND': 'channels.layers.InMemoryChannelLayer',
#     },
# }

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [(f"{IP_ADDRESS}", REDIS_PORT)],
        },
    },
}

#region Consumers group names
POST_GROUP_NAME = "post"

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'social_media_DB',
        'USER': 'social_media_user',
        'PASSWORD': 'social_media_123',
        'HOST': '192.168.1.110',
        'PORT': '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-EN'
TIME_ZONE     = 'Europe/Istanbul'
USE_I18N      = True
USE_L10N      = True
USE_TZ        = True

STATIC_URL          = '/static/'
STATICFILES_DIRS    = [os.path.join(BASE_DIR, 'static'),]
STATIC_ROOT         = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL  = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


JAZZMIN_SETTINGS = {
    "site_title": "Admin Panel",
    "site_header": "Social Media",
    "site_brand": "Admin Panel",
    "site_logo": "default_images/admin_logo.png",
    "login_logo": None,
    "login_logo_dark": None,
    "welcome_sign": "Welcome to the Social Media Backend Admin Panel",
    "copyright": "Mutlucan Gökçukur",
    "search_model": ["account.User", "auth.Group"],
    "user_avatar": None,
    "topmenu_links": [
        {"name": "Home",  "url": "admin:index", "permissions": ["auth.view_user"]},
        # {"name": "Support", "url": "https://github.com/farridav/django-jazzmin/issues", "new_window": True},
        {"model": "account.User"},
    ],
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": ["account",],
    "icons": {
        "auth": "fas fa-users-cog",
        "account.User": "fas fa-users",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users-cog",
        'post.Post': 'fas fa-newspaper',
        'post.PostAttachment': 'fas fa-quote-right',
    },
    "default_icon_children": "fas fa-circle",
    "related_modal_active": False,
    "custom_css": None,
    "custom_js": None,
    "use_google_fonts_cdn": True,
    "show_ui_builder": True,
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {"account.user": "collapsible", "auth.group": "vertical_tabs"},
    "language_chooser": True,
}


JAZZMIN_UI_TWEAKS = {
    "theme": "darkly",
    "dark_mode_theme": "darkly",
}