from django.db import models
from display.config import SECTIONS

class EntryManager(models.Manager):
    def reset_or_create(self, ref, entry_dict):
        section, _ = Section.objects.update_or_create(
            index=SECTIONS.index(entry_dict["section"]),
            name=entry_dict.pop('section'))
        notes, feedback = entry_dict.pop('notes'), entry_dict.pop('feedback')
        entry, created = self.update_or_create(ref=ref,
            defaults={**entry_dict, "section": section})
        if not created:
            entry.technicalnote_set.all().delete()  # These are overwritten
            if getattr(entry, 'feedback', None):
                entry.feedback.delete()  # As is this
        TechnicalNote.objects.bulk_create([
            TechnicalNote(entry=entry, text=x) for x in notes])
        Feedback.objects.create(entry=entry, **feedback)

class Section(models.Model):
    name = models.CharField(max_length=255, unique=True)
    index = models.IntegerField()

class PortfolioEntry(models.Model):
    objects = EntryManager()
    ref = models.CharField(max_length=255)
    img = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=255)
    synopsis = models.CharField(max_length=255)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    color = models.CharField(max_length=50)
    logo_color = models.CharField(max_length=50)

class Feedback(models.Model):
    client = models.CharField(max_length=255)
    text = models.CharField(max_length=255)
    entry = models.OneToOneField(PortfolioEntry, on_delete=models.CASCADE)

class TechnicalNote(models.Model):
    text = models.CharField(max_length=255)
    entry = models.ForeignKey(PortfolioEntry, on_delete=models.CASCADE)