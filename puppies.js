Puppies = (function() {

  var baseurl = "https://ajax-puppies.herokuapp.com/";

  var updatePuppyList = function(data) {
    $('#puppy-list').html("")

      data = data.sort(function(a, b) {
        if ( a.created_at < b.created_at ) {
          return 1
        } else {
          return -1
        }
      })

      for (var i = 0; i < data.length; ++i) {
        var puppy = data[i];
        addPuppyToList(puppy)
      }
  };

  var addPuppyToList = function(puppy) {
    console.log(puppy);
    var name = puppy.name
      var breed = puppy.breed.name
      var created_at =  $.timeago(puppy.created_at)
      var newPuppy = $("<tr><td id='puppy-name'>" + name + "</td><td id='puppy-breed'>" + breed + "</td><td id='puppy-created'>created " + created_at + "</td><td id='puppy-adopt'><a href='#'>Adopt</a></td></tr>");
    $('#puppy-list').append(newPuppy)
  }

  var getPuppies = function() {
    $.get(baseurl + "puppies.json", function(data) {
      updatePuppyList(data)
    })
  };

  var registerPuppy = function(name, breed) {
    var data = JSON.stringify({name: name, breed_id: 5});
    console.log(data);
    $.ajax( {
      method: "POST",
      url: baseurl + "puppies.json",
      data: data,
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        console.log(data);
        getPuppies();
        // addPuppyToList(data)
      }
    })
  };

  return {
    getPuppies: getPuppies,
    registerPuppy: registerPuppy
  };
})();

$(function() {
  Puppies.getPuppies();

  $('#refresh').click(function() {
    Puppies.getPuppies();
  })

  $('#puppy-form').submit(function(e) {
    var breed = $(this).find("#breed").val()
      var name = $(this).find("#name").val()
      console.log(breed, name);
    Puppies.registerPuppy(name, breed)
      e.preventDefault();
  })
});
