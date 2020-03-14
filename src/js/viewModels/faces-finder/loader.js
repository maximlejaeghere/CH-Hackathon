/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./faces-finder-view.html', './faces-finder-viewModel', 'text!./component.json', 'css!./faces-finder-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('faces-finder', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);