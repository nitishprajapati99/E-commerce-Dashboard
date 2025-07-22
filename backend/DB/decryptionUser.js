// ES Module syntax (if using "type": "module" in package.json)
import CryptoJS from 'crypto-js';

const SECRET_KEY = CryptoJS.enc.Utf8.parse('my_super_secret_key_32_chars__'); // 32 bytes
const IV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // 16 bytes

const decryptUser = (encrypted) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);

    if (!result) {
      throw new Error('Decryption failed');
    }

    return result;
  } catch (err) {
    console.error('Decryption error:', err.message);
    return null;
  }
};

// export default decryptUser;
