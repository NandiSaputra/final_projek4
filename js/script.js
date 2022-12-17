if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser."); 
  }

  function showPosition(position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    console.log(lat,long);
    generateWeatherByLatLong(lat,long);
    generateMap(lat,long);
 
}
    function generateMap(lat,long) {
        // Initialize the map and assign it to a variable for later use
    // there's a few ways to declare a VARIABLE in javascript.
    // you might also see people declaring variables using `const` and `let`
    var map = L.map('map', {
        // Set latitude and longitude of the map center (required)
        center: [lat, long],
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 11
    });
    

    // Create a Tile Layer and add it to the map
    var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '8'}).addTo(map);

    var marker = L.marker(
    [lat, long],
    { 
        draggable: true,
        title: "",
        opacity: 0.75
    });
    marker.addTo(map);
    marker.on('dragend',function(e){
        console.log(e);
        let lat = e.target._latlng.lat;
        let long = e.target._latlng.lng;
       generateWeatherByLatLong(lat,long);
    })

    }

function generateWeatherByLatLong(lat,long){
    var getCity = document.getElementById('inputCity');
      var setCity = getCity.value;
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=edf93961952b819e4fa526696ceb586b&units=metric`)
                .then(response => response.json())
                .then((response) => {
                    document.getElementById('city').innerHTML = response.name+', '+response.sys.country;
                    var dates = new Date(response.dt *1000);
                    var hari = dates.getDay()
                    var bulan = dates.getMonth()
                    var tahun = dates.getFullYear()
                    var tanggal = dates.getDate()
                    
                    var hariarray = new Array("Sunday,","Monday,","Tuesday,","Wednesday,","Thursday,","Friday,","Saturday,")
                    var bulanarray = new Array("Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec")
                     document.getElementById('dates').innerHTML = hariarray[hari]+" "+tanggal+" "+bulanarray[bulan]+" "+tahun
                     document.getElementById('dates1').innerHTML = hariarray[hari]+" "+tanggal+" "+bulanarray[bulan]+" "+tahun
        
                    document.getElementById('detailCity').innerHTML = response.name;
                    document.getElementById('detailCity1').innerHTML = response.name;
                    document.getElementById('temp-day').innerHTML = response.main.temp+ "°C";
                    document.getElementById('temp-day1').innerHTML = response.main.temp+ "°C";
                    document.getElementById('conditions-day').innerHTML = response.weather[0].main;
                    document.getElementById('descrip-day').innerHTML = response.weather[0].description;
                    iconCloud = response.weather[0].icon;
                    document.getElementById('imgCondition-day').setAttribute("src",`http://openweathermap.org/img/wn/${iconCloud}@2x.png`)
                    document.getElementById('sunrise').innerHTML = window.moment(response.sys.sunrise *1000).format('HH:mm ') + "WIB" ;
                    document.getElementById('sunset').innerHTML = window.moment(response.sys.sunset *1000).format('HH:mm ') + "WIB"; 
                    document.getElementById('windSpeed').innerHTML = response.wind.speed + " kph";
                    document.getElementById('humidity').innerHTML = response.main.humidity + " %";
                    document.getElementById('pressure').innerHTML = response.main.pressure  + " mb";

                   
                    
                    this.innerHTML = "Search"
                    document.body.style.cursor = "default";
                    document.getElementById('btnSubmit').disabled = false;
                    getCity.value = null;
                    var contentDay = document.getElementById('content-day');
                    var notFoundDay = document.getElementById('not-found-day');
                    notFoundDay.classList.add("d-none")
                    contentDay.classList.remove("d-none")
                })
                .catch(err => {
                    if (setCity.length != 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Location doesn't exist!"
                        });
                        this.innerHTML = "Search"
                        document.body.style.cursor = "default";
                        document.getElementById('btnSubmit').disabled = false;

                        getCity.value = null;

                        document.getElementById('city').innerHTML = "<span id='city' class='text-muted' style='font-size: 20px'>Please input a valid location!</span>"
                        document.getElementById('dates').innerHTML = "-"

                        var contentDay = document.getElementById('content-day');
                      
                        var notFoundDay = document.getElementById('not-found-day');
                        
                        contentDay.classList.add("d-none")
                
                        notFoundDay.classList.remove("d-none")
                      
                    }
                });
}



