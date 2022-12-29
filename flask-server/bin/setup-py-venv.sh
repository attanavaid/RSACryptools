DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "${DIR}/../db_data"

ENVS_HOME=${ENVS_HOME:-~/.venvs}
ENV_NAME=${ENV_NAME:-flask-server}
ENV_PATH=$ENVS_HOME/$ENV_NAME

PYTHON_CMD=python3
if ! [ -x "$(command -v ${PYTHON_CMD})" ]; then
    PYTHON_CMD=python
    if ! [ -x "$(command -v ${PYTHON_CMD})" ]; then
        echo "Python not found. Make sure either python or python3 are on your path."
        exit 1
    fi
fi

PIP_CMD=pip3
if ! [ -x "$(command -v ${PIP_CMD})" ]; then
    PIP_CMD=pip
    if ! [ -x "$(command -v ${PIP_CMD})" ]; then
        echo "Pip not found. Make sure either pip or pip3 are on your path."
        exit 1
    fi
fi

echo -e "Setting up flask-server.\nENVS_HOME=$ENVS_HOME\nENV_NAME=$ENV_NAME\nENV_PATH=$ENV_PATH"

if [[ ! -e $ENVS_HOME ]]; then
    echo "Making environment home at: $ENVS_HOME"
    mkdir $ENVS_HOME
fi

if [[ -d $ENV_PATH ]]; then
    echo -e "\nEnvironment already exists. You should do one of the following:"
    echo "   (1) Activate the existing environment: "
    echo "       source $ENV_PATH/bin/activate"
    echo "   (2) Specify a new environment name and run again: "
    echo "       export ENV_NAME=my-new-venv"
    echo "       ./bin/setup-venv.sh"
    echo "   (3) Remove the existing environment: "
    echo -e "       rm -rf $ENV_PATH\n\n"
    exit 1
fi

echo "Creating virtual environment: ${ENV_NAME}"

$PYTHON_CMD -m venv $ENV_PATH

if [[ ! -e ${ENV_PATH} ]]; then
    echo "Could not create virtual environment: ${ENV_NAME}"
    exit 1
fi

echo "Activating Environment: ${ENV_NAME}"
source $ENV_PATH/bin/activate
echo "Updating pip"
# update pip
$PYTHON_CMD -m pip install --upgrade pip

echo "Updating setuptools"
# update setuptools
$PYTHON_CMD -m pip install --upgrade setuptools

$PIP_CMD install -r requirements.txt -r test-requirements.txt

echo "Activating the development environment."
$PIP_CMD install -e .


DB="${DIR}/../db_data/assig01_sqlite.db"
if [[ ! -e ${DB} ]]; then
    echo "Making database at: ${DB}"
    alembic upgrade head
    echo "Done!"
else
    echo "Not creating database. Existing database at: ${DB}"
fi

echo -e "\nYour environment is now configured at ${ENV_NAME}! Activate with:\n" ;
echo -e "     source $ENV_PATH/bin/activate\n"
