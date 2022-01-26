# Generated by Django 4.0.1 on 2022-01-21 09:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('display', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='portfolioentry',
            old_name='technical_notes',
            new_name='notes',
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='display.portfolioentry')),
            ],
        ),
    ]
