var socket = io()

function scrollToBottom() {
    var messages = $('#messages')
    var newMessage = messages.children('li:last-child')

    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight()
    var lastMessageHeight = newMessage.prev().innerHeight()

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
       messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', () => {
    var params = $.deparam(window.location.search)  

    socket.emit('join', params, function (err) {
        if(err) {
            alert(err)
            window.location.href= '/'
        }else {
            console.log('No error')
        }
    })
})

socket.on('disconnect', () => {
    console.log('Disconnect from server')
})

socket.on('newMessage', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm a')
   
    var li = $('<li></li>')
    li.text(`${message.from} ${formattedTime} : ${message.text}`)

    $('#messages').append(li)
    scrollToBottom()
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var li = $('<li></li>')
    var a = $('<a target="_blank">My Current Location</a>')

    li.text(`${message.from} ${formattedTime} :`)
    a.attr('href', message.url)
    li.append(a)
    $('#messages').append(li)
    scrollToBottom()
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]')

    socket.emit('createMessage', {
        from : 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('')
    })  
})

var locationButton = $('#send-location')
locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geoloction not supported by you browser')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLoactionMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location')
    })
})
