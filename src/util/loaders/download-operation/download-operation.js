const delay = delayMs => new Promise(resolve => setTimeout(resolve, delayMs));

let LOAD_OPERATION_ID = 1;

export class DownloadOperation {

  /**
   * @type {number}
   * @private
   */
  _id = LOAD_OPERATION_ID++;

  /**
   * @abstract
   * @param {string} resourceUrl
   * @return {Promise<*>}
   * @private
   */
  async download (resourceUrl) {
    return Promise.resolve();
  }

  /**
   * @param {string} resourceUrl
   * @param {number} attemptsNumber
   * @returns {Promise<*>}
   */
  async load (resourceUrl, attemptsNumber = 15) {
    return this._tryLoad(resourceUrl, attemptsNumber);
  }

  /**
   * @returns {number}
   */
  get id () {
    return this._id;
  }

  /**
   * @param {string} resourceUrl
   * @param {number} attemptsNumber
   * @returns {Promise<*>}
   * @private
   */
  _tryLoad (resourceUrl, attemptsNumber) {
    return this._tryUntil(_ => this.download(resourceUrl), attemptsNumber);
  }

  /**
   * @param {function} asyncAction
   * @param {number} maxAttemptsNumber
   * @returns {Promise<*>}
   * @private
   */
  async _tryUntil (asyncAction, maxAttemptsNumber) {
    let attempts = 0;

    while (attempts < maxAttemptsNumber) {
      try {
        const result = await asyncAction(attempts); // split by variable to prevent unhandled errors
        return result;
      } catch (e) {
        attempts++;
        await delay(25 * Math.min(10, attempts) ** 2 + 500);
      }
    }

    throw new Error('Failed to download');
  }
}
