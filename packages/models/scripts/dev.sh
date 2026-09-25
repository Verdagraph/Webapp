#!/usr/bin/env bash
# Starts a local, persistent Jazz sync server and deploys its schema and
# permissions to it. Dev-only: app id, admin secret, and JWT secret are
# all hardcoded local values, for local dev convenience.
set -euo pipefail
cd "$(dirname "$0")/.."

JAZZ_VERSION="2.0.0-alpha.55"
APP_ID="afe427f5-6e8a-5b1a-9546-1367d527cb39"
ADMIN_SECRET="dev-secret"
JWT_SECRET_B64URL="c2VjcmV0" # base64url("secret") - matches apps/server's default ACCESS_TOKEN_SECRET
PORT=1626

npx "jazz-tools@${JAZZ_VERSION}" server "$APP_ID" \
	--port "$PORT" \
	--data-dir ./jazz-data \
	--admin-secret "$ADMIN_SECRET" \
	--jwt-public-key "{\"kty\":\"oct\",\"k\":\"${JWT_SECRET_B64URL}\"}" \
	--jwt-issuer verdagraph \
	--jwt-audience jazz &
SERVER_PID=$!

trap 'kill $SERVER_PID 2>/dev/null' EXIT

echo "Waiting for Jazz server on port ${PORT}..."
until (exec 3<>"/dev/tcp/localhost/${PORT}") 2>/dev/null || ! kill -0 "$SERVER_PID" 2>/dev/null; do
	sleep 0.5
done
exec 3<&- 2>/dev/null || true

echo "Deploying gardens schema + permissions..."
npx "jazz-tools@${JAZZ_VERSION}" deploy "$APP_ID" \
	--schema-dir src \
	--server-url "http://localhost:${PORT}" \
	--admin-secret "$ADMIN_SECRET"

wait "$SERVER_PID"
