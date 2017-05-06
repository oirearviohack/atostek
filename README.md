# Atostek Oirearviohack

## Idea - Cough map

World has a lot of wasted coughing. With our app you can record and store your coughs for other people to see. By seeing a map of coughs you can avoid those areas when coughing becomes an epidemic.

This concept is a perfect application for a public and national welfare instance. It helps to prevent the distribution of cough related diseases and healthcare units can be better prepared to reserve necessary resources.

This application can be enhanced to actually listen to the coughs on a mobile device. Easy start is to listen for ambient coughs first. This can be broadened to incorporate an application or algorithm to really diagnose the type of cough.

Other future ideas are:
- Inform local residents to wash their hands better when cough related diseases become epidemic.
- Extend the application to input other symptoms manually such as body temperature, headache, etc.
- Extend the application to input other disease symptoms also such as diarrhea.
- Return a diagnosis using ODA1 EBMeDS service.

## Running a Demo

Browse to https://atostek-oirearviohack.herokuapp.com/

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/oirearviohack/atostek.git
$ cd atostek
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Documentation
Architecture:

![GitHub Logo](/architecture.jpg)

Tech used:
- [load-google-maps-api](https://www.npmjs.com/package/load-google-maps-api#usage)
- [Google Heatmap layer](https://developers.google.com/maps/documentation/javascript/heatmaplayer)
- [Heatmap layer options](https://developers.google.com/maps/documentation/javascript/reference#HeatmapLayerOptions)
- [ODA PHR Server](https://oda.medidemo.fi/phr/)

