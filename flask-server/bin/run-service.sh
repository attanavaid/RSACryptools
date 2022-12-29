#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..
echo `pwd`

PYTHON_CMD=python3
if ! [ -x "$(command -v ${PYTHON_CMD})" ]; then
    PYTHON_CMD=python
    if ! [ -x "$(command -v ${PYTHON_CMD})" ]; then
        echo "Python not found. Make sure either python or python3 are on your path."
        exit 1
    fi
fi

export FLASK_APP=flask-server.service
export FLASK_DEBUG=true
$PYTHON_CMD -m flask run -p 5003

cd $DIR
