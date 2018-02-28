const socket = io();

function scrollToBottom() {
  //selectors
  const messages = jQuery("#messages");
  const newMessage = messages.children("li:last-child");

  //heights
  const clientHeight = messages.prop("clientHeight");
  const scrollTop = messages.prop("scrollTop");
  const scrollHeight = messages.prop("scrollHeight");
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", function() {
  //console.log("connected to server!");
  const params = jQuery.deparam(window.location.search);
  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      //do other stuff
      console.log("no error on join!");
    }
  });
});

socket.on("disconnect", function() {
  console.log("unable to connect to server...");
});

socket.on("updateUserList", function(users) {
  console.log("Users list", users);
  const ol = jQuery("<ol></ol>");

  users.forEach(function(user) {
    ol.append(jQuery("<li></li>").text(user));
  });

  jQuery("#users").html(ol);
});

socket.on("newMessage", function(message) {
  const timestamp = moment(message.createdAt).format("h:mma");
  const template = jQuery("#message-template").html();
  const html = Mustache.render(template, {
    timestamp: timestamp,
    from: message.from,
    text: message.text
  });

  jQuery("#messages").append(html);
  scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
  const timestamp = moment(message.createdAt).format("h:mma");
  const template = jQuery("#geo-template").html();
  const html = Mustache.render(template, {
    timestamp: timestamp,
    from: message.from,
    url: message.url
  });

  jQuery("#messages").append(html);
  scrollToBottom();
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
