'use babel';

import GeneratedPackageView from './generated-package-view';
import { CompositeDisposable } from 'atom';

export default {

  generatedPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.generatedPackageView = new GeneratedPackageView(state.generatedPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.generatedPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'generated-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.generatedPackageView.destroy();
  },

  serialize() {
    return {
      generatedPackageViewState: this.generatedPackageView.serialize()
    };
  },

  toggle() {
    console.log('GeneratedPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
