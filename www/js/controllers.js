angular.module('scouts')
  .controller('TranslationCtrl', function($translate, $scope, $stateParams){
    $translate.use($stateParams.id);
  })
  .controller('LangListCtrl', function($translate, $scope){
  $scope.supportedLanguages = [
    {'language': 'Chinese',
     'label': '简体中文',
     'code':'zh'},
    {'language': 'Dutch',
     'label': 'Nederlands',
     'code':'nl'},
    {'language': 'English',
     'label': 'English',
     'code':'en'},
    {'language': 'Finnish',
     'label': 'Suomi',
     'code':'fi'},
    {'language': 'French',
     'label': 'Français',
     'code':'fr'},
    {'language': 'German',
     'label': 'Deutsch',
     'code':'de'},
    {'language': 'Indonesian',
     'label': 'Bahasa Indonesia',
     'code':'id'},
    {'language': 'Italian',
     'label': 'Italiano',
     'code':'it'},
    {'language': 'Japanese',
     'label': '日本語',
     'code':'ja'},
    {'language': 'Korean',
     'label': '한국어',
     'code':'ko'},
    {'language': 'Portuguese',
     'label': 'Português',
     'code':'pt'},
    {'language': 'Russian',
     'label': 'Русский',
     'code':'ru'},
    {'language': 'Spanish',
     'label': 'Español',
     'code':'es'},
    {'language': 'Thai',
     'label': 'ภาษาไทย',
     'code':'th'}
   ];
   $scope.changeLanguage = function (langKey) {
     $translate.use(langKey);
   };
  })
  .controller('InstructionTextCtrl', function($scope){
    $scope.text = {
      'pt': {
        'instructions': 'Instruções',
        'first': 'Adicione o maior número possível de informações que souber a respeito de sua família.',
        'second': 'Envie-as por e-mail para você mesmo, para um parente ou para um amigo que precisa de ajuda.',
        'third': 'Adicione as informações que faltam sobre sua família.'
      },
      'ko': {
        'instructions': '명령',
        'first': '가족에 대해 아는 대로 정보를 추가하십 시오.',
        'second': '도움을 받기 위해 자신이나 부모, 친척, 친구에게 이것을 이메일로 보내십시오.',
        'third': '가족에 대해 남아있는 정보를 추가하십 시오.'
      },
      'ru': {
        'instructions': 'Инструкции',
        'first': 'Внесите как можно больше сведений о вашей семье.',
        'second': 'Чтобы получить помощь, отправьте по электронной почте себе, родителям, родственнику или другу.',
        'third': 'Внесите остальные сведения о вашей семье.'
      },
      'ja': {
        'instructions': '説明書',
        'first': '自分の家族に関する知っている限りの情 報を追加する。',
        'second': '自分，親，親戚または友人のためにその情 報を電子メールで送る。',
        'third': '自分の家族に関する残りの情報を追加す る。'
      },
      'th': {
        'instructions': 'คำ􀡩แนะนำ􀡩',
        'first': 'เพิ่มข้อมูลที่ท่านทราบเกี่ยวกับครอบครัวของ ท่านให้มากที่สุด',
        'second': 'ส่งอีเมลถึงตัวท่านเอง พ่อแม่ ญาติ หรือเพื่อน เพื่อขอความช่วยเหลือ',
        'third': 'เพิ่มข้อมูลที่เหลือเกี่ยวกับครอบครัวของท่าน'
      },
      'zh': {
        'instructions': '说明',
        'first': '盡可能地把你所知道的家庭資料都加進 去。',
        'second': '將它透過電子郵件寄給自己、父母親、親 戚或朋友來取得協助。',
        'third': '加入有關你家庭的剩餘資料。'
      },
      'it': {
        'instructions': 'Istruzione',
        'first': 'Aggiungi tutte le informazioni che sai sulla tua famiglia.',
        'second': 'Inviale per e-mail a te stesso, a un genitore, a un parente o a un amico per assistenza.',
        'third': 'Aggiungi il resto delle informazioni sulla tua famiglia.'
      },
      'de': {
        'instructions': 'Anleitung',
        'first': 'Geben Sie alle Ihnen bekannten Angaben zu Ihrer Familie ein.',
        'second': 'Falls Sie Hilfe brauchen, senden Sie diese per E-Mail an sich selbst, an Eltern, Verwandte oder Freunde.',
        'third': 'Fügen Sie die restlichen Angaben zu Ihrer Familie hinzu.'
      },
      'fr': {
        'instructions': 'Instructions',
        'first': 'Ajoutez autant de renseignements que vous connaissez sur votre famille.',
        'second': 'Envoyez-les par courriel à vous-même, à un parent, ou à un ami pour obtenir leur aide.',
        'third': 'Ajoutez le reste des renseignements sur votre famille.'
      },
      'fi': {
        'instructions': 'Ohjeet',
        'first': 'Lisää niin paljon tietoja suvustasi kuin tiedät.',
        'second': 'Lähetä se sähköpostitse itsellesi, isälle, äidille tai jollekulle muulle sukulaiselle tai ystävälle ja pyydä apua saadaksesi lisää tietoja.',
        'third': 'Lisää nuo loputkin tiedot suvustasi.'
      },
      'en': {
        'instructions': 'Instructions',
        'first': 'Add as much information you know about your family.',
        'second': 'Email it to yourself, a parent, relative, or friend for assistance.',
        'third': 'Add the remaining information about your family.'
      },
      'id': {
        'instructions': 'Instruksi',
        'first': 'Tambahkan sebanyak mungkin informasi yang Anda ketahui tentang keluarga Anda.',
        'second': 'Kirimkan melalui posel kepada diri Anda sendiri, orangtua, kerabat, atau teman untuk bantuan.',
        'third': 'Tambahkan informasi lainnya tentang keluarga Anda.'
      },
      'es': {
        'instructions': 'Instrucciones',
        'first': 'Agregar la mayor cantidad de información que usted sepa sobre su familia.',
        'second': 'Enviar un correo electrónico a usted mismo, a uno de sus padres, a un pariente o a un amigo para obtener ayuda.',
        'third': 'Agregar la información restante sobre su familia.'
      },
      'nl': {
        'instructions': 'Instructies',
        'first': 'Voeg zoveel mogelijk gegevens van uw familie toe.',
        'second': 'E-mail die naar uzelf, een ouder, familielid, of een vriend voor assistentie.',
        'third': 'Voer de resterende gegevens van uw familie in.'
      }
    }
  })
  .controller('ChildCtrl', function($translate, $scope, $stateParams){
    $scope.localized = $scope.text[$stateParams.id];
    $scope.localized.code = $stateParams.id;
    $translate.use($scope.localized.code);
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };
  })
  .controller('BookletCtrl', ['$translate','$scope','$stateParams','$state','bookletCache', 'Camera', function($translate, $scope, $stateParams, $state, bookletCache, Camera){

    $scope.personData = $state.current.params;
    

//    $scope.cache = bookletCache;
    
    $scope.formData = bookletCache;
    
    var males = ['RM','myFathersFather','myMothersFather','myFathersFathersFather','myFathersMothersFather','myMothersFathersFather','myMothersMothersFather'];
    var females = ['RF','myFathersMother','myMothersMother','myFathersFathersMother','myFathersMothersMother','myMothersFathersMother','myMothersMothersMother'];
    
    var setGender = function(people, gender){
      for (var i = 0; i < people.length; i++) {
        var n = people[i];
        if(!$scope.formData[n]){
          $scope.formData[n] = {'gender': gender};
        }
      }
    };
    
    setGender(males,'Male');
    setGender(females, 'Female');
    
    if(!$scope.formData.R_title){
      $scope.formData.R_title = {'living': "true"};
    }
//    $scope.put = function(key, value) {
//      $scope.cache.put($state.current.params.generationTitle + '_' + key, value);
//    };
    
    $scope.locale = $stateParams.id; 
    $translate.use($scope.locale);
    
    $scope.addImage = function(){
      Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
      }, function(err) {
        console.err(err);
      });
    };
    
    $scope.goTo = function(state){
      $state.go(state, {'id': $scope.locale},{reload: true, inherit: true});
    };
        
    $scope.countSiblings = function(obj){
      if(obj){
        return Object.keys(obj).length;
      }
    };

    $scope.thisPage = $state.current.name;
    
    var returnTo = $state.current.name;
    
    switch ($stateParams.sibling) {
      case 'R_title':
      $scope.returnTo = '^.siblings';
      console.log($state.current.params.sibNumber);
      break;
      case 'RM':
      $scope.returnTo = '^.psiblings';
      break;
      case 'RF':
      $scope.returnTo = '^.msiblings';
      break;
      case 'myFathersFather':
      $scope.returnTo = '^.ppsiblings';
      break;
      case 'myFathersMother':
      $scope.returnTo = '^.pmsiblings';
      break;
      case 'myMothersFather':
      $scope.returnTo = '^.mpsiblings';
      break;
      case 'myMothersMother':
      $scope.returnTo = '^.mmsiblings';
      break;
    }      

    var setReturn = function(){
      $scope.returnTo = returnTo;
    };
    
    $scope.setSibNumber = function(number){
      $state.current.params.sibNumber = number;
    }

    $scope.addSibling = function(){
      if($state.current.params.sibNumber){
        $state.current.params.sibNumber = ++$state.current.params.sibNumber;
      }
      else{
        $state.current.params.sibNumber = 1;
      }
      var params = $state.current.params;
      $state.go('^.addSibling',{'id': $scope.locale, 'sibling': params.sibling},{inherit: true})
      .then(setReturn());
    };
  }])
  .controller('PdfCtrl', function($scope, $ionicLoading, ReportSvc) {
    $scope.runReport = _runReport;
    $scope.clearReport = _clearReport;
//    _activate();
    
/*    function _activate() {        
//
// ReportSvc Event Listeners: Progress/Done
//    used to listen for async progress updates so loading text can change in 
//    UI to be repsonsive because the report process can be 'lengthy' on 
//    older devices (chk reportSvc for emitting events)
//
		$scope.$on('ReportSvc::Progress', function(event, msg) {
			_showLoading(msg);
		});		 
		$scope.$on('ReportSvc::Done', function(event, err) {
			_hideLoading();
		});        
    }
*/    
    function _runReport(data) {
        //if no cordova, then running in browser and need to use dataURL and iframe
        if (!window.cordova) {
            ReportSvc.runReportDataURL( {},{} )
                .then(function(dataURL) {
                    //set the iframe source to the dataURL created
                    console.log('report run in browser using dataURL and iframe');
                    document.getElementById('pdfImage').src = dataURL;
                });
            return true;
        }
        //if codrova, then running in device/emulator and able to save file and open w/ InAppBrowser
        else {
            ReportSvc.runReportAsync( {},{} )
                .then(function(filePath) {
                    //log the file location for debugging and oopen with inappbrowser
                    console.log('report run on device using File plugin');
                    console.log('ReportCtrl: Opening PDF File (' + filePath + ')');
                    window.open(filePath, '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
                    hideLoading();
                });
            return true;
        }
	}

    //reset the iframe to show the empty html page from app start
    function _clearReport() {
        document.getElementById('pdfImage').src = "empty.html";
    }
//
// Loading UI Functions: utility functions to show/hide loading UI
//
    function _showLoading(msg) {
        $ionicLoading.show({
          template: msg,
          scope: $scope
        });
    }
    function _hideLoading(){
        $ionicLoading.hide();
    }
});
