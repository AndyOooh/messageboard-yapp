Gen keypair (that works on https://jwt.io/):

```sh copy
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out private.pem && openssl pkey -in private.pem -pubout -out public.pem
```

Payload:

```json copy
{
  "sub": "0x3BEC0A9CeCAd6315860067325c603861adf740b5",
  "ens": "vitalik.eth",
  "iss": "community.yodl.eth",
  "aud": "messageboard-yapp.yodl.eth",
  "exp": 1893456000,
  "some-claim": "some-value"
}
```

Result from https://jwt.io/ (HS256):

```sh copy
eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweDNCRUMwQTlDZUNBZDYzMTU4NjAwNjczMjVjNjAzODYxYWRmNzQwYjUiLCJlbnMiOiJhbmR5b2VlLnlvZGwubWUiLCJpc3MiOiJjb21tdW5pdHkueW9kbC5ldGgiLCJhdWQiOiJtZXNzYWdlYm9hcmQteWFwcC55b2RsLmV0aCIsImV4cCI6MTg5MzQ1NjAwMCwic29tZS1jbGFpbSI6InNvbWUtdmFsdWUifQ.C6OgT72kXM025vXL1IVVofxqb8EMCkh-Zbm8tynK5lq4-TsGdWNZQkGsObd3cBbPBRCGFjffjRnRMceAvZT3pA
```

Production
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEISy/ZxAak+083rGI49kjTM28by0u
rjqtr0UkLkfK4vcTRD0LafOnPayEorE48vDbf21s6yzPLFudSQyVNpgs/w==
-----END PUBLIC KEY-----
:raised_hands:
1

For dev/preview
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEdHUE1fbeyzb6tBZVp6kJQpYFjR3U
iStFkniXYd33wE8YzZ1iZWPm3rFpbhr2PQt5MskDlLzFpg0GRiGaXIQsjw==
-----END PUBLIC KEY-----
