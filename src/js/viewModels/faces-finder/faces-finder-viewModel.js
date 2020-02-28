/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
  ['knockout', 'ojL10n!./resources/nls/faces-finder-strings', 'ojs/ojcontext', 'ojs/ojknockout'], function (ko, componentStrings, Context) {

    function ExampleComponentModel(context) {
      var self = this;

      //At the start of your viewModel constructor
      var busyContext = Context.getContext(context.element).getBusyContext();
      var options = { "description": "Web Component Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      self.properties = context.properties;
      self.res = componentStrings['faces-finder'];
      // the link to your model provided by Teachable Machine export panel
      const URL = "./model/";
      // variable to hold our objects
      let model, webcam, labelContainer, maxPredictions;

      // Load the image model and setup the webcam
      async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();

        // hoock into the event cycle and call loop
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");

        for (let i = 0; i < maxPredictions; i++) { // and class labels
          labelContainer.appendChild(document.createElement("div"));
        }
      }

      async function loop() {
        webcam.update(); // update the webcam frame
        await predict(); // try to guess the face
        window.requestAnimationFrame(loop); // call loop every frame
      }

      // run the webcam image through the image model
      async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas); // prediction will hold the guess
        console.log(prediction)
        for (let i = 0; i < maxPredictions; i++) {
          const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
          labelContainer.childNodes[i].innerHTML = classPrediction;
        }
      }

      init()
      //Once all startup and async activities have finished, relocate if there are any async activities
      self.busyResolve();
    };


    return ExampleComponentModel;
  });