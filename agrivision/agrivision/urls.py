"""
URL configuration for agrivision project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path, include
# from django.conf import settings
# from django.conf.urls.static import static

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("", include("backend.urls")),
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.contrib import admin 
from django.urls import path, re_path, include 
from django.conf import settings 
from django.views.static import serve 
urlpatterns = [ path("admin/", admin.site.urls), path("", include("backend.urls")), re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}), ]
# The + static(...) part serves files under MEDIA_ROOT (uploaded images,
# generated NDVI/overlay images) at MEDIA_URL ("/media/..."). Without this,
# nothing serves those files at all, DEBUG setting or not — Django doesn't
# do this automatically. Normally you'd gate this behind `if settings.DEBUG`
# and use a real static file server (nginx, S3, etc.) in production, but
# this deployment has no separate media server, so it's added unconditionally.
