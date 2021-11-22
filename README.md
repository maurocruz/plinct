# X-Map

This is a proof of concept for X-Team's global map.

## Getting Started

```bash
yarn dev
```

## Learn More

If you want to add your geographic information to the map, please submit a PR adding a new folder named with your slack handle at https://github.com/bernardodiasc/x-map/tree/master/public/data. Inside this newly created folder it's expected to have an `avatar.jpg` and a `profile.json`.

At this stage the project is very simple and the shape of your profile must be like that:

```json
{
  "type": "profile",
  "uid": "bernardo",
  "name": "Bernardo Dias da Cruz",
  "coordinates": [-45.0722002, -23.3975554]
}
```

Then remember to import and export your profile in the https://github.com/bernardodiasc/x-map/tree/master/public/data/index.js.
