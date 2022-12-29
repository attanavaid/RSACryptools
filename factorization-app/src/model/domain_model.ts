export interface KeyGen {
  public_key: string,       // The RSA public key
  private_key: string,      // The RSA private key
  rsa_p: string,            // The RSA secret p value
  rsa_q: string,            // The RSA secret q value
  rsa_N: string,            // The RSA public N value (which is p * q)
  rsa_phi_of_n: string,     // The RSA secret euler's totient function value (which is p − 1 * q − 1)
  rsa_e: string,            // The RSA public e value that is a coprime of rsa_phi_of_n
  time: number              // The time it took to obtain the values
}

export interface Factor {
  factor: string;     // The factor, an integer converted to a string
  time: number;       // The time it took to obtain the factor
}