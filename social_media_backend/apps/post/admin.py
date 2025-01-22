from django.contrib import admin
from .models import Post, PostAttachment
from django.utils.html import format_html

@admin.register(PostAttachment)
class PostAttachmentAdmin(admin.ModelAdmin):
    list_display = ('created_by', 'image_preview',)
    list_filter = ('created_by',)
    search_fields = ('created_by__username',)
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html(f'<img src="{obj.image.url}" style="width: 100px; height: auto;" />')
        return "No Image"
    image_preview.short_description = "Image Preview"

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('created_by', 'created_at', 'body_preview', 'attachments_count',)
    list_filter = ('created_at', 'created_by')
    search_fields = ( 'body', 'created_by__username',)
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    def body_preview(self, obj):
        return obj.body[:50] + "..." if obj.body and len(obj.body) > 50 else obj.body
    body_preview.short_description = "Body Preview"

    def attachments_count(self, obj):
        return obj.attachments.count()
    attachments_count.short_description = "Attachments Count"
