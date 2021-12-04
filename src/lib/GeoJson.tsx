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

    createPoint(latitude: number, longitude: number) 
    {
        this.feature.geometry = {
            type: 'Point',
            coordinates: [ latitude, longitude ] 
        }
        this.features.push(this.feature);
    }

    ready() 
    {
        this.featureColletion.features = this.features;
        return this.featureColletion
    }
}

export default GeoJson;