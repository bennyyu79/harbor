(function() {
  
  'use strict';
  
  angular
    .module('harbor.optional.menu')
    .directive('optionalMenu', optionalMenu);

  OptionalMenuController.$inject = ['$window', 'I18nService', 'LogOutService', 'currentUser', '$timeout'];

  function OptionalMenuController($window, I18nService, LogOutService, currentUser, $timeout) {
    var vm = this;
    
    vm.currentLanguage = I18nService().getCurrentLanguage();
    vm.languageName = I18nService().getLanguageName(vm.currentLanguage);
    
    console.log('current language:' + I18nService().getCurrentLanguage());
    
    vm.user = currentUser.get();
    vm.setLanguage = setLanguage;     
    vm.logOut = logOut;
    
    function setLanguage(language) {
      I18nService().setCurrentLanguage(language);
      $window.location.href = '/ng/language?lang=' + language;    
    }
    function logOut() {
      LogOutService()
        .success(logOutSuccess)
        .error(logOutFailed);
    }
    function logOutSuccess(data, status) {
      currentUser.unset();
      I18nService().unset();
      $window.location.href= '/ng';
    }
    function logOutFailed(data, status) {
      console.log('Failed to log out:' + data);
    }
  }
  
  function optionalMenu() {
    var directive = {
      'restrict': 'E',
      'templateUrl': '/ng/optional_menu',
      'scope': true,
      'controller': OptionalMenuController,
      'controllerAs': 'vm',
      'bindToController': true
    };
    return directive;
  }
  
})();