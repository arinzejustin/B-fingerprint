/********************************************************
 * WRITTEN BY ARINZEJUSTINNG 
 * URL: https://github.com/arinzejustin/fingerprint
 * Browser-fingerprint
 * MIT VERSION(1.0.0)
 * ******************************************************/

var platform, Name, script, canvas, fingerprint, ctx, txt, strng, hash, parts, api_url, hosts, RTCPeerConnection, addrs, rtc, displayAddrs, browserDetect;

api_url = 'http://ipapi.co/json/'; 

RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

if (RTCPeerConnection)(function() {
   rtc = new RTCPeerConnection({
    iceServers: []
  });
  if (1 || window.mozRTCPeerConnection) {
    rtc.createDataChannel(' ', {
      reliable: false
    });
  };

  rtc.onicecandidate = function(evt) {
    if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
  };
  rtc.createOffer(function(offerDesc) {
    grepSDP(offerDesc.sdp);
    rtc.setLocalDescription(offerDesc);
  }, function(e) {
    console.warn("offer failed", e);
  });

  addrs = Object.create(null);
  addrs["0.0.0.0"] = false;

  function updateDisplay(newAddr) {
    if (newAddr in addrs) return;
    else addrs[newAddr] = true;
    displayAddrs = Object.keys(addrs).filter(function(k) {
      return addrs[k];
    });
    document.getElementById('list').textContent = displayAddrs.join(" or perhaps ") || "n/a";
    if (newAddr.match(/(10)\.(61)\.([0-9])\.([0-1][0-9][0-9])/g)) {
      console.log("its a match")
    } else {
      console.log("its not a match")
    }
  }

  function grepSDP(sdp) {
     hosts = [];
    sdp.split('\r\n').forEach(function(line) { 
      if (~line.indexOf("o=-")) { 
        parts = line.split(' '), 
          addr = parts[5],
          type = parts[7];
        if (type === 'host') updateDisplay(addr);
      } else if (~line.indexOf("c=IN")) {
         parts = line.split(' '),
          addr = parts[2];
        updateDisplay(addr);
      }
    });
  }
})();

fingerprint = function fingerprint() {
 platform = navigator.platform;

  Name = "Unknown OS";
 if (navigator.userAgent.indexOf("Win") != -1) 
  Name = "Windows OS";
 if (navigator.userAgent.indexOf("Mac") != -1) 
  Name = "Macintosh";
 if (navigator.userAgent.indexOf("Linux") != -1) 
  Name = "Linux OS";
 if (navigator.userAgent.indexOf("Android") != -1) 
  Name = "Android OS";
 if (navigator.userAgent.indexOf("like Mac") != -1) 
  Name = "iOS";

  canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'fingerprint');
  ctx = canvas.getContext('2d');
  txt = 'i9asdm..$#po((^@KbXrww!~cz';
  ctx.textBaseline = "top";
  ctx.font = "16px 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.rotate(.05);
  ctx.fillStyle = "#f60";
  ctx.fillRect(125,1,62,20);
  ctx.fillStyle = "#069";
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = "rgba(102, 200, 0, 0.7)";
  ctx.fillText(txt, 4, 17);
  ctx.shadowBlur=10;
  ctx.shadowColor="blue";
  ctx.fillRect(-20,10,234,5);
  strng=canvas.toDataURL();

document.body.appendChild(canvas);    
$('.fingerprint').css('display', 'none'); 

  hash=0;
  if (strng.length==0) return 'nothing!';
  for (i = 0; i < strng.length; i++) {
  char = strng.charCodeAt(i);
  hash = ((hash << 7 )-hash)+char;
  hash = hash && hash;
}
async function loC(){
const response = await fetch(api_url);
const info = await response.json();
const {latitude, longitude, country, ip } = info;
const data = {country, ip};
var expires = new Date();
expires.setMonth(expires.getMonth() + 3);
document.cookie = 'IP ADDR = '+ip+';expires='+expires+';SameSite=Lax; Secure';
const counInfo = [info.country, info.country_name]
sessionStorage.setItem('country', JSON.stringify(counInfo))
}
loC();
const datestring = new Date().toLocaleString();
var user = navigator.userAgentData.brands[2];
const array = ["user_ID : "+hash, "OS : "+Name, "platform : "+platform, user, datestring];
const y = hash+'+'+Name+'+'+platform+'+'+user+'+'+datestring;
localStorage.setItem('Info', JSON.stringify(array))
setTimeout(function(){
(new Image()).src = "http://cdn.arinzejustinng.com.ng/?browserid="+y;
}, 5000)
}
fingerprint();
