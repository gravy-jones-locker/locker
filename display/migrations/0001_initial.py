# Generated by Django 4.0.1 on 2022-02-18 11:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PortfolioEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ref', models.CharField(max_length=255)),
                ('img', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('synopsis', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='TechnicalNote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='display.portfolioentry')),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='display.portfolioentry')),
            ],
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client', models.CharField(max_length=255)),
                ('text', models.CharField(max_length=255)),
                ('entry', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='display.portfolioentry')),
            ],
        ),
    ]
