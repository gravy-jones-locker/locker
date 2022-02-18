from django.db import models

class EntryManager(models.Manager):
    def reset_or_create(self, ref, config):
        entry, _ = self.update_or_create(ref=ref,
            defaults={"title": config["title"],
                      "synopsis": config["synopsis"]})
        TechnicalNote.objects.bulk_create([
            TechnicalNote(entry=entry, text=x) for x in config["notes"]])
        Feedback.objects.create(entry=entry, text=config["feedback"])
        Section.objects.update_or_create(name=config["section"],
            defaults={"entry": entry})

class PortfolioEntry(models.Model):
    objects = EntryManager()
    ref = models.CharField(max_length=255)
    img = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    synopsis = models.CharField(max_length=255)

class TechnicalNote(models.Model):
    text = models.CharField(max_length=255)
    entry = models.ForeignKey(PortfolioEntry, on_delete=models.CASCADE)

class Feedback(models.Model):
    client = models.CharField(max_length=255)
    text = models.CharField(max_length=255)
    entry = models.OneToOneField(PortfolioEntry, on_delete=models.CASCADE)

class Section(models.Model):
    name = models.CharField(max_length=255)
    entry = models.ForeignKey(PortfolioEntry, on_delete=models.CASCADE)