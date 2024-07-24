# AGENT PII (TypeScript)

## API Client
- [x] `encryptWithAes`
- [x] `decryptWithAes`
- [x] `DBColumn`
- [x] `BidxCol`
- [x] `TxtHeapTable`
- [x] `buildBlindIndex`
- [x] `searchContents`

## Installation

1. Run `npm` or `yarn` to install:
    ```
    npm i pii-agent-ts
    ```

2. Set the keys in your `.env` file:
    ```
    CRYPTO_AES_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    CRYPTO_HMAC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

## Usage Examples

### Test Encrypt and Decrypt

```typescript
import CryptoTs from "../index";

const data = "Dyaksa";

// Encrypt
const encryptedHex = CryptoTs.encryptWithAes("AES_256_CBC", data);
console.log('Encrypted Data (Hex):', encryptedHex);

// Decrypt
const decryptedData =  CryptoTs.decryptWithAes("AES_256_CBC", encryptedHex.Value);
console.log('Encrypted Data:', decryptedData);

```

### Test Get Heaps by Content

```typescript
import CryptoTs from '../index';

async function exampleGetHeapsByContent() {
    try {
        const inputValue = "Ali Farhan";
        const result = await CryptoTs.searchContents(inputValue);
        console.log('Result:', result);
    } catch (error) {
        console.error('Error fetching heaps by content:', error);
    }
}

exampleGetHeapsByContent();
```

### Test Query

```typescript
// index.ts
import { DataSource } from 'typeorm';
import CryptoTs from '../index';
import { User } from './user_entity';
import { encryptWithAes } from '../crypto-ts/lib/aes_encryption';

// Example usage
const main = async () => {
	// Initialize the DataSource
	const dt = new DataSource({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: 'mysecretpassword',
		database: 'sandbox_nest',
		synchronize: true,
		entities: [User],
	});

	await dt.initialize();

	const user = new User();
    user.name = encryptWithAes('AES_256_CBC','Dyaksa Rahadian');
    user.email = encryptWithAes('AES_256_CBC','dyaksa.rahadian@gmail.com');
    user.address = encryptWithAes('AES_256_CBC', 'Demak Berung');
    user.age = 25;
    user.password = 'securepassword';

    const saveToHeap = await CryptoTs.buildBlindIndex(dt, user);

	console.log('Insert With Heap :', saveToHeap);

};

main();
```

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

- Khaerul A ([Github](https://github.com/kadzany))
- M Ali Farhan ([Github](https://github.com/Alfahan))

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
