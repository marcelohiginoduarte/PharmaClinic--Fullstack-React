from django.db import models
from django.core.validators import MinValueValidator

class User(models.Model):
    pass


class Pharmacy(models.Model):
    name_medicine = models.CharField(
        max_length=150, 
        blank=False, 
        null=False, 
        unique=True, 
        verbose_name='name of medicine'
        )
    amount_medicine = models.IntegerField(
        validators=[MinValueValidator(0)],
        verbose_name='amount of medicines'
    )
    created_at = models.DateField(
        auto_now_add=True,
        verbose_name='created in'
    )

    def __str__(self):
        return self.name_medicine