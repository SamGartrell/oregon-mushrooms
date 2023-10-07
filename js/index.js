mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2FydHJlbGwiLCJhIjoiY2w3OWt3MW00MDNjbDN2cGRpc20ya3JnbyJ9.6t2ISNlyP1BvBmkSH2Ks_Q';

// initialize map
var map = new mapboxgl.Map({
    container: 'map', // pointing to the above "map" div
    style: 'mapbox://styles/samgartrell/clndhswms00b701ps3b31dp37',
    center: [-122.3460007, 44.87574640],
    zoom: 8
});

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.NavigationControl()
);

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);

// manually add custom buttons to the right control group div
const rightCtrlGroup = document.getElementsByClassName('mapboxgl-ctrl-top-right')[0];

// info toggle
const infoCtrl = document.createElement('div');
infoCtrl.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

infoCtrl.innerHTML = `
    <button id='toggleInfo' role="button" onclick="toggleInfo('info-box', 'toggleInfo')">
    <svg class="icon" id="info"></svg>
    </button>
`;
rightCtrlGroup.appendChild(infoCtrl);

// layerz
map.on('load', () => {
    map.addSource('oyster', {
        type: 'vector',
        url: 'mapbox://samgartrell.aeg99sp4'
    });
    map.addSource('field', {
        type: 'vector',
        url: 'mapbox://samgartrell.4qdjlhcc'
    });
    map.addSource('lion', {
        type: 'vector',
        url: 'mapbox://samgartrell.aupd7m7u'
    });
    map.addSource('chanterelle', {

        type: 'vector',
        url: 'mapbox://samgartrell.ak7gxv0q'
    });
    map.addSource('edulis', {
        // king bolete, boletus edulis
        type: 'vector',
        url: 'mapbox://samgartrell.7a4v1fzx'
    });
    map.addSource('milk', {
        type: 'vector',
        url: 'mapbox://samgartrell.1y79xvti'
    });
    map.addSource('morel', {
        type: 'vector',
        url: 'mapbox://samgartrell.90qiybtk'
    });
    

    map.addLayer(
        {
            'id': 'oyster-data',
            'type': 'symbol',
            'source': 'oyster',
            'source-layer': '0004028-231002084531237-cxxg5n',
            'layout': {
                'icon-image': 'oyster_raw-min-500',
                'icon-size': .4, // Adjust the size of the custom icon
                'icon-allow-overlap': true,
            }
        }
    );
    map.addLayer(
        {
            'id': 'field-data',
            'type': 'symbol',
            'source': 'field',
            'source-layer': '0004032-231002084531237-cejws8',
            'layout': {
                'icon-image': 'field_raw-min-500',
                'icon-size': .4, // Adjust the size of the custom icon
                'icon-allow-overlap': true,
            }
        }
    );
    map.addLayer(
        {
            'id': 'lion-data',
            'type': 'symbol',
            'source': 'lion',
            'source-layer': '0004037-231002084531237-2rxebf',
            'layout': {
                'icon-image': 'lion_raw-min-500',
                'icon-size': .4, // Adjust the size of the custom icon
                'icon-allow-overlap': true,
            }
        }
    );
    map.addLayer(
        {
            'id': 'chanterelle-data',
            'type': 'symbol',
            'source': 'chanterelle',
            'source-layer': '0004016-231002084531237-04mg15',
            'layout': {
                'icon-image': 'chant_raw-min-500',
                'icon-size': .3, // Adjust the size of the custom icon
                'icon-allow-overlap': true,
            }
        }
    );
    map.addLayer(
        {
            'id': 'edulis-data',
            'type': 'symbol',
            'source': 'edulis',
            'source-layer': '0004023-231002084531237-30mrpo',
            'layout': {
                'icon-image': 'bolete_raw-min-500',
                'icon-size': .3, // Adjust the size of the custom icon
                'icon-allow-overlap': true,
            }
        }
    );
    map.addLayer(
        {
            'id': 'milk-data',
            'type': 'symbol',
            'source': 'milk',
            'source-layer': '0004025-231002084531237-7ywiw5',
            'layout': {
                'icon-image': 'oyster_raw-min-500',
                'icon-size': .3, // Adjust the size of the custom icon
                'icon-allow-overlap': true,
            }
        }
    );
    map.addLayer(
        {
            'id': 'morel-data',
            'type': 'symbol',
            'source': 'morel',
            'source-layer': '0004018-231002084531237-dv2dh7',
            'layout': {
                'icon-image': 'oyster_raw-min-500',
                'icon-size': .3, // Adjust the size of the custom icon
                'icon-allow-overlap': true,
            }
        }
    );
});

// configure popups
// Define an array of your layer IDs
var layerIds = ['morel-data', 'milk-data', 'edulis-data', 'chanterelle-data', 'lion-data', 'field-data', 'oyster-data'];

// Add a single click event listener to the map
map.on('click', function (e) {
    layerIds.forEach(function (layerId) {
        var features = map.queryRenderedFeatures(e.point, { layers: [layerId] });

        if (features.length > 0) {
            var verbatimScientificName = features[0].properties.verbatimScientificName
            var foundDate = features[0].properties.year
            var externalLink = features[0].properties.occurrenceID

            // Create an HTML table using a template literal
            var tableContent = `
                <div>
                    <h3>${verbatimScientificName}</h3>
                    <p>documented in ${foundDate}<p>
                    <a href="${externalLink}">view source</a>
                </div>
            `;

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(tableContent)
                .addTo(map);
        }
    });
});




function toggleInfo(boxId, buttonId) {
    /**
     * toggle the info panel's visibility and update the button's icon
     * @param {str} boxId the id of the element whose visibility needs toggling
     * @param {str} buttonId the id of the button whose style needs updating 
     */
    // TODO: this function can be united with toggleGraph, if more params are added


    el = document.getElementById(boxId) //access info container
    bt = document.getElementById(buttonId) //access button element
    img = bt.children[0] //assumes btton has one image

    // if the info panel is currently hidden...
    if (el.style.opacity != '1') {

        // reveal it
        el.style.display = 'flex'

        // update its opacity
        el.style.opacity = '1'

        // change symbology of its icon
        img.style.rotate = '45deg'
        img.style['background-image'] = 'url(./img/plus.svg)'


        // otherwise...
    } else if (el.style.opacity != '0') {
        el.style.opacity = '0' //hide it
        bt.style.display = 'block'
        img.style.rotate = '0deg' // rotate the button
        img.style['background-image'] = 'url(./img/info.svg)' //change its image to a graph

        //ensure the opacity fade ends before the visibility changes 
        setTimeout(
            () => { el.style.display = 'none'; }, 300
        )
    } else {
        console.log('unhandled logic in toggleInfo()')
    }

};

function renderLink(e, id, text = 'view source') {
    /**
     * renders a link to the USGS viewer for the given gauge
     * @param e the element designated to contain the link 
     * @param id the stream gauge ID 
     * @param text the text to display in the hyperlink
     */
    linkTag = `<a id="link" href="https://waterdata.usgs.gov/monitoring-location/${id}/#parameterCode=00060&period=P7D" target="_blank" rel="noopener noreferrer">${text}</a>`
    e.innerHTML = linkTag
};