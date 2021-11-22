/**
 * Profile (geo)feature collection
 *
 * Properties:
 * - name
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
      "coordinates"
    ]
  }
}

export default schema
