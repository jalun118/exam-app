package helpers

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCrypto(t *testing.T) {
	text := "this text jiwa mamen"

	key := "this is key 123 689 10 mantap ji"

	var cipher []byte

	var crypt Crypto

	t.Run("run_error", func(t *testing.T) {
		_, err := NewCrypto("888123913912")

		assert.NotEmpty(t, err, "should be error")
	})

	t.Run("run_success", func(t *testing.T) {
		crypto, err := NewCrypto(key)

		assert.Empty(t, err, "should be null")
		crypt = *crypto
	})

	t.Run("encrypt", func(t *testing.T) {
		b, err := crypt.Encrypt([]byte(text))
		assert.Empty(t, err, "should be null")

		cipher = b
	})

	t.Run("decrypt", func(t *testing.T) {
		b, err := crypt.Decrypt(cipher)
		assert.Empty(t, err, "should be null")

		assert.Equal(t, text, string(b), "should be equal")
	})
}
