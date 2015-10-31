(function() {
  'use strict';
  angular.module('ionic.ion.imageCacheFactory', [])

  .factory('$ImageCacheFactory', $ImageCacheFactory);

  $ImageCacheFactory.$inject = ['$q'];

  function $ImageCacheFactory($q) {
    var service = {
      Cache: Cache
    };
    return service;

    function Cache(urls) {
      var promises = [];
      angular.forEach(urls, function(url) {
        var deferred = $q.defer();
        var img = new Image();
        img.onload = onImageLoad(deferred);
        img.onerror = onImageError(deferred, url);
        promises.push(deferred.promise);
        img.src = url;
      });
      return $q.all(promises);
    }

    function onImageLoad(deferred) {
      return function() {
        deferred.resolve();
      };
    }

    function onImageError(deferred, url) {
      return function() {
        deferred.reject(url);
      };
    }

  }
})();
