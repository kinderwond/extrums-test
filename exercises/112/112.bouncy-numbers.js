const NumDirection = {
  INC: "increase",
  DEC: "decrease",
};

const getNumsTendention = (nums) => {
  const [first, second] = nums;
  if (first > second) {
    return NumDirection.DEC;
  }
  if (first < second) {
    return NumDirection.INC;
  }
  return null;
};

const checkIsTendentionBroken = ({ tendention, nums }) => {
  if (!tendention) {
    return false;
  }

  const [first, second] = nums;
  const breakConditions = [
    tendention === NumDirection.DEC && first < second,
    tendention === NumDirection.INC && first > second,
  ];
  return breakConditions.some((condition) => !!condition);
};

const checkIsBouncy = (number) => {
  const nums = String(number)
    .split("")
    .map((el) => Number(el));
  let numsTendention = null;

  for (let i = 1; i <= nums.length; i++) {
    const currentNumsPair = [nums[i - 1], nums[i]];
    if (!numsTendention) {
      numsTendention = getNumsTendention(currentNumsPair);
    }
    const isTendentionBroken = checkIsTendentionBroken({
      tendention: numsTendention,
      nums: currentNumsPair,
    });
    if (isTendentionBroken) {
      return true;
    }
  }
  return false;
};
const calcProportion = (bouncyCount, nonBouncyCount) =>
  bouncyCount / (bouncyCount + nonBouncyCount);

const getFirstNumByPercentage = (percentage) => {
  let bouncyCount = 0;
  let nonBouncyCount = 0;
  let maxDigit = Number.MAX_SAFE_INTEGER;
  let number = 1;

  while (number < maxDigit) {
    if (checkIsBouncy(number)) {
      bouncyCount++;
    } else {
      nonBouncyCount++;
    }

    const proportion = calcProportion(bouncyCount, nonBouncyCount);
    if (proportion === percentage / 100) {
      return number;
    }
    number++;
  }

  return null;
};

console.log(getFirstNumByPercentage(99));
