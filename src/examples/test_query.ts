// index.ts
import CryptoTs from '../index';
import { User } from './entity/user_entity';
import { encryptWithAes } from '../crypto-ts/lib/aes_encryption';

// Example usage
const main = async () => {
	const user = new User();
	user.name = await encryptWithAes('AES_256_CBC', 'Mohamad Ali Farhan');
	user.email = await encryptWithAes('AES_256_CBC', 'ali.farhan@yopmail.com');
	user.address = await encryptWithAes('AES_256_CBC', 'address yang rahasia');
	user.phone = await encryptWithAes('AES_256_CBC', '0899361349');
	user.nik = await encryptWithAes('AES_256_CBC', '3215012506200007');
	user.npwp = await encryptWithAes('AES_256_CBC', '311501230697000');
	user.age = 25;
	user.password = 'securepassword';

	const saveToHeap = await CryptoTs.buildBlindIndex(user);

	console.log('Insert With Heap :', saveToHeap);
};

main();
