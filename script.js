// Initialize map
const map = L.map("map").setView([22.5, 80], 5);

// Background map
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "" }
).addTo(map);

// Highlight India
fetch("https://raw.githubusercontent.com/geohacker/india/master/state/india_states.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        fillColor: "#bfbfbf",
        fillOpacity: 1,
        color: "#ffffff",
        weight: 2
      }
    }).addTo(map);
  });

// Marker style (sky blue)
const markerStyle = {
  radius: 10,
  fillColor: "#2EC8FF",
  color: "#ffffff",
  weight: 3,
  opacity: 1,
  fillOpacity: 1
};

// Popup creator
function createPopup(state, year, text) {
  return `
    <div class="country-popup">
      <div class="popup-content">
        <h2>${state.toUpperCase()}</h2>
        <p>
          UDHYAM began its journey in ${state} in ${year}. ${text}
        </p>
      </div>

      <a href="#" class="popup-cta">
        Find out about our work
        <span class="arrow">→</span>
      </a>
    </div>
  `;
}

// States data

const states = [
  {
    name: "Delhi",
    coords: [28.61, 77.21],
    popup: createPopup(
      "Delhi",
      "2012",
      "It was the first state operated outside Uttar Pradesh, supporting women and girls."
    )
  },
  {
    name: "Uttar Pradesh",
    coords: [26.85, 80.91],
    popup: createPopup(
      "Uttar Pradesh",
      "2010",
      "This state serves as the foundation of UDHYAM’s education initiatives."
    )
  },
  {
    name: "Maharashtra",
    coords: [19.75, 75.71],
    popup: createPopup(
      "Maharashtra",
      "2015",
      "Programs focus on urban livelihoods and youth skill development."
    )
  },
  {
    name: "Tamil Nadu",
    coords: [11.12, 78.65],
    popup: createPopup(
      "Tamil Nadu",
      "2016",
      "Strengthening access to education and community engagement."
    )
  },
  {
    name: "Karnataka",
    coords: [15.31, 75.71],
    popup: createPopup(
      "Karnataka",
      "2017",
      "Initiatives focus on entrepreneurship and women-led enterprises."
    )
  },
  {
    name: "West Bengal",
    coords: [22.99, 87.85],
    popup: createPopup(
      "West Bengal",
      "2014",
      "Programs support adolescent girls and grassroots leadership."
    )
  },
  {
    name: "Rajasthan",
    coords: [27.02, 74.21],
    popup: createPopup(
      "Rajasthan",
      "2018",
      "Working to improve rural education and women’s participation."
    )
  },
  {
    name: "Gujarat",
    coords: [22.67, 71.57],
    popup: createPopup(
      "Gujarat",
      "2019",
      "Focus on vocational training and employment readiness."
    )
  },
  {
    name: "Punjab",
    coords: [31.14, 75.34],
    popup: createPopup(
      "Punjab",
      "2020",
      "Programs emphasize youth empowerment and leadership."
    )
  },
  {
    name: "Haryana",
    coords: [29.06, 76.08],
    popup: createPopup(
      "Haryana",
      "2020",
      "Improving access to education for adolescent girls."
    )
  },
  {
    name: "Bihar",
    coords: [25.10, 85.31],
    popup: createPopup(
      "Bihar",
      "2013",
      "Supporting community-based education programs."
    )
  },
  {
    name: "Madhya Pradesh",
    coords: [23.47, 77.95],
    popup: createPopup(
      "Madhya Pradesh",
      "2016",
      "Programs address school retention and skill development."
    )
  },
  {
    name: "Odisha",
    coords: [20.95, 85.10],
    popup: createPopup(
      "Odisha",
      "2017",
      "Focused on tribal education and inclusion."
    )
  },
  {
    name: "Telangana",
    coords: [18.11, 79.01],
    popup: createPopup(
      "Telangana",
      "2018",
      "Supporting digital literacy and youth employment."
    )
  },
  {
    name: "Assam",
    coords: [26.20, 92.94],
    popup: createPopup(
      "Assam",
      "2019",
      "Programs support education in underserved communities."
    )
  }
];

// Add markers
states.forEach(state => {
  L.circleMarker(state.coords, markerStyle)
    .addTo(map)
    .bindPopup(state.popup, {
      className: "leaflet-country-popup"
    });
});
