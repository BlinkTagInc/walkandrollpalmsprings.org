# Walk and Roll Palm Springs
A mobile-first website that:
* integrates with an API to pull up a list of destinations (such as Visit Palm Springs or Yelp)
* allows those destinations to be categorized (such as "eat/play/stay")
* calculates walk/bike/transit directions between a location and any of those destinations
* calculates calories burned and pounds of CO2 emissions saved by making that trip without a car
* allows neighborhoods to compete for most calories/CO2 burned/saved for trips in their area

## Who Is This For
This site works well to support a city/region's sustainability goals. It can promote local/green businesses, while using competition to drive neighborhood participation. To read more about its use with the City of Palm Spring's Sustainability Master Plan, visit Healthy Planet Healthy You Palm Springs: http://www.healthyplanethealthyyoups.com/

## Site Layout
* Home
* Search
* Neighborhoods
* Leaderboard
* About
* Safety

## How to Install

### Install node and gulp

    brew install node

    npm install gulp -g

### Install required packages from NPM:

    npm install

### Run the app locally, with debug logging

    DEBUG=palmsprings gulp develop

### View the app

Open `localhost:3000` in your browser.

## Current Use
See http://walkandrollpalmsprings.org 

## License
This project is licensed under GNU General Public License v3.0. The icons are used with permission from various contributors to The Noun Project.
