export default class Weather {
    constructor(cityName, zipcode, country = 'us') {
        this.cityName = cityName
        this.zipcode = zipcode
        this.country = country
    }
}