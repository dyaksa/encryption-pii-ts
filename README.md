# AGENT PII (TypeScript)

## API Client
- [x] `encryptWithAes`
- [x] `decryptWithAes`
- [x] `DBColumn`
- [x] `BidxCol`
- [x] `TxtHeapTable`
- [x] `buildBlindIndex`
- [x] `searchContents`
- [x] `searchContentFullText`
- [x] `split`
- [x] `AesCipher`

## Installation this package to your project

1. Run `npm` or `yarn` to install:
    ```
    npm i pii-agent-ts
    ```

2. Set the keys in your `.env` file:
    ```
	CRYPTO_AES_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	CRYPTO_HMAC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

	DB_AUTH_HOST=localhost
	DB_AUTH_PORT=5xxx
	DB_AUTH_USERNAME=username
	DB_AUTH_PASSWORD=password
	DB_AUTH_DATABASE=db_name
    ```

## Usage Examples
### Create Table Text Heap in Your DB

```sql
CREATE TABLE IF NOT EXISTS "npwp_text_heap" (
	"id" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"content" VARCHAR NOT NULL,
	"hash" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "name_text_heap" (
	"id" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"content" VARCHAR NOT NULL,
	"hash" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "phone_text_heap" (
	"id" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"content" VARCHAR NOT NULL,
	"hash" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "email_text_heap" (
	"id" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"content" VARCHAR NOT NULL,
	"hash" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "address_text_heap" (
	"id" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"content" VARCHAR NOT NULL,
	"hash" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "nik_text_heap" (
	"id" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"content" VARCHAR NOT NULL,
	"hash" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

```

### Define Column Encrypt

```typescript
// entity.ts
import { AesCipher } from '../../crypto-ts/lib/types';
import CryptoTs from '../../index';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @CryptoTs.DBColumn('id')
    id: string;

    @Column('bytea')
    @CryptoTs.DBColumn('name')
    @CryptoTs.BidxCol('name_bidx')
    @CryptoTs.TxtHeapTable('name_text_heap')
    name: Buffer;

    @Column()
    name_bidx: string;

    @Column('bytea')
    @CryptoTs.DBColumn('email')
    @CryptoTs.BidxCol('email_bidx')
    @CryptoTs.TxtHeapTable('email_text_heap')
    email: Buffer;

    @Column()
    email_bidx: string;

    @Column('bytea')
    @CryptoTs.DBColumn('address')
    @CryptoTs.BidxCol('address_bidx')
    @CryptoTs.TxtHeapTable('address_text_heap')
    address: Buffer;

    @Column()
    address_bidx: string;

    @Column({ type: 'int', nullable: true, default: 25 }) // Define 'age' column as nullable
    @CryptoTs.DBColumn('age')
    age: number | null; // Adjust the type to accept null values

    @Column()
    @CryptoTs.DBColumn('password')
    password: string;

	@Column('bytea')
    @CryptoTs.DBColumn('phone')
    @CryptoTs.BidxCol('phone_bidx')
    @CryptoTs.TxtHeapTable('phone_text_heap')
    phone: Buffer;

    @Column()
    phone_bidx: string;

    @Column('bytea')
    @CryptoTs.DBColumn('nik')
    @CryptoTs.BidxCol('nik_bidx')
    @CryptoTs.TxtHeapTable('nik_text_heap')
    nik: Buffer;

    @Column()
    nik_bidx: string;

    @Column('bytea')
    @CryptoTs.DBColumn('npwp')
    @CryptoTs.BidxCol('npwp_bidx')
    @CryptoTs.TxtHeapTable('npwp_text_heap')
    npwp: Buffer;

    @Column()
    npwp_bidx: string;
}
```

### Test Query

```typescript
// index.ts
import CryptoTs from '../index';
import { User } from './entity/user_entity';

// Example usage
const main = async () => {

	const user = new User();
    user.name = CryptoTs.encryptWithAes('AES_256_CBC','Mohamad Ali Farhan');
    user.email = CryptoTs.encryptWithAes('AES_256_CBC','ali.farhan@yopmail.com');
    user.address = CryptoTs.encryptWithAes('AES_256_CBC', 'address yang rahasia');
	user.phone = CryptoTs.encryptWithAes('AES_256_CBC', '0899361349');
    user.nik = CryptoTs.encryptWithAes('AES_256_CBC', '3215012506200007');
    user.npwp = CryptoTs.encryptWithAes('AES_256_CBC', '311501230697000');
    user.age = 25;
    user.password = 'securepassword';

    const saveToHeap = await CryptoTs.buildBlindIndex(user);

	console.log('Insert With Heap :', saveToHeap);

};

main();
```

### Test Search Content

```typescript
import CryptoTs from '../index';

async function exampleGetHeapsByContent() {
	try {
        const inputValue = "Dy";
        const result = await CryptoTs.searchContents('name_text_heap', {content: inputValue});
        console.log('Result:', result);
    } catch (error) {
        console.error('Error fetching heaps by content:', error);
    }
}

exampleGetHeapsByContent();
```

### Test Search Full Content

```typescript
import CryptoTs from '../index';

async function exampleGetHeapsByFullContent() {
	try {
		const inputValue = "ali.farhan160@yopmail.com"
		const splitValue = CryptoTs.split(inputValue)
        const result = await CryptoTs.searchContentFullText('email_text_heap', { contents: splitValue});
        console.log('Result:', result);
    } catch (error) {
        console.error('Error fetching heaps by content:', error);
    }
}

exampleGetHeapsByFullContent();
```

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


## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions are welcome! See [Contributing](CONTRIBUTING.md).

## Author

- Khaerul A ([Github](https://github.com/kadzany))
- M Ali Farhan ([Github](https://github.com/Alfahan))

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---