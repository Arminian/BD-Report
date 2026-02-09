#!/bin/sh
# wait-for-db.sh - Wait for PostgreSQL to be ready before starting
# I lost a lot of sanity on this one

set -e

host="$1"
shift

echo "Waiting for PostgreSQL at $host..."

# Wait for PostgreSQL to be ready
until PGPASSWORD=$DB_PASSWORD psql -h "$host" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  >&2 echo "PostgreSQL is unavailable - sleeping for 2 seconds"
  sleep 2
done

>&2 echo "PostgreSQL is up and ready - executing command"
exec "$@"