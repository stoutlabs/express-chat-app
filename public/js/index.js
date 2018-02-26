const socket = io();

socket.on("connect", function() {
  console.log("connected to server!");
});

socket.on("disconnect", function() {
  console.log("unable to connect to server...");
});

socket.on("newMessage", function(message) {
  console.log("new message:", message);
  let li = jQuery("<li></li>");
  const timestamp = moment(message.createdAt).format("h:mma");
  li.text(`(${timestamp}) ${message.from}: ${message.text}`);
  jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
  let li = jQuery("<li></li>");
  const a = jQuery('<a target="_blank">My Location</a>');
  const timestamp = moment(message.createdAt).format("h:mma");

  li.text(`(${timestamp}) ${message.from}: `);
  a.attr("href", message.url);
  li.append(a);

  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();
  const msgField = jQuery("[name=message]");
  socket.emit(
    "createMessage",
    {
      from: "JoeMama",
      text: msgField.val()
    },
    function() {
      msgField.val("");
    }
  );
});

const locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationButton.attr("disabled", "disabled").text("Getting location...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr("disabled").text("Send Location");
      console.log(position);
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr("disabled").text("Send Location");
      alert("Unable to fetch location");
    }
  );
});