function MyWeather(){
    var getCity = document.getElementById('inputCity');
    var setCity = getCity.value;

    if (setCity === "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Location field can't be empty!"
        });
    } else {
        this.innerHTML = '<div id="loader"></div>';
        document.body.style.cursor = "wait";
        document.getElementById('btnSubmit').disabled = true;

        setTimeout(() => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${setCity}&appid=edf93961952b819e4fa526696ceb586b&units=metric`)
                .then(response => response.json())
                .then((response) => {
                    document.getElementById('city').innerHTML = response.name+', '+response.sys.country;
                    var dates = new Date(response.dt *1000);
                    var hari = dates.getDay()
                    var bulan = dates.getMonth()
                    var tahun = dates.getFullYear()
                    var tanggal = dates.getDate()
                    
                    var hariarray = new Array("Sunday,","Monday,","Tuesday,","Wednesday,","Thursday,","Friday,","Saturday,")
                    var bulanarray = new Array("Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec")
                     document.getElementById('dates').innerHTML = hariarray[hari]+" "+tanggal+" "+bulanarray[bulan]+" "+tahun
                     document.getElementById('dates1').innerHTML = hariarray[hari]+" "+tanggal+" "+bulanarray[bulan]+" "+tahun
        
                    document.getElementById('detailCity').innerHTML = response.name;
                    document.getElementById('temp-day').innerHTML = response.main.temp+ "°C";
                    document.getElementById('temp-day1').innerHTML = response.main.temp+ "°C";
                    document.getElementById('conditions-day').innerHTML = response.weather[0].main;
                    document.getElementById('descrip-day').innerHTML = response.weather[0].description;
                    iconCloud = response.weather[0].icon;
                    document.getElementById('imgCondition-day').setAttribute("src",`http://openweathermap.org/img/wn/${iconCloud}@2x.png`)
                    document.getElementById('sunrise').innerHTML = window.moment(response.sys.sunrise *1000).format('HH:mm ') + "WIB" ;
                    document.getElementById('sunset').innerHTML = window.moment(response.sys.sunset *1000).format('HH:mm ') + "WIB"; 
                    document.getElementById('windSpeed').innerHTML = response.wind.speed + " kph";
                    document.getElementById('humidity').innerHTML = response.main.humidity + " %";
                    document.getElementById('pressure').innerHTML = response.main.pressure  + " mb";

                   
                    
                    this.innerHTML = "Search"
                    document.body.style.cursor = "default";
                    document.getElementById('btnSubmit').disabled = false;
                    getCity.value = null;
                    var contentDay = document.getElementById('content-day');
                    var notFoundDay = document.getElementById('not-found-day');
                    notFoundDay.classList.add("d-none")
                    contentDay.classList.remove("d-none")
                })
                .catch(err => {
                    if (setCity.length != 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Location doesn't exist!"
                        });
                        this.innerHTML = "Search"
                        document.body.style.cursor = "default";
                        document.getElementById('btnSubmit').disabled = false;

                        getCity.value = null;

                        document.getElementById('city').innerHTML = "<span id='city' class='text-muted' style='font-size: 20px'>Please input a valid location!</span>"
                        document.getElementById('dates').innerHTML = "-"

                        var contentDay = document.getElementById('content-day');
                      
                        var notFoundDay = document.getElementById('not-found-day');
                        
                        contentDay.classList.add("d-none")
                
                        notFoundDay.classList.remove("d-none")
                      
                    }
                });
        },1000);
    }
}