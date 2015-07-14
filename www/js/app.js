// Add the 'ionic.service.core' module to your main angular module:
angular.module('test', ['ionic.service.core'])
// Identify App
.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID for the server
    app_id: '9b316d8a',
    // The API key all services will use for this app
    api_key: '0eae193dc50628d33ed52e9e4852e65fbb164941d44ec958'
  });
}])
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('scouts', ['ionic', 'ngCordova', 'ui.router','pascalprecht.translate'])
.config(function($stateProvider, $urlRouterProvider, $translateProvider, $compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  $translateProvider
//    .useLocalStorage()
    .preferredLanguage('en')
    .useSanitizeValueStrategy('escape')
    .translations('de', translations_de)
    .translations('en', translations_en)
    .translations('es', translations_es)
    .translations('fi', translations_fi)
    .translations('fr', translations_fr)
    .translations('id', translations_id)
    .translations('it', translations_it)
    .translations('ja', translations_ja)
    .translations('ko', translations_ko)
    .translations('nl', translations_nl)
    .translations('pt', translations_pt)
    .translations('ru', translations_ru)
    .translations('th', translations_th)
    .translations('zh', translations_zh);
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/home',
        templateUrl: 'partial-choose.html'
    })
    .state('instructions',{
      abstract: true,
      url: '/instructions',
      template: '<div ui-view></div>',
      controller: 'InstructionTextCtrl'
    })
    .state('instructions.language',{
      url: '/:id',
      templateUrl: 'partial-instructions.html',
      controller: 'ChildCtrl'
    })
    .state('booklet',{
      abstract: true,
      url: '/booklet',
      templateUrl: 'partial-form.html',
      controller: 'BookletCtrl'
    })
    .state('booklet.me',{
      url:'/:id/me',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 1, 'generation': '1', 'generationTitle': 'R_title', 'generation_subtitle': 'myFamily_subtitle', 'next': '^.father', 'previous': 'home', 'stories': 'learn_about_me'}
    })
    .state('booklet.father',{
      url:'/:id/parents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 2, 'generation': '2', 'generationTitle': 'RM', 'parent': 'father', 'child': 'R_title', 'generation_subtitle': 'father_subtitle', 'spouse': 'RF', 'next': '^.mother', 'previous': '^.me', 'stories': 'stories_message_RM'}
    })
    .state('booklet.mother',{
      url:'/:id/parents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 3, 'generation': '2', 'generationTitle': 'RF', 'parent': 'mother', 'child': 'R_title', 'generation_subtitle': 'mother_subtitle', 'spouse': 'RM', 'next': '^.siblings', 'previous': '^.father', 'stories': 'stories_message_RF'}
    })
    .state('booklet.siblings',{
      url:'/:id/mySiblings',
      templateUrl: 'form-children.html',
      params: {'pdfOrder': 4, 'generation': '2', 'generationTitle': 'RS_title', 'father': 'RM', 'mother': 'RF', 'sibling': 'R_title', 'next': '^.pgrandfather', 'previous': '^.mother'}
    })
    .state('booklet.pgrandfather',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 5, 'generation': '3', 'generationTitle': 'myFathersFather', 'parent': 'grandfatherRMM', 'child': 'RM',  'generation_subtitle': 'father_subtitle', 'next': '^.pgrandmother', 'previous': '^.siblings', 'stories': 'stories_message_RMM'}
    })
    .state('booklet.pgrandmother',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 6, 'generation': '3', 'generationTitle': 'myFathersMother', 'parent': 'grandmotherRMF', 'child': 'RM', 'generation_subtitle': 'mother_subtitle', 'next': '^.psiblings', 'previous': '^.pgrandfather', 'stories': 'stories_message_RMF'}
    })
    .state('booklet.psiblings',{
      url:'/:id/fatherSiblings',
      templateUrl: 'form-children.html',
      params: {'pdfOrder': 7, 'generation': '3', 'generationTitle': 'myFathersSiblings_title', 'father': 'myFathersFather', 'mother': 'myFathersMother', 'sibling': 'RM', 'next': '^.mgrandfather', 'previous': '^.pgrandmother'}
    })
    .state('booklet.mgrandfather',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 8, 'generation': '3', 'generationTitle': 'myMothersFather', 'parent': 'grandfatherRFM', 'child': 'RF',  'generation_subtitle': 'father_subtitle', 'next': '^.mgrandmother', 'previous': '^.psiblings', 'stories': 'stories_message_RFM'}
    })
    .state('booklet.mgrandmother',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 9, 'generation': '3', 'generationTitle': 'myMothersMother', 'parent': 'grandmotherRFF', 'child': 'RF',  'generation_subtitle': 'mother_subtitle', 'next': '^.msiblings', 'previous': '^.mgrandfather', 'stories': 'stories_message_RFF'}
    })
    .state('booklet.msiblings',{
      url:'/:id/motherSiblings',
      templateUrl: 'form-children.html',
      params: {'pdfOrder': 10, 'generation': '3', 'generationTitle': 'myMothersSiblings_title', 'father': 'myMothersFather', 'mother': 'myMothersMother', 'sibling': 'RF', 'next': '^.ppgrandfather', 'previous': '^.mgrandmother'}
    })
    .state('booklet.ppgrandfather',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 11, 'generation': '4', 'generationTitle': 'myFathersFathersFather', 'parent': 'grandfatherRMMM', 'child': 'myFathersFather', 'generation_subtitle': 'father_subtitle', 'next': '^.ppgrandmother', 'previous': '^.msiblings', 'stories': 'stories_message_RMMM'}
    })
    .state('booklet.ppgrandmother',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 12, 'generation': '4', 'generationTitle': 'myFathersFathersMother', 'parent': 'grandmotherRMMF', 'child': 'myFathersFather',  'generation_subtitle': 'mother_subtitle', 'next': '^.ppsiblings', 'previous': '^.ppgrandfather', 'stories': 'stories_message_RMMF'}
    })
    .state('booklet.ppsiblings',{
      url:'/:id/grandfatherRMMSiblings',
      templateUrl: 'form-children.html',
      params: {'pdfOrder': 13, 'generation': '4', 'generationTitle': 'myFathersFathersSiblings_subtitle', 'father': 'myFathersFathersFather', 'mother': 'myFathersFathersMother', 'sibling': 'myFathersFather', 'next': '^.pmgrandfather', 'previous': '^.ppgrandmother'}
    })
    .state('booklet.pmgrandfather',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 14, 'generation': '4', 'generationTitle': 'myFathersMothersFather', 'parent': 'grandfatherRMFM',  'child': 'myFathersMother', 'generation_subtitle': 'father_subtitle', 'next': '^.pmgrandmother', 'previous': '^.ppsiblings', 'stories': 'stories_message_RMFM'}
    })
    .state('booklet.pmgrandmother',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 15, 'generation': '4', 'generationTitle': 'myFathersMothersMother', 'parent': 'grandmotherRMFF', 'child': 'myFathersMother',  'generation_subtitle': 'mother_subtitle', 'next': '^.pmsiblings', 'previous': '^.pmgrandfather', 'stories': 'stories_message_RMFF'}
    })
    .state('booklet.pmsiblings',{
      url:'/:id/grandfatherRSiblings',
      templateUrl: 'form-children.html',
      params: {'pdfOrder': 16, 'generation': '4', 'generationTitle': 'myFathersMothersSiblings_subtitle', 'father': 'myFathersMothersFather', 'mother': 'myFathersMothersMother', 'sibling': 'myFathersMother', 'next': '^.mpgrandfather', 'previous': '^.pmgrandmother'}
    })
    .state('booklet.mpgrandfather',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 17, 'generation': '4', 'generationTitle': 'myMothersFathersFather', 'parent': 'grandfatherRFMM',  'child': 'myMothersFather', 'generation_subtitle': 'father_subtitle', 'next': '^.mpgrandmother', 'previous': '^.pmsiblings', 'stories': 'stories_message_RFMM'}
    })
    .state('booklet.mpgrandmother',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 18, 'generation': '4', 'generationTitle': 'myMothersFathersMother', 'parent': 'grandmotherRFMF', 'child': 'myMothersFather',  'generation_subtitle': 'mother_subtitle', 'next': '^.mpsiblings', 'previous': '^.mpgrandfather', 'stories': 'stories_message_RFMF'}
    })
    .state('booklet.mpsiblings',{
      url:'/:id/grandfatherRMMSiblings',
      templateUrl: 'form-children.html',
      params: {'pdfOrder': 19, 'generation': '4', 'generationTitle': 'myMothersFathersSiblings_subtitle', 'father': 'myMothersFathersFather', 'mother': 'myMothersFathersMother', 'sibling': 'myMothersFather', 'next': '^.mmgrandfather', 'previous': '^.mpgrandmother'}
    })
    .state('booklet.mmgrandfather',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 20, 'generation': '4', 'generationTitle': 'myMothersMothersFather', 'parent': 'grandfatherRFFM',  'child': 'myMothersMother', 'generation_subtitle': 'father_subtitle', 'next': '^.mmgrandmother', 'previous': '^.mpsiblings', 'stories': 'stories_message_RFFM'}
    })
    .state('booklet.mmgrandmother',{
      url:'/:id/grandparents/:parent',
      templateUrl: 'form-person.html',
      params: {'pdfOrder': 21, 'generation': '4', 'generationTitle': 'myMothersMothersMother', 'parent': 'grandmotherRFFF', 'child': 'myMothersMother',  'generation_subtitle': 'mother_subtitle', 'next': '^.mmsiblings', 'previous': '^.mmgrandfather', 'stories': 'stories_message_RFFF'}
    })
    .state('booklet.mmsiblings',{
      url:'/:id/grandfatherRSiblings',
      templateUrl: 'form-children.html',
      params: {'pdfOrder': 22, 'generation': '4', 'generationTitle': 'myMothersMothersSiblings_subtitle', 'father': 'myMothersMothersFather', 'mother': 'myMothersMothersMother', 'sibling': 'myMothersMother', 'next': '^.pdf', 'previous': '^.mmgrandmother'}
    })
    .state('booklet.addSibling', {
      url:'/:id/:sibling/add/:sibNumber',
      templateUrl: 'form-siblings.html'
    })
    .state('booklet.pdf', {
      url:'/:id/send',
      templateUrl: 'partial-pdf.html',
      params: {'generation': '1', 'generationTitle': 'banner_header_finished', 'previous': '^.me','next': 'home'}
    })
  })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});