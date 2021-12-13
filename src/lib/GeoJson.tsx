import geo from './geo'


class GeoJson 
{
    featureColletion = { 
        type: 'FeatureCollection',
        features: []
    };

    features = []

    feature = { 
        type: 'Feature',
        geometry: {},
        properties: {}
    }    

    createPoint(latitude: number, longitude: number, type = 'Point') {
        this.feature.geometry = {
            type: type,
            coordinates: [ latitude, longitude ]
        }
    }

    properties(name: string, value: any) {
        this.feature.properties[name] = value 
    }

    ready() {  
        this.features.push(this.feature)
        this.featureColletion.features = this.features;
        return this.featureColletion
    }
}

export default GeoJson;