angular.module('scouts')
  .controller('PdfCtrl', function($scope, $cordovaFile, $ionicPlatform, $ionicLoading, $cordovaEmailComposer, $translate, $rootScope){
    var data = $scope.formData;
        
    console.log(data);
    
    var people = Object.getOwnPropertyNames(data);
    people = people.slice(6);
    var labels = ['suggested_birth','suggested_death','suggested_marriage', 'father_subtitle', 'mother_subtitle', 'learn_about_me', 'my_hobbies'];
    
    console.log(people);

    strings = labels.forEach(function(element, index, array){
      people.unshift(element);
    });
    console.log(people);

    $translate(people).then(function(translations){
      for(var i=0; i < people.length; i++){
        var n = people[i];
        titles.push(translations[n]);
      }
      createContentArray();
    });
    
    var titles = [];
    
    var flattenObject = function(ob) {
    	var toReturn = {};
    	
    	for (var i in ob) {
    		if (!ob.hasOwnProperty(i)) continue;
    		
    		if ((typeof ob[i]) == 'object') {
    			var flatObject = flattenObject(ob[i]);
    			for (var x in flatObject) {
    				if (!flatObject.hasOwnProperty(x)) continue;
    				
    				toReturn[i + '.' + x] = flatObject[x];
    			}
    		} else {
    			toReturn[i] = ob[i];
    		}
    	}
    	return toReturn;
    };
    
    var flatData = flattenObject(data);
    console.log(flatData);
    
    
    pdfMake.fonts = {
      proximaNova: {
       normal: 'ProximaNova-Reg-webfont.ttf',
       bold: 'ProximaNova-Bold-webfont.ttf',
       italics: 'ProximaNova-Reg-webfont.ttf',
       bolditalics: 'ProximaNova-Bold-webfont.ttf'
     },
      museo: {
       normal: 'museo_slab_500-webfont.ttf',
       bold: 'museo_slab_500-webfont.ttf',
       italics: 'museo_slab_500-webfont.ttf',
       bolditalics: 'museo_slab_500-webfont.ttf'
     }
    }
            
    var booklet = function(){
      var deets = function(person){
        var name;
        if(flatData[person+'.firstName'] && flatData[person+'.lastName']){
          name = flatData[person+'.firstName'] + ' ' + flatData[person+'.lastName'];
        } else if(flatData[person+'.firstName']){
          name = flatData[person+'.firstName'];
        }
 
        var stack1 = [];
        switch(person){
          case 'R_title':
            if(flatData['R_title.gender'] === 'Female'){
              stack1.push({image: 'static-0-female.png', margin: [0,0,0,5]});
            } else {
              stack1.push({image: 'static-0-male.png', margin: [0,0,0,5]});
            }
            break;
          case 'RM':
            stack1.push({image: 'static-1-male.png', margin: [0,0,0,5]});
            break;          
          case 'RF':
            stack1.push({image: 'static-1-female.png', margin: [0,0,0,5]});
            break;
          case 'myFathersFather':
          case 'myMothersFather':
            stack1.push({image: 'static-2-male.png', margin: [0,0,0,5]});
            break;
          case 'myFathersMother':
          case 'myMothersMother':
            stack1.push({image: 'static-2-female.png', margin: [0,0,0,5]});
            break;
          case 'myFathersFathersFather':
          case 'myFathersMothersFather':
          case 'myMothersFathersFather':
          case 'myMothersMothersFather':
            stack1.push({image: 'static-3-male.png', margin: [0,0,0,5]});
            break;
          case 'myFathersFathersMother':
          case 'myFathersMothersMother':
          case 'myMothersFathersMother':
          case 'myMothersMothersMother':
            stack1.push({image: 'static-3-female.png', margin: [0,0,0,5]});
            break;
        }

        if(flatData[person+'.birth.date']){
          stack1.push({text: titles[6], style: 'section'},{text: flatData[person+'.birth.date']});
        }
        if(flatData[person+'.birth.place']){
          stack1.push({text: flatData[person+'.birth.place']});
        }
        if(flatData[person+'.death.date']){
          stack1.push({text: titles[5], style: 'section'},{text: flatData[person+'.death.date']});
        }
        if(flatData[person+'.death.place']){
          stack1.push({text: flatData[person+'.death.place']});
        }
        if(flatData[person+'.marriage.date']){
          stack1.push({text: titles[4], style: 'section'},{text: flatData[person+'.marriage.date']});
        }
        if(flatData[person+'.marriage.place']){
          stack1.push({text: flatData[person+'.marriage.place']});
        }
        
        var stack2 = [];
        if(name){
          stack2.push({text: name, style: 'header'});
          
          switch(person){
            case 'R_title':
              stack2.push({text: titles[22], style: 'subtitle'});
              break;
            case 'RM':
              stack2.push({text: titles[7], style: 'subtitle'});
              break;
            case 'RF':
              stack2.push({text: titles[14], style: 'subtitle'});
              break;
            case 'myFathersFather':
              stack2.push({text: titles[3] + flatData['RM.firstName'] + ' ' + flatData['RM.lastName'], style: 'subtitle'});
              break;
            case 'myFathersMother':
              stack2.push({text: titles[2] + flatData['RM.firstName'] + ' ' + flatData['RM.lastName'], style: 'subtitle'});
              break;
            case 'myMothersFather':
              stack2.push({text: titles[3] + flatData['RF.firstName'] + ' ' + flatData['RF.lastName'], style: 'subtitle'});
              break;
            case 'myMothersMother':
              stack2.push({text: titles[2] + flatData['RF.firstName'] + ' ' + flatData['RF.lastName'], style: 'subtitle'});
              break;
            case 'myFathersFathersFather':
              stack2.push({text: titles[3] + flatData['myFathersFather.firstName'] + ' ' + flatData['myFathersFather.lastName'], style: 'subtitle'});
              break;
            case 'myFathersFathersMother':
              stack2.push({text: titles[2] + flatData['myFathersFather.firstName'] + ' ' + flatData['myFathersFather.lastName'], style: 'subtitle'});
              break;
            case 'myFathersMothersFather':
              stack2.push({text: titles[3] + flatData['myFathersMother.firstName'] + ' ' + flatData['myFathersMother.lastName'], style: 'subtitle'});
              break;
            case 'myFathersMothersMother':
              stack2.push({text: titles[2] + flatData['myFathersMother.firstName'] + ' ' + flatData['myFathersMother.lastName'], style: 'subtitle'});
              break;
            case 'myMothersFathersFather':
              stack2.push({text: titles[3] + flatData['myMothersFather.firstName'] + ' ' + flatData['myMothersFather.lastName'], style: 'subtitle'});
              break;
            case 'myMothersFathersMother':
              stack2.push({text: titles[2] + flatData['myMothersFather.firstName'] + ' ' + flatData['myMothersFather.lastName'], style: 'subtitle'});
              break;
            case 'myMothersMothersFather':
              stack2.push({text: titles[3] + flatData['myMothersMother.firstName'] + ' ' + flatData['myMothersMother.lastName'], style: 'subtitle'});
              break;
            case 'myMothersMothersMother':
              stack2.push({text: titles[2] + flatData['myMothersMother.firstName'] + ' ' + flatData['myMothersMother.lastName'], style: 'subtitle'});
              break;
          }
        }
        if((person === 'R_title') && (flatData['R_title.story'])){
          stack2.push({text: titles[1], style: 'subhead'});
          console.log(titles);
        }
        if(flatData[person+'.story']){
          stack2.push({text: flatData[person+'.story']});
        }
        if((person === 'R_title') && (flatData['R_title.hobbies'])){
          stack2.push({text: titles[0], style: 'subhead'},{text: flatData[person+'.hobbies']});
        }


        var columns = [{stack: stack1, width: '33%'},{stack: stack2, width: '*'}];

        return columns;
      };
      
      var content = [
      {image: 'cover.png', pageBreak: 'after'},
      {text: titles[21], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('R_title'),
        pageBreak: 'after'},
      
      {text: titles[7], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('RM'),
        pageBreak: 'after'},
      
      {text: titles[14], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('RF'),
        pageBreak: 'after'},
        
      {text: titles[8], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myFathersFather'),
        pageBreak: 'after'},
      
      {text: titles[15], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myFathersMother'),
        pageBreak: 'after'},
      
      {text: titles[9], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myMothersFather'),
        pageBreak: 'after'},
      
      {text: titles[16], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myMothersMother'),
        pageBreak: 'after'},
      
      {text: titles[10], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myFathersFathersFather'),
        pageBreak: 'after'},
      
      {text: titles[17], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myFathersFathersMother'),
        pageBreak: 'after'},
      
      {text: titles[11], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myFathersMothersFather'),
        pageBreak: 'after'},
      
      {text: titles[18], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myFathersMothersMother'),
        pageBreak: 'after'},
      
      {text: titles[12], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myMothersFathersFather'),
        pageBreak: 'after'},
      
      {text: titles[19], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myMothersFathersMother'),
        pageBreak: 'after'},
      
      {text: titles[13], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myMothersMothersFather'),
        pageBreak: 'after'},
      
      {text: titles[20], style: 'header', margin: [0,0,0,20]},
      {
        columns: deets('myMothersMothersMother'),
        pageBreak: 'after'}
      ];

      return content;
    };

    
    var content = [];

    var createContentArray = function(){
      content = content.concat(booklet());
    };
   
    var createEmail = function(file){
      cordova.plugins.email.open({
        subject: 'Greetings',
        attachments: file
      });
    };
    
    
    $scope.generate = function(){
      $ionicLoading.show({
        template: 'loading...'
      });
      var docDefinition2 = {content: content,
        defaultStyle: {
          font: 'proximaNova',
          fontSize: 18,
          margin: [0, 0, 0, 10]
        },
        styles: {
          header: {fontSize: 36, font: 'museo'},
          section: {margin: [0, 20, 0, 5]},
          subtitle: {fontSize: 21, margin: [0, 0, 0, 20]},
          quote: {fontSize: 24},
          subhead: {fontSize: 18, bold: true, margin: [0, 10, 0, 0]}
        }
      };

      $ionicPlatform.ready(function() {
        if(!window.cordova){
          pdfMake.createPdf(docDefinition2).open();
          $ionicLoading.hide();
        }
        else {
          var data;
          pdfMake.createPdf(docDefinition).getBase64(function(encodedString) {
            data = encodedString;
          });
  
/*          var pdfBuffer = pdfDoc.getBuffer(function(){
            console.log('getting somewhere?');
          }); */
          
  /*	Document.prototype.getBase64 = function(cb, options) {
  		if (!cb) throw 'getBase64 is an async method and needs a callback argument';
  		this._createDoc(options, function(buffer) {
  			cb(buffer.toString('base64'));
  		});
  	};*/
  
          var pdfBlob = new Blob([data], {type: 'application/pdf'});
          
          $cordovaFile.writeFile(cordova.file.dataDirectory, "my_booklet.pdf", pdfBlob,  true)
          .then(function (success) {
            // success
            console.log('we wrote a new file! ' + success);
            $ionicLoading.hide();
            $cordovaFile.checkFile(cordova.file.dataDirectory, "my_booklet.pdf")
            .then(function (success) {
              // success
              console.log('when checking your booklet:');
              console.dir(success);
              var nativeURL = success.nativeURL;

              createEmail(nativeURL);
    //          openPDF(nativeURL);
            }, function (error) {
              // error
              console.log("checking a file didn't work " + error.message);
            });
          }, function (error) {
            // error
            console.log("creating a file didn't work: " + error.message);
          });
          
        }
      });
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
