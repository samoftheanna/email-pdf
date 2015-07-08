angular.module('scouts')
  .controller('TransliterationCtrl', function($translate, $scope, $stateParams, $state){
    var localeToTemplate = {
      "de" : 'Booklet',
      "en" : 'Booklet',
      "es" : 'Spanish',
      "fr" : 'Booklet',
      "it" : 'Booklet',
      "ja" : 'Japanese',
      "ko" : 'Korean',
      "pt" : 'Portuguese',
      "ru" : 'Cyrillic',
      "zh" : 'Chinese',
      'th' : 'Thai'
    };
        
    var locale = $stateParams.id;
    
    var currentTemplate = localeToTemplate[locale];
    
    $scope.templateObjs = [
      { name: "Booklet",       data_types: ["roman"] },
      { name: "Standard",      data_types: ["roman"] },
      { name: "Spanish",       data_types: ["roman"] },
      { name: "Portuguese",    data_types: ["roman"] },
      { name: "Cyrillic",      data_types: ["cyrl",  "roman"] },
      { name: "Chinese",       data_types: ["hanzi", "roman"] },
      { name: "Japanese",      data_types: ["kanji", "kana", "roman"] },
      { name: "Korean",        data_types: ["hang",  "hanja", "roman"] },
      { name: "Thai",          data_types: ["thai",  "roman"] }
    ];

    $scope.templates = ['Booklet', 'Standard', 'Spanish', 'Portuguese', 'Cyrillic', 'Chinese', 'Japanese', 'Korean', 'Thai'];
    
    $scope.selectedTemplate = currentTemplate;
        
    $scope.isGrid = function() {
      if( locale === 'ja' ||
          locale === 'ko' ||
          locale === 'zh' ||
          locale === 'th') return true;
      return false;
    };
    
    $scope.showSubLanguagePicker = function() {
      if( $scope.selectedTemplate === 'Cyrillic' ||
          $scope.selectedTemplate === 'Japanese' ||
          $scope.selectedTemplate === 'Korean' ||
          $scope.selectedTemplate === 'Chinese' ||
          $scope.selectedTemplate === 'Thai') return true;
      return false;
    };
  });