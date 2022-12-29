import logging
import time
from flask import Flask, send_from_directory
from flask import Blueprint
from flask import Response
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin

from keygen import GENERATE_KEYS
from factoringMethods import POLLARD_RHO

api = Flask(__name__, static_folder='../factorization-app/build', static_url_path='')
log = logging.getLogger(__name__)
CORS(api)

@api.route('/keygen', methods=['POST'])
@cross_origin()
def keygen() -> Response:
  start_time = time.time()
  pub, prv, rsa_p, rsa_q, rsa_N, rsa_phi_of_n, rsa_e = GENERATE_KEYS(int(request.json['content']))
  return jsonify({
    'public_key': str(pub),
    'private_key': str(prv),
    'rsa_p': str(rsa_p),
    'rsa_q': str(rsa_q),
    'rsa_N': str(rsa_N),
    'rsa_phi_of_n': str(rsa_phi_of_n),
    'rsa_e': str(rsa_e),
    'time': round((time.time() - start_time), 5)
  })

@api.route('/factor', methods=['POST'])
@cross_origin()
def factor() -> Response:
  start_time = time.time()
  d, time_taken = POLLARD_RHO(int(request.json['content']), start_time)
  return jsonify({
    'factor': str(d),
    'time': round(time_taken, 5)
  })

@api.route('/')
@cross_origin()
def serve():
  return send_from_directory(api.static_folder, 'index.html')

if __name__ == "__main__":
  api.run()