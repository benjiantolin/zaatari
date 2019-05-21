// 1. Create a map object.
var mymap = L.map('map', {
    center: [32.293, 36.3125],
    zoom: 15,
    maxZoom: 18,
    minZoom: 8,
    zoomcontrol: false,
    detectRetina: true });

var syriamap = L.map('origin', {
    center: [35., 38.7],
    zoom: 6,
    maxZoom: 18,
    minZoom: 3,
    zoomcontrol: false,
    detectRetina: true });

// 2. Add a base map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(syriamap);

Promise.all([
  d3.csv('assets/time.csv'),
]).then(function(datasets) {

  var t = ["t"];
  var d1 = ["D1"];
  var d2 = ["D2"];
  var d3 = ["D3"];
  var d4 = ["D4"];
  var d5 = ["D5"];
  var d6 = ["D6"];
  var d7 = ["D7"];
  var d8 = ["D8"];
  var d9 = ["D9"];
  var d10 = ["D10"];
  var d11 = ["D11"];
  var d12 = ["D12"];
  var total = ["Total"];

  datasets[0].forEach(function(d) {
    t.push(new Date(d["t"]))
    d1.push(+d["d1"])
    d2.push(+d["d2"])
    d3.push(+d["d3"])
    d4.push(+d["d4"])
    d5.push(+d["d5"])
    d6.push(+d["d6"])
    d7.push(+d["d7"])
    d8.push(+d["d8"])
    d9.push(+d["d9"])
    d10.push(+d["d10"])
    d11.push(+d["d11"])
    d12.push(+d["d12"])
    total.push(+d["total"])

  });

var chart = c3.generate({
    title: {
      text: 'Refugee Arrival (2012/7-2014/12)'
    },
    data: {
        x: 't',
        columns: [t,total],
        type: 'area-spline',
    },
    subchart: {
    show: true,
    size: {
      height: 15
    },
    onbrush: function(d) {
      chart2.zoom(chart.zoom());
    }
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m'
            }
        },
        y: {
          label: {
              text: '# of Refugees',
              position: 'outer-middle'
          }
        },
    },
    point: {
      r: 0,
      focus: {
        expand: {
          r: 2
        }
      }
    },
    zoom: {
      // rescale: true,+
      enabled: true,
      type: "scroll",
      onzoom: function(d) {
        chart2.zoom(chart.zoom());
        // step();
      }
    },
    stanford: {
    scaleMin: 1,
    scaleMax: 10000,
    scaleFormat: 'pow10',
    padding: {
        top: 15,
        right: 0,
        bottom: 0,
        left: 0
    }
},
      bindto: "#total"
});

var chart2 = c3.generate({
    title: {
      text: 'Refugee Arrival by District (D)'
    },
    data: {
        x: 't',
        columns: [t, d1, d2, d3, d4, d5, d6,d7, d8, d9, d10, d11, d12],
        type: 'spline',
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m'
            }
        },
        y: {
          tick: {
              format: ''
          },
          label: {
              text: '# of Refugees',
              position: 'outer-middle'
          }
        },
    },
    point: {
      r: 0,
      focus: {
        expand: {
          r: 2
        }
      }
    },
    zoom: {
      enabled: {
        type: "drag"
      },
      onzoomend: function(d) {
        chart.zoom(chart2.zoom());
      }
    },
    tooltip: {
      linked: true
    },
      bindto: "#district"
});
    });
// 3. Add airports GeoJSON Data
var districts = null;
var syria = null;

// 4. build up a set of colors from colorbrewer's dark2 category
var colors = chroma.scale('RdYlBu').mode('lch').colors(2);

// 5. dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 2; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}

//get airport.geojson data
districts = L.geoJson.ajax("assets/districts.geojson",{
//add popup window
onEachFeature: function (feature, layer) {
layer.bindPopup('District: '+feature.properties.DISTRICT +'<br> Total Population: '+feature.properties.totpop +'<br> Total Households: '+feature.properties.hhs)
},

attribution: 'Zaatari Population Data &copy; REACH | Zaatari Spatial Data &copy; REACH | Base Map &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | Made By Benjamin Antolin'
})
.addTo(mymap);

