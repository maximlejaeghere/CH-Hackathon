/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./face-finder-view.html', './face-finder-viewModel', 'text!./component.json', 'css!./face-finder-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('face-finder', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);