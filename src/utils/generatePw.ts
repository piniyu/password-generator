export interface PasswordGeneratorProps {
  length: number;
  number?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  similar?: boolean;
  symbol?: boolean;
  ambiguous?: boolean;
}

enum TypeNum {
  number = 1,
  lowercase,
  uppercase,
  symbol,
  similar,
  ambiguous,
}

class PasswordGenerator {
  private password: (number | string)[] = [];

  symbols = ['@', '#', '$', '%'];

  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  lowercase = [
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

  similar = ['i', 'l', '1', 'L', 0, 'o', 'O'];

  ambiguous = [
    '{',
    '}',
    '[',
    ']',
    '(',
    ')',
    '/',
    '\\',
    "'",
    '"',
    '~',
    ',',
    ';',
    ':',
    '.',
    '<',
    '>',
  ];

  // eslint-disable-next-line class-methods-use-this
  private random = (length: number) => {
    return Math.ceil(Math.random() * length) - 1;
  };

  private noRepeat(arr: (string | number)[]) {
    let res;
    const randomIdx = this.random(arr.length);
    if (arr[randomIdx] === this.password[this.password.length - 1]) {
      const newArr = arr.filter((item) => item !== arr[randomIdx]);
      const newRandom = this.random(arr.length - 1);
      res = newArr[newRandom];
    } else {
      res = arr[randomIdx];
    }
    this.password.push(res);
  }

  private pushChar({
    randomType,
    number,
    lowercase,
    uppercase,
    symbol,
    similar,
    ambiguous,
  }: PasswordGeneratorProps & { randomType: TypeNum }) {
    switch (randomType) {
      // number
      case TypeNum.number:
        if (number) {
          this.noRepeat(this.nums);
          return 'push';
        }
        return '';
      // lowercase
      case TypeNum.lowercase:
        if (lowercase) {
          this.noRepeat(this.lowercase);
          return 'push';
        }
        return '';
      // uppercase
      case TypeNum.uppercase:
        if (uppercase) {
          this.noRepeat(this.upperChars);
          return 'push';
        }
        return '';
      // symbols
      case TypeNum.symbol:
        if (symbol) {
          this.noRepeat(this.symbols);
          return 'push';
        }
        return '';
      // similar
      case TypeNum.similar:
        if (similar) {
          this.noRepeat(this.similar);
          return 'push';
        }
        return '';
      // ambiguous
      case TypeNum.ambiguous:
        if (ambiguous) {
          this.noRepeat(this.ambiguous);
          return 'push';
        }
        return '';
      default:
        return '';
    }
  }

  private randomPickType(attrs: PasswordGeneratorProps) {
    for (let i = 0; i < attrs.length; ) {
      const randomType = Math.ceil(Math.random() * 6);
      const res = this.pushChar({ ...attrs, randomType });
      if (res) {
        i += 1;
      }
    }
  }

  generate(attrs: PasswordGeneratorProps) {
    const mustHaveArr: number[] = [];
    const cretiriaCount = Object.entries(attrs).reduce((acc, [key, value]) => {
      if (key !== 'length' && value) {
        mustHaveArr.push(
          TypeNum[key as keyof Omit<PasswordGeneratorProps, 'length'>],
        );
        return acc + 1;
      }
      return acc;
    }, 0);
    const mustHaveArrLength = mustHaveArr.length;

    for (let i = 0; i < mustHaveArrLength; ) {
      const index = this.random(mustHaveArr.length);
      const res = this.pushChar({
        ...attrs,
        randomType: mustHaveArr[index],
      });
      if (res) {
        i += 1;
        mustHaveArr.splice(index, 1);
      }
    }

    this.randomPickType({ ...attrs, length: attrs.length - cretiriaCount });
    return this.password.join('');
  }
}

export default PasswordGenerator;
