export const emailRegex = (value: string) => {
  // 이메일 주소를 검사하는 정규식
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // .test() 메서드를 사용하여 주어진 value가 정규식과 일치하는지 검사
  return pattern.test(value);
};

export const validateInput = (input: string, isChar = false) => {
  console.log(input);
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  const hasSpecialCharacter = regExp.test(input);
  const hasNumber = /\d/.test(input);
  const hasLetter = /[A-Za-z]/.test(input);
  if (isChar) {
    // 특수문자, 숫자, 영문자 중 하나라도 없으면 false 반환
    if (!hasSpecialCharacter || !hasNumber || !hasLetter) {
      return false;
    }
  } else {
    if (hasSpecialCharacter || !hasNumber || !hasLetter) {
      return false;
    }
  }
  return true;
};
