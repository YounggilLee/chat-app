var socket = io()

socket.on('connect', () => {
    console.log('connected to server')    
})

socket.on('disconnect', () => {
    console.log('Disconnect from server')
})

socket.on('newMessage', (message) => {
    console.log("newMessage", message)
    var li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`)

    $('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>')
    var a = $('<a target="_blank">My Current Location</a>')

    li.text(`${message.from}`)
    a.attr('href', message.url)
    li.append(a)
    $('#messages').append(li)
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
