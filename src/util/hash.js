import sha256 from 'js-sha256';

const hashPassword = (password) => {
  const hash = sha256.create();
  hash.update(password);
  const hashedPassword = hash.hex();
  const truncatedHash = hashedPassword.substring(0, 32);

  return truncatedHash;
};

export default hashPassword;
