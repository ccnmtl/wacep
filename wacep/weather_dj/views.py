from annoying.decorators import render_to

@render_to('weather_dj/weather_dj.html')
def weather_dj(request):
    """keep the code in here to a minimum"""
    return {}