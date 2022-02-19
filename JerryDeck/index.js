class RangeList {
  constructor() {
    this.values = [];
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

  validateInput(range) {
    return Array.isArray(range) && range.length == 2 && range[0] < range[1];
  }

  updateByRange(range, isAdding) {
    if (!this.validateInput(range)) {
      return;
    }

    if (this.values.length == 0 && isAdding) {
      this.values = range;
      return;
    }

    const [beginning, end] = range;
    let beginningIndex = this.getBiggestSmallerIndex(beginning);
    let endIndex = this.getBiggestSmallerIndex(end, beginningIndex);
    let isBeginningInRange = this.getIsInRange(beginningIndex);
    let isEndInRange = this.getIsInRange(endIndex);
    let spliceStart = beginningIndex;
    let spliceDeleteCount = endIndex - beginningIndex;
    console.log(beginningIndex, endIndex);
    let spliceNewItems = [];
    if (isBeginningInRange != isAdding) {
      spliceNewItems.push(beginning);
    }
    if (isEndInRange != isAdding) {
      spliceNewItems.push(end);
    }
    console.log(spliceStart, spliceDeleteCount, spliceNewItems);

    this.values.splice(spliceStart, spliceDeleteCount, ...spliceNewItems);
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    let rangeList = [];
    for (let i = 0; i < this.values.length; i += 2) {
      rangeList.push(`[${this.values[i]}, ${this.values[i + 1]})`);
    }
    let result = rangeList.join(' ');
    console.log(result);
    return result;
  }

  // 改为二分法
  getBiggestSmallerIndex(num, i = 0) {
    for (i; i < this.values.length; i++) {
      if (this.values[i] >= num) {
        return i;
      }
    }

    return this.values.length;
  }

  getIsInRange(index) {
    if (index >= this.values.length) {
      return false;
    }

    return !!(index % 2);
  }
}

const rl = new RangeList();
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
  { type: 'add', input: [15, 19], output: '[1, 3) [15, 21)' },
]
caseList.forEach(item => {
  rl[item.type](item.input);
  console.log('[DEBUG]', item.type, item.input);
  if (rl.print() !== item.output) {
    console.log('not passed!!!\n');
  }
})
