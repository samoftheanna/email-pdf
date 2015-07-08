angular.module('scouts')
.directive('bookletNames', function(){
  return {
    templateUrl: function(elem, attr){
      return 'name-' + attr.type + '.html';
    }
  };
})
.directive('addPhoto', function(){
  return {
    templateUrl: 'add-photo.html'
  }
});