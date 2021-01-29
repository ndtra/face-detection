var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
const loadLabels = () => {
    const labels = getUrlParameter("name");
    console.log(labels);
    // labels.map(async label => {
    //     for (let i = 1; i <= 10; i++) {
    //         const img = await faceapi.fetchImage(`/js/labels/${label}/${i}.jpg`)
    //         const detections = await faceapi
    //             .detectSingleFace(img)
    //             .withFaceLandmarks()
    //             .withFaceDescriptor()
    //         $.ajax({
    //             url: 'http://localhost:3000/train',
    //             type: 'POST',
    //             dataType: 'html',
    //             data: {
    //                 name: label,
    //                 descriptions: detections.descriptor
    //             }
    //         }).done(function() {
    //             console.log("a");
    //         });
            
    //     }
    //     console.log(descriptions);
    // });
}

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
]).then(loadLabels)

// cam.addEventListener('play', async () => {
//     const canvas = faceapi.createCanvasFromMedia(cam)
//     const canvasSize = {
//         width: cam.width,
//         height: cam.height
//     }
//     const labels = await loadLabels()
//     abc = labels;
//     console.log(labels);
//     faceapi.matchDimensions(canvas, canvasSize)
//     document.body.appendChild(canvas)
//     setInterval(async () => {
//         const detections = await faceapi
//             .detectAllFaces(
//                 cam,
//                 new faceapi.TinyFaceDetectorOptions()
//             )
//             .withFaceLandmarks()
//             .withFaceExpressions()
//             //.withAgeAndGender()
//             .withFaceDescriptors()
//             //.descriptor
//             //console.log("detections");
//             //console.log(detections.descriptor);
//         const resizedDetections = faceapi.resizeResults(detections, canvasSize)
//         const faceMatcher = new faceapi.FaceMatcher(abc, 0.6)
//         const results = resizedDetections.map(d =>
//             faceMatcher.findBestMatch(d.descriptor)
//         )
//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//         faceapi.draw.drawDetections(canvas, resizedDetections)
//         //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//         //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//         // resizedDetections.forEach(detection => {
//         //     const { age, gender, genderProbability } = detection
//         //     new faceapi.draw.DrawTextField([
//         //         `${parseInt(age, 10)} years`,
//         //         `${gender} (${parseInt(genderProbability * 100, 10)})`
//         //     ], detection.detection.box.topRight).draw(canvas)
//         // })
//         results.forEach((result, index) => {
//             const box = resizedDetections[index].detection.box
//             const { label, distance } = result
//             new faceapi.draw.DrawTextField([
//                 `${label} (${parseInt(distance * 100, 10)})`
//             ], box.bottomRight).draw(canvas)
//         })
//     }, 100)
// })
