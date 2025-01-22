from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('i18n/', include('django.conf.urls.i18n')),
    path('api/', include('apps.account.urls')),
    path('api/posts/',include('apps.post.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
