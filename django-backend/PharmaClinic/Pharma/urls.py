from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Pharma.views import PharmacyViewsSet

router = DefaultRouter()
router.register(r'pharmas', PharmacyViewsSet)

urlpatterns = [
    path('', include(router.urls)),
]