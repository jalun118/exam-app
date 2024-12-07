package helpers

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"errors"
	"io"
)

type Crypto struct {
	Key string
}

func NewCrypto(key string) (*Crypto, error) {
	if len(key) != 32 {
		return nil, errors.New("key length must be 32 characters")
	}

	return &Crypto{
		Key: key,
	}, nil
}

func (c *Crypto) Encrypt(plaintext []byte) ([]byte, error) {
	block, err := aes.NewCipher([]byte(c.Key))
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, err
	}

	ciphertext := gcm.Seal(nonce, nonce, plaintext, nil)
	return ciphertext, nil
}

func (c *Crypto) Decrypt(ciphertext []byte) ([]byte, error) {
	block, err := aes.NewCipher([]byte(c.Key))
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return nil, errors.New("ciphertext too short")
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return nil, err
	}

	return plaintext, nil
}
