'use strict';
var incognito, url;

let changeSetting = document.getElementById('changeSetting');

changeSetting.onclick = function(element) {
	// alert('changeSetting clicked');
	console.log('changeSetting clicked');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var current = tabs[0];
    incognito = current.incognito;
    url = current.url;

    var type = 'unsandboxedPlugins';
	var setting = 'allow';
	var pattern = /^file:/.test(url) ? url : url.replace(/\/[^\/]*?$/, '/*');
	console.log(type+' setting for '+pattern+': '+setting);
	  
	  
	//get
	// getContentSetting(type);
	//set
	setContentSetting(type, setting, pattern);
	//get
	// getContentSetting(type);
	  
  });
};

function setContentSetting(type, setting, pattern) {
	chrome.contentSettings[type].set({
	        'primaryPattern': '<all_urls>',
	        'setting': setting,
	        'scope': (incognito ? 'incognito_session_only' : 'regular')
	      });
}

function getContentSetting(type) {
	chrome.contentSettings[type] && chrome.contentSettings[type]
	.get({'primaryUrl': url,'incognito': incognito},
	  function(details) {
	    console.log(type+ ': ', details.setting);
	  });
}

