package helpers

import (
	"encoding/base64"
	"encoding/json"
	"time"
)

type BaseTokenAuth struct {
	crypto *Crypto
	maxAge time.Duration
}

func NewBaseTokenAuth(crypto *Crypto, MaxAge time.Duration) *BaseTokenAuth {
	return &BaseTokenAuth{
		crypto: crypto,
		maxAge: MaxAge,
	}
}

type CreateNewToken struct {
	UserId uint
	Email  string
	Tiers  int
}

type BaseToken struct {
	UserId    uint
	Email     string
	Tiers     int
	ExpiredAt time.Time
}

func (c *BaseTokenAuth) CreateTokenAuth(data CreateNewToken) (string, error) {
	newToken := BaseToken{
		UserId:    data.UserId,
		Email:     data.Email,
		Tiers:     data.Tiers,
		ExpiredAt: time.Now().Add(c.maxAge),
	}

	encode, err := json.Marshal(newToken)
	if err != nil {
		return "", err
	}

	hash, err := c.crypto.Encrypt(encode)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(hash), nil
}

func (c *BaseTokenAuth) GetToken(hash string) (*BaseToken, error) {
	var hashDecode BaseToken

	b, err := base64.StdEncoding.DecodeString(hash)
	if err != nil {
		return nil, err
	}

	data, err := c.crypto.Decrypt(b)
	if err != nil {
		return nil, err
	}

	errDecode := json.Unmarshal(data, &hashDecode)
	if errDecode != nil {
		return nil, errDecode
	}

	return &hashDecode, nil
}
