Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90

});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image"src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3ghw0P_ie/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}


function Speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image'),
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;

        gesture = results[0].label;
        toSpeak = "";

        
        if(gesture == "amazing"){
            toSpeak = "this is looking amazing";
            document.getElementById("update_gesture").innerHTML = "&#128076;";

        }
       else if(gesture == "good"){
            toSpeak = ""
            document.getElementById("update_gesture").innerHTML = "&#128077;";

        }
        else if(gesture == "bad"){
            toSpeak = ""
            document.getElementById("update_gesture").innerHTML = "&#128078;";

        }
        else if(results[0].label == 'peace'){
            toSpeak = ""
            document.getElementById("update_gesture").innerHTML = "&#9996;";

        }
        speak();
    }
}