export default class SaveLocations {
    constructor() {
        this.list = [];
    }

    save(location) {
        this.list.push(location)
    }

    remove(location) {
        this.list = this.list.filter((currentLocation) => currentLocation != location)
    }
}