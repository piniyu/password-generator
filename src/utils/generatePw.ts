class PasswordGenerator {
  private password: (number | string)[] = [];

  length;

  minChCount;

  minNumCount;

  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  chars = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  upperChars = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  constructor({
    length = 12,
    minChCount = 0,
    minNumCount = 0,
  }: {
    length: number;
    minChCount: number;
    minNumCount: number;
  }) {
    this.length = length;
    this.minChCount = minChCount;
    this.minNumCount = minNumCount;
  }

  // eslint-disable-next-line class-methods-use-this

  private noRepeat(arr: (string | number)[]) {
    const random = (length: number) => {
      return Math.ceil(Math.random() * length);
    };

    let res;
    const randomIdx = random(arr.length);
    if (arr[randomIdx] === this.password[this.password.length - 1]) {
      const newNums = arr.filter((num) => num !== arr[randomIdx]);
      const newRandom = random(arr.length - 1);
      res = newNums[newRandom];
    } else {
      res = arr[randomIdx];
    }
    this.password.push(res);
  }

  generate() {
    let currentChCount = this.minChCount;
    let currentNumCount = this.minNumCount;
    let lastCh = '';
    for (let i = 0; i <= this.length; i++) {
      const randomType = Math.ceil(Math.random() * 3);
      if (randomType === 1) {
        // pick number
        this.noRepeat(this.nums);
      } else if (randomType === 2) {
        // pick char
        this.noRepeat(this.chars);
      } else {
        // pick upper char
        this.noRepeat(this.upperChars);
      }
    }
  }
}

export default PasswordGenerator;
