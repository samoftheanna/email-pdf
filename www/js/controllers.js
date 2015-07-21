angular.module('scouts')
  .controller('TranslationCtrl', function($translate, $scope, $stateParams){
    $translate.use($stateParams.id);
  })
  .controller('LangListCtrl', function($translate, $scope){
  $scope.supportedLanguages = [
    {'language': 'Chinese',
     'label': '中文',
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
        'second': 'Чтобы получить помощь, отправьте эти сведения по электронной почте себе, родителям, родственнику или другу.',
        'third': 'Внесите остальные сведения о вашей семье.'
      },
      'ja': {
        'instructions': '手順',
        'first': '自分の家族に関して知っている限りの情報を追加する。',
        'second': 'さらに情報を得るために自分，親，親戚または友人に自分が知っている情報を電子メールで送る',
        'third': '自分の家族に関する残りの情報を追加す る。'
      },
      'th': {
        'instructions': 'คำ􀡩แนะนำ􀡩',
        'first': 'เพิ่มข้อมูลที่ท่านทราบเกี่ยวกับครอบครัวของ ท่านให้มากที่สุด',
        'second': 'ส่งอีเมลถึงตัวท่านเอง พ่อแม่ ญาติ หรือเพื่อน เพื่อขอความช่วยเหลือ',
        'third': 'เพิ่มข้อมูลที่เหลือเกี่ยวกับครอบครัวของท่าน'
      },
      'zh': {
        'instructions': '說明',
        'first': '盡可能地把你所知道的家庭資料都加進 去。',
        'second': '將它透過電子郵件寄給自己、父母親、親戚、或朋友來取得協助。',
        'third': '加入有關你家庭的剩餘資料。'
      },
      'it': {
        'instructions': 'Istruzioni',
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
    var resetPersonData = angular.copy($scope.personData);

//    $scope.cache = bookletCache;

    $scope.formData = bookletCache;
    var resetFormData = angular.copy($scope.formData);

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

    $scope.showReversed = function() {
      if( $scope.locale === 'ja' ||
          $scope.locale === 'ko' ||
          $scope.locale === 'zh') return true;
      return false;
    };

    if(!$scope.formData.R_title){
      $scope.formData.R_title = {'living': "true"};
    }

    $scope.locale = $stateParams.id;
    $translate.use($scope.locale);

    $scope.addImage = function(){
      Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
        $scope.formData[$state.current.params.generationTitle].image = $scope.lastPhoto;
      }, function(err) {
        console.log(err);
      });
    };

    $scope.goTo = function(state){
      console.log(state);
      if(state == 'home'){
        //clear memory
        angular.copy(resetFormData, $scope.formData);
        angular.copy(resetPersonData, $scope.PersonData);
      }
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

    $scope.setReturn = function(){
      //Save and exit
      $scope.returnTo = returnTo;
    };

    $scope.setSibNumber = function(number){
      $state.current.params.sibNumber = number;
    }

    $scope.addSibling = function(){
      if($state.current.params.sibNumber){
        var gen = $state.current.params.generationTitle;
        var info = $scope.formData;
        var number = Object.keys(info[gen]).length;
        $state.current.params.sibNumber = ++number;
      }
      else{
        $state.current.params.sibNumber = 1;
      }
      var params = $state.current.params;
      $state.go('^.addSibling',{'id': $scope.locale, 'sibling': params.sibling},{inherit: true})
      .then($scope.setReturn());
    };
  }]);
