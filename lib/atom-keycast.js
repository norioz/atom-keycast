'use babel';

import KeycastView from './atom-keycast-view';
import { CompositeDisposable } from 'atom';

export default {

  generatedPackageView: null,
  modalPanel: null,
  subscriptions: null,

  /**
   * REQUIRED This method is called when the package is activated.
   * It is passed the state data from the last time the window was
   * serialized from the serialize() method. Use for initialization
   * (like setting up DOM elements or beinding events).
   */
  activate(state) {
    this.keycastView = new KeycastView(state.keycastViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.keycastView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-keycast:toggle': () => this.toggle()
    }));
  },

  /**
   * OPTIONAL Called whent he window is shutting down. The package should
   * release any external resources. NOTE: any subscriptions to things on
   * the current window can be ignored, as they are going to be torn down.
   */
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.keycastView.destroy();
  },

  /**
   * OPTIONAL Called when the window is shutting down. Return a JSON to
   * repreent the state of the component. When the window is later restored
   * the data is passed to the activate() method.
   */
  serialize() {
    return {
      keycastViewState: this.keycastView.serialize()
    };
  },

  toggle() {
    console.log('Keycast was toggled!');
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      let editor = atom.workspace.getActiveTextEditor();
      let words = editor.getText().split(/s+/).length;
      this.keycastView.setCount(words);
      this.modalPanel.show();
    }
  }
};
