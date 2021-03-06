
import {addClass, hasClass, removeClass} from './../../helpers/dom/element';
import {eventManager as eventManagerObject} from './../../eventManager';
import {pageX, pageY} from './../../helpers/dom/event';
import {registerPlugin} from './../../plugins';

export {ManualColumnResize};

//registerPlugin('manualColumnResize', ManualColumnResize);

/**
 * HandsontableManualColumnResize
 *
 * Has 2 UI components:
 * - handle - the draggable element that sets the desired width of the column
 * - guide - the helper guide that shows the desired width as a vertical guide
 *
 * Warning! Whenever you make a change in this file, make an analogous change in manualRowResize.js
 *
 * @private
 * @class ManualColumnResize
 * @plugin ManualColumnResize
 */
function ManualColumnResize() {
  var currentTH, currentCol, currentWidth, instance, newSize, startX, startWidth, startOffset, handle = document.createElement('DIV'),
    guide = document.createElement('DIV'),
    eventManager = eventManagerObject(this);


  handle.className = 'manualColumnResizer';
  guide.className = 'manualColumnResizerGuide';

  var saveManualColumnWidths = function() {
    var instance = this;
    Handsontable.hooks.run(instance, 'persistentStateSave', 'manualColumnWidths', instance.manualColumnWidths);
  };

  var loadManualColumnWidths = function() {
    var instance = this;
    var storedState = {};
    Handsontable.hooks.run(instance, 'persistentStateLoad', 'manualColumnWidths', storedState);
    return storedState.value;
  };

  function setupHandlePosition(TH) {
    instance = this;
    currentTH = TH;

    var col = this.view.wt.wtTable.getCoords(TH).col; //getCoords returns WalkontableCellCoords
    if (col >= 0) { //if not row header
      currentCol = col;
      var box = currentTH.getBoundingClientRect();
      startOffset = box.left - 6;
      startWidth = parseInt(box.width, 10);
      handle.style.top = box.top + 'px';
      handle.style.left = startOffset + startWidth + 'px';
      instance.rootElement.appendChild(handle);
    }
  }

  function refreshHandlePosition() {
    handle.style.left = startOffset + currentWidth + 'px';
  }

  function setupGuidePosition() {
    var instance = this;
    addClass(handle, 'active');
    addClass(guide, 'active');
    guide.style.top = handle.style.top;
    guide.style.left = handle.style.left;
    guide.style.height = instance.view.maximumVisibleElementHeight(0) + 'px';
    instance.rootElement.appendChild(guide);
  }

  function refreshGuidePosition() {
    guide.style.left = handle.style.left;
  }

  function hideHandleAndGuide() {
    removeClass(handle, 'active');
    removeClass(guide, 'active');
  }

  var checkColumnHeader = function(element) {
    if (element.tagName != 'BODY') {
      if (element.parentNode.tagName == 'THEAD') {
        return true;
      } else {
        element = element.parentNode;
        return checkColumnHeader(element);
      }
    }
    return false;
  };

  var getTHFromTargetElement = function(element) {
    if (element.tagName != 'TABLE') {
      if (element.tagName == 'TH') {
        return element;
      } else {
        return getTHFromTargetElement(element.parentNode);
      }
    }
    return null;
  };

  var bindEvents = function() {
    var instance = this;
    var pressed;
    var dblclick = 0;
    var autoresizeTimeout = null;

    eventManager.addEventListener(instance.rootElement, 'mouseover', function(e) {
      if (checkColumnHeader(e.target)) {
        var th = getTHFromTargetElement(e.target);
        if (th) {
          if (!pressed) {
            setupHandlePosition.call(instance, th);
          }
        }
      }
    });

    eventManager.addEventListener(instance.rootElement, 'mousedown', function(e) {
      if (hasClass(e.target, 'manualColumnResizer')) {
        setupGuidePosition.call(instance);
        pressed = instance;

        if (autoresizeTimeout == null) {
          autoresizeTimeout = setTimeout(function() {
            if (dblclick >= 2) {
              var hookNewSize = Handsontable.hooks.run(instance, 'beforeColumnResize', currentCol, newSize, true);

              if (hookNewSize !== void 0) {
                newSize = hookNewSize;
              }
              setManualSize(currentCol, newSize);
              instance.forceFullRender = true;
              instance.view.render(); //updates all
              instance.view.wt.wtOverlays.adjustElementsSize(true);
              Handsontable.hooks.run(instance, 'afterColumnResize', currentCol, newSize, true);
            }
            dblclick = 0;
            autoresizeTimeout = null;
          }, 500);
          instance._registerTimeout(autoresizeTimeout);
        }
        dblclick++;

        startX = pageX(e);
        newSize = startWidth;
      }
    });

    eventManager.addEventListener(window, 'mousemove', function(e) {
      if (pressed) {
        currentWidth = startWidth + (pageX(e) - startX);
        newSize = setManualSize(currentCol, currentWidth); //save col width
        refreshHandlePosition();
        refreshGuidePosition();
      }
    });

    eventManager.addEventListener(window, 'mouseup', function() {
      if (pressed) {
        hideHandleAndGuide();
        pressed = false;

        if (newSize != startWidth) {
          Handsontable.hooks.run(instance, 'beforeColumnResize', currentCol, newSize);
          instance.forceFullRender = true;
          instance.view.render(); //updates all
          instance.view.wt.wtOverlays.adjustElementsSize(true);

          saveManualColumnWidths.call(instance);

          Handsontable.hooks.run(instance, 'afterColumnResize', currentCol, newSize);
        }

        setupHandlePosition.call(instance, currentTH);
      }
    });

    instance.addHook('afterDestroy', unbindEvents);
  };

  var unbindEvents = function() {
    eventManager.clear();
  };

  this.init = function(source) {
    this.manualColumnWidths = [];

    var instance = this;
    var manualColumnWidthEnabled = !! (this.getSettings().manualColumnResize);

    if (manualColumnWidthEnabled) {
      var initialColumnWidths = this.getSettings().manualColumnResize;
      var loadedManualColumnWidths = loadManualColumnWidths.call(instance);

      // update plugin usages count for manualColumnPositions
      if (typeof instance.manualColumnWidthsPluginUsages != 'undefined') {
        instance.manualColumnWidthsPluginUsages.push('manualColumnResize');
      } else {
        instance.manualColumnWidthsPluginUsages = ['manualColumnResize'];
      }

      if (typeof loadedManualColumnWidths != 'undefined') {
        this.manualColumnWidths = loadedManualColumnWidths;
      } else if (Array.isArray(initialColumnWidths)) {
        this.manualColumnWidths = initialColumnWidths;
      } else {
        this.manualColumnWidths = [];
      }

      if (!source) {
        bindEvents.call(this);
      }
    } else {
      var pluginUsagesIndex = instance.manualColumnWidthsPluginUsages ? instance.manualColumnWidthsPluginUsages.indexOf('manualColumnResize') : -1;

      if (pluginUsagesIndex > -1) {
        unbindEvents.call(this);
        this.manualColumnWidths = [];
      }
    }
  };


  var setManualSize = function(col, width) {
    width = Math.max(width, 20);

    /**
     *  We need to run col through modifyCol hook, in case the order of displayed columns is different than the order
     *  in data source. For instance, this order can be modified by manualColumnMove plugin.
     */
    col = Handsontable.hooks.run(instance, 'modifyCol', col);
    instance.manualColumnWidths[col] = width;

    return width;
  };

  this.modifyColWidth = function(width, col) {
    col = this.runHooks('modifyCol', col);

    if (this.getSettings().manualColumnResize && this.manualColumnWidths[col]) {
      return this.manualColumnWidths[col];
    }

    return width;
  };
}
var htManualColumnResize = new ManualColumnResize();

Handsontable.hooks.add('init', htManualColumnResize.init);
Handsontable.hooks.add('afterUpdateSettings', function () {
  htManualColumnResize.init.call(this, 'afterUpdateSettings');
});
Handsontable.hooks.add('modifyColWidth', htManualColumnResize.modifyColWidth);

Handsontable.hooks.register('afterColumnResize');
Handsontable.hooks.register('beforeColumnResize');
