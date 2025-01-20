from django.contrib import admin
from import_export import resources
from import_export.admin import ExportMixin
from .models import User

class UserResource(resources.ModelResource):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'is_active', 'is_staff', 'is_superuser', 'date_joined', 'last_login')

# Custom User Admin
class CustomUserAdmin(ExportMixin, admin.ModelAdmin):
    model = User
    list_display = ('name', 'email', 'last_login')
    list_filter = ('date_joined',)
    search_fields = ('email', 'name')
    ordering = ('-id',)
    readonly_fields = ('date_joined', 'last_login')
    fieldsets = (
        ('Personal info', {'fields': ('email','name', 'avatar')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('date_joined', 'last_login')}),
    )

    add_fieldsets = (
        (None, {'classes': ('wide',), 'fields': ('email', 'password1', 'password2')}),
        ('Permissions', {'classes': ('collapse',), 'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    def get_avatar(self, obj):
        return obj.avatar.url if obj.avatar else 'https://picsum.photos/200/200'
    get_avatar.short_description = 'Avatar'
    resource_class = UserResource

admin.site.register(User, CustomUserAdmin)
