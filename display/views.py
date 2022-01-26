from django.shortcuts import render
from .models import PortfolioEntry

def index(request):
    context = {"entries": PortfolioEntry.objects.all()}
    return render(request, 'display/alt_index.html', context)