mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2FydHJlbGwiLCJhIjoiY2w3OWt3MW00MDNjbDN2cGRpc20ya3JnbyJ9.6t2ISNlyP1BvBmkSH2Ks_Q';

// initialize map
var map = new mapboxgl.Map({
    container: 'map', // pointing to the above "map" div
    style: 'mapbox://styles/samgartrell/clndhswms00b701ps3b31dp37',
    center: [-122.3460007, 44.87574640],
    maxBounds: [
        [
            -126.255,
            40.4435

        ],
        [
            -114.933,
            47.444
        ]
    ],
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