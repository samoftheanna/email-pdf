angular.module('scouts')
  .controller('PdfCtrl', function($scope, $cordovaFile, $ionicPlatform, $ionicLoading, $cordovaEmailComposer, $translate, $rootScope, $cordovaFileOpener2){
    var data = $scope.formData;
        
    
    var people = Object.getOwnPropertyNames(data);
    people = people.slice(6);
    var labels = ['suggested_birth','suggested_death','suggested_marriage', 'father_subtitle', 'mother_subtitle', 'learn_about_me', 'my_hobbies'];
    

    strings = labels.forEach(function(element, index, array){
      people.unshift(element);
    });

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
    
    
    pdfMake.fonts = { //need to find out what fonts to use for cjk/rus/thai, adjust based on locale
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
    };
    
    if($scope.locale === 'th'){
      pdfMake.fonts = {
        proximaNova: {
         normal: 'NotoSansThai.ttf',
         bold: 'NotoSansThai.ttf',
         italics: 'NotoSansThai.ttf',
         bolditalics: 'NotoSansThai.ttf'
       },
        museo: {
         normal: 'NotoSansThai.ttf',
         bold: 'NotoSansThai.ttf',
         italics: 'NotoSansThai.ttf',
         bolditalics: 'NotoSansThai.ttf'
       }
      };      
    }
        
    if ($scope.showReversed() || ($scope.locale === 'ru')){
      pdfMake.fonts = {
        proximaNova: {
         normal: 'Gulim.ttf',
         bold: 'Gulim.ttf',
         italics: 'Gulim.ttf',
         bolditalics: 'Gulim.ttf'
       },
        museo: {
         normal: 'Gulim.ttf',
         bold: 'Gulim.ttf',
         italics: 'Gulim.ttf',
         bolditalics: 'Gulim.ttf'
       }
      };
    }
            
    var booklet = function(){
      var deets = function(person){
        var name;
        if(flatData[person+'.firstName'] && flatData[person+'.lastName']){
          if ($scope.showReversed()){
            name = flatData[person+'.lastName'] + ' ' + flatData[person+'.firstName'];                        
          }
          else {
            name = flatData[person+'.firstName'] + ' ' + flatData[person+'.lastName'];            
          }
        } else if(flatData[person+'.firstName']){
          name = flatData[person+'.firstName'];
        } else if(flatData[person+'.lastName']){
          name = flatData[person+'.lastName'];
        }
        
 
        var stack1 = [];
        switch(person){
          case 'R_title':
            if(flatData['R_title.gender'] === 'Female'){ //getting sloppy
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
              stack2.push({text: titles[21], style: 'subtitle'});
              break;
            case 'RM':
              stack2.push({text: titles[7], style: 'subtitle'});
              break;
            case 'RF':
              stack2.push({text: titles[14], style: 'subtitle'});
              break;
            case 'myFathersFather':
              if($scope.showReversed()) {
                stack2.push({text: flatData['RM.lastName'] + ' ' + flatData['RM.firstName'] + ' ' + titles[3] , style: 'subtitle'}); //may not want spaces
              } 
              else {
                stack2.push({text: titles[3] + flatData['RM.firstName'] + ' ' + flatData['RM.lastName'], style: 'subtitle'});
              }
              break;
            case 'myFathersMother':
              if($scope.showReversed()) {
                stack2.push({text: flatData['RM.lastName'] + ' ' + flatData['RM.firstName'] + ' ' + titles[2] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[2] + flatData['RM.firstName'] + ' ' + flatData['RM.lastName'], style: 'subtitle'});
              }
              break;
            case 'myMothersFather':
              if($scope.showReversed()) {
                stack2.push({text: flatData['RF.lastName'] + ' ' + flatData['RF.firstName'] + ' ' + titles[3] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[3] + flatData['RF.firstName'] + ' ' + flatData['RF.lastName'], style: 'subtitle'});
              }
              break;
            case 'myMothersMother':
              if($scope.showReversed()) {
                stack2.push({text: flatData['RF.lastName'] + ' ' + flatData['RF.firstName'] + ' ' + titles[2] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[2] + flatData['RF.firstName'] + ' ' + flatData['RF.lastName'], style: 'subtitle'});
              }
              break;
            case 'myFathersFathersFather':
              if($scope.showReversed()) {
                stack2.push({text: flatData['myFathersFather.lastName'] + ' ' + flatData['myFathersFather.firstName'] + ' ' + titles[3] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[3] + flatData['myFathersFather.firstName'] + ' ' + flatData['myFathersFather.lastName'], style: 'subtitle'});
              }
              break;
            case 'myFathersFathersMother':
              if($scope.showReversed()) {
                stack2.push({text: flatData['myFathersFather.lastName'] + ' ' + flatData['myFathersFather.firstName'] + ' ' + titles[2] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[2] + flatData['myFathersFather.firstName'] + ' ' + flatData['myFathersFather.lastName'], style: 'subtitle'});
              }
              break;
            case 'myFathersMothersFather':
              if($scope.showReversed()) {
                stack2.push({text: flatData['myFathersMother.lastName'] + ' ' + flatData['myFathersMother.firstName'] + ' ' + titles[3] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[3] + flatData['myFathersMother.firstName'] + ' ' + flatData['myFathersMother.lastName'], style: 'subtitle'});
              }
              break;
            case 'myFathersMothersMother':
              if($scope.showReversed()) {
                stack2.push({text: flatData['myFathersMother.lastName'] + ' ' + flatData['myFathersMother.firstName'] + ' ' + titles[2] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[2] + flatData['myFathersMother.firstName'] + ' ' + flatData['myFathersMother.lastName'], style: 'subtitle'});
              }
              break;
            case 'myMothersFathersFather':
              if($scope.showReversed()) {
                stack2.push({text: flatData['myMothersFather.lastName'] + ' ' + flatData['myMothersFather.firstName'] + ' ' + titles[3] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[3] + flatData['myMothersFather.firstName'] + ' ' + flatData['myMothersFather.lastName'], style: 'subtitle'});
              }
              break;
            case 'myMothersFathersMother':
              if($scope.showReversed()) {
                stack2.push({text: flatData['myMothersFather.lastName'] + ' ' + flatData['myMothersFather.firstName'] + ' ' + titles[2] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[2] + flatData['myMothersFather.firstName'] + ' ' + flatData['myMothersFather.lastName'], style: 'subtitle'});
              }
              break;
            case 'myMothersMothersFather':
              if($scope.showReversed()) {
                stack2.push({text: flatData['myMothersMother.lastName'] + ' ' + flatData['myMothersMother.firstName'] + ' ' + titles[3] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[3] + flatData['myMothersMother.firstName'] + ' ' + flatData['myMothersMother.lastName'], style: 'subtitle'});
              }
              break;
            case 'myMothersMothersMother':
              if($scope.showReversed()) {
                stack2.push({text: flatData['myMothersMother.lastName'] + ' ' + flatData['myMothersMother.firstName'] + ' ' + titles[2] , style: 'subtitle'});
              } 
              else {
                stack2.push({text: titles[2] + flatData['myMothersMother.firstName'] + ' ' + flatData['myMothersMother.lastName'], style: 'subtitle'});
              }
              break;
          }
        }
        if((person === 'R_title') && (flatData['R_title.story'])){
          stack2.push({text: titles[1], style: 'subhead'});
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

      var sibHead = function(sibTitle, genColor){
        if(titles.length > 22){
          var idx = people.indexOf(sibTitle);
          var sibHeadText = titles[idx] || '';
          if(sibHeadText === ''){
            return {text: ''};
          }
          var sibHeader = {text: sibHeadText, style: 'header', color: genColor};
          return sibHeader;
        }
        else {
          return {text: ''};
        }
      };
      
      var siblings = function(sibTitle){
        if(titles.length > 22){
          var bodyInfo = [];
          var b = '1';
          while((data[sibTitle] !== undefined) && (data[sibTitle][b] !== undefined)) { //while loop syntax
            var name = '';
            if(flatData[sibTitle+'.'+b+'.firstName'] && flatData[sibTitle+'.'+b+'.lastName']){
              if($scope.showReversed()){
                name = flatData[sibTitle+'.'+b+'.lastName'] + ' ' + flatData[sibTitle+'.'+b+'.firstName'];                
              }
              else {
                name = flatData[sibTitle+'.'+b+'.firstName'] + ' ' + flatData[sibTitle+'.'+b+'.lastName'];
              }
            } else if(flatData[sibTitle+'.'+b+'.firstName']){
              name = flatData[sibTitle+'.'+b+'.firstName'];
            } else if(flatData[sibTitle+'.'+b+'.lastName']){
              name = flatData[sibTitle+'.'+b+'.lastName'];
            }

            var nameLine = [];
            if(flatData[sibTitle+'.'+b+'.gender'] === 'Female'){
              nameLine.push({image: 'bullet-female.png', alignment: 'center', margin: [0, 5, 0, 0]});
            }
            else {
              nameLine.push({image: 'bullet-male.png', alignment: 'center', margin: [0, 5, 0, 0]});
            }
            nameLine.push({text: name, style: 'name'});
            
            bodyInfo.push(nameLine);
            
            if(flatData[sibTitle+'.'+b+'.birth.date'] || flatData[sibTitle+'.'+b+'.birth.place']){
              var birthLine = [];
              birthLine.push({text: titles[6], style: 'subtitle', alignment: 'center'});
              if(flatData[sibTitle+'.'+b+'.birth.date'] && flatData[sibTitle+'.'+b+'.birth.place']){
                birthLine.push({stack: [{text: flatData[sibTitle+'.'+b+'.birth.date'], style: 'subtitle', margin: [0, 0, 0, 0]},{text: flatData[sibTitle+'.'+b+'.birth.place'], style:'deets'}]});
              }
              else if(flatData[sibTitle+'.'+b+'.birth.date']){
                birthLine.push({text: flatData[sibTitle+'.'+b+'.birth.date'], style: 'subtitle', margin: [0, 0, 0, 0]});
              }
              else if(flatData[sibTitle+'.'+b+'.birth.place']){
                birthLine.push({text: flatData[sibTitle+'.'+b+'.birth.place'], style:'deets'});
              }
              else {
                birthLine.push({});
              }
              bodyInfo.push(birthLine);
            }
            
            if(flatData[sibTitle+'.'+b+'.death.date'] || flatData[sibTitle+'.'+b+'.death.place']){
              var deathLine = [];
              deathLine.push({text: titles[5], style: 'subtitle', alignment: 'center'});
              if(flatData[sibTitle+'.'+b+'.death.date'] && flatData[sibTitle+'.'+b+'.death.place']){
                deathLine.push({stack: [{text: flatData[sibTitle+'.'+b+'.death.date'], style: 'subtitle', margin: [0, 0, 0, 0]},{text: flatData[sibTitle+'.'+b+'.death.place'], style:'deets'}]});
              }
              else if(flatData[sibTitle+'.'+b+'.death.date']){
                deathLine.push({text: flatData[sibTitle+'.'+b+'.death.date'], style: 'subtitle', margin: [0, 0, 0, 0]});
              }
              else if(flatData[sibTitle+'.'+b+'.death.place']){
                deathLine.push({text: flatData[sibTitle+'.'+b+'.death.place'], style:'deets'});
              }
              else {
                deathLine.push({});
              }
              bodyInfo.push(deathLine);
            }

            b++;
          }
          var idx = people.indexOf(sibTitle);
            var sibHeadText = titles[idx] || '';
            if(sibHeadText === ''){
              return {text: ''};
            }

          var sibPage = {table: {widths: ['auto', '*'], body: bodyInfo}, layout: 'noBorders', pageBreak: 'after'};
          return sibPage;
        }
        else {
          return {text: ''};
        }
      };
            
           
      var content = [
      {image: 'cover.png', pageBreak: 'after'},
      {text: titles[21], style: 'header', color: '#00a59b'},
      {
        columns: deets('R_title'),
        pageBreak: 'after'},
      
      {text: titles[7], style: 'header', color: '#82a62e'},
      {
        columns: deets('RM'),
        pageBreak: 'after'},
      
      {text: titles[14], style: 'header', color: '#82a62e'},
      {
        columns: deets('RF'),
        pageBreak: 'after'},
      
      sibHead('RS_title','#82a62e'),
      siblings('RS_title'),
        
      {text: titles[8], style: 'header', color: '#fbb14b'},
      {
        columns: deets('myFathersFather'),
        pageBreak: 'after'},
      
      {text: titles[15], style: 'header', color: '#fbb14b'},
      {
        columns: deets('myFathersMother'),
        pageBreak: 'after'},
      
      sibHead('myFathersSiblings_title','#fbb14b'),
      siblings('myFathersSiblings_title'),
        
      {text: titles[9], style: 'header', color: '#fbb14b'},
      {
        columns: deets('myMothersFather'),
        pageBreak: 'after'},
      
      {text: titles[16], style: 'header', color: '#fbb14b'},
      {
        columns: deets('myMothersMother'),
        pageBreak: 'after'},
      
      sibHead('myMothersSiblings_title','#fbb14b'),
      siblings('myMothersSiblings_title'),
        
      {text: titles[10], style: 'header', color: '#0051c4'},
      {
        columns: deets('myFathersFathersFather'),
        pageBreak: 'after'},
      
      {text: titles[17], style: 'header', color: '#0051c4'},
      {
        columns: deets('myFathersFathersMother'),
        pageBreak: 'after'},
      
      sibHead('myFathersFathersSiblings_subtitle','#0051c4'),
      siblings('myFathersFathersSiblings_subtitle'),
        
      {text: titles[11], style: 'header', color: '#0051c4'},
      {
        columns: deets('myFathersMothersFather'),
        pageBreak: 'after'},
      
      {text: titles[18], style: 'header', color: '#0051c4'},
      {
        columns: deets('myFathersMothersMother'),
        pageBreak: 'after'},
      
      sibHead('myFathersMothersSiblings_subtitle','#0051c4'),
      siblings('myFathersMothersSiblings_subtitle'),
        
      {text: titles[12], style: 'header', color: '#0051c4'},
      {
        columns: deets('myMothersFathersFather'),
        pageBreak: 'after'},
      
      {text: titles[19], style: 'header', color: '#0051c4'},
      {
        columns: deets('myMothersFathersMother'),
        pageBreak: 'after'},
      
      sibHead('myMothersFathersSiblings_subtitle','#0051c4'),
      siblings('myMothersFathersSiblings_subtitle'),
        
      {text: titles[13], style: 'header', color: '#0051c4'},
      {
        columns: deets('myMothersMothersFather'),
        pageBreak: 'after'},
      
      {text: titles[20], style: 'header', color: '#0051c4'},
      {
        columns: deets('myMothersMothersMother'),
        pageBreak: 'after'},

      sibHead('myMothersFathersSiblings_subtitle','#0051c4'),
      siblings('myMothersFathersSiblings_subtitle')        
      ];

      return content;
    };

    
    var content = [];

    var createContentArray = function(){
      content = content.concat(booklet());
    };
   
    var filename = "my_booklet_"+flatData['R_title.lastName']+"-"+flatData['R_title.firstName']+".pdf";
   
    var createEmail = function(file){
      $ionicLoading.hide();
      cordova.plugins.email.open({
        attachments: file
      });
    };
    
    var openPDF = function(filename){
      $cordovaFileOpener2.open(filename, 'application/pdf')
      .then(function(){
        console.log('we opened it!');
      }, function(error){
        console.log(error);
      });
    };
    
    $scope.generate = function(){
      $ionicLoading.show({
        template: 'loading...'
      });
      var docDefinition = {content: content,
        defaultStyle: {
          font: 'proximaNova',
          fontSize: 18,
          margin: [0, 0, 0, 10]
        },
        styles: {
          header: {fontSize: 36, font: 'museo', margin: [0,0,0,20]},
          section: {margin: [0, 20, 0, 5]},
          subtitle: {fontSize: 21, margin: [0, 0, 0, 20]},
          quote: {fontSize: 24},
          subhead: {fontSize: 18, bold: true, margin: [0, 10, 0, 5]},
          name: {font: 'museo', fontSize: 21, margin: [0, 0, 0, 0]},
          deets: {fontSize: 14}
        }
      };
      
      $ionicPlatform.ready(function() {
        if(!window.cordova){
          pdfMake.createPdf(docDefinition).download(filename);
          $ionicLoading.hide();
        }
        else {
          pdfMake.createPdf(docDefinition).getBuffer(function(result){
            var pdfBlob = new Blob([result], {type: 'application/pdf'});
            $cordovaFile.writeFile(cordova.file.dataDirectory, filename, pdfBlob,  true)
            .then(function (success) {
              // success
              $ionicLoading.hide();
              console.log('we wrote a new file! ' + success);
              $cordovaFile.checkFile(cordova.file.dataDirectory, filename)
              .then(function (success) {
                // success
                $ionicLoading.hide();
                console.log('when checking your booklet:');
                var nativeURL = success.nativeURL;
  
                createEmail(nativeURL);
  //              openPDF(nativeURL);
              }, function (error) {
                // error
                $ionicLoading.hide();
                console.log("checking a file didn't work " + error.message);
              });
            }, function (error) {
              // error
              $ionicLoading.hide();
              console.log("creating a file didn't work: " + error.message);
            });
          });
        }
      }); 
    };
});
