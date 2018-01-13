// JavaScript Document
var thumbTop = '60px'; // distance you want you thumbnails to be from the top of their container
var loadingAni = 'images/loading.gif'; // image displayed when preloading images
var scalePercent = '300'; // percent thumbnails expand when fading into main image

// GLOBALS
var imageArray = new Array;

// Extensions to the Element class from prototype.js
Object.extend(Element, {
	removeDimensions: function(element){
	   	element = $(element);
	   	element.style.width = '';
		element.style.height = '';
	},
	removeOnclick: function(element){
	   	element = $(element);
	   	element.onclick = function(){}
	},
	setCursor: function(element, cursor){
		element = $(element);
		element.style.cursor = cursor;
	}
});

// Frog Class
var Frog = Class.create();
Frog.prototype = {
	
	// initialize()
	// Constructor runs once the page has been loaded.  It extracts any linked images within an element with id 'FrogJS' and builds the array for the FrogJS Gallery
	// It then empties the 'FrogJS' element and inserts the neccessary DOM elements to run a FrogJS gallery.  Lastly, it calls the functions to load the first image and thumbnail.
	initialize: function(){
		
		if(!document.getElementsByTagName){ return; }
		
		// Builds imageArray of all images, thumbnails, credits, and captions
		var anchors = $('javawrap').getElementsByTagName('a');
		for (var i=0; i<anchors.length; i++){
			imageArray[i] = new Array();
			imageArray[i]['full'] = anchors[i].getAttribute('href');
			imageArray[i]['credit'] = anchors[i].getAttribute('title');
			imageArray[i]['thumb'] = anchors[i].getElementsByTagName('img')[0].getAttribute('src');
			imageArray[i]['caption'] = anchors[i].getElementsByTagName('img')[0].getAttribute('alt');
			imageArray[i]['link'] = anchors[i].getAttribute('rel');
		}
		
		//-----------------------------------------
		// Inserting new HTML elements into 'FrogJS' Element
		//-----------------------------------------
		var ribbit = $('javawrap');
		ribbit.innerHTML = '';
		ribbit.style.position = 'relative';
		ribbit.style.display = 'block';
		ribbit.style.textAlign = 'center';
		
		var mainContainer = document.createElement("div");
		mainContainer.setAttribute('id','javawrapMainContainer');
		mainContainer.style.margin = '0 auto';
		ribbit.appendChild(mainContainer);
		
		var mainImage = document.createElement("img");
		mainImage.setAttribute('id','javawrapImage');
		mainImage.style.display = 'none';
		mainContainer.appendChild(mainImage);
		
		var credit = document.createElement("div");
		credit.setAttribute('id','javawrapCredit');
		mainContainer.appendChild(credit);
		
		var caption = document.createElement("div");
		caption.setAttribute('id','javawrapCaption');
		mainContainer.appendChild(caption);
		
		var loadingImg = document.createElement("img");
		loadingImg.setAttribute('id','javawrapLoadingAni');
		loadingImg.src = loadingAni;
		loadingImg.style.display = 'none';
		loadingImg.style.position = 'absolute';
		loadingImg.style.top = thumbTop;
		ribbit.appendChild(loadingImg);
		
		var rThumb1 = document.createElement("img");
		rThumb1.setAttribute('id','javawraprightThumb1');
		rThumb1.style.display = 'none';
		rThumb1.style.position = 'absolute';
		rThumb1.style.top = thumbTop;
		rThumb1.style.right = '0';
		rThumb1.style.cursor = 'pointer';
		ribbit.appendChild(rThumb1);
		
		var lThumb1 = document.createElement("img");
		lThumb1.setAttribute('id','javawrapleftThumb1');
		lThumb1.style.display = 'none';
		lThumb1.style.position = 'absolute';
		lThumb1.style.top = thumbTop;
		lThumb1.style.left = '0';
		lThumb1.style.cursor = 'pointer';
		ribbit.appendChild(lThumb1);
		
		var rThumb2 = document.createElement("img");
		rThumb2.setAttribute('id','javawraprightThumb2');
		rThumb2.style.display = 'none';
		rThumb2.style.position = 'absolute';
		rThumb2.style.top = thumbTop;
		rThumb2.style.right = '0';
		ribbit.appendChild(rThumb2);
		
		var lThumb2 = document.createElement("img");
		lThumb2.setAttribute('id','javawrapleftThumb2');
		lThumb2.style.display = 'none';
		lThumb2.style.position = 'absolute';
		lThumb2.style.top = thumbTop;
		lThumb2.style.left = '0';
		ribbit.appendChild(lThumb2);
		//-----------------------------------------
		// End Inserting new elements
		//-----------------------------------------
		
		// Preloads first image and displays image along with next thumbnail
		var myjavawrap = this; // IE can't use the global `myFrog` until it's been initialized
		var imgPreloader = new Image();
		imgPreloader.onload=function(){
			myFrog.loadMainImage(0, imgPreloader.width);
			myFrog.thumbIn(1, 'right');
		}
		imgPreloader.src = imageArray[0]['full'];
	},
	
	// loadImage()
	// Loads main image and updates thumbnails accordingly.  Uses all other functions of the Frog class.
	loadImage: function(imageNum, side, width){
		
		myFrog.loadMainImage(imageNum, width);

		if(side=='right'){
			myjava.mainIn(imageNum, 'right');
			myjava.thumbIn(imageNum+1, 'right');
			myjava.mainOut(imageNum-1, 'left');
			myjava.thumbOut(imageNum-2, 'left');
		}else{
			myjava.mainIn(imageNum, 'left');
			myjava.thumbIn(imageNum-1, 'left');
			myjava.mainOut(imageNum+1, 'right');
			myjava.thumbOut(imageNum+2, 'right');
		}
	},
	
	// loadMainImage()
	// Fades out old main image and fades in new one.  Also updates credit and caption
	loadMainImage: function(imageNum, width){
		Element.setCursor('javawrapImage','');
		$('javawrapImage').onclick = function(){};
		new Effect.Fade('javawrapMainContainer', { duration:0.5, afterFinish: function(){ showMainImage(); } });
		function showMainImage(){
			$('javawrapImage').style.display = 'block';
			$('javawrapImage').src = imageArray[imageNum]['full'];
			$('javawrapMainContainer').style.width = width+'px';
			$('javawrapCredit').innerHTML = imageArray[imageNum]['credit'];
			$('javawrapCaption').innerHTML = imageArray[imageNum]['caption'];
			new Effect.Appear('javawrapMainContainer', { duration: 0.5, afterFinish: function(){ addOnclick(); } });
			function addOnclick(){
				if(imageArray[imageNum]['link']){
					Element.setCursor('javawrapImage','pointer');
					$('javawrapImage').onclick = function(){
						location.href = imageArray[imageNum]['link'];
					}
				}
			}
		}
	},
	
	// thumbIn()
	// Loads in new thumbnail and preloads image if neccessary
	thumbIn: function(imageNum, side){
		Element.hide('javawrap'+side+'Thumb1');
		if(imageArray[imageNum]){
			Element.setCursor('javawrap'+side+'Thumb1','');
			$('javawrapLoadingAni').style.left = (side=='left') ? '0' : '';
			$('javawrapLoadingAni').style.right = (side=='right') ? '0' : '';
			Element.show('javawrapLoadingAni');
			var imgPreloader = new Image();
			imgPreloader.onload=function(){
				Element.hide('javawrapLoadingAni');
				Element.removeDimensions('javawrap'+side+'Thumb1');
				Element.setCursor('javawrap'+side+'Thumb1','');
				$('javawrap'+side+'Thumb1').onclick = function(){};
				$('javawrap'+side+'Thumb1').src = imageArray[imageNum]['thumb'];
				new Effect.Appear('javawrap'+side+'Thumb1',{duration:1.0});
				new Effect.Scale('javawrap'+side+'Thumb1', 100, { duration: 1.0, scaleFrom: 0.1, afterFinish: function(){ addOnclick(); } });
				function addOnclick(){
					Element.setCursor('javawrap'+side+'Thumb1','pointer');
					$('javawrap'+side+'Thumb1').onclick = function(){
						myFrog.loadImage(imageNum, side, imgPreloader.width);
						Element.removeOnclick('javawrapleftThumb1');
						Element.removeOnclick('javawraprightThumb1');
					}
				}
			}
			imgPreloader.src = imageArray[imageNum]['full'];
		}
	},
	
	// thumbOut()
	// Removes old thumbnail
	thumbOut: function(imageNum, side){
		if(imageArray[imageNum]){
			$('javawrap'+side+'Thumb2').src = imageArray[imageNum]['thumb'];
			Element.show('javawrap'+side+'Thumb2');
			Element.removeDimensions('javawrap'+side+'Thumb2');
			new Effect.Fade('javawrap'+side+'Thumb2',{duration:1.0});
			new Effect.Scale('javawrap'+side+'Thumb2', 0, { duration: 1.0, scaleFrom: 100 });
		}
	},
	
	// mainIn()
	// Fades thumbnail into main image
	mainIn: function(imageNum, side){
		$('javawrap'+side+'Thumb2').src = imageArray[imageNum]['thumb'];
		Element.removeDimensions('javawrap'+side+'Thumb2');
		Element.show('javawrap'+side+'Thumb2');
		new Effect.Fade('javawrap'+side+'Thumb2',{duration:1.0});
		new Effect.Scale('javawrap'+side+'Thumb2', scalePercent, { duration: 1.0 });
	},
	
	// mainOut()
	// Fades old main image into thumbnail
	mainOut: function(imageNum, side){
		Element.hide('javawrap'+side+'Thumb1');
		if(imageArray[imageNum]){
			Element.setCursor('javawrap'+side+'Thumb1','');
			var imgPreloader = new Image();
			imgPreloader.onload=function(){
				Element.removeDimensions('javawrap'+side+'Thumb1');
				$('javawrap'+side+'Thumb1').src = imageArray[imageNum]['thumb'];
				new Effect.Appear('javawrap'+side+'Thumb1',{duration:1.0});
				new Effect.Scale('javawrap'+side+'Thumb1', 100, { duration: 1.0, scaleFrom: scalePercent, afterFinish: function(){ addOnclick(); } });
				function addOnclick(){
					Element.setCursor('javawrap'+side+'Thumb1','pointer');
					$('javawrap'+side+'Thumb1').onclick = function(){
						myFrog.loadImage(imageNum, side, imgPreloader.width);
						Element.removeOnclick('javawrapleftThumb1');
						Element.removeOnclick('javawraprightThumb1');
					}
				}
			}
			imgPreloader.src = imageArray[imageNum]['full'];	
		}
	}
}

// It's time for this frog to hop
function initjava(){ myjava = new java(); }
Event.observe(window, 'load', initjava, false);