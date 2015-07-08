angular.module('scouts')
  .controller('getData', function($scope, $translate){
    var data = $scope.formData;
    var people = Object.getOwnPropertyNames(data);
    people = people.slice(6);
    $scope.data = people;
    
    var toContent = function(label){
      $translate(label).then(function(label){
        $scope.label = label;
      });
      var person = data[label];
      var header = label;
      var name = person.firstName + ' ' + person.lastName;
      var story = person.story;
      var hobbies = person.hobbies;
      var bday = person.birth.date;
      var bplace = person.birth.place;
      var marday = person.marriage.date;
      var marplace = person.marriage.place;
      var dday = person.death.date;
      var dplace = person.death.place;
      var gender = person.gender;
      var living = person.living;
      var image = 'image.jpg';
      var content = [
        {text: header, style: 'header'},
            {image: image},
            {text: 'BIRTH', style: 'dates'},
            {text: bday, style: 'date'},
            {text: bplace, style: 'place'},
            {text: 'MARRIAGE', style: 'dates'},
            {text: marday, style: 'date'},
            {text: marplace, style: 'place'},
            {text: 'DEATH', style: 'dates'},
            {text: dday, style: 'date'},
            {text: dplace, style: 'place'},

            {text: name, style: 'name'},
            {text: header, style: 'subhead'},
            {text: story, style: 'paragraph'},
            {text: hobbies, style: 'paragraph'}
      ];
      console.log(content);
    };
  
    for (var i = 0; i > people.length; i++) {
      console.log(people[i]);
      toContent(people[i]);
    }
  });
