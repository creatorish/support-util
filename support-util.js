/**
 * Support Utility JS
 * 機能が使えるかどうかや端末情報を取得するライブラリ
 *
 * Copyright 2012 creatorish.com
 * Author: yuu@creatorish
 * Site: http://creatorish.com
 * LastUpdate: 2012/08/23
 * HowToUse: http://creatorish.com/lab/4151
 * GetFlashVersionCode by groundwalker.com(http://groundwalker.com/blog/2007/08/flash_version_detection_with_javascript.html)
 *
**/

var $s = {
	support: {
		transform3d: (typeof WebKitCSSMatrix != "undefined" && new WebKitCSSMatrix().hasOwnProperty("m41")),
		touch: ("ontouchstart" in window),
		getComputedStyle: ("getComputedStyle" in window),
		atob: ("atob" in window),
		btoa: ("btoa" in window),
		devicemotion: ("ondevicemotion" in window),
		deviceorientation: ("deviceorientation" in window),
		geolocation: ("geolocation" in navigator),
		cookie: navigator.cookieEnabled
	},
	vendor: (function() {
		var vendor= {
			name: "",
			browser: "",
			prefix: "",
			transitionend: "transitionend",
			animationend: "animationend"
		};
		var navi = navigator;
		var match = uaMatch(navigator.userAgent);
		vendor.version = match.version;
		switch(match.browser) {
			case "chrome":
				vendor.name = navi.vendor;
				vendor.browser = "chrome";
				vendor.prefix = "-webkit-";
				vendor.transitionend = "webkitTransitionEnd";
				vendor.animationend = "webkitAnimationEnd";
				break;
			case "webkit":
				vendor.name = navi.vendor;
				vendor.browser = "safari";
				vendor.prefix = "-webkit-";
				vendor.transitionend = "webkitTransitionEnd";
				vendor.animationend = "webkitAnimationEnd";
				break;
			case "opera":
				vendor.name = "Opera";
				vendor.browser = "opera";
				vendor.prefix = "-o-";
				vendor.transitionend = "oTransitionEnd";
				vendor.animationend = "oAnimationEnd";
				break;
			case "msie":
				vendor.name = "Microsoft";
				vendor.browser = "ie";
				vendor.prefix = "-ms-";
				vendor.transitionend = "MSTransitionEnd";
				vendor.animationend = "MSAnimationEnd";
				break;
			case "mozilla":
				vendor.name = "Mozilla";
				vendor.browser = "Firefox";
				vendor.prefix = "-moz-";
				vendor.transitionend = "transitionend";
				vendor.animationend = "animationend";
				break;
			default:
				break;
		}
		function uaMatch(ua) {
			//jQueryのソースコード内より引用
			ua = ua.toLowerCase();
			var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
				/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
				/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
				/(msie) ([\w.]+)/.exec( ua ) ||
				ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
				[];
			
			return {
				browser: match[ 1 ] || "",
				version: match[ 2 ] || "0"
			};
		}
		return vendor;
	})(),
	flash: (function() {
		var flash = {
			version: "",
			support: false
		};
		var version = "";
		if(navigator.plugins && navigator.mimeTypes['application/x-shockwave-flash']) {
			var plugin=navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin;
			// the code below is used in SWFObject
			//var plugin=navigator.plugins['Shockwave Flash'];
			if (plugin && plugin.description) {
				// convert the description like 'Shockwave Flash 9.0 r28' into version string like '9.0.8';
				// regex is provided by SWFObject
				version=plugin.description.replace(/^[A-Za-z\s]+/, '').replace(/(\s+r|\s+b[0-9]+)/, ".");
			}
		} else { // in the case of Win IE
			var x='';
			try {
				// for ver.7 and later
				var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
				x=axo.GetVariable("$version");
			} catch(e) {
				try {
					// for ver.6
					axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
					x="WIN 6,0,21,0";
					axo.AllowScriptAccess="always";
					x=axo.GetVariable("$version");
				} catch(e) {
					if (!x.match(/^WIN/)) {
						try {
							// for 4.x,5.x
							axo=null;
							axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
							// version 3 player throws when you call GetVariale().
							x=axo.GetVariable("$version");
						} catch(e) {
							if (axo) {
								// for 3.x
								x="WIN 3,0,18,0";
							} else {
								try {
									// for 2.x
									axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
									x="WIN 2,0,0,11";
								} catch(e) {
									x="WIN 0,0,0";
								}
							}
						}
					}
				}
			}
			// convert ActiveX version string to our version string like '9.0.28'
			version=x.replace(/^WIN /,'').replace(/,[0-9]+$/,'').replace(/,/g,'.');
		}
		// check version string format
		// Quicktime enabled Safari returns a description in natural language
		if (version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/) && version !== "0,0,0") {
			flash.support = true;
			flash.version = version;
		}
		return flash;
	})(),
	device: (function() {
		var device = {
			version: "",
			retina: false,
			iPhone: false,
			iPad: false,
			android: false,
			tablet: false,
			androidTablet: false,
			androidMobile: false,
			windowsPhone: false,
			blackberry: false,
			mobile: false,
			windows: false,
			mac: false
		};
		
		var ua = navigator.userAgent;
		if (ua.search(/Android/) !== -1) {
			device.mobile = (ua.search(/Mobile/) !== -1);
			device.android = true;
			if (device.mobile) {
				device.androidMobile = true;
		    } else {
				device.androidTablet = true;
				device.tablet = true;
		    }
			device.version = getVersion(/Android (.*?);/);
		} else if (ua.search(/iPhone/) !== -1) {
			device.mobile = true;
			device.iPhone = true;
			device.version = getVersion(/OS (.*?) like Mac/);
			device.version = device.version.replace(/_/g,".");
		} else if (ua.search(/iPad/) !== -1) {
			device.tablet = true;
			device.iPad = true;
			device.version = getVersion(/OS (.*?) like Mac/);
			device.version = device.version.replace(/_/g,".");
		} else if (ua.search(/Windows Phone/) !== -1) {
			device.mobile = true;
			device.windowsPhone = true;
			device.version = getVersion(/MSIE (.*?);/);
		} else if (ua.search(/Win/) !== -1) {
			device.windows = true;
		} else if (ua.search(/Mac/) !== -1) {
			device.mac = true;
		}
		
		function getVersion(pattern) {
			var match = ua.match(pattern);
			if (match && match[1]) {
				return match[1];
			}
		}
		
		var dp = window.devicePixelRatio;
		if (dp >= 2){
			device.retina = true;
		}
		return device;
	})()
};