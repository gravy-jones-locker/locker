import os
import json
import sys

import display.models as models

def update_entries():
    """
    Update the portfolio_entry table as per the static config.
    """
    for fname in os.listdir('display/portfolio'):
        with open(f'display/portfolio/{fname}', mode='r') as infile:
            config = json.load(infile)
        models.PortfolioEntry.objects.reset_or_create(fname, config)
        
if __name__ == '__main__':
    print(sys.argv)
    if len(sys.argv) > 1:
        eval(sys.argv[1])()