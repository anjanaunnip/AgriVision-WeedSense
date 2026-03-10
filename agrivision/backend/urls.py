from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .import views
from .views import download_gis_report
urlpatterns = [
    path("", views.home),
    path("signup/", views.signup, name="signup"),
    path("login/", views.login_view, name="login"),  
    path("upload-image/", views.upload_image),
    path("download-report/", views.download_report),
    path("download-gis-report/", download_gis_report),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)