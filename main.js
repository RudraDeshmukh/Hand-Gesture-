Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("Camera");
Webcam.attach(camera);

function capture_image(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    })

}
console.log("ml5 version:",ml5.version)

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IdRUj3l7_/model.json',modelloaded)

function modelloaded(){
    console.log("modelloaded")
}

function speak(){
    var synth=window.speechSynthesis;
    speech_data_1="The first prediction is " + prediction1;
    var utterThis= new SpeechSynthesisUtterance(speech_data_1);
    synth.speak(utterThis);

}
prediction1="";

function check(){
    img=document.getElementById("capture_image")
    classifier.classify(img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error)
    }else{
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label
        prediction1=results[0].label
        speak();

        if(prediction1 == "Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;"
        }
        if(prediction1 == "Best"){
            document.getElementById("update_emoji").innerHTML="&#128077;"
        }
        if(prediction1 == "Nice"){
            document.getElementById("update_emoji").innerHTML="&#128076;"
        }
    }
}
