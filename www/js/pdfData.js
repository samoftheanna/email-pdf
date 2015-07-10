angular.module('scouts')
  .controller('GetDataCtrl', function($scope, $translate){
    var data = $scope.formData;
    var people = Object.getOwnPropertyNames(data);
    people = people.slice(6);
    console.log(people);
    $scope.titles = people;
  })
  .controller('PdfCtrl', function($scope, $cordovaFile, $ionicPlatform, $ionicLoading, $cordovaEmailComposer){
    $scope.inputs = {};
    $scope.inputs.readFile = 'file.txt';
    
    var docDefinition2 = { content: 'This is an sample PDF printed with pdfMake' };
    
    var docDefinition = { content: [
      {text: 'header', style: 'header'},
      {text: 'BIRTH', style: 'dates'},
      {text: 'bday', style: 'date'},
      {text: 'bplace', style: 'place'},
      {text: 'MARRIAGE', style: 'dates'},
      {text: 'marday', style: 'date'},
      {text: 'marplace', style: 'place'},
      {text: 'DEATH', style: 'dates'},
      {text: 'dday', style: 'date'},
      {text: 'dplace', style: 'place'},

      {text: 'name', style: 'name'},
      {text: 'header', style: 'subhead'},
      {text: 'story', style: 'paragraph'},
      {text: 'hobbies', style: 'paragraph'}
    ],
    styles: {
      header: {fontSize: 22, bold: true},
      dates: {fontSize: 16},
      date: {fontSize: 14},
      place: {fontSize: 17},
      name: {fontSize: 12},
      subhead: {fontSize: 18, bold: true},
      paragraph: {italic: true}
    }};
    
    var createEmail = function(file){
      cordova.plugins.email.open({
        subject: 'Greetings',
        attachments: file
      });
    };
    
    
    $scope.generate = function(){
      $ionicPlatform.ready(function() {
        console.log('you clicked');
        if(!window.cordova){
          pdfMake.createPdf(docDefinition).open();
        }
        else {
          var pdfDoc = pdfMake.createPdf(docDefinition);
          console.log('i made it...');
  
          var pdfBuffer = pdfDoc.getBuffer(function(){
            console.log('getting somewhere?');
          });
          
          
  /*	Document.prototype.getBase64 = function(cb, options) {
  		if (!cb) throw 'getBase64 is an async method and needs a callback argument';
  		this._createDoc(options, function(buffer) {
  			cb(buffer.toString('base64'));
  		});
  	};*/
  
  
          var pdfBlob = new Blob([pdfBuffer], {type: 'application/pdf'});
          console.log('a blob?');
          
          $cordovaFile.writeFile(cordova.file.dataDirectory, "my_booklet_.pdf", pdfBlob,  true)
          .then(function (success) {
            // success
            console.log('we wrote a new file! ' + success);
          }, function (error) {
            // error
            console.log("creating a file didn't work: " + error.message);
          });
          
          $cordovaFile.checkFile(cordova.file.dataDirectory, "my_booklet_.pdf")
          .then(function (success) {
            // success
            console.log('when checking your booklet:');
            console.dir(success);
            var nativeURL = success.nativeURL;
            console.log(nativeURL);
            createEmail(nativeURL);
  //          openPDF(nativeURL);
          }, function (error) {
            // error
            console.log("checking a file didn't work " + error.message);
          });
        }
      });
    };
    
    $scope.load = function(file){
      $ionicLoading.show({
        template: 'loading...'
      });
  //    openPDF(file);
      $ionicLoading.hide();
    };
    
/*    var openPDF = function(filename){
      $cordovaFileOpener2.open(filename, 'application/pdf')
      .then(function(){
        console.log('we opened it!');
      }, function(error){
        console.log("yeah. that didn't work " + error);
      });
    };*/
  
/*    if(window.cordova) { $ionicPlatform.ready(function() {

    $cordovaFile.getFreeDiskSpace()
      .then(function (success) {
         // success in kilobytes
         console.log('you have  ' + success + ' space');
      }, function (error) {
          // error
         console.log("well checking space didn't work. see? " + error);
      });


    // CHECK
    $cordovaFile.checkDir(cordova.file.dataDirectory, "dir/other_dir")
      .then(function (success) {
        // success
        console.log('when checking directory:  ' + success);
      }, function (error) {
        // error
        console.log("checking directory didn't work " + error.message);
      });


    $cordovaFile.checkFile(cordova.file.dataDirectory, "some_file.txt")
      .then(function (success) {
        // success
        console.log('when checking file:  ' + success);
      }, function (error) {
        // error
        console.log("checking a file didn't work " + error.message);
      });


    // CREATE
    $cordovaFile.createDir(cordova.file.dataDirectory, "jo_test_dir", false)
      .then(function (success) {
        // success
        console.log('it worked! we created a directory! ' + success);
      }, function (error) {
        // error
        console.log("creating a directory didn't work: " + error.message);
      });

    $cordovaFile.createFile(cordova.file.dataDirectory, "new_file.txt", true)
      .then(function (success) {
        // success
        console.log('we made a new file! ' + success);
      }, function (error) {
        // error
        console.log("creating a file didn't work: " + error.message);
      });


    // REMOVE
    $cordovaFile.removeDir(cordova.file.dataDirectory, "jo_test_dir")
      .then(function (success) {
        // success
        console.log('we removed a directory ' + success);
      }, function (error) {
        // error
        console.log("removing a directory didn't work: " + error.message);
      });

    $cordovaFile.removeFile(cordova.file.dataDirectory, "some_file.txt")
      .then(function (success) {
        // success
        console.log('we removed a file ' + success);
      }, function (error) {
        // error
        console.log("removing a file didn't work: " + error.message);
      });

    $cordovaFile.removeRecursively(cordova.file.dataDirectory, "")
      .then(function (success) {
        // success
        console.log('we recursively removed... something ' + success);
      }, function (error) {
        // error
        console.log("recursive removal didn't work: " + error.message);
      });


    // WRITE
    $cordovaFile.writeFile(cordova.file.dataDirectory, "file.txt", "text overwrite ", true)
      .then(function (success) {
        // success
        console.log('we wrote a new? file ' + success);
      }, function (error) {
        // error
        console.log("writing a file didn't work: " + error.message);
      });

    $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "file.txt", "text to write ")
      .then(function (success) {
        // success
        console.log('we wrote to an existing file ' + success);
      }, function (error) {
        // error
        console.log("writing to an existing file didn't work: " + error.message);
      });


    // READ
    $cordovaFile.readAsText(cordova.file.dataDirectory, $scope.inputs.readFile)
      .then(function (success) {
        // success
        console.log('we read a file as text ' + success);
        var here = document.getElementById('here');
        here.innerHTML = success + ' a test';
      }, function (error) {
        // error
        console.log("reading a file didn't work: " + error.message);
      });


    // MOVE
    $cordovaFile.moveDir(cordova.file.dataDirectory, "dir", cordova.file.tempDirectory, "new_dir")
      .then(function (success) {
        // success
        console.log('we moved a directory ' + success);
      }, function (error) {
        // error
        console.log("moving a directory didn't work: " + error.message);
      });

    $cordovaFile.moveFile(cordova.file.dataDirectory, "file.txt", cordova.file.tempDirectory)
      .then(function (success) {
        // success
        console.log('we moved a file ' + success);
      }, function (error) {
        // error
        console.log("moving a file didn't work: " + error.message);
      });


    // COPY
    $cordovaFile.copyDir(cordova.file.dataDirectory, "dir", cordova.file.tempDirectory, "new_dir")
      .then(function (success) {
        // success
        console.log('we copied a directory ' + success);
      }, function (error) {
        // error
        console.log("copying a directory didn't work: " + error.message);
      });

    $cordovaFile.copyFile(cordova.file.dataDirectory, "file.txt", cordova.file.tempDirectory, "new_file.txt")
      .then(function (success) {
        // success
        console.log('we copied a file ' + success);
      }, function (error) {
        // error
        console.log("copying a file didn't work: " + error.message);
      });
  }); 
  }*/
});
