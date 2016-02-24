import sitemapSystem from 'sitemap-system';
import Dispatcher from './dispatchers/dispatcher';

export default class Orchestrator {
  static do(configuration) {
    return new Promise((resolve, reject) => {
      sitemapSystem.do(configuration)
        .then(sitemap => {
          return Dispatcher.do(configuration.path, sitemap);
        })
        .then(name => {
          resolve(name);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
