import { DownloadOperation } from './download-operation';

export class ImageLoader extends DownloadOperation {

  /**
   * @param {string} imageUrl
   * @returns {Promise<*>}
   * @private
   */
  async download (imageUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = event => resolve( image );
      image.onerror = error => reject( error );

      image.src = imageUrl;
    });
  }
}
