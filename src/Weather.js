export default class Weather {
    constructor(name, zipcode, country = 'us') {
        this.name = name
        this.zipcode = zipcode
        this.country = country
    }
}