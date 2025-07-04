# Generated by Django 5.2.3 on 2025-06-30 21:01

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Pharmacy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name_medicine",
                    models.CharField(
                        max_length=150, unique=True, verbose_name="name of medicine"
                    ),
                ),
                (
                    "amount_medicine",
                    models.IntegerField(
                        validators=[django.core.validators.MinValueValidator(0)],
                        verbose_name="amount of medicines",
                    ),
                ),
                (
                    "created_at",
                    models.DateField(auto_now_add=True, verbose_name="created in"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
    ]
