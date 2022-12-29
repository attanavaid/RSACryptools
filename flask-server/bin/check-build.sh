#!/bin/bash

#
# Check the build. This runs mypy, flake8 and the tests in the configuration
# used by jenkins. You should run this before pushing code to github.
#
STAT=0

echo "Running static type analysis (mypy)..."
mypy
NEW_STAT=$?
echo "Done running mypy: $NEW_STAT"

if [ $NEW_STAT -ne 0 ]; then
    echo "*********************************************"
    echo "*********************************************"
    echo "*********************************************"
    echo "         FAILING BUILD DUE TO MYPY           "
    echo "*********************************************"
    echo "*********************************************"
    echo "*********************************************"
    STAT=22
fi

# Run flake twice. It takes longer, but first run fails build for critical errors. 
# Next, generate the full HTML report.

echo "Running code linter/problem identification - critical issues (flake8)..."
flake8 --format=default --select F,E999,E117,W191 --ignore F541 src tests
NEW_STAT=$?
echo "Done running flake8!"

if [ $NEW_STAT -ne 0 ]; then
    echo "*********************************************"
    echo "*********************************************"
    echo "*********************************************"
    echo " FAILING BUILD DUE TO FLAKE F or E999 ERRORS "
    echo "*********************************************"
    echo "*********************************************"
    echo "*********************************************"
    STAT=33
fi

echo "Starting tests..."
pytest --cov steel_assig01_py --cov-report term-missing  --cov-report xml:build/coverage/coverage.xml --cov-report html:build/coverage/ --verbose --junitxml=build/test/test.xml

NEW_STAT=$?
echo "Done running tests!"

if [ $NEW_STAT -ne 0 ]; then
    echo "*********************************************"
    echo "*********************************************"
    echo "*********************************************"
    echo "   FAILING BUILD DUE TO UNIT TEST FAILURE    "
    echo "*********************************************"
    echo "*********************************************"
    echo "*********************************************"
    STAT=11
fi

echo "*********************************************"
echo "*********************************************"
echo "*********************************************"

if [ $STAT -eq 0 ]; then
    echo " Build Success! "
else
    echo " Build Failed! "
fi

echo "*********************************************"
echo "*********************************************"
echo "*********************************************"

exit $STAT
