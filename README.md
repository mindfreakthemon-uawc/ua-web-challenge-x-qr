# ua-web-challenge-x-qr

### To run this piece:
* Run http server in project directory and open index.html

### Making changes
* `npm install` project
* run `gulp` to build dev project
  
### Main map
You can click on the map in order to set nearest point.
Which point - A or B is determined by radio inputs under the map.

### GeoPoint / Connection admin
You can use admin pages to add GeoPoints and connection between them.
In order to connect particular GeoPoint to some other GeoPoint, a Connection must be created specifically for it.
Then, Connection "tubes" can be added.

Note! Each connection is one-way. If you will only connect A to B, you won't be able to crate path from B to A until specific connection will not be created in B Connection to A.

### Storage for geopoints and conenctions
assets/statics/json/connection.json
assets/statics/json/geopoint.json

You can use "Export" button in admin pages to download generated json files for current state. 
