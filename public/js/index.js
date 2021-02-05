const cam = document.getElementById('video')
let abc;
const startVideo = () => {
    // navigator.mediaDevices.enumerateDevices()
    // .then(devices => {
    //     if (Array.isArray(devices)) {
    //         devices.forEach(device => {
    //             if (device.kind === 'videoinput') {
    //                 if (device.label.includes('C920')) {
    //                     navigator.getUserMedia(
    //                         { video: {
    //                             deviceId: device.deviceId
    //                         }},
    //                         stream => cam.srcObject = stream,
    //                         error => console.error(error)
    //                     )
    //                 }
    //             }
    //         })
    //     }
    // })
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
      )
}
let result=[];
let labelAll=[];
let labels;
const loadLabels = async () => {
    
    $.ajax({
        url: 'http://localhost:3000/test',
        type: 'GET',
        dataType: 'json'
    }).done(function(res) {
        let fulllabel = [];
        let descriptions = [];
        for(i=0; i<res.length; i++){
            fulllabel.push(res[i].employee_name);
            descriptions.push(new Float32Array(JSON.parse("["+res[i].descriptions+"]")));
            if((i+1)%5==0){
                result.push(descriptions);
                descriptions = [];
            }
        }
        labelAll = [...new Set(fulllabel)];
    });                
}

const loadAll = ()=>{
    return Promise.all(labelAll.map(async (label, index) => {
        return new faceapi.LabeledFaceDescriptors(label, result[index])
    }))
}

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    labels = loadAll(),
]).then(startVideo)

cam.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(cam)
    const canvasSize = {
        width: cam.width,
        height: cam.height
    }
    const x = await loadLabels()
    labels = await loadAll()
    abc = labels;
    console.log(labels);
    faceapi.matchDimensions(canvas, canvasSize)
    document.body.appendChild(canvas)
    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(
                cam,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions()
            //.withAgeAndGender()
            .withFaceDescriptors()
            //.descriptor
            //console.log("detections");
            //console.log(detections.descriptor);
        const resizedDetections = faceapi.resizeResults(detections, canvasSize)
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.6)
        const results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        // resizedDetections.forEach(detection => {
        //     const { age, gender, genderProbability } = detection
        //     new faceapi.draw.DrawTextField([
        //         `${parseInt(age, 10)} years`,
        //         `${gender} (${parseInt(genderProbability * 100, 10)})`
        //     ], detection.detection.box.topRight).draw(canvas)
        // })
        results.forEach((result, index) => {
            const box = resizedDetections[index].detection.box
            const { label, distance } = result
            if(label!='unknown'){
                $.ajax({
                    url: 'http://localhost:3000/checkin',
                    type: 'POST',
                    dataType: 'html',
                    data: {
                        employeeId : 1,
                        employeeName: label
                    }

                }).done(function() {
                    console.log("a");
                });
            }
            new faceapi.draw.DrawTextField([
                `${label} (${parseInt(distance * 100, 10)})`
            ], box.bottomRight).draw(canvas)
        })
    }, 100)
})
