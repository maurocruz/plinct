/**
 * Places (geo)feature collection
 *
 * Properties:
 * - name
 * - city
 * - country
 * - coordinates
 */

const schema = {
  "place": {
    "type": "object",
    "properties": {
      "uid": {
        "type": "string",
        "chance": "guid"
      },
      "name": {
        "type": "string"
      },
      "city": {
        "type": "string"
      },
      "country": {
        "type": "string"
      },
      "coordinates": {
        "type": "array",
        "items": [
          {
            "type": "integer",
            "maximum": 180,
            "minimum": -180
          },
          {
            "type": "integer",
            "maximum": 90,
            "minimum": -90
          },
          {
            "type": "integer",
            "maximum": 1,
            "minimum": 1
          }
        ]
      }
    },
    "required": [
      "uid",
      "name",
      "city",
      "country",
      "coordinates"
    ]
  }
}

export default schema
