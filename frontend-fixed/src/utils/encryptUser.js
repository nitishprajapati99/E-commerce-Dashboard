import CryptoJS from 'crypto-js';

const SECRET_KEY = 'my_super_secret_key_32_chars__'; // 32-char key
const IV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // fixed IV

const encryptUser = (data) => {
  return CryptoJS.AES.encrypt(
    data,
    CryptoJS.enc.Utf8.parse(SECRET_KEY),
    { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  ).toString();
};

export default encryptUser;
