var xhttp = new XMLHttpRequest();

//Initial GET request to fetch all notifications
xhttp.onreadystatechange = function() {
    if (this.readyState ==4 && this.status == 200) {
      var notifications = JSON.parse(this.responseText);
      notifications.forEach(function(notification){
        const div = document.createElement('div');
        div.className = 'row align-items-center notification-item py-2 my-2';
        var id = notification.id
        div.innerHTML = `
           <div class="col-md-2 col-sm-12">
                <img class="notification-img" src="${notification.image}" alt="image" />
           </div>
           <div class="col-md-10 col-sm-12">
                <div class="d-flex">
                <h4 class="my-0 mr-2 ${notification.new?'text-primary':''}">${notification.title}</h4>
                </div>
                <p class="small notification-subtext mt-2">${notification.text}</p>
                <a class="text-primary" href="/notification?id=${id}">Read more</a>
           </div>
        `;
        if(notification.unread){
            div.className+=" bg-light"
        }
        document.getElementById('notifications').appendChild(div)
      })
    }
    else if (this.readyState ==4){
        console.error(this.response)
    }
};

xhttp.open('GET','/api/notifications',true);
xhttp.send()


function markAllAsRead(){
    var request = new XMLHttpRequest();
    request.open('PATCH', '/api/notifications/mark-all-read',true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("X-CSRFToken", getCSRFToken())
    request.send()

    request.onreadystatechange = function() {
        if (this.readyState ==4 && this.status == 200) {
            window.location.reload();
        }
        else if (this.readyState ==4){
            console.error(this.response)
        }
    };
    
}

function getCSRFToken() {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, 10) == ('csrftoken' + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
}