from django.apps import AppConfig
from pathlib import Path

 # Dynamically create accurately labelled app
appname = Path(__file__).parent.name
mainconfig = type(
    f'{appname.title()}Config',
    (AppConfig,),
    {
    'name': appname
    }
)