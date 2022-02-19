class RangeList {
  /**
   * Adds a initial range.
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  constructor(range) {
    // All beginning and end points. [1, 3, 5, 7] prints '[1, 3) [5, 7)'
    this.points = this.validateInput(range) ? range : [];
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    this.updateByRange(range, true);
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    this.updateByRange(range, false);
  }

  /**
   * @param {Array<number>} range - Array of two integers than specify begnning and end of range,
   *    and beginning is smaller.
   * @returns True for valid
   */
  validateInput(range) {
    return Array.isArray(range) && range.length == 2 && range[0] <= range[1];
  }

  /**
   * Update the list.
   * Add and remove is almost same.
   * 
   * @param {Array<number>} range Input range after validating.
   * @param {Boolean} isAdding
   */
  updateByRange(range, isAdding) {
    if (!this.validateInput(range)) {
      return;
    }

    const [beginning, end] = range;
    const beginningRangeIndex = this.getRangeIndex(beginning);
    const endRangeIndex = this.getRangeIndex(end, beginningRangeIndex);

    var spliceNewItems = [];
    if (isAdding != this.include(beginningRangeIndex)) {
      spliceNewItems.push(beginning);
    }
    if (isAdding != this.include(endRangeIndex)) {
      spliceNewItems.push(end);
    }

    this.points.splice(beginningRangeIndex, endRangeIndex - beginningRangeIndex, ...spliceNewItems);
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    let rangeList = [];
    for (let i = 0; i < this.points.length; i += 2) {
      rangeList.push(`[${this.points[i]}, ${this.points[i + 1]})`);
    }
    let result = rangeList.join(' ');
    console.log(result);
    return result;
  }

  /**
   * All points split space into n+1 ranges ('inner range').
   * RangeList consists of the odd-index ones.
   * 
   * Find which range the new point belongs to.
   * 
   * @param {number} value 
   * @param {boolean} isEnd 
   * @returns index of inner range.
   */
  getRangeIndex(point, isEnd) {
    for (let i = 0; i < this.points.length; i++) {
      // It's hard to explain.
      if (!isEnd && this.points[i] >= point || isEnd && this.points[i] > point) {
        return i;
      }
    }

    return this.points.length;
  }

  /**
   * Whether the list include this range.
   * 
   * @param rangeIndex Inner of inner range 
   * @returns True for include.
   */
  include(rangeIndex) {
    return !!(rangeIndex % 2);
  }
}

const caseList = [
  { type: 'add', input: [1, 5], output: '[1, 5)' },
  { type: 'add', input: [10, 20], output: '[1, 5) [10, 20)' },
  { type: 'add', input: [20, 20], output: '[1, 5) [10, 20)' },
  { type: 'add', input: [20, 21], output: '[1, 5) [10, 21)' },
  { type: 'add', input: [2, 4], output: '[1, 5) [10, 21)' },
  { type: 'add', input: [3, 8], output: '[1, 8) [10, 21)' },
  { type: 'remove', input: [10, 10], output: '[1, 8) [10, 21)' },
  { type: 'remove', input: [10, 11], output: '[1, 8) [11, 21)' },
  { type: 'remove', input: [15, 17], output: '[1, 8) [11, 15) [17, 21)' },
  { type: 'remove', input: [3, 19], output: '[1, 3) [19, 21)' },

  // addition cases
  { type: 'add', input: [16, 19], output: '[1, 3) [16, 21)' },
  { type: 'add', input: [16, 17], output: '[1, 3) [16, 21)' },
  { type: 'add', input: [19, 21], output: '[1, 3) [16, 21)' },
  { type: 'add', input: [21, 23], output: '[1, 3) [16, 23)' },
  { type: 'remove', input: [15, 16], output: '[1, 3) [16, 23)' },
  { type: 'remove', input: [16, 17], output: '[1, 3) [17, 23)' },
  { type: 'remove', input: [22, 23], output: '[1, 3) [17, 22)' },
  { type: 'remove', input: [22, 23], output: '[1, 3) [17, 22)' },
];

const rl = new RangeList();
caseList.forEach(item => {
  rl[item.type](item.input);
  if (rl.print() !== item.output) {
    console.log('Fail!!!\n');
  }
})
