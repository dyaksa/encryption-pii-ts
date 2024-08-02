package main

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"strconv"
)

// Encryption algorithm constants
const (
	AesCBC = iota
	AesCFB
	AesGCM
)

func PKCS5UnPadding(src []byte) ([]byte, error) {
	length := len(src)
	unpadding := int(src[length-1])
	unpadding = length - unpadding
	if unpadding < 0 {
		return nil, errors.New("invalid encrypted data or key")
	}
	return src[:unpadding], nil
}

func Decrypt(alg int, key []byte, encryptedData []byte) ([]byte, error) {
	encryptedDataOut := make([]byte, hex.DecodedLen(len(encryptedData)))
	encryptedDataOutN, err := hex.Decode(encryptedDataOut, encryptedData)
	if err != nil {
		return nil, err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	switch alg {
	case AesCBC:
		if len(encryptedDataOut) < aes.BlockSize {
			return nil, errors.New("encrypted data too short")
		}

		cipherDataBytes := encryptedDataOut[:encryptedDataOutN][aes.BlockSize:]
		if len(cipherDataBytes)%aes.BlockSize != 0 {
			return nil, errors.New("invalid padding: encrypted data is not a multiple of the block size")
		}

		nonceBytes := encryptedDataOut[:encryptedDataOutN][:aes.BlockSize]

		mode := cipher.NewCBCDecrypter(block, nonceBytes)
		mode.CryptBlocks(cipherDataBytes, cipherDataBytes)

		cipherDataBytes, err = PKCS5UnPadding(cipherDataBytes)
		if err != nil {
			return nil, errors.New("invalid encrypted data or key")
		}
		return cipherDataBytes, nil
	case AesCFB:
		cipherDataBytes := encryptedDataOut[:encryptedDataOutN][aes.BlockSize:]
		nonceBytes := encryptedDataOut[:encryptedDataOutN][:aes.BlockSize]

		stream := cipher.NewCFBDecrypter(block, nonceBytes)
		stream.XORKeyStream(cipherDataBytes, cipherDataBytes)
		return cipherDataBytes, nil
	case AesGCM:
		aesGCM, err := cipher.NewGCM(block)
		if err != nil {
			return nil, err
		}

		cipherDataBytes := encryptedDataOut[:encryptedDataOutN][aesGCM.NonceSize():]
		nonceBytes := encryptedDataOut[:encryptedDataOutN][:aesGCM.NonceSize()]

		plainDataBytes, err := aesGCM.Open(nil, nonceBytes, cipherDataBytes, nil)
		if err != nil {
			return nil, err
		}

		return plainDataBytes, nil
	}

	return nil, errors.New("decrypt process failed")
}

func main() {
	if len(os.Args) < 4 {
		fmt.Println("Usage: decryptor -alg <algorithm> -key <key> -data <data>")
		return
	}

	alg, err := strconv.Atoi(os.Args[2])
	if err != nil {
		fmt.Printf("Invalid algorithm: %v\n", err)
		return
	}

	key, err := hex.DecodeString(os.Args[4])
	if err != nil {
		fmt.Printf("Invalid key: %v\n", err)
		return
	}

	data, err := hex.DecodeString(os.Args[6])
	if err != nil {
		fmt.Printf("Invalid data: %v\n", err)
		return
	}

	result, err := Decrypt(alg, key, data)
	if err != nil {
		fmt.Printf("Decryption failed: %v\n", err)
		return
	}

	fmt.Printf("%x\n", result)
}
