import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'httpclient';
  WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1"
  model = new Weather('Singapore',0,0,0,'',0,0);
  imageUrl = "https://www.nea.gov.sg/assets/images/map/base-853.png";

  imgMapBasedCity = [
    {city: 'Singapore', imageUrl: 'https://www.nea.gov.sg/assets/images/map/base-853.png'},
    {city: 'London', imageUrl: 'https://map.viamichelin.com/map/carte?map=viamichelin&z=10&lat=51.50022&lon=-0.1265&width=550&height=382&format=png&version=latest&layer=background&debug_pattern=.*'}
    ]

  constructor(private weatherSvc: WeatherService){

  }

  ngOnInit(){
    console.log("retrieve weather !")
    this.weatherSvc.getWeather(this.model.city, this.WEATHER_API_KEY).then((result)=>{
      console.log(result);
      console.log(result.main);
      this.model = new Weather(result.main.city,result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
  
      //console.log()
    }).catch((error)=>{
      console.log(error);
    })
  }

  updateCity(event){
    Object.keys(this.imgMapBasedCity).find(value=>{
      console.log(value);
      if(this.imgMapBasedCity[value].city === event.target.value){
        this.imageUrl = this.imgMapBasedCity[value].imageUrl;
      }
    })
    console.log("retrieve weather !")
    this.weatherSvc.getWeather(event.target.value, this.WEATHER_API_KEY).then((result)=>{
      console.log(result);
      console.log(result.main);
      this.model = new Weather(result.main.city,result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
  
      //console.log()
    }).catch((error)=>{
      console.log(error);
    })
  }
}
