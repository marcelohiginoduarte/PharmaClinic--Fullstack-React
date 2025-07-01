from rest_framework import viewsets
from Pharma.models import Pharmacy
from Pharma.serializers import PharmacySerializer


class PharmacyViewsSet(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer
