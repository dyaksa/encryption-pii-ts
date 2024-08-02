package main

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"flag"
	"fmt"
	"io"
	"os"
)

func PKCS5Padding(plainText []byte) []byte {
	padding := (aes.BlockSize - len(plainText)%aes.BlockSize)
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(plainText, padtext...)
}

func GenerateRandomIV(b []byte) error {
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return err
	}

	return nil
}

// Encryption algorithm constants
const (
	AesCBC = iota
	AesCFB
	AesGCM
)

// Encrypt encrypts the data based on the algorithm
func Encrypt(alg int, key []byte, plainData []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	switch alg {
	case AesCBC:
		plainDataPadded := PKCS5Padding(plainData)
		cipherDataBytes := make([]byte, len(plainDataPadded)+aes.BlockSize)

		err = GenerateRandomIV(cipherDataBytes[:aes.BlockSize])
		if err != nil {
			return nil, err
		}

		mode := cipher.NewCBCEncrypter(block, cipherDataBytes[:aes.BlockSize])
		mode.CryptBlocks(cipherDataBytes[aes.BlockSize:], plainDataPadded)

		dst := make([]byte, hex.EncodedLen(len(cipherDataBytes)))
		hex.Encode(dst, cipherDataBytes)
		return dst, nil
	case AesCFB:
		cipherDataBytes := make([]byte, len(plainData)+block.BlockSize())

		err = GenerateRandomIV(cipherDataBytes[:block.BlockSize()])
		if err != nil {
			return nil, err
		}

		stream := cipher.NewCFBEncrypter(block, cipherDataBytes[:block.BlockSize()])
		stream.XORKeyStream(cipherDataBytes[block.BlockSize():], plainData)

		dst := make([]byte, hex.EncodedLen(len(cipherDataBytes)))
		hex.Encode(dst, cipherDataBytes)
		return dst, nil
	case AesGCM:
		aesGCM, err := cipher.NewGCM(block)
		if err != nil {
			return nil, err
		}

		cipherDataBytes := make([]byte, len(plainData)+aesGCM.NonceSize())

		err = GenerateRandomIV(cipherDataBytes[:aesGCM.NonceSize()])
		if err != nil {
			return nil, err
		}

		res := aesGCM.Seal(nil, cipherDataBytes[:aesGCM.NonceSize()], plainData, nil)
		cipherDataBytes = append(cipherDataBytes[:aesGCM.NonceSize()], res...)

		dst := make([]byte, hex.EncodedLen(len(cipherDataBytes)))
		hex.Encode(dst, cipherDataBytes)
		return dst, nil

	default:
		return nil, fmt.Errorf("unknown algorithm: %d", alg)
	}
}

func main() {
	alg := flag.Int("alg", 0, "Encryption algorithm (0: CBC, 1: CFB, 2: GCM)")
	keyHex := flag.String("key", "", "Encryption key in hex")
	dataHex := flag.String("data", "", "Plain data in hex")
	flag.Parse()

	key, err := hex.DecodeString(*keyHex)
	if err != nil {
		fmt.Println("Error decoding key:", err)
		os.Exit(1)
	}

	data, err := hex.DecodeString(*dataHex)
	if err != nil {
		fmt.Println("Error decoding data:", err)
		os.Exit(1)
	}

	encryptedData, err := Encrypt(*alg, key, data)
	if err != nil {
		fmt.Println("Encryption error:", err)
		os.Exit(1)
	}

	fmt.Println(hex.EncodeToString(encryptedData))
}