syria = L.geoJson.ajax("assets/syria1min.geojson",{
//add popup window
// onEachFeature: function (feature, layer) {
// layer.bindPopup('District: '+feature.properties.NAM_EN_REF +'<br> Total Population: '+feature.properties.totpop +'<br> Total Households: '+feature.properties.hhs)
// },

// attribution: 'Zaatari Population Data &copy; REACH | Zaatari Spatial Data &copy; REACH | Base Map &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | Made By Benjamin Antolin'

})
.addTo(syriamap);
$(".leaflet-control-attribution").hide();
// 6. Set function for color ramp
colors = chroma.scale('YlOrRd').colors(7); //colors = chroma.scale('OrRd').colors(5);

function setColor(density) {
    var id = 0;
    if (density > 8507) { id = 6; }
    else if (density > 7726 && density <= 8507) { id = 5; }
    else if (density > 6946 &&  density <= 7726) { id = 4; }
    else if (density > 6165 && density <= 6946) { id = 3; }
    else if (density > 5385 && density <= 6165) { id = 2; }
    else if (density > 4605 &&  density <= 5385) { id = 1; }
    else  { id = 0; }
    return colors[id];
}

// 7. Set style function that sets fill color.md property equal to cell tower density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.totpop),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}

// 3. add the state layer to the map. Also, this layer has some interactive features.

// 3.1 declare an empty/null geojson object
var districts = null;

// 3.2 interactive features.
// 3.2.1 highlight a feature when the mouse hovers on it.
function highlightFeature(e) {
    // e indicates the current event
    var layer = e.target; //the target capture the object which the event associates with
    layer.setStyle({
        weight: 8,
        opacity: 0.8,
        color: '#e3e3e3',
        fillColor: '#e3e00f',
        fillOpacity: 0.5
    });
    // bring the layer to the front.
    layer.bringToFront();
    // select the update class, and update the contet with the input value.
    $(".update").html('<b> District: </b>' + layer.feature.properties.d_id + '<br> <b>Total Population:</b> ' + layer.feature.properties.totpop +'<br> <b>Total Households:</b> '+ layer.feature.properties.tothh);
}

// 3.2.2 zoom to the highlighted feature when the mouse is clicking onto it.
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

// 3.2.3 reset the hightlighted feature when the mouse is out of its region.
function resetHighlight(e) {
    districts.resetStyle(e.target);
    $(".update").html("Hover over a state");
}

// 3.3 add these event the layer obejct.
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        click: zoomToFeature,
        mouseout: resetHighlight
    });
}

// 3.4 assign the geojson data path, style option and onEachFeature option. And then Add the geojson layer to the map.
districts = L.geoJson.ajax("assets/blocks.geojson", {
    style: style,
    onEachFeature: onEachFeature
}).addTo(mymap);


// 9. Create Leaflet Control Object for Legend
var legend = L.control({position: 'bottomright'});

// 10. Function that runs when legend is added to map
legend.onAdd = function () {

    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b># of Airports</b><br />';
    div.innerHTML += '<i style="background: ' + colors[6] + '; opacity: 0.5"></i><p>59+</p>';
    div.innerHTML += '<i style="background: ' + colors[5] + '; opacity: 0.5"></i><p>26-58</p>';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>20-25</p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>15-19</p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>10-14</p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 5-9</p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0- 4</p>';
    div.innerHTML += '<hr><b>Control Tower Status<b><br />';
    div.innerHTML += '<i class="fa fa-plane marker-color-1"></i><p> No control tower</p>';
    div.innerHTML += '<i class="fa fa-plane marker-color-2"></i><p> Has control tower</p>';
    // Return the Legend div containing the HTML content
    return div;
};

// 11. Add a legend to map
legend.addTo(mymap);

// 12. Add a scale bar to map
L.control.scale({position: 'bottomright'}).addTo(mymap);
//Add mouse position to map
L.control.mousePosition().addTo(mymap);
