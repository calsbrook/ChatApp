import requests
import json
import sys


# US Locations Only

def get_lat_long_from_zip(zip_code):
    """
    Takes a US zipcode as a parameter and returns a latitude and longitude.
    lat/long is required by the weather API used in the get_weather() function
    """
    with open("/media/calsbrook/StorageHokage/School/2022Winter/SoftwareEngineering/PortfolioProject/WeatherMicroservice/USCities.json", "r") as cities_file:
        cities_object = json.load(cities_file)
        for item in cities_object:
            if item['zip_code'] == zip_code:
                return item['latitude'], item['longitude']


def get_weather(zip_code):
    """
    Takes a US zipcode as a parameter and returns a string with the current weather at that location
    """
    latitude, longitude = get_lat_long_from_zip(zip_code)

    # API entrypoint: generates metadata for the specified location
    # URL for location's weather is in the metadata
    meta_data = requests.get(f"https://api.weather.gov/points/{latitude},{longitude}")

    with open('weather.json', 'wt') as data_file:
        data_file.write(meta_data.text)

    with open('weather.json', 'r') as data_file:
        meta_object = json.load(data_file)
        path_to_forecast = meta_object["properties"]["forecast"]

    # Retrieves weather from URL found in the metadata
    full_weather = requests.get(path_to_forecast)

    with open('weather.json', 'wt')as data_file:
        data_file.write(full_weather.text)

    with open('weather.json', 'r') as data_file:
        weather_object = json.load(data_file)
        detailed_forecast = weather_object["properties"]["periods"][0]["detailedForecast"]
        return detailed_forecast

running = True
while running:
    if len(sys.argv) > 1:
        inputZip = sys.argv[1]
        if not inputZip.isnumeric():
            print("Error")
        else:
            print(get_weather(int(inputZip)), file = sys.stdout)
    running = False