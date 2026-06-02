#!/bin/bash
# kill old, clean cache, start fresh, verify
cd /home/alby/tinkilabs/web
fuser -k 3005/tcp 2>/dev/null
sleep 1
rm -rf .next
npm run dev -- -p 3005 &
PID=$!
# Wait for server to be ready
for i in $(seq 1 30); do
  sleep 1
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005 2>/dev/null)
  if [ "$code" = "200" ]; then
    echo "OK: servidor listo en http://localhost:3005 (PID $PID)"
    exit 0
  fi
done
echo "ERROR: servidor no arrancó tras 30s"
exit 1
