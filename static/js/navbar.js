$(document).ready(function(){
    xhttp = new XMLHttpRequest();
    var html = ``
    xhttp.open('GET','/api/notifications',true);
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if (this.readyState ==4 && this.status == 200) {
            var notifications = JSON.parse(this.responseText);
            notificationCount = 0;
            notifications.forEach(function(notification){
                html += `
                <a href="/notification?id=${notification.id}" class="d-flex align-items-center p-2 text-dark ${notification.unread?'bg-light':''}">
                        <div class="col-2 p-0">
                            <img class="notification-img" src="${notification.image}" alt="image" />
                        </div>
                        <div class="col-10 pr-0">
                            <div class="d-flex">
                            <p class="my-0 mr-2 notification-header ${notification.new?'text-primary':''}">${notification.title}</p>
                            </div>
                            <p class="small notification-subtext mt-2">${notification.text}</p>
                        </div>
                </a>
                `;
                if(notification.new){
                    notificationCount++;
                }
                
            })
            if(notificationCount>0){
                notificationIcon = document.getElementById('myPopover');
                badge = document.createElement('span')
                badge.className = "badge badge-danger notification-badge"
                badge.id = "notificaion-count-badge"
                badge.innerHTML = `<span class="font-weight-bold">${notificationCount}</span>`
                notificationIcon.appendChild(badge);
            }
            $("#myPopover").popover({
                title: '<h3 class="custom-title"><i class="fa fa-info-circle"></i> Popover Info</h3>',
                placement: 'bottom',
                content: html,
                html: true,
                template: `<div class="popover notification-pop" role="tooltip">
                                <div class="arrow"></div>
                                <div class="popover-body px-0"></div>
                                <div class="popover-footer text-center p-2 bg-light">
                                    <a href="/notifications" class="text-primary w-100 text-center d-flex align-items-center justify-content-center">
                                        <span class="ml-2">Show All</span>
                                    </a>
                                </div>
                            </div>`
            }); 

            $("#myPopover").click(function(){
                document.getElementById("notificaion-count-badge").className += ' hidden';
                var request = new XMLHttpRequest();
                request.open('PATCH','/api/notifications/remove-new',true)
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.setRequestHeader("X-CSRFToken", getCSRFToken())
                request.send();
            })
        }
        else if (this.readyState ==4){
            console.error(this.response)
        }
    };
});

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