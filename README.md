AGENT PII (TypeScript)

### API Client
- [x] encryptWithAes
- [x] decryptWithAes
- [x] commonGenerateDigest
- [x] insertWithHeap
- [x] updateWithHeap
- [x] saveToHeap
- [x] buildHeap
- [x] generateSQLConditions
- [x] buildLikeQuery
- [x] searchContent
- [x] isHashExist
- [x] DBColumn
- [x] BidxCol
- [x] TxtHeapTable


### Installation

1. Clone the repo
2. Run npm/yarn install
```bash
cd pii-agent-ts
npm install
```

3. copy .env.example to .env

```sh
cp .env.example .env
```

4. Fill in the value
```sh
CRYPTO_AES_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CRYPTO_HMAC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```


### Run Examples
1. Build package
```bash
npm run build
```

2. Run Example `src/examples/**.ts88`
```bash
ts-node src/examples/test_encrypt.ts
ts-node src/examples/test_decrypt.ts
ts-node src/examples/test_query.ts
```

### TODO
- [x] encryptWithAes
- [x] decryptWithAes
- [x] commonGenerateDigest
- [x] insertWithHeap
- [x] updateWithHeap
- [x] saveToHeap
- [x] buildHeap
- [x] generateSQLConditions
- [x] buildLikeQuery
- [x] searchContent
- [x] isHashExist
- [x] DBColumn
- [x] BidxCol
- [x] TxtHeapTable
- [ ] ....

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

- Khaerul A ([Github](https://github.com/kadzany))
- M Ali Farhan ([Github](https://github.com/Alfahan))

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.