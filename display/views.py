from django.shortcuts import render
from .models import *

def index(request):
    context = {
        "sections": Section.objects.order_by('index')}
    return render(request, 'display/alt_index.html', context)

def old(request):
    return render(request, 'display/index.html', {})