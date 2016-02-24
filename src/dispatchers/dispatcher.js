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
          resolve(newBasePath);
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
    const addZeroIfLessThen10 = (value){
      return value < 10 ? "0" + value : value;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = addZeroIfLessThen10(date.getMonth());
    const day = addZeroIfLessThen10(date.getDate());
    const hours = addZeroIfLessThen10(date.getHours());
    const minutes = addZeroIfLessThen10(date.getMinutes());
    const seconds = addZeroIfLessThen10(date.getSeconds());

    return `${year}${month}${day}${hours}${minutes}${seconds}_sitemap`;
  }
}
