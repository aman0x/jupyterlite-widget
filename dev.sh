#!/bin/bash
set -euo pipefail

# Install micromamba if not present
if ! command -v micromamba &> /dev/null; then
    curl -Ls https://micro.mamba.pm/api/micromamba/osx-64/latest | tar -xvj bin/micromamba
    sudo mv bin/micromamba /usr/local/bin/
fi

rm -rf _output
./package.sh
jupyter lite build
jupyter lite serve --port=8000
