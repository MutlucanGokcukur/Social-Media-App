from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Post, PostAttachment
from .serializers import PostSerializer

"""
This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
These actions are mapped to the HTTP methods as follows:

- `list`: GET /posts/ - Retrieves a list of posts.
- `create`: POST /posts/ - Creates a new post.
- `retrieve`: GET /posts/{id}/ - Retrieves a single post by its ID.
- `update`: PUT /posts/{id}/ - Updates a post by its ID.
- `destroy`: DELETE /posts/{id}/ - Deletes a post by its ID.

However, this viewset alone doesn't work as intended due to the complexity of our project and specific requirements. 
Instead, the API is implemented in parts, with the functionality broken down into individual views in `api.py`. 
This provides more control over the request handling, allowing custom filtering, authorization checks, and more flexibility.

For example:

1. `PostListView`: Handles listing of posts and creating new posts, including the logic for filtering based on user relationships (e.g., user's friends).
2. `PostDetailView`: Handles detailed retrieval, updating, and deletion of posts on a per-post basis.
3. `trend_posts`: Filters posts by a trending hashtag and returns matching posts.

Each of these views is defined separately to allow fine-grained control over the API behavior, rather than relying on the default behavior provided by the viewset.

If you'd prefer the automatic viewset behavior, we recommend enabling this feature and customizing the `get_queryset()` method in the viewset for specific filtering requirements.
"""

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.queryset

