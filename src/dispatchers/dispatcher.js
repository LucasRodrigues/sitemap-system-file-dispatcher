import UrlSetDispatcher from './urlSetDispatcher';
import IndexDispatcher from './indexDispatcher';
import mkdirp from 'mkdirp';
import path from 'path';

export default class Dispatcher {
  static do(basePath, content) {
    return new Promise((resolve, rejected) => {
      const newBasePath = path.join(basePath, this._folderName());
      this._createBaseFolder(newBasePath)
        .then(() => {
          return IndexDispatcher.do(newBasePath, content.indexes);
        })
        .then(() => {
          return UrlSetDispatcher.do(newBasePath, content.urlSets);
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          rejected(err);
        });
    });
  }

  static _createBaseFolder(basePath) {
    return new Promise((resolve, rejected) => {
      mkdirp(basePath, err => {
        if (err) {
          rejected(err);
        } else {
          resolve(basePath);
        }
      });
    });
  }

  static _folderName() {
    const date = new Date();

    return `${date.getFullYear()}_${date.getMonth() + 1}_` +
      `${date.getDate()}_${date.getHours()}_${date.getMinutes()}_` +
      `${date.getSeconds()}_sitemap`;
  }
}
