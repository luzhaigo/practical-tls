# practical-tls

TLS learning

retrieve website cert:

```
openssl s_client -servername example.com -connect example.com:443 < /dev/null 2>/dev/null | openssl x509 -text
```
