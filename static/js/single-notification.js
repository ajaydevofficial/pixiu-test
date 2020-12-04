let params = (new URL(document.location)).searchParams;
let id = params.get("id");
var xhttp = new XMLHttpRequest();

//Initial GET request to fetch all notifications
xhttp.onreadystatechange = function() {
    if (this.readyState ==4 && this.status == 200) {
        var notification = JSON.parse(this.responseText);
        console.log(this.responseText)
        const div = document.createElement('div');
        var id = notification.id
        div.innerHTML = `
           <h3 class="mt-5 mb-3 font-weight-bold">${notification.title}</h3>
           <p class="small">${new Date(notification.created)}</p>
           <div class="row notification-item py-2 my-2">
                <div class="col-md-4 col-sm-12">
                    <img class="notification-img" src="${notification.image}" alt="image" />
                </div>
                <div class="col-md-8 col-sm-12">
                    <p class="mt-2">${notification.text}</p>
                </div>
           </div>
        `;
        if(notification.unread){
            var request = new XMLHttpRequest();
            request.open('PATCH',`/api/notifications/${id}`,false)
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.setRequestHeader("X-CSRFToken", getCSRFToken())
            request.send(`unread=False&new=False`);
        }
        document.getElementById('notification').appendChild(div)
    }
    else if (this.readyState ==4){
        console.error(this.response)
    }
};

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

xhttp.open('GET',`/api/notifications/${id}`,true);
xhttp.send()

