import sys
import random
import math

sys.setrecursionlimit(5000)

def EXTENDED_EUCLIDEAN(a, b):
    if (b == 0):
        return (a, 1, 0)

    else:
        (d_prime, x_prime, y_prime) = EXTENDED_EUCLIDEAN(b, a % b)
        (d, x, y) = (d_prime, y_prime, (x_prime - ((a // b) * y_prime)))
        
        return (d, x, y)

def MODULAR_INVERSE(a, m):
    if (EXTENDED_EUCLIDEAN(a, m)[0] != 1):
        return None

    return (EXTENDED_EUCLIDEAN(a, m)[1] % m)

def WITNESS(a, n):
    t = 0
    u = n - 1
    
    while ((u % 2) == 0):
        u = u // 2
        t = t + 1
    
    x = [0 for _ in range(t + 1)]
    x[0] = pow(a, u, n)
    
    for i in range(1, t + 1):
        x[i] = pow(x[i - 1], 2, n)

        if ((x[i] == 1) and (x[i - 1] != 1) and (x[i - 1] != (n - 1))):
            return True
    
    if (x[t] != 1):
        return True
    
    return False

def MILLER_RABIN(n, s):
    for _ in range(1, s):
        a = random.randint(1, n - 1)

        if (WITNESS(a, n) == True):
            return False

    return True

def CHECK_IF_PRIME(n):
    if (n < 2):
        return False
    
    for i in integerPrimes1000:
        if (n == i):
            return True

        if ((n % i) == 0):
            return False
        
    return MILLER_RABIN(n, 20)

def GENERATE_PRIME(modulusSize):
    n = random.randint(1, (pow(2, modulusSize) - 1))

    if ((n % 2) == 0):
        n = n + 1

    while (CHECK_IF_PRIME(n) == False):
        n = n + 2
    
    return n

def POPULATE_PRIMES1000():
    stringPrimes1000 = list()
    global integerPrimes1000
    integerPrimes1000 = list()

    with open("primes1000.txt") as inputFile:
        for everyLine in inputFile:
            stringPrimes1000.append(everyLine.split("\n"))

    for i in stringPrimes1000:
        del i[-1]

    integerPrimes1000 = [list(map(int, i)) for i in stringPrimes1000]
    integerPrimes1000 = [i for j in integerPrimes1000 for i in j]

def GENERATE_KEYS(modulusSize):
    POPULATE_PRIMES1000()
    p = GENERATE_PRIME(modulusSize // 2)
    q = GENERATE_PRIME(modulusSize // 2)

    N = (p * q)
    PHI_OF_N = ((p - 1) * (q - 1))

    #e = (pow(2, 16) + 1) #Common public key...
    while True:
      e = random.randrange(1, pow(2, modulusSize))
      if math.gcd(e, PHI_OF_N) == 1:
        break

    d = MODULAR_INVERSE(e, PHI_OF_N)

    publicKey = (e, N)
    privateKey = (d, N)

    return (publicKey, privateKey, p, q, N, PHI_OF_N, e)