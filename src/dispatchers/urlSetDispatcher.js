import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

export default class UrlSetDispatcher {
  static do(basePath, urlSets) {
    return new Promise((resolve, rejected) => {
      let promises = [];
      urlSets.forEach(theme => {
        promises.push(this._saveTheme(basePath, theme));
      });

      Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch(err => {
          rejected(err);
        });
    });
  }

  static _saveTheme(basePath, theme) {
    return new Promise((resolve, rejected) => {
      const themePath = path.join(basePath, `${theme.name}`);
      const mkdirpCallback = err => {
        if (err) {
          rejected(err);
        } else {
          theme.urlSets.forEach((content, index) => {
            const urlSetPath = `${themePath}/urlSet_${index}.xml`;
            const writeFileCallback = err => {
              if (err) {
                rejected(err);
              } else {
                const isLastIndex = (index === theme.urlSets.length - 1);
                if (isLastIndex) {
                  resolve();
                }
              }
            };
            fs.writeFile(urlSetPath, content, writeFileCallback);
          });
        }
      };
      mkdirp(themePath, mkdirpCallback);
    });
  }
}
