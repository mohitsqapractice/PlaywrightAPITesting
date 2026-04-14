#!/bin/bash
set -euo pipefail

echo "Step 1: Install dependencies"
npm ci

echo "Step 2: Generate certificates"
mkdir -p certs

export MSYS_NO_PATHCONV=1

openssl genrsa -out certs/ca.key 2048
openssl req -x509 -new -nodes \
  -key certs/ca.key \
  -out certs/ca.crt \
  -days 365 \
  -subj "/CN=MyLocalCA"

openssl genrsa -out certs/server.key 2048
openssl req -new \
  -key certs/server.key \
  -out certs/server.csr \
  -subj "/CN=localhost"

openssl x509 -req \
  -in certs/server.csr \
  -CA certs/ca.crt \
  -CAkey certs/ca.key \
  -CAcreateserial \
  -out certs/server.crt \
  -days 365

openssl genrsa -out certs/client.key 2048
openssl req -new \
  -key certs/client.key \
  -out certs/client.csr \
  -subj "/CN=PlaywrightClient"

openssl x509 -req \
  -in certs/client.csr \
  -CA certs/ca.crt \
  -CAkey certs/ca.key \
  -CAcreateserial \
  -out certs/client.crt \
  -days 365

openssl pkcs12 -export \
  -out certs/client.pfx \
  -inkey certs/client.key \
  -in certs/client.crt \
  -certfile certs/ca.crt \
  -passout pass:${MTLS_PASSWORD:-password}

echo "Step 3: Starting server in background"
node server/server.js &
SERVER_PID=$!

sleep 3

echo "Step 4: Running Playwright tests"
npx playwright test mtl.test.ts

echo "Step 5: Stopping server"
kill $SERVER_PID