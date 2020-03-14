/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./ctb-oda-view.html', './ctb-oda-viewModel', 'text!./component.json', 'css!./ctb-oda-styles'],
  function (Composite, view, viewModel, metadata) {
    Composite.register('ctb-oda', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);