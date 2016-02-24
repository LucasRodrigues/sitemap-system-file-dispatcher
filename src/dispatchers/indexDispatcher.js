import fs from 'fs';

export default class IndexDispatcher {
  static do(path, indexes) {
    return new Promise((resolve, rejected) => {
      indexes.forEach((content, index) => {
        const indexPath = `${path}/index_${index}.xml`;
        const writeFileCallback = err => {
          if (err) {
            rejected(err);
          } else {
            const isLastIndex = (index === indexes.length - 1);
            if (isLastIndex) {
              resolve();
            }
          }
        };

        fs.writeFile(indexPath, content, writeFileCallback);
      });
    });
  }
}
