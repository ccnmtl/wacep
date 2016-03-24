from django.shortcuts import render


def weather_dj(request):
    """keep the code in here to a minimum"""
    return render(request, 'weather_dj/weather_dj.html', {})
