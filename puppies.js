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
      var id = puppy.id

      var $newPuppy = $("<tr><td id='puppy-name'>" + name + "</td><td id='puppy-breed'>" + breed + "</td><td id='puppy-created'>created " + created_at + "</td><td id='puppy-adopt'><a href='#' data-puppy-id='"+ id +"'>Adopt</a></td></tr>");

    $('#puppy-list').append($newPuppy)
  };

  var getBreeds = function(){
    $.get("https://ajax-puppies.herokuapp.com/breeds.json", function(data){
      createBreedList(data);
    })
  };

  //i is our id
  var createBreedList = function(data){
    for(var i = 0; i < data.length; i++){
      var breed = data[i].name;
      var id = data[i].id;

      var newBreed = $("<option value='"+ id + "'>" + breed + "</option>")
      $('#breed').append(newBreed);
    } 
  };

  var getPuppies = function() {
    $.get(baseurl + "puppies.json", function(data) {
      updatePuppyList(data)
    })
  };

  var registerPuppy = function(name, breed) {
    var data = JSON.stringify({name: name, breed_id: breed});
    console.log(data);
    $.ajax( {
      method: "POST",
      url: baseurl + "puppies.json",
      data: data,
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        getPuppies();
      },
      error: function(){
        alert('Could not registrer your Puppy');
      }
    })
  };

  var removePuppy = function(e){
    var puppyId = $(e.target).data("puppy-id")
    console.log(puppyId);
     
  }

  return {
    getPuppies: getPuppies,
    registerPuppy: registerPuppy,
    getBreeds: getBreeds,
    removePuppy: removePuppy
  };
})();

$(function() {
  Puppies.getPuppies();
  Puppies.getBreeds();

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

  $('body').on('click', '.puppy-adopt', function(e){
    console.log('adopt');
    Puppies.removePuppy(e);
    e.preventDefault();
  })
});
