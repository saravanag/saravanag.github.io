(function(winObj){
  console.log(winObj);
  var localStream;
  var captured = false;
  var globImg;
  var brit;
  var contrast;
  var exposure;
  var saturation
  var vibrance;
  var sharpen;
  var sepia;
  var curEffect='normal';
  function fnLoad(){
  	brit = document.querySelector('#brightness');
  	contrast = document.querySelector('#contrast');
  	saturation = document.querySelector('#saturation');
  	exposure = document.querySelector('#exposure');
  	vibrance = document.querySelector('#vibrance');
  	sharpen = document.querySelector('#sharpen');
  	sepia = document.querySelector('#sepia');
  	var lastImg = null;
  	document.querySelector('.captureBtn').addEventListener('click', fnCaptureImg, false);
  	document.querySelector('#save').addEventListener('click', fnSaveImg, false);
  	document.querySelector('#fb').addEventListener('click', fnPubFacebook, false);
  	var inputs = document.querySelectorAll('input[type="range"]');
  	console.log(inputs);
  	for(var k=0,input;input=inputs[k];k++){
  		input.addEventListener('change', fnChgProp, false);
  	}
    var spn3 = document.getElementById('spn3');
  	spn3.addEventListener('animationend',function(){console.log('ssss')
  		var rect= document.getElementById('logoCont').getBoundingClientRect();
  		var imgCapture = document.getElementById('imgCapture');
  		imgCapture.style.top = rect.top+'px';
  		imgCapture.style.left = rect.left+'px';
  		imgCapture.style.display='block';
  		setTimeout(function(){
  		imgCapture.style.top=((window.innerHeight -imgCapture.clientHeight)/2)+'px';
  		imgCapture.style.left=((window.innerWidth -imgCapture.clientWidth)/2)+'px';
  		document.querySelector('.capImg').style.width='300px';
  		navigator.webkitGetUserMedia({audio:true, video:true}, function(stream) {
  			localStream = stream;
  			window.addEventListener('keyup', fnCaptureImg, false);
  			document.querySelector('.capArea').style.display='block';
  		var video = document.querySelector('video');
    	video.src = window.webkitURL.createObjectURL(stream);
	 		setInterval(fnVideoCapture,60);
		}, onFail);
		function onFail(){
			console.log("Not supported");
		}
  		},2);
  		console.log(document.querySelector('.headTxt'));
  		document.querySelector('.headTxt').style.opacity=0;
  		document.querySelector('.logoCont').style.opacity=1;
	},false);
  }
  function fnVideoCapture(){
  	var video=document.querySelector("video");
	var newCan=document.createElement("canvas");
	newCan.width=500;
	newCan.height=500;
	newCan.getContext("2d").drawImage(video,0,0);
	var can=document.querySelector(".vidCap")
	var img=new Image();
	img.onload=function(){
		can.getContext("2d").drawImage(this,0,0,110,110);
		lastImg = can.toDataURL();
	}
	img.src=newCan.toDataURL();
  }
  function fnCaptureImg(){
  	if(captured)return;
  	captured = true;
  	window.removeEventListener('keyup', fnCaptureImg);
  	console.log(lastImg)
  	localStream.stop();
  	document.querySelector('.imgCap').src = lastImg;
  	Caman('.imgCap', globImg, function(){
  			this.revert(false);
  			this.brightness(0).render();
  		})
  	var hei = window.innerHeight - document.querySelector('.header').clientHeight;
  	var effects = document.querySelector('.effects');
  	effects.style.height = hei+'px';
  	document.getElementById('normalImg').src = lastImg;
  	document.querySelector('.capArea').style.display='none';
  	var effect = ['vintage', 'lomo', 'clarity', 'sinCity', 'sunrise', 'crossProcess', 'orangePeel', 'love', 'grungy', 'jarques', 'pinhole', 'oldBoot', 'glowingSun', 'hazyDays', 'herMajesty', 'nostalgia', 'hemingway', 'concentrate'];
  	var frameSet = document.querySelector('#frameSet');
  	frameSet.innerHTML='';
  	for(var i=0;i<19;i++){
  		var frame = document.createElement('div');
  		frame.className = 'frame';
  		var img = new Image();
  		img.src = lastImg;
  		img.id = 'img'+i;
  		frame.appendChild(img);
  		frame.setAttribute('effect',i);
  		frame.addEventListener('click', fnApplyEffect, false);
  		frameSet.appendChild(frame);
  	}
  	setTimeout(function(){var can=document.querySelector(".vidCap")
  	var img1 = new Image();
  	img1.onload = function(){
  		can.getContext("2d").drawImage(this,0,0,110,110);
  	}
  	globImg = img1;
  	img1.src = lastImg;
  	document.querySelector('.vidCap').style.display='none';
  	document.querySelector('.imgCap').style.display='block';
  	effects.style.left='0px';
  	document.querySelector('.props').style.right='0px';
  	document.querySelector('.finCont').style.display='block';
  },200);
  	applyEffect(0);
  }
  function applyEffect(i){
  	console.log(i);
  	if(i>18)return;
  		Caman('#img'+i, function () {
  			if(i === 0){
  				this.vintage();
  			}else if(i === 1){
  				this.lomo();
  			}else if(i === 2){
  				this.clarity();
  			}else if(i == 3){
  				this.sinCity();
  			}else if(i === 4){
  				this.sunrise();
  			}
  			else if(i === 5){
  				this.crossProcess();
  			}
  			else if(i === 6){
  				this.orangePeel();
  			}
  			else if(i === 7){
  				this.love();
  			}
  			else if(i === 8){
  				this.grungy();
  			}
  			else if(i === 9){
  				this.jarques();
  			}
  			else if(i === 10){
  				this.pinhole();
  			}
  			else if(i === 11){
  				this.oldBoot();
  			}
  			else if(i === 12){
  				this.glowingSun();
  			}
  			else if(i === 13){
  				this.sunrise();
  			}
  			else if(i === 14){
  				this.hazyDays();
  			}
  			else if(i === 15){
  				this.herMajesty();
  			}
  			else if(i === 16){
  				this.nostalgia();
  			}
  			else if(i === 17){
  				this.hemingway();
  			}
  			else if(i === 18){
  				this.concentrate();
  			}
  			this.render();
  			i+=1;
  			applyEffect(i);
  		});
  	}
  	function fnChgProp(){
  		var val = this.value;
  		this.parentNode.parentNode.querySelector('.filterVal').innerHTML=val;
  		var britVal = brit.value;
  		var contVal = contrast.value;
  		var satVal = saturation.value;
  		var expVal = exposure.value;
  		var vibVal = vibrance.value;
  		var sharval = sharpen.value;
  		var sepVal = sepia.value;
  		var i = curEffect;
		Caman('.imgCap', globImg, function(){
  			this.revert(false);
  			this.brightness(britVal).contrast(contVal).saturation(satVal).exposure(expVal).vibrance(vibVal).sharpen(sharval).sepia(sepVal);
  			if(i === 0){
  				this.vintage();
  			}else if(i === 1){
  				this.lomo();
  			}else if(i === 2){
  				this.clarity();
  			}else if(i == 3){
  				this.sinCity();
  			}else if(i === 4){
  				this.sunrise();
  			}
  			else if(i === 5){
  				this.crossProcess();
  			}
  			else if(i === 6){
  				this.orangePeel();
  			}
  			else if(i === 7){
  				this.love();
  			}
  			else if(i === 8){
  				this.grungy();
  			}
  			else if(i === 9){
  				this.jarques();
  			}
  			else if(i === 10){
  				this.pinhole();
  			}
  			else if(i === 11){
  				this.oldBoot();
  			}
  			else if(i === 12){
  				this.glowingSun();
  			}
  			else if(i === 13){
  				this.sunrise();
  			}
  			else if(i === 14){
  				this.hazyDays();
  			}
  			else if(i === 15){
  				this.herMajesty();
  			}
  			else if(i === 16){
  				this.nostalgia();
  			}
  			else if(i === 17){
  				this.hemingway();
  			}
  			else if(i === 18){
  				this.concentrate();
  			}
  			this.render();
  		})
  	}
  	function fnApplyEffect(){
  		var i = parseInt(this.getAttribute('effect'));
  		var img = new Image();
  		curEffect = i;
  		img.onload = function(){
  			document.querySelector('.imgCap').getContext("2d").drawImage(this,0,0);
  			//document.querySelector('.imgCap').onload=function(){};
  		console.log(i);
  		console.log('varuthu');
  		var britVal = brit.value;
  		var contVal = contrast.value;
  		var satVal = saturation.value;
  		var expVal = exposure.value;
  		var vibVal = vibrance.value;
  		var sharval = sharpen.value;
  		var sepVal = sepia.value;
  		Caman('.imgCap', function () {
  			this.revert(false);
  			console.log(this);
  			this.brightness(britVal).contrast(contVal).saturation(satVal).exposure(expVal).vibrance(vibVal).sharpen(sharval).sepia(sepVal);
  			if(i === 0){
  				this.vintage();
  			}else if(i === 1){
  				this.lomo();
  			}else if(i === 2){
  				this.clarity();
  			}else if(i == 3){
  				this.sinCity();
  			}else if(i === 4){
  				this.sunrise();
  			}
  			else if(i === 5){
  				this.crossProcess();
  			}
  			else if(i === 6){
  				this.orangePeel();
  			}
  			else if(i === 7){
  				this.love();
  			}
  			else if(i === 8){
  				this.grungy();
  			}
  			else if(i === 9){
  				this.jarques();
  			}
  			else if(i === 10){
  				this.pinhole();
  			}
  			else if(i === 11){
  				this.oldBoot();
  			}
  			else if(i === 12){
  				this.glowingSun();
  			}
  			else if(i === 13){
  				this.sunrise();
  			}
  			else if(i === 14){
  				this.hazyDays();
  			}
  			else if(i === 15){
  				this.herMajesty();
  			}
  			else if(i === 16){
  				this.nostalgia();
  			}
  			else if(i === 17){
  				this.hemingway();
  			}
  			else if(i === 18){
  				this.concentrate();
  			}
  			this.render();
  		});
	}
	img.src = globImg.src;
  	}
  	function fnSaveImg(service){
  		console.log('bbbb');
  		var can = document.createElement('canvas');
  		can.width = 400;
  		can.height = 500;
  		var cont = can.getContext('2d');
  		var img = new Image();
  		img.onload = function(){
  			console.log('1111');
  			cont.drawImage(this,50, 12, 300, 474);
  			var img2 = new Image();
  			img2.onload = function(){
  				cont.save();
    			cont.beginPath();
    			cont.arc(200, 325, 55, 0, Math.PI * 2, true);
    			cont.closePath();
    			cont.clip();
    			cont.drawImage(this, 145, 270, 110, 110);
			    cont.beginPath();
    			cont.arc(145, 270, 55, 0, Math.PI * 2, true);
    			cont.clip();
    			cont.closePath();
    			cont.restore();
  				//cont.drawImage(this,145, 270, 110, 110);
  				//document.body.appendChild(can);
  				var imgUrl  = can.toDataURL('png');
  				if(service){
  					var byteString = imgUrl.toString().trim().split(',')[1];
    				var fd = new FormData();
    				fd.append("image", byteString);
    				fd.append("type", "base64");
    				var xhr = new XMLHttpRequest();
    				xhr.open("POST", "https://api.imgur.com/3/image");
    				xhr.setRequestHeader("Authorization","Client-ID 890440013535033");
    				xhr.setRequestHeader("Accept","application/json");
    				xhr.onload = function() {
        				var img = JSON.parse(this.responseText).data.id;
        				console.log(img);
        				socialSharePublish(service,img);
    				}
    				xhr.send(fd);
  				}
  			}
  			img2.src = document.querySelector(".imgCap").toDataURL();
  		}
  		img.src = "images/logo.png";
  	}
  	function fnPubFacebook(){
  		fnSaveImg('facebook');
  	}
  	function socialSharePublish(service,img) {
    var url;
    if(service == "twitter") {
        url = "https://twitter.com/intent/tweet?text=Here+is+my+CWC6+Gravator&url=http%3A%2F%2F"+encodeURIComponent("imgur.com/"+img);//NO I18N
    }
    else if(service == "facebook") {
    	console.log('eeee');
        //url = "https://www.facebook.com/dialog/feed?_path=feed&app_id=454391987937294&redirect_uri=https%3A%2F%2Fsites.zoho.com%2Fhtml%2Fwindowclose.html&display=popup&link=http%3A%2F%2F"+("imgur.com/"+img)+"%2F&name="+encodeURIComponent("CWC6 Gravator")+"&display=popup";//NO I18N
  var wallPost = {
    message: "CWC6 gravator create yours at http://localhost:8090/CWC/",
    picture: "http://imgur.com/"+img
  };
  FB.api('/me/feed', 'post', wallPost , function(response) {
    if (!response || response.error) {
      alert('Failure! ' + response.status + ' You may logout once and try again');
    } else {
      alert('Success! Post ID: ' + response);
    }
  });
    }
    else {
        return;
    }
    //window.open(url,"_blank","socialshare,height=420,width=550,left=100,top=100");
	}

  window.onload=fnLoad;
})(window)