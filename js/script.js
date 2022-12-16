var btnSubmit = document.getElementById('btnSubmit');
var getCity = document.getElementById('inputCity');


btnSubmit.addEventListener('click', function(e) {
    e.preventDefault();
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
        
                    document.getElementById('detailCity').innerHTML = response.name;
                    document.getElementById('temp-day').innerHTML = response.main.temp+ "°C";
                    document.getElementById('temp-day1').innerHTML = response.main.temp+ "°C";
                    document.getElementById('conditions-day').innerHTML = response.weather[0].main;
                    document.getElementById('descrip-day').innerHTML = response.weather[0].description;
                    iconCloud = response.weather[0].icon;
                    document.getElementById('imgCondition-day').setAttribute("src",`http://openweathermap.org/img/wn/${iconCloud}.png`)
                    document.getElementById('sunrise').innerHTML = window.moment(response.sys.sunrise *1000).format('HH:mm a') ;
                    document.getElementById('sunset').innerHTML = window.moment(response.sys.sunset *1000).format('HH:mm a');
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
})